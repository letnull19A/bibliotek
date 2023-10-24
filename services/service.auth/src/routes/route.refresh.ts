import express from 'express'
import jwt from 'jsonwebtoken'
import { Session } from './../services/service.session.js'
import { generateJwtSet, isVerifyRefreshToken } from './../services/service.jwt.js'
import path, { dirname } from 'path'
import fs from 'fs'
import { $log as logger } from '@tsed/logger'

export const refreshRoute = express.Router() 

// const session = new Session(redis)
const session = new Session(null)

logger.name = 'REFRESH'

refreshRoute.post('', async (req, res) => { 
  try {
    const { refresh } = req.body

    if (refresh === '' || refresh === undefined || refresh === null)
      return res.status(400).send('refresh token is not defined')

    if ((await session.isAvalible(refresh)) && isVerifyRefreshToken({ refresh })) {
      const pathToKey = path.join(dirname('.'), './keys/key.secret.pub')
      const privateKey = fs.readFileSync(pathToKey).toString()

      const decoded = jwt.verify(refresh?.toString() ?? '', privateKey)

      const payload = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        surname: decoded.surname,
        nickname: decoded.nickname,
      }

      const jwtTokens = generateJwtSet(payload)

      await session.end(refresh)

      await session.start(jwtTokens.refresh.toString(), JSON.stringify(jwtTokens))

      res.status(200).json(jwtTokens)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    logger.error(error)
  }
})
