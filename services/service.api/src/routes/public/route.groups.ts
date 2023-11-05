import express from 'express'
import { PgClient } from '../../db/index.js'

export const groupsRoute = express.Router()

/**
 * @openapi
 * /api/groups:
 *  get:
 *     tags:
 *     - groups
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsRoute.get('', (req, res) => {
	const p = PgClient()

	p.connect()

	p.query('SELECT * FROM groups')
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
 *  get:
 *     tags:
 *     - groups
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsRoute.get('/:id', (req, res) => {
	const p = PgClient()
	const { id } = req.params

	p.connect()

	p.query('SELECT * FROM groups WHERE id = $1', [id])
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
 *  post:
 *     tags:
 *     - groups
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsRoute.post('', (req, res) => {
	const { number } = req.body

	const p = PgClient()

	p.connect()

	p.query('INSERT INTO groups (number) VALUES ($1)', [number])
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
 *  put:
 *     tags:
 *     - groups
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsRoute.put('/:id', (req, res) => {
	const { id } = req.params
	const { number } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE groups SET number=$2 WHERE id=$1', [id, number])
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
 *     - groups
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsRoute.delete('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('DELETE FROM groups WHERE id=$1', [id])
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
