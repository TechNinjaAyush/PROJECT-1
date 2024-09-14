import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import passport from "passport";
import {  generatetoken } from "../middleware/jwt.js";
// Login route handler using Passport


export const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    return res.json("Enter the username and password") ; 
    
  }

  try {
    // Find the user by username
    const findinguser = await User.findOne({ username });
    if (!findinguser) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const compare = await bcrypt.compare(password, findinguser.password);
    if (compare) {
      // Generate the JWT token
      const token = generatetoken(findinguser.username);
      
      if (!token) {
        return res.status(500).json({ message: "Problem in token generation" });
      } else {
        return res.status(200).json({ token });
      }
    } else {
      return res.status(401).json({ message: "Password is incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    const response = await newUser.save();
    const payload = response.username;
    const token = generatetoken(payload);
    res.status(201).json({ token: "token generated is", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


