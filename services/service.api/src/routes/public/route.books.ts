import express from 'express'

export const booksRoute = express.Router()

/**
 * @openapi
 * /api/books:
 *  get:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.get('', (req, res) => {
	res.status(200).send()
})

/**
 * @openapi
 * /api/books:
 *  post:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.post('', (req, res) => {
	res.status(200).send()
})

/**
 * @openapi
 * /api/books:
 *  put:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.put('', (req, res) => {
	res.status(200).send()
})

/**
 * @openapi
 * /api/books:
 *  delete:
 *     tags:
 *     - Books
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
booksRoute.delete('', (req, res) => {
	res.status(200).send()
})
