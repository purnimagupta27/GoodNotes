import type { noteType } from "../types/note.types.js";
import { prisma } from "../config/db.js";
import { randomUUID } from "node:crypto";
import { NoteStatus } from "../generated/prisma/enums.js";
import redis from '../utils/redis.js'

const createNoteService = async (notesData: noteType) => {
  const { title, description, image, link, status, isFavourite, userId } =
    notesData;

  if (
    title.trim() === "" ||
    !title ||
    description.trim() === "" ||
    !description
  ) {
    throw new Error("Fill the required fields");
  }

  const newNote = await prisma.note.create({
    data: {
      id: randomUUID(),
      title,
      description,
      ...(image !== undefined && { image }),
      ...(link !== undefined && { link }),
      status: "COMPLETED",
      isFavourite,
      userId,
    },
  });

  return newNote;
};

const getNoteService = async (userId: string) => {
  const cachedNotes = await redis.get("notes")
  if (cachedNotes) {
    return JSON.parse(cachedNotes)
  }

  const notes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
  });

  await redis.set("notes",
    JSON.stringify(notes),
    "EX",
    1200
  )

  return notes;
};

const getNoteByIdService = async (noteId: string, userId: string) => {
  const note = await prisma.note.findUnique({
    where: {
      userId: userId,
      id: noteId,
    },
  });

  return note;
};

const updateNoteService = async (notesData: Partial<noteType>, userId: string, noteId: string) => {
  const { title, description, image, link, status, isFavourite } =
    notesData;

  const updatedNote = await prisma.note.update({
    where: {
      id: noteId,
      userId
    },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(link !== undefined && { link }),
      ...(status !== undefined && { status: status as NoteStatus }),
      ...(isFavourite !== undefined && { isFavourite }),
    },
  });

  await redis.del("notes")

  return updatedNote
};


const deleteNoteService = async (noteId: string, userId: string) => {
  const deletedNote = await prisma.note.delete({
    where: {
      id: noteId,
      userId
    }
  })

  return deletedNote
}

export {
  createNoteService,
  getNoteService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService
};
