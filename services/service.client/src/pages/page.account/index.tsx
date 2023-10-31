import { useState } from 'react'
import style from './style.module.scss'
import { Layout, Button, theme, Card, Menu, Typography, Flex } from 'antd'
import { useTitle } from '../../hooks'
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const Account = () => {
	const { Header, Sider, Content } = Layout
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const { title } = useTitle('Аккаунт')

	const navigate = useNavigate()

	const { Title } = Typography

	const navigateTo = (e: any) => {
		navigate(`/${e.key}`)
	}

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="demo-logo-vertical" />
				<Menu
					onClick={(e) => navigateTo(e)}
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '/main',
							icon: <UserOutlined />,
							label: 'Главная'
						},
						{
							key: 'books',
							icon: <VideoCameraOutlined />,
							label: 'Книги'
						},
						{
							key: 'account',
							icon: <UploadOutlined />,
							label: 'Аккаунт'
						}
					]}
				/>
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
					<Title>Список используемых книг</Title>
					<Flex className={style.big_cards_block} wrap="wrap">
						<Card
							className={style.big_cards_block_content}
							cover={
								<img src="https://www.onthebus.com.ua/wa-data/public/shop/products/79/63/6379/images/20421/20421.750x0.jpg" />
							}
							title="О Дивный новый мир"
						>
							<p>Автор: Олдос Хаксли</p>
							<p>Жанр: Антиутопия</p>
						</Card>
						<Card
							className={style.big_cards_block_content}
							cover={<img src="https://i.pinimg.com/originals/7d/81/5d/7d815d2e8cd057cc3808390d86954c58.jpg" />}
							title="Бойцовский клуб"
						>
							<p>Автор: Чак Паланик</p>
							<p>Жанр: Философия</p>
						</Card>
						<Card
							className={style.big_cards_block_content}
							cover={<img src="https://i.pinimg.com/originals/7d/81/5d/7d815d2e8cd057cc3808390d86954c58.jpg" />}
							title="Бойцовский клуб"
						>
							<p>Автор: Чак Паланик</p>
							<p>Жанр: Философия</p>
						</Card>
						<Card
							className={style.big_cards_block_content}
							cover={<img src="https://i.pinimg.com/originals/7d/81/5d/7d815d2e8cd057cc3808390d86954c58.jpg" />}
							title="Бойцовский клуб"
						>
							<p>Автор: Чак Паланик</p>
							<p>Жанр: Философия</p>
						</Card>
					</Flex>
					<Title>История</Title>
					<Flex className={style.big_cards_block} wrap="wrap">
						<Card
							className={style.big_cards_block_content}
							cover={<img src="https://th.bing.com/th/id/OIP.T7sPgN_OXadgOumEkY2tgAHaLl?pid=ImgDet&rs=1" />}
							title="Посторонний"
						>
							<p>Автор: Альбер Камю</p>
							<p>Жанр: Философия</p>
						</Card>
						<Card
							className={style.big_cards_block_content}
							cover={
								<img src="https://recommerce.gumlet.io/eksmo-ast.reshop.by/catalog/23912/1916043012608a9f69ebde7_original.jpg?enlarge=true&mode=fit&width=600&format=auto" />
							}
							title="1984"
						>
							<p>Автор: Джорж Оруэлл</p>
							<p>Жанр: Антиутпия</p>
						</Card>
						<Card
							className={style.big_cards_block_content}
							cover={
								<img src="https://th.bing.com/th/id/R.076ff32d6b624124f294dd534bd51a17?rik=bP2gFR9dlGsyAg&pid=ImgRaw&r=0" />
							}
							title="1984"
						>
							<p>Автор: Альбер Камю</p>
							<p>Жанр: Философия</p>
						</Card>
						<Card
							className={style.big_cards_block_content}
							cover={
								<img src="https://th.bing.com/th/id/R.076ff32d6b624124f294dd534bd51a17?rik=bP2gFR9dlGsyAg&pid=ImgRaw&r=0" />
							}
							title="1984"
						>
							<p>Автор: Альбер Камю</p>
							<p>Жанр: Философия</p>
						</Card>
					</Flex>
					<Button type="primary" shape="round">
						Загрузить ещё
					</Button>
				</Content>
			</Layout>
		</Layout>
	)
}
