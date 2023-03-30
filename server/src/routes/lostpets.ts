import { lostPetsController } from "../controllers"

const getUserLostPetReports = async (req: any, res) => {
  try {
    const lostPets = await lostPetsController
      .userLostPetFindAll(req.params.userId)
    res.json({ lostPets })
  } catch (error) {
    res.json(error)
  }
}

const updateUserLostPetReport = async (req: any, res) => {
  const { lat, lng, name, pictureUrl } = req.body

  if (!lat || !lng || !name || !pictureUrl) {
    res.json("faltan datos")
  }
  try {
    const report = await lostPetsController
      .userLostPetUpdate({
        ...req.body
        , userId: req._user.id
        ,
      })

    res.json(report)
  } catch (error) {
    res.json({ error })
  }
}
const createUserLostPetReport = async (req: any, res) => {
  const { lat, lng, name, pictureUrl } = req.body

  if (!lat || !lng || !name || !pictureUrl) {
    res.json("faltan datos")
  }
  try {
    const report = await lostPetsController
      .userLostPetCreate({
        ...req.body
        , userId: req._user.id
      })

    res.json(report)
  } catch (error) {
    res.json({ error })
  }
}

const deleteUserLostPetReport = async (req: any, res) => {
  if (!req.params.petId) {
    res.json({ deleted: false, message: "falta id" })
  }
  try {
    await lostPetsController
      .userLostPetDelete({
        userId: req._user.id,
        petId: req.params.petId
      })
    res.json({ deleted: true })
  } catch (error) {
    res.json({ deleted: false, message: error.message })
  }
}

const createSeenReport = async (req: any, res) => {
  try {
    const newReport = await lostPetsController
      .seenReportCreate({
        ...req.body,
      })
    res.json(newReport)
  } catch (error) {
    res.json({ error })
  }
}

const updatePetAsFound = async (req: any, res) => {
  if (!req.params.petId) {
    res.json("faltan datos")
  }
  try {
    const report = await lostPetsController
      .userLostPetUpdateAsFound({
        userId: req._user.id,
        petId: req.params.petId
      })

    res.json(report)
  } catch (error) {
    res.json({ error })
  }
}

export {
  getUserLostPetReports,
  createSeenReport,
  updateUserLostPetReport,
  updatePetAsFound,
  deleteUserLostPetReport,
  createUserLostPetReport
}