import { User } from "./users";
import { Auth } from "./auth"

Auth.belongsTo(User);
User.hasOne(Auth);

export { User, Auth };