import mongoose from "mongoose";

const mongoURL = 'mongodb://localhost:27017/skill_recommendation';

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB server");
    })
    .catch((err) => {
        console.error("Connection error", err);
    });

// Access the connection instance
const db = mongoose.connection;

// Event listeners for connection status
db.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
});

db.on('error', (err) => {
    console.error("Connection error", err);
});

export default db;
