import { Layout, Button, theme, Card, Typography } from 'antd'
import { useTitle } from '../../../hooks'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ReadyMenu } from '../../../widgets'

type Book = {
	id: string
	title: string
	cover: string
	genre: string
	publisher_name: string
	author_name: string
	author_surname: string
	author_father_name: string
	year_of_publishing: number
}

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

	const [books, setBooks] = useState<Array<Book>>()

	useEffect(() => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/books', requestOptions)
			.then(async (response) => setBooks(await response.json() as Array<Book>))
			.catch((error) => console.log('error', error))
	}, [])

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
					{books !== undefined && Array.isArray(books) && books.map((book) => (
						<Card
							cover={
								<img src={book.cover} />
							}
							title={book.title}
							style={{ width: 300 }}
						>
							<p>Автор: {`${book.author_name} ${book.author_father_name} ${book.author_surname}`}</p>
							<p>Жанр: {book.genre}</p>
							<p>Издание: {book.publisher_name}</p>
						</Card>
					))}
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
