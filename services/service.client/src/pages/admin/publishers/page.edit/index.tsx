import { Form, Input, Button, Layout, Flex, Select, Upload, UploadProps, message } from 'antd'
import style from './../../page.registration/style.module.scss'
import { UploadOutlined } from '@ant-design/icons'
import { SERVER_HOST } from '../../../../configs'
import { useTitle } from '../../../../hooks'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

type Form = {
	name: string
}

export const EditPublisher = () => {
	useTitle('Редактирование автора')

	const { id } = useParams()

	const [form, setForm] = useState<Form>()
	const [formInstance] = Form.useForm()

	const { Header, Content } = Layout

	const onFinish = (values: any) => {
		console.log('Success:', values)

		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('name', values.name)

		const requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		}

		fetch(`http://localhost:3000/api/publishers/${id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch(`http://localhost:3000/api/publishers/${id}`, requestOptions)
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
