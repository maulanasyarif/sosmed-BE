import mongoose from "mongoose"
import bcrypt from "bcrypt"

const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: 'default.jpg'
    },
    ts_created: {
        type: Date,
        default: Date.now
    }
});

User.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model("users", User)