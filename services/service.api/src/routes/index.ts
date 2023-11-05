import express from 'express'
import { booksRoute } from './public/route.books.js'
import { readerRoute } from './public/route.readers.js'
import { publisherRoute } from './public/route.publishers.js'
import { registrationRoute } from './public/route.registration.js'
import { autherizationRoute } from './public/route.autherization.js'
import { authorRoute } from './public/route.autors.js'

export const apiRoute = express.Router()

apiRoute.use('/books', booksRoute)
apiRoute.use('/readers', readerRoute)
apiRoute.use('/publishers', publisherRoute)
apiRoute.use('/registration', registrationRoute)
apiRoute.use('/autherization', autherizationRoute)
apiRoute.use('/authors', authorRoute)
