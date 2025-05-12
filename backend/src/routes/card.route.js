import { Router } from 'express'
import {createCard, getAllCards, removeCard, updateQty} from "../controllers/card.controller.js";

const router = Router()

router.get('/', getAllCards)
router.post('/create', createCard)
router.put('/update-qty', updateQty)
router.delete('/remove', removeCard)

export default router