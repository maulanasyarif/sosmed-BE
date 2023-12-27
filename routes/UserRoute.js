import express from "express"
import {
    getUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController.js"

const router = express.Router()
router.get("/users", getUser)
router.post("/users", createUser)
router.get("/users/:id", getUserById)
router.patch("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)

export default router;