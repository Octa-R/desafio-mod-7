import { User, LostPet, SeenPet } from "../models"
import { sgMail } from "../lib/sendgrid";

async function sendMail({ petName, contactPhone, description, personName }) {
  const msg = {
    to: 'drogaoscura@gmail.com',
    from: 'ruarteoctavio8@gmail.com',
    subject: `se reporto tu mascota ${petName} como vista!`,
    text: `nombre:${personName} teléfono:${contactPhone} donde la vio:${description}`,
  }
  const ok = await sgMail.send(msg)
  if (!ok) {
    console.error("error de envio de mail", ok)
  } else {
    console.log("mail enviado con exito", ok)
  }
}

//devuelve las mascotas perdidas de un user
async function userLostPetFindAll(userId): Promise<User> {
  const userLostPets = await User.findByPk(userId, { include: LostPet })
  if (!userLostPets) {
    throw new Error("no existe el user")
  }
  return userLostPets
}

//reporta la mascota como vista, y envia email
async function seenReportCreate(seenReportData) {

  const { name, contactPhone, description, lostPetId } = seenReportData
  const lostPet = await LostPet.findByPk(lostPetId, { include: User })

  console.log(lostPet)

  if (!lostPet) {
    throw new Error("la mascota no existe")
  }

  const seenPetReport = await SeenPet.create({
    name,
    contactPhone,
    description,
    lostPetId: lostPet.get("id")
  })

  sendMail({ petName: lostPet.get("id"), contactPhone, description, personName: name })

  return { seenPetReport }
}

async function userLostPetCreate(reportData) {
  console.log("data que llega ", reportData)
  const lostpet = await LostPet.create({ ...reportData })
  return lostpet
}

async function userLostPetUpdate({ lat, lng, name, pictureUrl, petId }) {
  const lostpet = await LostPet.update({ lat, lng, name, pictureUrl }, {
    where: {
      id: petId
    }
  })
  return lostpet
}

async function userLostPetDelete({ userId, petId }) {
  const lostpet = await LostPet.destroy({
    where: {
      id: petId,
      userId: userId
    }
  })
  // 1 -> borro
  // 0 -> no borro un carajo
  console.log(lostpet)
  if (lostpet === 0) {
    throw new Error("no se borro")
  }
  return lostpet
}

async function userLostPetUpdateAsFound({ userId, petId }) {
  const lostpet = await LostPet.update({ isFound: true }, {
    where: {
      id: petId,
      userId: userId
    }
  })
  return lostpet
}

export {
  userLostPetCreate,
  userLostPetDelete,
  userLostPetFindAll,
  userLostPetUpdate,
  userLostPetUpdateAsFound,
  seenReportCreate
}
