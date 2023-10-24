import express from 'express'
import dotenv from 'dotenv'
import { $log } from '@tsed/logger'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'

$log.level = 'debug'
$log.name = 'AUTH'

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })

if (
	process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC === undefined || 
	Number.isNaN(process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC) ||
	process.env.VERIFICATION_ATTEMPTS_OF_PING_TRPC < 0)
	throw new Error('VERIFICATION_ATTEMPTS_OF_PING_TRPC is not defined or not a number or min than 0')

if (process.env.PORT === undefined || Number.isNaN(process.env.PORT))
	throw new Error('PORT env variable is not defined or not a number')

const port = process.env.PORT

const main = async () => {

	const app = express()

	if (process.env.CORS_ENABLED) {

		app.use(cors({
			origin: '*'
		}))
		
		$log.info('cors is enabled')
	}

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use('/api', router)

	app.listen(port, () => {
		$log.info(`auth-server started on port: ${port}`)
		$log.info(`auth-server started with mode: ${process.env.NODE_ENV}`)
	})
}

main().catch($log.error)