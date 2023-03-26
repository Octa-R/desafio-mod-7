import { User } from "./users";
import { Auth } from "./auth"
import { LostPet } from "./lostpet";
import { SeenPet } from "./seenpet";

User.hasMany(LostPet)
LostPet.belongsTo(User)

LostPet.hasMany(SeenPet)
SeenPet.belongsTo(LostPet)

Auth.belongsTo(User);
User.hasOne(Auth);

export { User, Auth };