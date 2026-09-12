import { Router } from "express";
import { authenticated } from "../middlewares/auth.middleware.js";
import * as controller from '../controllers/notes.controller.js'
import type { Router as ExpressRouter } from "express";

const router: ExpressRouter = Router()

router.post('/create-note', authenticated, controller.createNote)
router.get('/my-notes', authenticated, controller.getNotes)
router.get('/:noteId', authenticated, controller.getNoteById)
router.patch('/:noteId', authenticated, controller.updateNote)
router.delete('/:noteId', authenticated, controller.deleteNote)

export default router