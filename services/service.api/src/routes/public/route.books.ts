import express from 'express'
import { PgClient } from '../../db/index.js'
import { log } from 'console'

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
			books.id as book_id, \
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

	p.query('SELECT \
				books.id as book_id,\
				books.title, \
				books.year_of_publishing, \
				books.genre, \
				books.author_id as author_id, \
				books.publisher_id as publisher_id, \
				books.cover, \
				publishers.name, \
				CONCAT(authors.name, \' \', \
				authors.surname, \' \', \
				authors.father_name) as author \
			 FROM books \
			 INNER JOIN authors ON authors.id = author_id \
			 INNER JOIN publishers ON publishers.id = publisher_id \
			 WHERE books.id = $1', [id])
		.then((result) => {
			p.end()
			res.status(200).send(result.rows[0])
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
	log(req.body)
	const { title, author_id, year_of_publishing, publisher_id, cover } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE books SET \
			title=$2, \
			author_id=$3, \
			year_of_publishing=$4, \
			publisher_id=$5, \
			cover=$6 \
			WHERE id=$1', [id, title, author_id, year_of_publishing, publisher_id, cover])
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

	log(id)

	p.connect()

	p.query('DELETE FROM books WHERE id=$1', [id])
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
