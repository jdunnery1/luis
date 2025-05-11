import { Router } from 'express'
import {createSession} from "../controllers/stripe.controller.js";

const router = Router()

router.post('/create-checkout-session', createSession)

export default router