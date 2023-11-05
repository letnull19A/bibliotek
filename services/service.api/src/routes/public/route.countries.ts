import express from 'express'
import { PgClient } from '../../db/index.js'

export const countriesRoute = express.Router()

/**
 * @openapi
 * /api/countries:
 *  get:
 *     tags:
 *     - countries
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
countriesRoute.get('', (req, res) => {
	const p = PgClient()

	p.connect()

	p.query('SELECT * FROM countries')
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
 * /api/countries:
 *  get:
 *     tags:
 *     - countries
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
countriesRoute.get('/:id', (req, res) => {
	const p = PgClient()
	const { id } = req.params

	p.connect()

	p.query('SELECT * FROM countries WHERE id = $1', [id])
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
 * /api/countries:
 *  post:
 *     tags:
 *     - countries
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
countriesRoute.post('', (req, res) => {
	const { title } = req.body

	const p = PgClient()

	p.connect()

	p.query('INSERT INTO countries (title) VALUES ($1)', [title])
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
 * /api/countries:
 *  put:
 *     tags:
 *     - countries
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
countriesRoute.put('/:id', (req, res) => {
	const { id } = req.params
	const { title } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE countries SET title=$2 WHERE id=$1', [id, title])
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
 * /api/countries:
 *  delete:
 *     tags:
 *     - countries
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
countriesRoute.delete('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('DELETE FROM countries WHERE id=$1', [id])
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
