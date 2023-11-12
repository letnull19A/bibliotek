import { Form, Input, Button, Layout, Flex, Select, Upload, UploadProps, UploadFile } from 'antd'
import style from './../../page.registration/style.module.scss'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { RcFile } from 'antd/es/upload/interface'

type FieldType = {
	title: string
	author: string
	description: string
	publisher: string
	year_of_publishing: number
	cover: string
}

type Author = {
	author_id: string
	name: string
	surname: string
	fatherName: string
}

type Publisher = {
	id: string
	name: string
}

export const AddBook = () => {
	const { Header, Content } = Layout
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const [publishers, setPublishers] = useState<Array<Publisher>>()
	const [authors, setAuthors] = useState<Array<Author>>()

	const onFinish = (values: any) => {
		console.log('Success:', values)

		console.log(fileList[0] as RcFile)

		const uploadCover = new FormData()
		uploadCover.append('file', fileList[0] as RcFile)

		const uploadrRequestOptions = {
			method: 'POST',
			body: uploadCover,
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/uploads/cover/cover', uploadrRequestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))

		const formData = new FormData()
		formData.append('cover', values.cover.file.name)
		formData.append('publisher_id', values.publisher)
		formData.append('title', values.title)
		formData.append('author_id', values.author)
		formData.append('year_of_publishing', values.year_of_publishing)

		const requestOptions = {
			method: 'POST',
			body: formData,
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/books', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	const filterOption = (input: string, option?: { label: string; value: string }) =>
		(option?.label ?? '').toLowerCase().includes(input.toLowerCase())

	const onSearch = (value: string) => {
		console.log('search:', value)
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

	useEffect(() => {
		getAllAuthors()
		getAllPublishers()
	}, [])

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
						name="title"
						rules={[{ required: true, message: 'Введите название произведения!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType> label="Автор" name="author" rules={[{ required: true, message: 'Введите автора!' }]}>
						<Select
							showSearch
							placeholder="К примеру А. С. Пушкин"
							optionFilterProp="children"
							onSearch={onSearch}
							filterOption={filterOption}
							options={authors?.map((author) => ({
								value: author.author_id,
								label: author.name
							}))}
						/>
					</Form.Item>

					<Form.Item<FieldType>
						label="Издательство"
						name="publisher"
						rules={[{ required: true, message: 'Укажите издательство!' }]}
					>
						<Select
							showSearch
							placeholder="К примеру Питер"
							optionFilterProp="children"
							onSearch={onSearch}
							filterOption={filterOption}
							options={publishers?.map((publisher) => ({
								value: publisher.id,
								label: publisher.name
							}))}
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
						rules={[{ required: false, message: 'Загрузите обложку книги!' }]}
					>
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
