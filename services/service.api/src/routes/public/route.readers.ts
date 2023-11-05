import express from 'express'
import { PgClient } from '../../db/db.postgres.js'

export const readerRoute = express.Router()

/**
 * @openapi
 * /api/readers:
 *  get:
 *     tags:
 *     - Clients
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
readerRoute.get('', (_, res) => {
	const p = PgClient()

	p.connect()

	p.query('SELECT * FROM readers')
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
 * /api/readers:
 *  get:
 *     tags:
 *     - Clients
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
readerRoute.get('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('SELECT * FROM readers WHERE id=$1', [id])
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
 * /api/readers:
 *  put:
 *     tags:
 *     - Clients
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
readerRoute.put('/:id', (req, res) => {
	const { id } = req.params
	const { name, surname, fatherName } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE readers SET name=$2, surname=$3, father_name=$4 WHERE id=$1', [id, name, surname, fatherName])
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
 * /api/readers:
 *  delete:
 *     tags:
 *     - Clients
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
readerRoute.delete('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('DELETE FROM readers WHERE id=$1', [id])
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
