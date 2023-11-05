import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import style from './App.module.scss'
import { AddBook, Books, Login, Registration } from '../../pages'
import { Account } from '../../pages/client/page.account'

export const App = () => {
	const router = createBrowserRouter([
		{
			path: '/main',
			element: <>Титульная страница</>
		},
		{
			path: '/',
			element: <>Титульная страница</>
		},
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/account',
			element: <Account />
		},
		{
			path: '/books',
			element: <Books />
		},
		{
			path: '/books/add',
			element: <AddBook/>
		},
		{
			path: 'worker/users/add',
			element: <Registration />
		},
		{
			path: 'worker/books/add',
			element: <AddBook />
		}
	])

	return (
		<div className={style.app}>
			<RouterProvider router={router} />
		</div>
	)
}
