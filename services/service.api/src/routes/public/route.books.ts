import express from "express";

export const booksRoute = express.Router()

booksRoute.get('', (req, res) => {
    res.status(200).send()
})

booksRoute.post('', (req, res) => {
    res.status(200).send()
})

booksRoute.put('', (req, res) => {
    res.status(200).send()
})

booksRoute.delete('', (req, res) => {
    res.status(200).send()
})