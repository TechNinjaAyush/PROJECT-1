## SKILL_ASSESSMENT_RECOMMENDATION_ENGINE
This project is a full-stack web application designed to assess user skills through quizzes in various domains such as Data Structures and Algorithms (DSA), System Design, and Computer Networks. Based on the quiz results, the system provides personalized course recommendations using the Gemini API. The application implements secure user authentication using bcrypt for password hashing and JWT (JSON Web Token) for managing authentication tokens.

## Table of Contents


1. [Features](#features)
2. [Technologies and Libraries Used](#technologies-and-libraries-used)
3. [Installation](#installation)





## Features

- **User Authentication**:

- Secure registration and login using bcrypt for password hashing.
- JWT-based token authentication for protected routes.

-  **Skill Quizzes**:
-  Multiple quiz categories including:
-  Data Structures and Algorithms (DSA)
-  System Design
-  Computer Networks
- Timed quizzes with multiple-choice questions.

- **Personalised Recommendations** :
- Integration with the Gemini API to provide tailored course recommendations based on quiz performance.
## Technologies and Libraries Used

- **Backend**:

  - Node.js – As the runtime environment.
  - Express.js – For building the RESTful API.
  - bcrypt – For hashing passwords.
  - JWT (JSON Web Token) – For securing user sessions.
  - MongoDB – Database to store user data, quiz results, and recommendations.


- **Frontend**:

   - React.js – For building the user interface.
  -  CSS/Bootstrap – For responsive and aesthetic design.
  

##  DEMO VIDEO
- link : https://www.youtube.com/watch?v=IX4uPLvJI4s&ab_channel=AyushKhairnar
## Flow Diagram
![PROJECT-1 drawio](https://github.com/user-attachments/assets/416944a5-7c77-4f10-a990-8cafa15e2cc1)

## Installation

To install and run this project locally, add the following commands in your terminal, follow these steps:

1. Clone the repository from GitHub:

```bash
  git clone  https://github.com/TechNinjaAyush/PROJECT-1.git
```

2. Navigate into the project directory:

```bash
   cd  PROJECT-1
```

3. Navigate into client:

```bash
   cd frontend
```

4. Navigate into server:

```bash
   cd backend
```

## Important



5. Install `dependencies` for the frontend in **frontend** directory (assuming you have `Node.js` and `npm` installed):

```bash
   npm install
```

6. Install `dependencies` for the backend in **backend** directory (assuming you have `Node.js` and `npm` installed):

```bash
   npm install
```



7. Create a .env file in the **backend** directory:
    GEMINI_API_KEY= your gemini key(visit gemini documentation to create a gemini key)  <br/>
    SECRET_KEY  = your secret key   <br/>
    PORT = 3000   <br/>
    MONGO_URL=mongodb://localhost:27017/skill_recommendation<br/>

9. Start the frontend and backend servers:
   
    **backend**: `node server.js`
   
    **frontend**: `npm run dev`

11. Open `http://localhost:5173` to view the application.




