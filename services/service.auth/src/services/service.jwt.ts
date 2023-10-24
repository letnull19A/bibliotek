import jwt from 'jsonwebtoken'
import fs from 'fs'
import path, { dirname } from 'path'

const { TokenExpiredError } = jwt

export const generateJwtSet = (payload: any): any => {
	const accessToken = generateAccessToken(payload)
	const refreshToken = generateRefreshToken(payload)

	return { access: accessToken, refresh: refreshToken }
}

export const generateAccessToken = (payload: any): string => {
	const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
	const privateKey = fs.readFileSync(pathToKey).toString()

	const accessToken = jwt.sign(payload, privateKey, {
		algorithm: 'HS256',
		expiresIn: 60 * 5,
		issuer: 'api.bibliotek.io'
	})

	return accessToken
}

export const generateRefreshToken = (payload: any): string => {
	const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
	const privateKey = fs.readFileSync(pathToKey).toString()

	const refreshToken = jwt.sign(payload, privateKey, {
		algorithm: 'HS256',
		expiresIn: 60 * 30,
		issuer: 'api.bibliotek.io'
	})

	return refreshToken
}

export const isVerifyAccessToken = (accessToken: any): boolean => {
	try {
		const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
		const privateKey = fs.readFileSync(pathToKey).toString()

		const result = jwt.verify(accessToken.access, privateKey)

		return result !== null && result !== undefined && result !== ''
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return false
		}
	}

	return false
}

export const isVerifyRefreshToken = (token: any): boolean => {
	try {
		const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
		const privateKey = fs.readFileSync(pathToKey).toString()

		const result = jwt.verify(token.refresh, privateKey)

		return result !== null && result !== undefined && result !== ''
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return false
		}
	}

	return false
}
