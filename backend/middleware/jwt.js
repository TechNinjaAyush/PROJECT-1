import jwt from "jsonwebtoken" ; 
import dotenv from 'dotenv';
dotenv.config();


    // Check if the Authorization header is present
    export const jsonAuthMiddleware = (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("token is" , token) ; 
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - Token Missing" });
        }
    
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY); // Use the actual secret here
            console.log("decoded is" , decoded) ; 
            req.user = decoded;
            next();
        } catch (err) {
            console.error('Token verification error:', err);
            res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
    };
    
//generate token 

export const generatetoken = (userData)=>{
return jwt.sign(userData , process.env.SECRET_KEY); 

}

