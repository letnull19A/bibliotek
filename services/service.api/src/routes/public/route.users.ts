import express from 'express'
import { PgClient } from '../../db/index.js'

export const usersRoute = express.Router()

/**
 * @openapi
 * /api/users:
 *  get:
 *     tags:
 *     - users
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
usersRoute.get('', (req, res) => {
	const p = PgClient()

	p.connect()

	p.query(`SELECT \
				users_and_groups.id, \
				users_and_groups.user_id, \ 
				users_and_groups.group_id, \
				users.name, \
				users.surname, \
				users.father_name, \
				users.role, \
				groups.number \
			FROM users_and_groups \
			INNER JOIN users ON users.id = users_and_groups.user_id \
			INNER JOIN groups ON groups.id = users_and_groups.group_id`)
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
 * /api/users:
 *  get:
 *     tags:
 *     - users
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
usersRoute.get('/:id', (req, res) => {
	const p = PgClient()
	const { id } = req.params

	p.connect()

	p.query('SELECT * FROM users WHERE id = $1', [id])
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
 * /api/users:
 *  put:
 *     tags:
 *     - users
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
usersRoute.put('/:id', (req, res) => {
	const { id } = req.params
	const { name, surname, father_name, role } = req.body

	const p = PgClient()

	p.connect()

	p.query('UPDATE users SET name=$2, surname=$3, father_name=$4, role=$5 WHERE id=$1', [id, name, surname, father_name, role])
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
 * /api/users:
 *  delete:
 *     tags:
 *     - users
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
usersRoute.delete('/:id', (req, res) => {
	const { id } = req.params

	const p = PgClient()

	p.connect()

	p.query('DELETE FROM users WHERE id=$1', [id])
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
