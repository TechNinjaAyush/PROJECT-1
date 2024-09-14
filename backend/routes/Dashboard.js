import  express from  "express" ; 
import { jsonAuthMiddleware } from "../middleware/jwt.js";
import UserDasdboard from "../controllers/Userdashboard.js";
const   DashboardRoute = express.Router() ; 

DashboardRoute.get("/dashboard" ,jsonAuthMiddleware , UserDasdboard ) ; 
export  default  DashboardRoute ; 