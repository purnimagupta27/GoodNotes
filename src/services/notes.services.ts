import type { noteType } from "../types/note.types.js";
import { prisma } from '../config/db.js'
import { randomUUID } from "node:crypto";

const createNoteService = async(notesData: noteType) => {
    const {title, description, image, status, isFavourite, userId} = notesData

    if(title.trim() === "" || !title || description.trim() === "" || !description){
        throw new Error("Fill the required fields")
    }

    const newPost = await prisma.note.create({
        data: {
            id: randomUUID(),
            title,
            description,
            ...(image !== undefined && { image }),
            status : "COMPLETED",
            isFavourite,
            userId 
        }
    })

    return newPost
}

export{
    createNoteService
}