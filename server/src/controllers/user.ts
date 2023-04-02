import { User } from "../models";

async function get(userId) {
  const user = await User.findByPk(userId)
  if (!user) {
    throw new Error("user no encontrado")
  }
  return {
    name: user.get("fullname"),
    localidad: user.get("localidad"),
    email: user.get("email"),
  }
}

async function update(userData, userId) {
  const { localidad, name } = userData
  const res = User.update({ localidad, fullname: name }, {
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