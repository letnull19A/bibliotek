import { Layout, Button, theme, Typography, Table, Flex, Modal, Form, InputNumber, Input, Select } from 'antd'
import { useTitle } from '../../../../hooks'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ReadyMenu } from '../../../../widgets'
import { SERVER_HOST } from '../../../../configs'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

type UserData = {
	id: string
	name: string
	surname: string
	father_name: string
	role: string
	number: number
}

export const ViewUsers = () => {
	const { Header, Sider, Content } = Layout
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	const [users, setUsers] = useState<Array<UserData>>()
	const { title } = useTitle('Список пользователей')
	const { Title } = Typography
	const navigate = useNavigate()

	const columns: ColumnsType<UserData> = [
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
			title: 'Роль',
			dataIndex: 'role'
		},
		{
			title: 'Группа',
			dataIndex: 'number'
		},
		{
			title: 'Действия',
			key: 'delete',
			fixed: 'right',
			width: 250,
			render: (_, record: UserData) => (
				<Flex gap={10}>
					<Button onClick={() => warning(record)} type="primary" danger>
						Удалить
					</Button>
					<Button onClick={() => navigate(`edit/${record.id}`)} type="primary">
						Редактировать
					</Button>
				</Flex>
			)
		}
	]

	useEffect(() => {
		getAllUsers()
	}, [])

	const getAllUsers = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/users`, requestOptions)
			.then(async (response) => setUsers(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const handleDeleteUser = (record: UserData) => {
		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		}

		fetch(`${SERVER_HOST}/authors/${record.id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const warning = (record: UserData) => {
		Modal.confirm({
			title: 'Удаление автора',
			content: `Вы действительно хотите удалить автора: ${record.name} ${record.surname} ${record.father_name}?`,
			cancelText: 'Отмена',
			okText: 'Да',
			onCancel: () => {},
			onOk: async () => {
				handleDeleteUser(record)
				await getAllUsers()
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
							Доступные пользователи
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
					<Table dataSource={users} columns={columns} />
				</Content>
			</Layout>
		</Layout>
	)
}
