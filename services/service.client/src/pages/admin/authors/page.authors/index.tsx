import { Layout, Button, theme, Typography, Table, Flex, Modal, Form, InputNumber, Input, Select } from 'antd'
import { useTitle } from '../../../../hooks'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ReadyMenu } from '../../../../widgets'
import { SERVER_HOST } from '../../../../configs'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

type AuthorData = {
	author_id: string
	name: string
	surname: string
	father_name: string
	country: string
}

type Countries = {
	id: string
	title: string
}

export const Authors = () => {
	const { Header, Sider, Content } = Layout
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	const [authors, setAuthors] = useState<Array<AuthorData>>()
	const [countries, setCountries] = useState<Array<Countries>>()
	const { title } = useTitle('Список авторов')
	const { Title } = Typography
	const navigate = useNavigate()

	const columns: ColumnsType<AuthorData> = [
		{
			title: 'Имя',
			dataIndex: 'name'
		},
		{
			title: 'Фамилия',
			dataIndex: 'surname'
		},
		{
			title: 'Отчество',
			dataIndex: 'father_name'
		},
		{
			title: 'Страна',
			dataIndex: 'country',
			filters: [
				{
					text: 'только из России',
					value: 'Россия'
				},
				{
					text: 'только из Германии',
					value: 'Германия'
				},
				{
					text: 'только из США',
					value: 'США'
				},
				{
					text: 'только из Франции',
					value: 'Франция'
				},
				{
					text: 'только из Великобритании',
					value: 'Великобритания'
				}
			],
			filterMode: 'menu',
			filterSearch: true,
			onFilter: (value: string, record) => record.country.startsWith(value)
		},
		{
			title: 'Действия',
			key: 'delete',
			fixed: 'right',
			width: 250,
			render: (_, record: AuthorData) => (
				<Flex gap={10}>
					<Button onClick={() => warning(record)} type="primary" danger>
						Удалить
					</Button>
					<Button onClick={() => navigate(`edit/${record.author_id}`)} type="primary">
						Редактировать
					</Button>
				</Flex>
			)
		}
	]

	useEffect(() => {
		getAllAuthors()
		getCountries()
	}, [])

	const getCountries = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/countries`, requestOptions)
			.then(async (response) => setCountries(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const getAllAuthors = async () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		await fetch(`${SERVER_HOST}/authors`, requestOptions)
			.then(async (response) => setAuthors(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const handleDeleteAuthor = (record: AuthorData) => {
		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/authors/${record.author_id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const warning = (record: AuthorData) => {
		Modal.confirm({
			title: 'Удаление автора',
			content: `Вы действительно хотите удалить автора: ${record.name} ${record.surname} ${record.father_name}?`,
			cancelText: 'Отмена',
			okText: 'Да',
			onCancel: () => {},
			onOk: async () => {
				handleDeleteAuthor(record)
				await getAllAuthors()
			}
		})
	}

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
					<Flex align="center" style={{ height: '64px' }} gap={50}>
						<Title level={2} className={style.page_title}>
							Доступные авторы
						</Title>
						<Button
							shape="round"
							type="primary"
							style={{ height: '40px', width: '200px' }}
							onClick={() => navigate('add')}
						>
							Добавить
						</Button>
					</Flex>
					<Table dataSource={authors} columns={columns} />
				</Content>
			</Layout>
		</Layout>
	)
}
