import { useState } from 'react'
import style from './style.module.scss'
import { Layout, Button, theme, Card, Typography, Flex } from 'antd'
import { useTitle } from '../../../hooks'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ReadyMenu } from '../../../widgets'

export const Account = () => {
	const { Header, Sider, Content } = Layout
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const { title } = useTitle('Аккаунт')

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
							<p>Срок сдачи: 17.11.2023</p>
						</Card>
						<Card
							className={style.big_cards_block_content}
							cover={<img src="https://i.pinimg.com/originals/7d/81/5d/7d815d2e8cd057cc3808390d86954c58.jpg" />}
							title="Бойцовский клуб"
						>
							<p>Автор: Чак Паланик</p>
							<p>Жанр: Философия</p>
							<p>Срок сдачи: 04.11.2023</p>
						</Card>
					</Flex>
					<Title>История</Title>
					<Flex className={style.mini_cards_block} wrap="wrap">
						<Card
							className={style.mini_cards_block_content}
							cover={<img src="https://th.bing.com/th/id/OIP.T7sPgN_OXadgOumEkY2tgAHaLl?pid=ImgDet&rs=1" />}
							title="Посторонний"
						>
							<p>Автор: Альбер Камю</p>
							<p>Жанр: Философия</p>
						</Card>
						<Card
							className={style.mini_cards_block_content}
							cover={
								<img src="https://recommerce.gumlet.io/eksmo-ast.reshop.by/catalog/23912/1916043012608a9f69ebde7_original.jpg?enlarge=true&mode=fit&width=600&format=auto" />
							}
							title="1984"
						>
							<p>Автор: Джорж Оруэлл</p>
							<p>Жанр: Антиутпия</p>
						</Card>
						<Card
							className={style.mini_cards_block_content}
							cover={
								<img src="https://th.bing.com/th/id/R.076ff32d6b624124f294dd534bd51a17?rik=bP2gFR9dlGsyAg&pid=ImgRaw&r=0" />
							}
							title="Чума"
						>
							<p>Автор: Альбер Камю</p>
							<p>Жанр: Философия</p>
						</Card>
						<Card
							className={style.mini_cards_block_content}
							cover={<img src="https://fantlab.ru/images/editions/big/182913" />}
							title="451° по Фаренгейту"
						>
							<p>Автор: Рей Бредбери</p>
							<p>Жанр: Антиутопия</p>
						</Card>
						<Card
							className={style.mini_cards_block_content}
							cover={
								<img src="https://img3.labirint.ru/rc/5ca7c43d4b20edf1c15513cdc60ab50b/363x561q80/books51/505293/cover.jpg?1612693693" />
							}
							title="Остров"
						>
							<p>Автор: Олдос Хаксли</p>
							<p>Жанр: Антиутопия</p>
						</Card>
					</Flex>
					<Flex justify="center" style={{ marginTop: 20 }}>
						<Button style={{ width: '300px', height: '48px' }} type="primary" shape="round">
							Загрузить ещё
						</Button>
					</Flex>
				</Content>
			</Layout>
		</Layout>
	)
}
