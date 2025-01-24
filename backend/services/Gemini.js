import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserAttemptedQuiz } from '../models/User.js'; // Assuming User.js contains the updated UserAttemptedQuiz schema
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const Recommendation = async (req, res) => {
  console.log(req.body);
  try {
    const { prompt, userId, title, totalScore } = req.body;

    if (!prompt || !userId) {
      return res.status(400).send("Prompt and user ID are required");
    }

    // Get the generative model
    const model = genAi.getGenerativeModel({ model: "gemini-pro" });
    console.log("model -> ", model);

    // Generate content using the prompt
    const result = await model.generateContent(prompt);
    console.log("res -> ", result);

    const response = await result.response.text();
    console.log("Generated response: ", response);

    const recommendations = response
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item); // Remove empty lines and trim whitespace

    // Check if a document already exists for the user
    let userDoc = await UserAttemptedQuiz.findOne({ user: userId });

    if (!userDoc) {
      // If no document exists, create a new one
      userDoc = new UserAttemptedQuiz({
        user: userId,
        quizzes: [],
      });
    }

    // Append the new quiz to the quizzes array
    
    userDoc.quizzes.push({
      title,
      score: totalScore,
      recommendations,
      answers: [], // Assuming answers are not part of the request body; adjust if needed
     status : "Completed"

    });

    // Save the updated document
    const updatedDoc = await userDoc.save();
    console.log("Updated user document:", updatedDoc);

    res.json({ text: response });
  } catch (error) {
    console.error("Error generating content or saving to database:", error);
    res.status(500).send("Internal Server Error");
  }
};
