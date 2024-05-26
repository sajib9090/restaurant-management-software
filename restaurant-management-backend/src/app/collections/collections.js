import { client } from "../config/db.js";

const db_name = "Restaurant-management";

const usersCollection = client.db(db_name).collection("users");
const brandsCollection = client.db(db_name).collection("brands");

export { usersCollection, brandsCollection };
