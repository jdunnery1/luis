import { Router } from 'express'
import {addToCart, emptyCart, getAllUsers, getUser, removeFromCart} from "../controllers/user.controller.js";

const router = Router()

router.get('/', getAllUsers)
router.get('/user', getUser)
router.put('/add-cart', addToCart)
router.put('/del-cart', removeFromCart)
router.put('/empty-cart', emptyCart)

export default router