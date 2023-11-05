import express from 'express'
import { PgClient } from '../../db/index.js'

export const groupsAssociationRoute = express.Router()

/**
 * @openapi
 * /api/groups:
 *  get:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsAssociationRoute.get('/:id/users', (req, res) => {
	const p = PgClient()
    const { id } = req.params

	p.connect()

	p.query('SELECT * FROM users_and_groups WHERE group_id = $1', [id])
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
 *  post:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsAssociationRoute.post('/:id/users/:user_id', (req, res) => {
    const { id, user_id } = req.params
	const p = PgClient()

	p.connect()

	p.query('INSERT INTO users_and_groups (user_id, group_id) VALUES ($1, $2)', [user_id, id])
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
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
groupsAssociationRoute.delete('/:id/users/:user_id', (req, res) => {
	const { id, user_id } = req.params
	const p = PgClient()

	p.connect()

	p.query('DELETE FROM users_and_groups WHERE id = $1 AND user_id = $2', [id, user_id])
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
