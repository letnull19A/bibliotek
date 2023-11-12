import { Form, Input, Button, Layout, Select } from 'antd'
import style from './style.module.scss'
import { useEffect, useState } from 'react'

type FieldType = {
	login: string
	name: string
	surname: string
	fatherName: string
	group: number
	password: string
}

type Group = {
	id: string
	number: number
}

export const Registration = () => {
	const { Header, Content } = Layout

	const [groups, setGroups] = useState<Array<Group>>()

	useEffect(() => {
		getGroups()
	}, [])

	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	const handleRegistration = () => {
		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('name', 'Денис')
		urlencoded.append('surname', 'Мясников')
		urlencoded.append('father_name', 'Сергеевич')
		urlencoded.append('login', 'bebes')
		urlencoded.append('password', '11111111')
		urlencoded.append('role', 'student')

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/registration', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const getGroups = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/groups', requestOptions)
			.then(async (response) => setGroups(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const filterOption = (input: string, option?: { label: string; value: string }) =>
		(option?.label ?? '').toLowerCase().includes(input.toLowerCase())

	return (
		<Layout>
			<Header className={style.header}></Header>
			<Content className={style.content}>
				<Form
					name="basic"
					style={{ maxWidth: 300 }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
					className={style.form}
				>
					<Form.Item<FieldType>
						label="Логин"
						name="login"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Имя"
						name="name"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Фамилия"
						name="surname"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Отчество (при наличии)"
						name="fatherName"
						rules={[{ required: false, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Номер группы"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						{groups && (
							<Select
								showSearch
								placeholder="Select a person"
								optionFilterProp="children"
								filterOption={filterOption}
								options={groups?.map((group) => ({
									value: group.id,
									label: group.number
								}))}
							/>
						)}
					</Form.Item>

					<Form.Item<FieldType>
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item>
						<Button style={{ width: '100%', height: '48px' }} type="primary" htmlType="submit">
							Зарегистрировать
						</Button>
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	)
}
