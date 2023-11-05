import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { apiRoute } from './routes/index.js'
import swaggerJSDoc from 'swagger-jsdoc'
import pg from 'pg'
import bodyParser from 'body-parser'

const { Client } = pg

const checkPostgresConnection = async (): Promise<void> => {
	const client = new Client({
		host: process.env.PG_ADDRESS,
		port: process.env.PG_PORT,
		database: process.env.PG_DATABASE,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD
	})

	await client
		.connect()
		.then(() => console.log('postgres connected!'))
		.catch(console.error)
}

const main = async () => {
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

	checkPostgresConnection()

	const port = process.env.APP_PORT | 3000

	const app = express()

	const options: swaggerJSDoc.Options = {
		definition: {
			swagger: '2.0',
			info: {
				title: 'Rest API docs',
				version: '1.0'
			},
			servers: [{ url: '/api' }],
			components: {
				securitySchemas: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT'
					}
				}
			},
			security: [
				{
					bearerAuth: []
				}
			]
		},
		apis: ['**/*.ts']
	}

	const swaggerSpec = swaggerJSDoc(options)

	app.use(express.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.use('/api-docs', swaggerUi.serve)
	app.get('/api-docs', swaggerUi.setup(swaggerSpec))

	app.use('/api', apiRoute)

	app.listen(port, () => {
		console.log(`*** Server run on port: ${port}`)
	})
}

main().catch(console.error)
