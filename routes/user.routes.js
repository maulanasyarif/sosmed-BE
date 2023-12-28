import express from "express"
import {
    register,
    sign_in,
    profile,
    loginrequired,
    logout
} from "../controllers/user.controller.js"

const router = express.Router()
router.post("/auth/register", register)
router.post("/auth/login", sign_in)
router.post("/me", loginrequired, profile)
router.post("/logout", logout)

export default router;