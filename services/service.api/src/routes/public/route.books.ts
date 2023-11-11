import express from 'express'
import { PgClient } from '../../db/index.js'

export const booksRoute = express.Router()

/**
 * @openapi
 * /api/books:
 *  get:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
/**
 * @openapi
 * /api/books:
 *  get:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.get('', (req, res) => {
	const p = PgClient()

	p.connect()

	p.query('SELECT \
			books.id, \
			books.title, \
			books.cover, \
			books.genre, \
			books.year_of_publishing, \
			authors.name as author_name, \
			authors.surname as author_surname, \
			authors.father_name as author_father_name, \
			publishers.name as publisher_name \
			FROM books \
			INNER JOIN authors ON authors.id = author_id \
			INNER JOIN publishers ON publisher_id = publishers.id')
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
 * /api/books:
 *  get:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.get('/:id', (req, res) => {
	const p = PgClient()
	const { id } = req.params

	p.connect()

	p.query('SELECT * FROM books WHERE id = $1', [id])
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
 * /api/books:
 *  post:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.post('', (req, res) => {
	const { author_id, publisher_id, title, cover, year_of_publishing } = req.body

	const p = PgClient()

	p.connect()

	p.query('INSERT INTO books \
			(author_id, publisher_id, title, cover, year_of_publishing) \
			VALUES ($1, $2, $3, $4, $5)', 
			[author_id, publisher_id, title, cover, year_of_publishing])
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
 * /api/books:
 *  put:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.put('/:id', (req, res) => {
	const { id } = req.params
	const { name, surname, fatherName } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE authors SET name=$2, surname=$3, father_name=$4 WHERE id=$1', [id, name, surname, fatherName])
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
 * /api/books:
 *  delete:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.delete('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('DELETE FROM authors WHERE id=$1', [id])
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
