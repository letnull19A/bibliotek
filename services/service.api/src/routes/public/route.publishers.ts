import express from 'express'
import { PgClient } from '../../db/db.postgres.js'

export const publisherRoute = express.Router()

/**
 * @openapi
 * /api/issue:
 *  get:
 *     tags:
 *     - Publisher
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
publisherRoute.get('', (req, res) => {
	const p = PgClient()

	p.connect()

	p.query('SELECT * FROM publishers')
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
 * /api/issue:
 *  get:
 *     tags:
 *     - Publisher
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
publisherRoute.get('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('SELECT * FROM publishers WHERE id=$1', [id])
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
 * /api/publisher:
 *  post:
 *     tags:
 *     - Publisher
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
publisherRoute.post('', (req, res) => {
	const { name, surname, fatherName } = req.body

	const p = PgClient()

	p.connect()

	p.query('INSERT INTO publishers (name, surname, father_name) VALUES ($1, $2, $3)', [name, surname, fatherName])
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
 * /api/publisher:
 *  put:
 *     tags:
 *     - Publisher
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
publisherRoute.put('/:id', (req, res) => {
	const { id } = req.params
	const { name, surname, fatherName } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE publishers SET name=$2, surname=$3, father_name=$4 WHERE id=$1', [id, name, surname, fatherName])
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
 * /api/publisher:
 *  delete:
 *     tags:
 *     - Publisher
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
publisherRoute.delete('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('DELETE FROM publishers WHERE id=$1', [id])
		.then((result) => {
			p.end()
			res.status(200).send(result.rows)
		})
		.catch((err) => {
			console.error(err)
			res.status(500).send()
		})
})
