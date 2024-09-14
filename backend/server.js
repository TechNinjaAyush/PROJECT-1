import express from 'express';
import db from './config/database.js'; // Importing will trigger the connection
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import  geminiroutes from "./routes/geminiroutes.js"
import DashboardRoute from './routes/Dashboard.js';
import passport from 'passport';
import session from 'express-session'; // Correct import
import cors from "cors" ; 
const port = 3000;
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const coreOptions = {
  origin: "http://localhost:5173" ,
  methods : "GET , POST , PUT ,DELETE , PATCH , HEAD"  , 
  credentials :  true

}
app.use(cors(coreOptions))  ; 

// Initialize session before Passport
app.use(session({
  secret: 'secretkey', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/auth', authRoutes);
app.use('/gemini' , geminiroutes) ; 
app.use('/profile',  DashboardRoute); // Added dashboard routes

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
