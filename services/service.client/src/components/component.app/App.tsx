import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import style from './App.module.scss'
import { Books, Login, Registration } from '../../pages'
import { Account } from '../../pages/page.account'

export const App = () => {

	const router = createBrowserRouter([
		{
			path: "/main",
			element: <>Титульная страница</>
		},
		{
			path: "/",
			element: <>Титульная страница</>
		},
		{
			path: "/login",
			element: <Login/>
		},
		{
			path: '/registration',
			element: <Registration/>
		},
		{
			path: '/account',
			element: <Account/>
		},
		{
			path: '/books',
			element: <Books/>
		}
	])

	return (
		<div className={style.app}>
			<RouterProvider router={router} />
		</div>
	)
}
