import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import style from './App.module.scss'
import {
	AddAuthors,
	AddBook,
	AddPublisher,
	Authors,
	Books,
	EditAuthor,
	EditBook,
	EditGroup,
	EditPublisher,
	Login,
	Registration,
	ViewGroups,
	ViewPublishers,
	ViewUsers
} from '../../pages'
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
			element: <AddBook />
		},
		{
			path: '/users',
			element: <ViewUsers />
		},
		{
			path: '/users/add',
			element: <Registration />
		},
		{
			path: '/books/add',
			element: <AddBook />
		},
		{
			path: '/books/edit/:id',
			element: <EditBook />
		},
		{
			path: 'authors',
			children: [
				{
					path: '',
					element: <Authors />
				},
				{
					path: 'add',
					element: <AddAuthors />
				},
				{
					path: 'edit/:id',
					element: <EditAuthor />
				}
			]
		},
		{
			path: '/publishers',
			children: [
				{
					path: '',
					element: <ViewPublishers />
				},
				{
					path: 'add',
					element: <AddPublisher />
				},
				{
					path: 'edit/:id',
					element: <EditPublisher />
				}
			]
		},
		{
			path: '/groups',
			children: [
				{
					path: '',
					element: <ViewGroups />
				},
				{
					path: 'edit/:id',
					element: <EditGroup />
				}
			]
		}
	])

	return (
		<div className={style.app}>
			<RouterProvider router={router} />
		</div>
	)
}
