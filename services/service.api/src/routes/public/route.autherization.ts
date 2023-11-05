import express from 'express'

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
	res.status(200).send()
})
