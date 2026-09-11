import { type Request, type Response } from "express";
import { createNoteService } from "../services/notes.services.js";


const createNote = async(req: Request, res: Response) => {
    const {title, description, image, status, isFavourite} = req.body
    const note = createNoteService({title, description, image, status, isFavourite, userId: req.user.id})

    return res.status(200).json(note)
}

export{
    createNote
}