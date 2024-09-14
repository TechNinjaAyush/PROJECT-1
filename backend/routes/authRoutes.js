import express from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";
const router = express.Router();
// Apply Passport middleware for the login route
router.post("/login",  LoginUser);

router.post("/register", RegisterUser);



export default router;
