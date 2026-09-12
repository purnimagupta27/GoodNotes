import { type Request, type Response } from "express";
import {
  createNoteService,
  getNoteService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} from "../services/notes.services.js";


const createNote = async (req: Request, res: Response) => {
  const { title, description, image, link, status, isFavourite } = req.body;

  const note = await createNoteService({
    title,
    description,
    image,
    link,
    status,
    isFavourite,
    userId: req.user.id,
  });

  return res.status(200).json(note);
};

const getNotes = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const notes = await getNoteService(userId);

  return res.status(200).json(notes);
};

const getNoteById = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId = req.user.id;

  if (!noteId || Array.isArray(noteId)) {
    throw new Error("Note id is required");
  }

  const note = await getNoteByIdService(noteId, userId);

  return res.status(200).json(note);
};

const updateNote = async (req: Request, res: Response) => {
  const { title, description, image, link, status, isFavourite } = req.body;
  const { noteId } = req.params;
  const userId = req.user.id;

  if (!noteId || Array.isArray(noteId)) {
    throw new Error("Note id is required");
  }

  const updatedNote = await updateNoteService(
    { title, description, image, link, status, isFavourite },
    userId,
    noteId,
  );

  return res.status(200).json(updatedNote);
};

const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId = req.user.id;

  if (!noteId || Array.isArray(noteId)) {
    throw new Error("Note id is required");
  }

  const deleted = await deleteNoteService(noteId, userId);
  console.log(deleted)
  return res.status(200).json({message: "Note deleted"})
};


export { createNote, getNotes, getNoteById, updateNote, deleteNote };
