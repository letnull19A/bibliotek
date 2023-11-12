import { Layout, Button, theme, Typography, Flex, Form, Input, Select } from 'antd'
import { useTitle } from '../../../../hooks'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ReadyMenu } from '../../../../widgets'
import { SERVER_HOST } from '../../../../configs'

type FieldType = {
	name: string
	surname: string
	father_name: string
	country: string
}

type Countries = {
	id: string
	title: string
}

export const AddAuthors = () => {
	const { Header, Sider, Content } = Layout
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const [countries, setCountries] = useState<Array<Countries>>()
	const { title } = useTitle('Добавить автора')
	const { Title } = Typography

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/countries`, requestOptions)
			.then(async (response) => setCountries(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}, [])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = (values: any) => {
		console.log('Success:', values)

		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('name', values.name)
		urlencoded.append('surname', values.surname)
		urlencoded.append('fatherName', values.father_name === undefined ? '' : values.father_name)
		urlencoded.append('country_id', values.country)

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/authors`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	const onSearch = (value: string) => {
		console.log('search:', value)
	}

	const filterOption = (input: string, option?: { label: string; value: string }) =>
		(option?.label ?? '').toLowerCase().includes(input.toLowerCase())

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="demo-logo-vertical" />
				<ReadyMenu />
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64
						}}
					/>
					<span>{title}</span>
				</Header>
				<Content
					className={style.content}
					style={{
						margin: '24px 16px',
						padding: 24,
						background: colorBgContainer
					}}
				>
					<Title>Добавить автора</Title>
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
							label="Фамилия"
							name="surname"
							rules={[{ required: true, message: 'Введите Фамилию!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item<FieldType> label="Имя" name="name" rules={[{ required: true, message: 'Введите Имя!' }]}>
							<Input />
						</Form.Item>

						<Form.Item<FieldType> label="Отчество" name="father_name">
							<Input />
						</Form.Item>

						<Form.Item<FieldType> label="Страна" name="country">
							<Select
								showSearch
								placeholder="К примеру Россия"
								optionFilterProp="children"
								onSearch={onSearch}
								filterOption={filterOption}
								options={countries?.map((country) => ({
									value: country.id,
									label: country.title
								}))}
							/>
						</Form.Item>

						<Form.Item>
							<Flex justify="space-between">
								<Button style={{ width: '100%' }} type="primary" htmlType="submit">
									Готово
								</Button>
							</Flex>
						</Form.Item>
					</Form>
				</Content>
			</Layout>
		</Layout>
	)
}
