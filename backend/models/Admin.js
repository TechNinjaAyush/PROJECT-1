import mongoose from "mongoose";

const AdminInfoScheama = new mongoose.Schema({
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
      },
    });


const Teacher = mongoose.model('Teacher', AdminInfoScheama);

export default Teacher;