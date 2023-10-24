import express from 'express'
import { generateJwtSet } from './../services/index.js'
import { comparePassword } from './../services/service.salt.js'
import { Session } from './../services/service.session.js'
import { isNotAuth } from './../middlewares/middleware.not-auth.js'

export const authRoute = express.Router()

const session = new Session(redis)

authRoute.post('/auth', isNotAuth, async (req, res) => {

	if (process.env.CORS_ENABLED) {
		res.set('Access-Control-Allow-Origin', '*');
	}

	const { login, password } = req.body

	if (login === undefined || login === '') {
		res.status(400).send('login is undefined or empty')
		return
	}

	if (password === undefined || password === '') {
		res.status(400).send('password is undefined or empty')
		return
	}

	const comparedPassword = await comparePassword(password.toString(), identify?.password)

	if (!comparedPassword) {
		res.status(404).send('user not found')
		return
	}

	// const { name, surname, email } = identify

	// const payload = {
	// 	id: identify._id.toString(),
	// 	nickname: identify.login as string,
	// 	name: name as string,
	// 	surname: surname as string,
	// 	email: email as string
	// }

	// const jwtTokens = generateJwtSet(payload)

	// await session.start(jwtTokens.refresh.toString(), JSON.stringify(jwtTokens))

	// await redis.disconnect()

	// const response: IAuthResponse = {
	// 	tokens: jwtTokens,
	// 	user: payload
	// }

	const response = {}

	res.status(200).send(response)
})
