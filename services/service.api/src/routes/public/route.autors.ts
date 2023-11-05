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

	p.query('SELECT * FROM authors')
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

	p.query('SELECT * FROM authors WHERE id=$1', [id])
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
	const { name, surname, fatherName } = req.body

	const p = PgClient()

	p.connect()

	p.query('INSERT INTO authors (name, surname, father_name) VALUES ($1, $2, $3)', [name, surname, fatherName])
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
			res.status(500).send()
		})
})
