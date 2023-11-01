import { Layout, Button, theme, Card, Typography } from 'antd'
import { useTitle } from '../../../hooks'
import style from './style.module.scss'
import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ReadyMenu } from '../../../widgets'

export const Books = () => {
	const { Header, Sider, Content } = Layout
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	/**
	 * @todo переименовать заголовок в нормальный
	 */
	const { title } = useTitle('Список книг????')

	const { Title } = Typography

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
					<Title>Список книг</Title>
					<Card
						cover={
							<img src="https://www.onthebus.com.ua/wa-data/public/shop/products/79/63/6379/images/20421/20421.750x0.jpg" />
						}
						title="О Дивный новый мир"
						style={{ width: 300 }}
					>
						<p>Автор: Олдос Хаксли</p>
						<p>Жанр: Антиутопия</p>
						<p>Card content</p>
					</Card>
					<Title>История</Title>
					<Card
						cover={<img src="https://th.bing.com/th/id/OIP.T7sPgN_OXadgOumEkY2tgAHaLl?pid=ImgDet&rs=1" />}
						title="Посторонний"
						style={{ width: 300 }}
					>
						<p>Автор: Альбер Камю</p>
						<p>Жанр: Философия</p>
						<p>Card content</p>
					</Card>
					<Card
						cover={
							<img src="https://recommerce.gumlet.io/eksmo-ast.reshop.by/catalog/23912/1916043012608a9f69ebde7_original.jpg?enlarge=true&mode=fit&width=600&format=auto" />
						}
						title="1984"
						style={{ width: 300 }}
					>
						<p>Автор: Джорж Оруэлл</p>
						<p>Жанр: Антиутпия</p>
						<p>Card content</p>
					</Card>
					<Card
						cover={
							<img src="https://th.bing.com/th/id/R.076ff32d6b624124f294dd534bd51a17?rik=bP2gFR9dlGsyAg&pid=ImgRaw&r=0" />
						}
						title="1984"
						style={{ width: 300 }}
					>
						<p>Автор: Альбер Камю</p>
						<p>Жанр: Философия</p>
						<p>Card content</p>
					</Card>
				</Content>
			</Layout>
		</Layout>
	)
}
