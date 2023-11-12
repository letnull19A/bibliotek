import { Layout, Button, Flex, Table, Modal, Typography, theme } from 'antd'
import { ReadyMenu } from '../../../../widgets'
import { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '../../../../hooks'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import style from './style.module.scss'

type GroupData = {
	id: string
	number: number
}

export const ViewGroups = () => {
	const { Header, Sider, Content } = Layout
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	const [groups, setGroups] = useState<Array<GroupData>>()
	const { title } = useTitle('Список авторов')
	const { Title } = Typography
	const navigate = useNavigate()

	const columns: ColumnsType<GroupData> = [
		{
			title: 'Группа',
			dataIndex: 'number'
		},
		{
			title: 'Действия',
			key: 'delete',
			fixed: 'right',
			width: 250,
			render: (_, record: GroupData) => (
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
		getAllGroups()
	}, [])

	const getAllGroups = async () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/groups', requestOptions)
			.then(async (response) => setGroups(await response.json()))
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const handleDeleteAuthor = (record: GroupData) => {
		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		}

		fetch(`http://localhost:3000/api/groups/${record.id}`, requestOptions)
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const warning = (record: GroupData) => {
		Modal.confirm({
			title: 'Удаление группы',
			content: `Вы действительно хотите удалить группу: ${record.number}?`,
			cancelText: 'Отмена',
			okText: 'Да',
			onCancel: () => {},
			onOk: async () => {
				handleDeleteAuthor(record)
				await getAllGroups()
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
					<Table dataSource={groups} columns={columns} />
				</Content>
			</Layout>
		</Layout>
	)
}
