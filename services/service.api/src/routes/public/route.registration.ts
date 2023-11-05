import express from 'express'

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
	res.status(200).send()
})
