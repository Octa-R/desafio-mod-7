import { User } from "../models";

async function get(userId) {
  console.log("get user controller")
  const user = await User.findByPk(userId, { attributes: ["fullname", "localidad", "email"] })
  if (!user) {
    throw new Error("user no encontrado")
  }
  return user
}

async function update(userData, userId) {
  const { localidad, fullname } = userData
  const res = User.update({ localidad, fullname }, {
    where: {
      id: userId
    }
  })
  if (res[0] === 0) {
    throw new Error("user no encontrado")
  }
  return { message: "datos actualizado con exito" }
}

export { get, update }