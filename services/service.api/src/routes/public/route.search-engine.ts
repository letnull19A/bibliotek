import express from 'express'
import { PgClient } from '../../db/index.js'

export const searchEngineRoute = express.Router()

/**
 * @openapi
 * /api/registration:
 *  post:
 *     tags:
 *     - Registration
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
searchEngineRoute.get('*', (req, res) => {

    const { table } = req.query

    const p = PgClient()

	p.connect()

    let query = ''

    switch (table) {
        case 'books':
            query = `SELECT \
                        books.id, \
                        books.title, \
                        books.genre, \
                        authors.name, \
                        authors.surname, \
                        authors.father_name \
                    FROM books \
                    INNER JOIN authors ON authors.id = books.author_id
                    WHERE \
                        title LIKE '%${req.query.search}%' OR \
                        genre LIKE '%${req.query.search}%' OR \
                        authors.name LIKE '%${req.query.search}%'`
        break;
    }

    p.query(query).then((result) => {
			p.end()
			res.status(200).send(result.rows)
		})
		.catch((err) => {
			console.error(err)
			res.status(500).send()
		})
})
