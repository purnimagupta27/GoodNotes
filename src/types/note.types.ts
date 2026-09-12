import { NoteStatus } from "../generated/prisma/enums.js"

export interface noteType{
    title: string
    description: string
    image?: string[]
    link?: string[]
    status: NoteStatus
    isFavourite: boolean 
    userId: string
}