import {Card} from "../models/card.model.js";

export const getAllCards = async (req, res) => {
    try {
        res.json(await Card.find())
    } catch (e) {
        console.log(e)
    }
}

export const createCard = async (req, res) => {
    try {
        let card = await Card.create({...req.body, cardId: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000})
        if (card) res.json({success: true})
    } catch (e) {
        console.log(e)
        res.json({success: false})
    }
}

export const updateQty = async (req, res) => {
    try {
        let card = await Card.findOne({cardId: req.body.card.cardId})
        console.log(`${card.title} ${card.qty}`)
        card.qty = card.qty + req.body.qty
        card.save()
    }  catch (e) {
        console.log(e)
    }
}