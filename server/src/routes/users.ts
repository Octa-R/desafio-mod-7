import { userController } from "../controllers"
const updateUserData = async (req, res) => {
  try {
    const user = await userController.update(req.body, req._user.id)
    res.json(user)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

const getUserData = async (req, res) => {
  try {
    const user = await userController.get(req._user.id)
    res.json(user)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

export { getUserData, updateUserData }