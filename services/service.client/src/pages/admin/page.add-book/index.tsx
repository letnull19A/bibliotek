import { Form, Input, Button, Layout, Flex, Select } from 'antd'
import style from './../page.registration/style.module.scss'

export const AddBook = () => {
	const { Header, Content } = Layout

	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	type FieldType = {
		name: string
		author: string
		description: string
		publisher: string
		year_of_publishing: number
		cover: string
	}

	const filterOption = (input: string, option?: { label: string; value: string }) =>
		(option?.label ?? '').toLowerCase().includes(input.toLowerCase())

	const onChange = (value: string) => {
		console.log(`selected ${value}`)
	}

	const onSearch = (value: string) => {
		console.log('search:', value)
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
						label="Название произведения"
						name="name"
						rules={[{ required: true, message: 'Введите название произведения!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Автор"
						name="author"
						rules={[{ required: true, message: 'Введите автора!' }]}
					>
						<Select
							showSearch
							placeholder="Select a person"
							optionFilterProp="children"
							onChange={onChange}
							onSearch={onSearch}
							filterOption={filterOption}
							options={[
								{
									value: '0',
									label: 'А. С. Пушкин'
								},
								{
									value: '1',
									label: 'М. Ю. Лермонтов'
								},
								{
									value: '2',
									label: 'Н. В. Гоголь'
								},
								{
									value: '3',
									label: 'Олдос Хаксли'
								}
							]}
						/>
					</Form.Item>

					<Form.Item<FieldType>
						label="Издательство"
						name="publisher"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Select
							showSearch
							placeholder="Select a person"
							optionFilterProp="children"
							onChange={onChange}
							onSearch={onSearch}
							filterOption={filterOption}
							options={[
								{
									value: '0',
									label: 'Питер'
								},
								{
									value: '1',
									label: 'АСТ'
								},
								{
									value: '2',
									label: 'DEM'
								}
							]}
						/>
					</Form.Item>

					<Form.Item<FieldType>
						label="Год издания"
						name="year_of_publishing"
						rules={[{ required: false, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Изображение"
						name="cover"
						rules={[{ required: false, message: 'Please input your username!' }]}
					>
						<Input addonBefore="http://" />
					</Form.Item>

					<Form.Item<FieldType>
						label="Описание"
						name="description"
						rules={[{ required: false, message: 'Please input your username!' }]}
					>
						<Input.TextArea rows={10} />
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
