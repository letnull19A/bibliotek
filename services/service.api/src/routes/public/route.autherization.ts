import express from 'express'
import { PgClient } from '../../db/index.js'

export const autherizationRoute = express.Router()

/**
 * @openapi
 * /api/autherization:
 *  post:
 *     tags:
 *     - Autherization
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
autherizationRoute.post('', (req, res) => {
	const { login, password } = req.body

	const p = PgClient()

	p.connect()

	p.query('SELECT * FROM users WHERE login = $1 AND password = $2', [login, password])
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
