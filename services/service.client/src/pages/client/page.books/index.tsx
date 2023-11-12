import { Layout, Button, theme, Card, Typography, Flex, Input } from 'antd'
import { useTitle } from '../../../hooks'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ReadyMenu } from '../../../widgets'
import { useNavigate } from 'react-router-dom'
import type { SearchProps } from '../Search'

type Book = {
	book_id: string
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

	const navigate = useNavigate()

	/**
	 * @todo переименовать заголовок в нормальный
	 */
	const { title } = useTitle('Список книг????')

	const { Title } = Typography
	const { Search } = Input

	const [books, setBooks] = useState<Array<Book>>()

	useEffect(() => {
		getAllBooks()
	}, [])

	const getAllBooks = () => {
		const requestOptions = {
			method: 'GET',
			redirect: 'follow'
		}

		fetch('http://localhost:3000/api/books', requestOptions)
			.then(async (response) => setBooks((await response.json()) as Array<Book>))
			.catch((error) => console.log('error', error))
	}

	const handleDelete = async (book: Book) => {
		const requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		}

		await fetch(`http://localhost:3000/api/books/${book.book_id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error))
	}

	const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

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
							Список книг
						</Title>
						<Button
							shape="round"
							type="primary"
							style={{ height: '40px', width: '200px' }}
							onClick={() => navigate('add')}
						>
							Добавить
						</Button>
						<Search
							placeholder="Название произведения или автор"
							size="large"
							allowClear
							onSearch={onSearch}
							style={{ width: 450 }}
						/>
					</Flex>
					<Flex gap={20} wrap="wrap">
						{books !== undefined &&
							Array.isArray(books) &&
							books.map((book) => (
								<Card
									cover={
										<img style={{ width: 300, height: 450 }} src={`http://localhost:3000/uploads/${book.cover}`} />
									}
									title={book.title}
									style={{ width: 300 }}
								>
									<p>Автор: {`${book.author_name} ${book.author_father_name} ${book.author_surname}`}</p>
									<p>Жанр: {book.genre}</p>
									<p>Издание: {book.publisher_name}</p>
									<Button
										onClick={async () => {
											await handleDelete(book)
											getAllBooks()
										}}
										style={{ width: '100%', marginTop: '10px' }}
										type="primary"
										danger
									>
										Удалить
									</Button>
									<Button
										onClick={() => {
											navigate(`edit/${book.book_id}`)
										}}
										style={{ width: '100%', marginTop: '10px' }}
										type="primary"
									>
										Редактировать
									</Button>
								</Card>
							))}
					</Flex>
					{false && (
						<>
							<Title>История</Title>
							<Flex gap={20}>
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
							</Flex>
						</>
					)}
				</Content>
			</Layout>
		</Layout>
	)
}
