import { Form, Input, Checkbox, Button, Layout } from 'antd'
import style from './style.module.scss'
import { SERVER_HOST } from '../../../configs'
import { useState } from 'react'

export const Login = () => {
	const { Header, Content } = Layout

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	type FieldType = {
		login?: string
		password?: string
	}

	const sendLoginRequest = async (values: any) => {

		var myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		var urlencoded = new URLSearchParams()
		urlencoded.append('login', values.login)
		urlencoded.append('password', values.password)

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/autherization', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	return (
		<Layout>
			<Header className={style.header}></Header>
			<Content className={style.content}>
				<Form
					name="basic"
					onFinish={sendLoginRequest}
					style={{ maxWidth: 300 }}
					initialValues={{ remember: false }}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
					className={style.form}
				>
					<Form.Item<FieldType> label="Логин" name="login" rules={[{ required: true, message: 'Логин не введён!' }]}>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Пароль не введён!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button
							onClick={() => sendLoginRequest()}
							style={{ width: '100%', height: '48px' }}
							type="primary"
							htmlType="submit"
						>
							Войти
						</Button>
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	)
}
