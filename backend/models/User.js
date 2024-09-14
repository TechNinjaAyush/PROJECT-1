import mongoose from 'mongoose';

// Define the schema


const quizSchema = new mongoose.Schema({
  quiz_name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  recommendations: [String], // Array of recommendation strings
  date: {
    type: Date,
    default: Date.now // Default to current date
  }
});
const userInfoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  } , 

  quizzes: [quizSchema]

  }
);


const User = mongoose.model('User', userInfoSchema);

export default User;

