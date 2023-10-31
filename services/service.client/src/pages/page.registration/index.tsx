import { Form, Input, Checkbox, Button, Layout } from 'antd'
import style from './style.module.scss'

export const Registration = () => {
    const { Header, Footer, Content } = Layout

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
						label="Ваше имя"
						name="name"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

                    <Form.Item<FieldType>
						label="Ваша фамилия"
						name="surname"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

                    <Form.Item<FieldType>
						label="Ваше отчество (при наличии)"
						name="fatherName"
						rules={[{ required: false, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>

                    <Form.Item<FieldType>
						label="Подтверждение пароля"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Войти
						</Button>
					</Form.Item>
				</Form>
			</Content>
			<Footer className={style.footer}></Footer>
		</Layout>
	)
}