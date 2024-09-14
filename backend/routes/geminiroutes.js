import express from "express";
import { Recommendation } from "../services/Gemini.js";
import { jsonAuthMiddleware } from "../middleware/jwt.js";
const Geminirouter = express.Router();
Geminirouter.post("/submit" , jsonAuthMiddleware , Recommendation) ; 

export  default  Geminirouter  ; 
