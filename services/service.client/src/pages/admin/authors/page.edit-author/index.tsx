import { Form, Input, Button, Layout, Flex, Select, Upload, UploadProps, message } from 'antd'
import style from './../../page.registration/style.module.scss'
import { UploadOutlined } from '@ant-design/icons'
import { SERVER_HOST } from '../../../../configs'
import { useTitle } from '../../../../hooks'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

type Countries = {
	id: string
	title: string
}

type Form = {
	name: string
	surname: string
	father_name: string
	country: string
}

export const EditAuthor = () => {
	useTitle('Редактирование автора')

	const { id } = useParams()

	const [countries, setCountries] = useState<Array<Countries>>()
	const [form, setForm] = useState<Form>()
	const [formInstance] = Form.useForm()

	const { Header, Content } = Layout

	const onFinish = (values: any) => {
		console.log('Success:', values)

		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('name', values.name)
		urlencoded.append('surname', values.surname)
		urlencoded.append('fatherName', values.father_name)
		urlencoded.append('countryId', values.country)

		const requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/authors/${id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	const filterOption = (input: string, option?: { label: string; value: string }) =>
		(option?.label ?? '').toLowerCase().includes(input.toLowerCase())

	const onChange = (value: string) => {
		console.log(`selected ${value}`)
	}

	const onSearch = (value: string) => {
		console.log('search:', value)
	}

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/countries`, requestOptions)
			.then(async (response) => setCountries(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))

		const requestOptions1 = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/authors/${id}`, requestOptions1)
			.then(async (response) => setForm(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}, [])

	useEffect(() => {
		formInstance.setFieldsValue(form)
	}, [form, formInstance])

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
					form={formInstance}
					initialValues={form}
					className={style.form}
				>
					<Form.Item<Form>
						label="Имя"
						name="name"
						rules={[{ required: true, message: 'Введите название произведения!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<Form>
						label="Фамилия"
						name="surname"
						rules={[{ required: true, message: 'Введите название произведения!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<Form>
						label="Отчество"
						name="father_name"
						rules={[{ required: false, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<Form> label="Страна" name="country" rules={[{ required: true, message: 'Укажите издательство!' }]}>
						<Select
							showSearch
							placeholder="К примеру Германия"
							optionFilterProp="children"
							onChange={onChange}
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
								Применить изменения
							</Button>
						</Flex>
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	)
}
