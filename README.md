
# Skill Assesment Recommendation Engine By Google Gemini
This project is a Skill Assessment and Recommendation Engine web app that allows users to assess their skills through quizzes on various topics like DSA, web development, and computer fundamentals. After completing the quizzes, users receive personalized course recommendations based on their performance, helping them to enhance their skills. The app integrates with GEMINI APIs to provide additional learning resources and supports features like user authentication and a dynamic recommendation dashboard.
## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies and Libraries Used](#technologies-and-libraries-used)
4. [Installation](#installation)
5. [Models Used](#models-used)

## Project Overview
The Skill Assessment and Recommendation Engine is a web application designed to help users assess their skills and improve them through personalized recommendations using GEMINI api

- **Admin features**:
- Admins have the ability to create and manage quizzes across various domains such as DSA, web development, and computer fundamentals.
- Admins can track user progress, view quiz results, and analyze performance data to make informed decisions on recommendations.
- After creating new quiz admin send notification to user through gmail
  
- **User features**:
- On the User Dashboard, users can view the latest available quizzes and select which one they want to attempt.
- After completing a quiz, users receive personalized recommendations for learning resources, tailored to their performance.
- Users can track their quiz history and view their past attempts and recommendations, helping them monitor their progress over time.
- Sign-in with Google for secure authentication, allowing users to quickly and safely log in to the app.
- JWT (JSON Web Token) implementation for secure session management, ensuring that user data remains safe throughout their session.
- Password Security using bcrypt for hashing and securing user passwords during the registration and login process.
- 
  ## Technologies and Libraries Used

- **Backend**:

  - javascript: Implemented MVC structure in OOP fashion and ensured type safety of the data using typescript.
  - Node.js: Used to setup the environment for backend.
  - Express.js: Built scalable backend server.
  - Mongo DB: Stored  admins  and user quiz history.
  - Nodemailer: To send mail to user about new available quiz.
  - Docker: Leveraged docker to containerize the application.

- **Frontend**:

  - React.js: Built the entire client side and integrating backend apis using Next.js.
  - Tailwind CSS: Used tailwind css for responsive interface for across all devices.
  - Docker: Leveraged docker to containerize the application.

- **Models**:
  - Gemini AI Model for generating user personalized recommendation.






## Installation

To install and run this project locally, add the following commands in your terminal, follow these steps:

1. Clone the repository from GitHub:

```bash
    git clone https://github.com/TechNinjaAyush/PROJECT-1.git
```



3. Navigate into client:

```bash
   cd frontend
    cd vite-project
```

4. Navigate into server:

```bash
   cd backend
```

## Important

5. Ensure that the version of `Node.js` and `npm` you're using is compatible with the dependencies you're installing. Some dependencies may require specific Node.js versions.
   Run the below command in **frontend** directory and **backend** directory.

```bash
   npm install -g npm@latest
```

6. Install `dependencies` for the frontend in **frontend** directory (assuming you have `Node.js` and `npm` installed):

```bash
   npm install
```

7. Install `dependencies` for the backend in **backend** directory (assuming you have `Node.js` and `npm` installed):

```bash
   npm install
```

8. Create a .env file in the **backend** directory and add backend **api endpoint**:

`GEMINI_API_KEY`=`YOUR GEMINI API KEY` <br>
`SECRET_KEY`  = `YOUR SECRET`  <br> 
`PORT` = `3000` <br>
# MongoDB URL for local development
`MONGO_URL`=`mongodb://<username>:<password>@<host>:<port>/<database-name>` <br>

`CLIENT_ID`  = `YOUR CLIENT ID GETTING FROM GOOGLE CONSOLE`<br>
`CLIENT_SECRET` = `YOUR CLIENT SECRET GETTING FROM GOOGLE CONSOLE`<br>
`EMAIL_ID`  =  `YOUR EMAIL ID`<br>
`EMAIL_PASS` = `YOUR EMAIL PASSWORD FOR NODEMAILER SERVICE`<br>


