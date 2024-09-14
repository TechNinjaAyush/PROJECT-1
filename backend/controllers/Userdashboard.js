import User from '../models/User.js';
const UserDashboard = async (req, res) => {
  try {
    // Extract the username from the route parameter
    const { username } = req.params;

    // Check if the authenticated user is the same as the requested username
    if (req.user.username !== username) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find the user by the username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the quiz history (quizzes stored in the user document)
    res.json({
      username: user.username,
      quizzes: user.quizzes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default UserDashboard;
