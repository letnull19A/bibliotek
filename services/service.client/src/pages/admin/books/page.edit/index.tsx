import { Form, Input, Button, Layout, Flex, Select, Upload, UploadProps, UploadFile } from 'antd'
import style from './../../page.registration/style.module.scss'
import { UploadOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RcFile } from 'antd/es/upload/interface'

type Publisher = {
	id: string
	name: string
}

type FieldType = {
	title: string
	author_id: string
	publisher_id: string
	author: string
	description: string
	year_of_publishing: number
	cover: string
}

type Author = {
	author_id: string
	name: string
	surname: string
	father_name: string
}

export const EditBook = () => {
	const { Header, Content } = Layout
	const { id } = useParams()
	const [publishers, setPublishers] = useState<Array<Publisher>>()
	const [authors, setAuthors] = useState<Array<Author>>()
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const [form, setForm] = useState<FieldType>()
	const [formInstance] = Form.useForm()

	const onFinish = (values: any) => {
		const formData = new FormData()

		if (fileList.length > 0) {
			const uploadCover = new FormData()
			uploadCover.append('file', fileList[0] as RcFile)

			const uploadrRequestOptions = {
				method: 'POST',
				body: uploadCover,
				redirect: 'follow'
			}

			fetch('http://localhost:3000/api/uploads/cover/cover', uploadrRequestOptions)
				.then((result) => console.log(result))
				.catch((error) => console.log('error', error))

			formData.append('cover', (fileList[0] as RcFile).name)
		}

		formData.append('author_id', values.author_id)
		formData.append('publisher_id', values.publisher_id)
		formData.append('title', values.title)
		formData.append('year_of_publishing', values.year_of_publishing)

		const requestOptions = {
			method: 'PUT',
			body: formData,
			redirect: 'follow'
		}

		fetch(`http://localhost:3000/api/books/${id}`, requestOptions)
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const props: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file)
			const newFileList = fileList.slice()
			newFileList.splice(index, 1)
			setFileList(newFileList)
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file])

			return false
		},
		fileList
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	useEffect(() => {
		getAllAuthors()
		getAllPublishers()
		getCurrentBookData()

		console.log(authors)
	}, [])

	useEffect(() => {
		formInstance.setFieldsValue(form)
	}, [form, formInstance])

	const getCurrentBookData = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch(`http://localhost:3000/api/books/${id}`, requestOptions)
			.then(async (response) => setForm(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const getAllAuthors = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/authors', requestOptions)
			.then(async (response) => setAuthors(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const getAllPublishers = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/publishers', requestOptions)
			.then(async (response) => setPublishers(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
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
					form={formInstance}
					initialValues={form}
					className={style.form}
				>
					<Form.Item<FieldType>
						label="Название произведения"
						name="title"
						rules={[{ required: true, message: 'Введите название произведения!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType> label="Автор" name="author_id" rules={[{ required: true, message: 'Введите автора!' }]}>
						{form && authors && (
							<Select
								showSearch
								placeholder="К примеру А. С. Пушкин"
								optionFilterProp="children"
								onChange={onChange}
								onSearch={onSearch}
								filterOption={filterOption}
								options={authors?.map((author) => ({
									value: author.author_id,
									label: author.name + ' ' + author.surname + ' ' + author.father_name
								}))}
							/>
						)}
					</Form.Item>

					<Form.Item<FieldType>
						label="Издательство"
						name="publisher_id"
						rules={[{ required: true, message: 'Укажите издательство!' }]}
					>
						{form && publishers && (
							<Select
								showSearch
								placeholder="К примеру Питер"
								optionFilterProp="children"
								onChange={onChange}
								onSearch={onSearch}
								filterOption={filterOption}
								options={publishers?.map((publisher) => ({
									value: publisher.id,
									label: publisher.name
								}))}
							/>
						)}
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
						rules={[{ required: false, message: 'Загрузите обложку книги!' }]}
					>
						<img style={{ width: 300, height: 450 }} src={`http://localhost:3000/uploads/${form?.cover}`} />
						<Upload {...props}>
							<Button icon={<UploadOutlined />}>Загрузить обложку</Button>
						</Upload>
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
