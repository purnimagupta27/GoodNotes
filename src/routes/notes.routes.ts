import { Router } from "express";
import { authenticated } from "../middlewares/auth.middleware.js";
import * as controller from '../controllers/notes.controller.js'

const router = Router()

router.post('/create-note', authenticated, controller.createNote)

export default Router