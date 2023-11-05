import express from 'express'
import { booksRoute } from './public/route.books.js'
import { readerRoute } from './public/route.readers.js'
import { publisherRoute } from './public/route.publishers.js'
import { registrationRoute } from './public/route.registration.js'
import { autherizationRoute } from './public/route.autherization.js'
import { authorRoute } from './public/route.autors.js'
import { groupsRoute } from './public/route.groups.js'
import { countriesRoute } from './public/route.countries.js'
import { usersRoute } from './public/route.users.js'
import { groupsAssociationRoute } from './public/route.groups-associations.js'
import { booksAssociationRoute } from './public/route.user-books.js'

export const apiRoute = express.Router()

apiRoute.use('/books', booksRoute)
apiRoute.use('/readers', readerRoute)
apiRoute.use('/publishers', publisherRoute)
apiRoute.use('/registration', registrationRoute)
apiRoute.use('/autherization', autherizationRoute)
apiRoute.use('/authors', authorRoute)
apiRoute.use('/groups', groupsRoute)
apiRoute.use('/groups', groupsAssociationRoute)
apiRoute.use('/countries', countriesRoute)
apiRoute.use('/users', usersRoute)
apiRoute.use('/users', booksAssociationRoute)