import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/666/666201.png",
        set: (v) => v === "" ? "https://cdn-icons-png.flaticon.com/128/666/666201.png" : v
    }
})


const User = new mongoose.model("user", userSchema);
export default User;