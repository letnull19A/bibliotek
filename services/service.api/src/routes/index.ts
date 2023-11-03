import express from "express";
import { booksRoute } from "./public/route.books.js";

export const apiRoute = express.Router()

apiRoute.use('/books', booksRoute)