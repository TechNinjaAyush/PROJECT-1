import mongoose from 'mongoose';

// User Schema
const userInfoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.google_id;
    }
  },
  google_id: {
    type: String,
    unique: true,
    sparse: true
  },
  profile_picture: {
    type: String,
    required: function() {
      return !!this.google_id; // Profile picture is required for Google users only
    }
  }
});

// Create the User model
export const Student = mongoose.model('User', userInfoSchema);

// Question Schema
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true },
  time: { type: Number, required: true }, // Time allowed for the question
  explanation: { type: String }
}, { _id: true }); // Sub-schema options

export const Question = mongoose.model('Question', questionSchema);

// Quiz Schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema] // Array of Question sub-documents
}, { timestamps: true });

// Create and export the Quiz model
export const Quiz = mongoose.model('Quiz', quizSchema);

// User Attempted Quiz Schema
const UserAttemptedQuizSchema = new mongoose.Schema({
  user: { 
    type: String, 
    
     
  },
  quizzes: [
    {
      title: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      recommendations: {
        type: [String]
      },
      status : {
        type : String , 
        required : true ,    
        default : "Completed"  ,
        enum : ["Completed", "Pending", "Skipped"]
       } , 
      answers: [
        {
          questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
          },
          userAnswer: String
        }
      ]
    } , 
    
  ] 

   
});

export const UserAttemptedQuiz = mongoose.model('UserAttemptedQuiz', UserAttemptedQuizSchema);
