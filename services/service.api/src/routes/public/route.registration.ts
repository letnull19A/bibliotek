import express from 'express'
import { PgClient } from '../../db/index.js'

export const registrationRoute = express.Router()

/**
 * @openapi
 * /api/registration:
 *  post:
 *     tags:
 *     - Registration
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
registrationRoute.post('', (req, res) => {

	const { name, surname, father_name, login, password, role } = req.body

	const p = PgClient()

	p.connect()

	p.query('INSERT INTO users (name, surname, father_name, login, password, role) VALUES ($1, $2, $3, $4, $5, $6)', [name, surname, father_name, login, password, role])
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
