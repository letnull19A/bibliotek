import express from 'express'
import { PgClient } from '../../db/db.postgres.js'

export const authorRoute = express.Router()

/**
 * @openapi
 * /api/author:
 *  get:
 *     tags:
 *     - Authors
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
authorRoute.get('/', (_, res) => {
	const p = PgClient()

	p.connect()

	p.query('SELECT \
			authors.id as author_id, \
			authors.name, \
			authors.surname, \
			authors.father_name, \
			countries.id as country_id, \
			countries.title as country \
			FROM authors\
			INNER JOIN countries ON countries.id = authors.country_id')
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
 * /api/author/:id:
 *  get:
 *     tags:
 *     - Authors
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
authorRoute.get('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('SELECT \
			authors.id as author_id, \
			authors.name, \
			authors.surname, \
			authors.father_name, \
			countries.id as country_id, \
			countries.title \
			FROM authors\
			INNER JOIN countries ON countries.id = authors.country_id\
			WHERE authors.id = $1', [id])
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
 * /api/author/:id:
 *  post:
 *     tags:
 *     - Authors
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
authorRoute.post('', (req, res) => {
	const { name, surname, fatherName, country_id } = req.body

	const p = PgClient()

	p.connect()

	p.query('INSERT INTO authors \
	 		(name, surname, father_name, country_id) VALUES \
			($1, $2, $3, $4)', 
			[name, surname, fatherName, country_id])
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
 * /api/author/:id:
 *  put:
 *     tags:
 *     - Authors
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
authorRoute.put('/:id', (req, res) => {
	const { id } = req.params
	const { name, surname, fatherName, countryId } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE authors SET name=$2, surname=$3, father_name=$4, country_id=$5 WHERE id=$1', [id, name, surname, fatherName, countryId])
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
 * /api/author/:id:
 *  delete:
 *     tags:
 *     - Authors
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
authorRoute.delete('/:id', (req, res) => {
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
