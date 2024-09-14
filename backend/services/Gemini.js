import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import User from '../models/User.js'; // Update this path according to your file structure

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const Recommendation = async (req, res) => {
  console.log(req.body);
  try {

    const { prompt, topic, score} = req.body;
    // console.log(req);
    const username = req.user; 

    console.log({prompt, username});

    console.log("type of", typeof(prompt));

    if (!prompt || !username) {
      return res.status(400).send("Prompt and user are required");
    }

    const model = genAi.getGenerativeModel({ model: "gemini-pro" });

    console.log("model -> ", model)
    const result = await model.generateContent(prompt);
    console.log("res -> ", result)

    const response = await result.response.text();
    console.log("Generated response: ", response);


    // Save recommendations and quiz details to the database
    // Adjust as needed based on response format
    const recommendations = response.split("\n").map(item => item.trim()).filter(item => item); // Remove empty lines and trim whitespace
    console.log("type of  recommendtions  " , typeof recommendations )  ; 
    await User.findOneAndUpdate(
      { username: username }, // Use username to find the user
      {
        $push: {
          quizzes: {
            quiz_name: topic,
            score: score,
            recommendations: recommendations
          }
        }
      },
      { new: true }
    );

    res.json({ text: response });

  } catch (error) {
    console.error("Error generating content or saving to database:", error);
    res.status(500).send("Internal Server Error");
  }
};
