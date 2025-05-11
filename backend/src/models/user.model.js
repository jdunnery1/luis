import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {required: true, unique: true, type: String},
    clerkId: {required: true, unique: true, type: String},
    admin: {required: true, type: Boolean},
    cart: {required: true, type: Array}
})

export const User = mongoose.model('users', userSchema)