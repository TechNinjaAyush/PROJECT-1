import express from "express";
import bcrypt from "bcrypt";
import Teacher from "../models/Admin.js";
import passport from "passport";
import { generatetoken } from "../middleware/jwt.js";
import { Student } from "../models/User.js"; // Ensure Student is correctly exported
// Login route handler using Passport
export const LoginUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Please enter username, password, and role." });
  }

  try {
    let findingUser;

    // Check role and find user in the appropriate model
    if (role === "Student") {
      findingUser = await Student.findOne({ username });
    } else if (role === "Teacher") {
      findingUser = await Teacher.findOne({ username });
    } else {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (!findingUser) {
      return res.status(401).json({ message: "User not found." });
    }

    const isPasswordValid =  bcrypt.compare(password, findingUser.password);
    if (isPasswordValid) {
      const token = generatetoken(findingUser.username);
      if (!token) {
        return res.status(500).json({ message: "Token generation failed." });
      }
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const RegisterUser = async (req, res) => {
  const { username, email, password, role } = req.body; // Include role in the request
  const saltRounds = 10;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    let existingUser;

    // Check for existing user based on role
    if (role === "Student") {
      existingUser = await Student.findOne({ username });
    } else if (role === "Teacher") {
      existingUser = await Teacher.findOne({ username });
    } else {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    let newUser;

    // Create new user based on role
    if (role === "Student") {
      newUser = new Student({
        username,
        email,
        password: hash,
        role, // Optional if you're already separating models
      });
      
    } else if (role === "Teacher") {
      newUser = new Teacher({
        username,
        email,
        password: hash,
        role, // Optional if you're already separating models
      });
    }

    const response = await newUser.save();
    const payload = response.username;
    const token = generatetoken(payload);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};
