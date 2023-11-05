import pg from 'pg'
import fs from 'fs'
import path from 'path'

const { Client } = pg

const readSQL = () =>
	fs.readFileSync(path.join(path.resolve(), 'init.sql')).toString().replace('\n', '').replace('\t', '')

const main = async () => {
	console.log('started initialization')

	const p = new Client({
		host: '127.0.0.1',
		port: 5432,
		database: 'bibliotek',
		password: 'root',
		user: 'postgres'
	})

	p.connect()

	await p.query(readSQL())
    
    console.log('Database created successfully!')

	process.exit(0)
}

main().catch(console.error)
