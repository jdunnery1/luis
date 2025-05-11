import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    cardNumber: {type: Number, required: true},
    qty: {type: Number, required: true},
    price: {type: Number, required: false},
    image: {type: String, required: true},
    set: {type: String, required: false},
    cardId: {type: Number, required: true}
}, {timestamps: true})

export const Card = mongoose.model("cards", cardSchema)