import { Form, Input, Button, Layout, Select, Space } from 'antd'
import style from './style.module.scss'
import { KeyOutlined } from '@ant-design/icons'

export const Registration = () => {
	const { Header, Content } = Layout

	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	type FieldType = {
		login: string
		name: string
		surname: string
		fatherName: string
		password: string
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
						// name="name"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Select
							showSearch
							placeholder="Select a person"
							optionFilterProp="children"
							filterOption={filterOption}
							options={[
								{
									value: '0',
									label: '121'
								},
								{
									value: '1',
									label: '122'
								},
								{
									value: '2',
									label: '131'
								},
								{
									value: '3',
									label: '132'
								},
								{
									value: '4',
									label: '141'
								},
								{
									value: '5',
									label: '142'
								}
							]}
						/>
					</Form.Item>

					<Form.Item<FieldType>
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Space.Compact style={{ width: '100%' }}>
							<Input />
							<Button type="primary">
								<KeyOutlined />
							</Button>
						</Space.Compact>
					</Form.Item>

					<Form.Item<FieldType>
						label="Подтверждение пароля"
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
