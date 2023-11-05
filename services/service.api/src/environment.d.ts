declare global {
	namespace NodeJS {
		interface ProcessEnv {
			APP_PORT: number
			PG_ADDRESS: string
			PG_PORT: number
			PG_DATABASE: string
			PG_USER: string
			PG_PASSWORD: string
			PG_CONNECTION_STRING: string
		}
	}
}

export {}
