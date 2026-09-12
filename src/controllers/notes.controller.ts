import { type Request, type Response } from "express";
import { createNoteService, getNoteService, getNoteByIdService } from "../services/notes.services.js";

const createNote = async(req: Request, res: Response) => {
    const {title, description, image, status, isFavourite} = req.body

    const note = await createNoteService({title, description, image, status, isFavourite, userId: req.user.id})

    return res.status(200).json(note)
}


const getNotes = async(req: Request, res: Response) => {
    const userId = req.user.id

    const notes = await getNoteService(userId)

    return res.status(200).json(notes)
    
}


const getNoteById = async(req: Request, res: Response) => {
    const {noteId} = req.params
    const userId = req.user.id

    if(!noteId || Array.isArray(noteId)){
        throw new Error("Note id is required")
    }

    const note = await getNoteByIdService(noteId, userId)

    console.log(note)
    
    return res.status(200).json(note)
}

export{
    createNote,
    getNotes,
    getNoteById
}