import express from 'express'
import { PgClient } from '../../db/index.js'

export const booksAssociationRoute = express.Router()

/**
 * @openapi
 * /api/groups:
 *  get:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksAssociationRoute.get('/:user_id/books', (req, res) => {
	const p = PgClient()
    const { user_id } = req.params

	p.connect()

	p.query('SELECT * FROM users_and_books WHERE user_id = $1', [user_id])
		.then((result) => {
			p.end()
			res.status(200).send(result.rows)
		})
		.catch((err) => {
			console.error(err)
			res.status(500).send()
		})
})

/**
 * @openapi
 * /api/groups:
 *  post:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksAssociationRoute.post('/:user_id/books', (req, res) => {
    const { user_id } = req.params
    const { book_id, date_of_getting, date_of_ending, date_of_returning } = req.body
	const p = PgClient()

	p.connect()

	p.query('INSERT INTO users_and_books \
            (user_id, book_id, date_of_getting, date_of_ending, date_of_returning) \
            VALUES ($1, $2, $3, $4, $5)', [user_id, book_id, date_of_getting, date_of_ending, date_of_returning])
		.then((result) => {
			p.end()
			res.status(200).send(result.rows)
		})
		.catch((err) => {
			console.error(err)
			p.end()
			res.status(500).send()
		})
})

/**
 * @openapi
 * /api/groups:
 *  delete:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksAssociationRoute.delete('/:id', (req, res) => {
	const { id } = req.params
	const p = PgClient()

	p.connect()

	p.query('DELETE FROM users_and_books WHERE id=$1 user_id = $2', [id])
		.then((result) => {
			p.end()
			res.status(200).send(result.rows)
		})
		.catch((err) => {
			console.error(err)
			p.end()
			res.status(500).send()
		})
})
