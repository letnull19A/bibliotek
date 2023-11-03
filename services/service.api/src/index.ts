import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { apiRoute } from './routes/index.js'

const main = async () => {
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

	const port = process.env.APP_PORT | 3000

	const app = express()

	const options = {
		swaggerOptions: {
			url: 'http://localhost:3000/v2/swagger.json'
		}
	}

	const swaggerDocument = import('./swagger/output.json', { assert: { type: 'json' } })

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	app.use('/api', apiRoute)

	app.listen(port, () => {
		console.log(`*** Server run on port: ${port}`)
	})
}

main().catch(console.error)
