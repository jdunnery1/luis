import { Router } from 'express'
import {
    addToCart,
    emptyCart,
    getAllUsers,
    getUser,
    increaseQty,
    removeFromCart
} from "../controllers/user.controller.js";

const router = Router()

router.get('/', getAllUsers)
router.get('/user', getUser)
router.put('/add-cart', addToCart)
router.put('/del-cart', removeFromCart)
router.put('/empty-cart', emptyCart)
router.put('/increment-qty', increaseQty)

export default router