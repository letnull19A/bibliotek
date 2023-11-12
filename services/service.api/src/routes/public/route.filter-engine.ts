import express from 'express'
import { PgClient } from '../../db/index.js'

export const filterEngineRoute = express.Router()

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
filterEngineRoute.get('*', (req, res) => {

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
                        title LIKE '%${req.query.title}%' OR \
                        genre LIKE '%${req.query.genre}%' OR \
                        authors.name LIKE '%${req.query.authorName}%'`
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
