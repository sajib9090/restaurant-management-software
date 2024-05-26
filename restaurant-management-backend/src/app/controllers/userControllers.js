import createError from "http-errors";
import { ObjectId } from "mongodb";
import {
  brandsCollection,
  usersCollection,
} from "../collections/collections.js";
import { validateString } from "../helpers/validateString.js";
import slugify from "slugify";
import validator from "validator";
import { requiredField } from "../helpers/requiredField.js";
import { duplicateChecker } from "../helpers/duplicateChecker.js";
import bcrypt from "bcryptjs";
import createJWT from "../helpers/createJWT.js";
import {
  clientURL,
  jwtAccessToken,
  jwtRefreshToken,
  jwtSecret,
} from "../../important.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { emailWithNodeMailer } from "../helpers/email.js";

const handleCreateUser = async (req, res, next) => {
  const { name, email, brand_name, mobile, password } = req.body;
  try {
    requiredField(name, "Name is required");
    requiredField(email, "Email is required");
    requiredField(brand_name, "Brand_name is required");
    requiredField(mobile, "Mobile number is required");
    requiredField(password, "Password is required");

    const processedName = validateString(name, "Name", 3, 30);
    const processedBrandName = validateString(brand_name, "Brand name", 3, 30);
    const processedEmail = email?.toLowerCase();

    if (!validator.isEmail(processedEmail)) {
      throw createError(400, "Invalid email address");
    }

    if (!validator.isMobilePhone(mobile, "any")) {
      throw createError(400, "Invalid mobile number");
    }

    const generateUsername = processedEmail?.split("@")[0];

    await duplicateChecker(
      usersCollection,
      "email",
      processedEmail,
      "Email already exists. Please login"
    );

    await duplicateChecker(
      usersCollection,
      "mobile",
      mobile,
      "Mobile number already exists. Please login"
    );

    const trimmedPassword = password.replace(/\s/g, "");
    if (trimmedPassword.length < 8 || trimmedPassword.length > 30) {
      throw createError(
        400,
        "Password must be at least 8 characters long and not more than 30 characters long"
      );
    }

    if (!/[a-z]/.test(trimmedPassword) || !/\d/.test(trimmedPassword)) {
      throw createError(
        400,
        "Password must contain at least one letter (a-z) and one number"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(trimmedPassword, salt);

    const brandCount = await brandsCollection.countDocuments();
    const generateBrandCode = crypto.randomBytes(16).toString("hex");

    const count = await usersCollection.countDocuments();
    const generateUserCode = crypto.randomBytes(16).toString("hex");

    const brandSlug = slugify(processedBrandName);

    const newBrand = {
      brand_id: brandCount + 1 + "-" + generateBrandCode,
      brand_name: processedBrandName,
      brand_slug: brandSlug,
      payment_info: {
        payment_invoices: [],
      },
      subscription_info: {
        last_payment: "",
        expiresAt: "",
        selected_plan_id: "",
        subscription_expired: true,
      },
      createdAt: new Date(),
      created_by: count + 1 + "-" + generateUserCode,
    };

    const newUser = {
      user_id: count + 1 + "-" + generateUserCode,
      name: processedName,
      email: processedEmail,
      username: generateUsername,
      brand_id: newBrand?.brand_id,
      mobile: mobile,
      password: hashedPassword,
      role: "chairman",
      banned_user: false,
      deleted_user: false,
      email_verified: false,
      mobile_verified: false,
      createdAt: new Date(),
    };

    const token = await createJWT(
      {
        user_id: count + 1 + "-" + generateUserCode,
      },
      jwtSecret,
      "15m"
    );

    const brandResult = await brandsCollection.insertOne(newBrand);
    const userResult = await usersCollection.insertOne(newUser);

    if (!brandResult?.insertedId && !userResult?.insertedId) {
      await usersCollection.deleteOne({ user_id: newUser?.user_id });
      await brandsCollection.deleteOne({ brand_id: newBrand?.brand_id });
      throw createError(500, "Can't create user try again");
    }

    if (!brandResult?.insertedId) {
      await usersCollection.deleteOne({ user_id: newUser?.user_id });
      throw createError(500, "Can't create user try again");
    }

    if (!userResult?.insertedId) {
      await brandsCollection.deleteOne({ brand_id: newBrand?.brand_id });
      throw createError(500, "Can't create user try again");
    }

    //prepare email
    const emailData = {
      email,
      subject: "Account Creation Confirmation",
      html: `<h2 style="text-transform: capitalize;">Hello ${processedName}!</h2>
      <p>Please click here to <a href="${clientURL}/api/v2/users/verify/${token}">activate your account</a></p>
      <p>This link will expires in 5 minutes</p>`,
    };

    // send email with nodemailer
    try {
      await emailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send verification email"));
    }

    res.status(200).send({
      success: true,
      message: `Please go to your email at ${email} and complete registration process`,
    });
  } catch (error) {
    next(error);
  }
};

const handleActivateUserAccount = async (req, res, next) => {
  const token = req.params.token;
  try {
    if (!token) {
      throw createError(404, "Credential not found");
    }

    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded) {
      throw createError(404, "Invalid credential");
    }

    const existingUser = await usersCollection.findOne({
      user_id: decoded?.user_id,
    });

    if (!existingUser) {
      throw createError(404, "User not found. Try again");
    }

    if (existingUser?.email_verified) {
      throw createError(400, res.redirect("https://jwt.io"));
    }

    const updateUser = await usersCollection.updateOne(
      { user_id: existingUser?.user_id },
      {
        $set: {
          email_verified: true,
        },
      }
    );

    if (updateUser.modifiedCount == 0) {
      throw createError(500, "Something went wrong. Please try again");
    }

    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

const handleLoginUser = async (req, res, next) => {
  const { username_email_mobile, password } = req.body;
  try {
    if (!username_email_mobile || !password) {
      throw createError(
        400,
        "Username or email or mobile and password is required"
      );
    }

    const stringData = username_email_mobile
      ?.trim()
      .replace(/\s+/g, "")
      .toLowerCase();

    if (
      username_email_mobile?.length > 50 ||
      username_email_mobile?.length < 3
    ) {
      throw createError(400, "Username or email or mobile should be valid");
    }

    const trimmedPassword = password.replace(/\s/g, "");

    if (trimmedPassword.length < 8 || trimmedPassword.length > 30) {
      throw createError(
        400,
        "Password must be at least 8 characters long and not more than 30 characters long"
      );
    }

    if (!/[a-z]/.test(trimmedPassword) || !/\d/.test(trimmedPassword)) {
      throw createError(
        400,
        "Password must contain at least one letter (a-z) and one number"
      );
    }

    const user = await usersCollection.findOne({
      $or: [
        { username: stringData },
        { email: stringData },
        { mobile: stringData },
      ],
    });

    if (!user) {
      next(
        createError.BadRequest(
          "Invalid username or email address or mobile. Not found"
        )
      );
      return;
    }

    //match password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      next(createError.Unauthorized("Invalid Password"));
      return;
    }

    if (!user?.email_verified) {
      const token = await createJWT(
        {
          user_id: user?.user_id,
        },
        jwtSecret,
        "15m"
      );

      const email = user?.email;
      //prepare email
      const emailData = {
        email,
        subject: "Account Creation Confirmation",
        html: `<h2 style="text-transform: capitalize;">Hello ${user?.name}!</h2>
      <p>Please click here to <a href="${clientURL}/api/v2/users/verify/${token}">activate your account</a></p>
      <p>This link will expires in 5 minutes</p>`,
      };

      // send email with nodemailer
      try {
        await emailWithNodeMailer(emailData);
      } catch (emailError) {
        next(createError(500, "Failed to send verification email"));
      }
      throw createError.Unauthorized(
        `You are not verified please go to your email at- ${user?.email} and verify your account`
      );
    }

    if (user.banned_user) {
      next(
        createError.Unauthorized("You are banned. Please contact authority")
      );
      return;
    }

    //check user banned or not
    if (user.deleted_user) {
      next(
        createError.Unauthorized("You are deleted. Please contact authority")
      );
      return;
    }

    const loggedInUser = user;
    delete loggedInUser.password;
    delete loggedInUser.email;
    delete loggedInUser.username;
    delete loggedInUser.mobile;
    delete loggedInUser.name;
    delete loggedInUser.banned_user;
    delete loggedInUser.deleted_user;
    //token cookie
    const accessToken = await createJWT(loggedInUser, jwtAccessToken, "1d");

    const refreshToken = await createJWT(loggedInUser, jwtRefreshToken, "30d");
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: loggedInUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export { handleCreateUser, handleActivateUserAccount, handleLoginUser };
