import { Button, Flex, Form, Input, Layout, Select, Upload } from 'antd'
import style from './../../page.registration/style.module.scss'
import { Content, Header } from 'antd/es/layout/layout'
import { useParams } from 'react-router-dom'

type Group = {
	number: number
}

export const EditGroup = () => {
	const { id } = useParams()

	const onFinish = (values: any) => {
		console.log('Success:', values)

		const myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

		const urlencoded = new URLSearchParams()
		urlencoded.append('number', values.number)

		const requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		}

		fetch(`http://localhost:3000/api/groups/${id}`, requestOptions)
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

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
					<Form.Item<Group>
						label="Номер группы"
						name="number"
						rules={[{ required: false, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item>
						<Flex justify="space-between">
							<Button type="primary" htmlType="submit">
								Применить
							</Button>
						</Flex>
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	)
}
