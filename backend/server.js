import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import db from './config/database.js'; // Assuming your database connection is here
import authRoutes from './routes/authRoutes.js';
import geminiroutes from './routes/geminiroutes.js';
import quizRoute from './routes/quizRoutes.js';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { Student } from './models/User.js'; // Assuming you have this model

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware Setup

// 1. JSON Body Parsing
app.use(express.json()); // Handles JSON body parsing

// 2. URL-Encoded Body Parsing
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// 3. Session Management
app.use(session({
  secret: process.env.SESSION_SECRET || '12345', // Use environment variable for better security
  resave: false,
  saveUninitialized: true
}));

// 4. Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy Setup
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const token = accessToken;
    console.log(`Access token: ${accessToken}`);
    console.log(profile);

    // Check for existing user or create a new one
    let user = await Student.findOne({ google_id: profile.id });
    if (!user) {
      const username = profile.emails[0].value.split('@')[0];
      user = new Student({
        google_id: profile.id,
        username: username,
        email: profile.emails[0].value,
        profile_picture: profile.photos[0].value
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    console.error('Error during Google OAuth:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Google OAuth Login Route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback Route
app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:5173/home",
  failureRedirect: "http://localhost:5173/login"
}));

// CORS Setup
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend origin
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);
app.use('/gemini', geminiroutes);
app.use('/quiz', quizRoute); // Assuming these routes are defined elsewhere

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is listening at port ${port}`);
});