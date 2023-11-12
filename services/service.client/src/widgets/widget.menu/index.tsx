import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UploadOutlined, UserOutlined, BookOutlined } from '@ant-design/icons'

export const ReadyMenu = () => {
	const navigate = useNavigate()

	const navigateTo = (e: any) => {
		navigate(`/${e.key}`)
	}

	return (
		<Menu
			onClick={(e) => navigateTo(e)}
			theme="dark"
			style={{ position: 'fixed', width: '200px' }}
			mode="inline"
			items={[
				{
					key: 'account',
					icon: <UserOutlined />,
					label: 'Аккаунт'
				},
				{
					key: '/main',
					icon: <UploadOutlined />,
					label: 'Главная'
				},
				{
					key: 'books',
					icon: <BookOutlined />,
					label: 'Книги'
				},
				{
					key: 'authors',
					icon: <BookOutlined />,
					label: 'Авторы'
				},
				{
					key: 'publishers',
					icon: <BookOutlined />,
					label: 'Издательства'
				},
				{
					key: 'users',
					icon: <BookOutlined />,
					label: 'Пользователи'
				},
				{
					key: 'groups',
					icon: <BookOutlined />,
					label: 'Группы'
				}
			]}
		/>
	)
}
