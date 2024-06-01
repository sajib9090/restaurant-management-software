import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { currentUserDetails } from "../../../redux/features/auth/authSlice";
import avatar from "../../../../public/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";

const HeaderInfo = () => {
  const user = useSelector(currentUserDetails);
  return (
    <div>
      <span >
        Hi,{" "}
        <span title={user?.name} className="font-bold capitalize mr-2">
          {user?.name}
        </span>
      </span>
      <Avatar
        size={{
          xs: 24,
          sm: 32,
          md: 40,
          lg: 64,
          xl: 80,
          xxl: 100,
        }}
        icon={
          <div>
            <img src={user?.avatar ? user?.avatar : avatar} alt="" />
          </div>
        }
      />
    </div>
  );
};

export default HeaderInfo;
