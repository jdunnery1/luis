import { Router } from 'express'
import {auth} from "../controllers/auth.controller.js";

const router = Router()

router.post('/callback', auth)

export default router