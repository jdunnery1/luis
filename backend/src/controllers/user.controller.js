import {User} from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        res.json(await User.find())
    } catch (e) {
        console.log(e)
    }
}

export const getUser = async (req, res) => {
    try {
        res.json(await User.findOne({clerkId: req.query.id}))
    } catch (e) {
        console.log(e)
    }
}

export const addToCart = async (req, res) => {
    try {
        let user = await User.findOne({clerkId: req.body.id})
        user.cart = [...user.cart, {...req.body.card, cartId: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}]
        user.save()
    } catch (e) {
        console.log(e)
    }
}

export const removeFromCart = async(req, res) => {
    try {
        let user = await User.findOne({clerkId: req.body.id})
        user.cart = user.cart.filter((c) => c.cartId !== req.body.card.cartId)
        user.save()
    } catch (e) {
        console.log(e)
    }
}

export const emptyCart = async (req, res) => {
    try {
        let user = await User.findOne({clerkId: req.body.id})
        user.cart = []
        user.save()
    } catch (e) {
        console.log(e)
    }
}

export const increaseQty = async(req, res) => {
    try {
        let user = await User.findOne({clerkId: req.body.id})
        user.cart.filter((c) => c.cardId === req.body.cardId)[0].qty += 1
        console.log(user)
        user.markModified('user.cart')
        user.save()
    } catch (e) {
        console.log(e)
    }
}