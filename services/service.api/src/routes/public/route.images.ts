import express from 'express'
import fs from 'node:fs/promises'
import path from 'path'
import mime from 'mime'

export const imagesRoute = express.Router()

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
imagesRoute.get('/:name', async (req, res) => {
	try {

		const { name } = req.params
		
		const filePath = path.join(path.normalize('./uploads/'), name)
		const file = await fs.readFile(filePath)
		
		res.setHeader('Content-Length', (await fs.stat(filePath)).size);
		res.setHeader('Content-Type', mime.lookup(name));
		res.setHeader('Content-Disposition', `attachment; filename=${name}`);
		res.write(file, 'binary');
		res.status(200).send()
	} catch {}
})