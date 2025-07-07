import { lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';

// import Dashboard from './components/pages/dashboard/Dashboard';
// import Books from './components/pages/books/Books';
import Layout from './components/ui/Layout/Layout';
import AuthGuard from './hoc/AuthGuard';
import useWindowDimensions from './hooks/useWindowDimensions';
import Account from './pages/account/Account';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/Sign-Up/SignUp';
import Goals from './pages/goals/Goals';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Books = lazy(() => import('./pages/books/Books'));

function App() {
	const { height } = useWindowDimensions();

	useEffect(() => {
		document.documentElement.style.setProperty('--app-height', `${height}px`);
	}, [height]);

	return (
		<>
			<Toaster position='top-center' />
			<Routes>
				{/* index page - in future preview landing page */}
				<Route
					index
					element={
						<AuthGuard redirectTo='/login'>
							<Navigate to='/dashboard' replace />
						</AuthGuard>
					}
				/>

				<Route
					path='/'
					element={
						<AuthGuard redirectTo='/login'>
							<Layout />
						</AuthGuard>
					}
				>
					{/* Dashboard page */}
					<Route path='dashboard' element={<Dashboard />} />
					{/* Books page */}
					<Route path='books' element={<Books />} />
					{/* Goals page */}
					<Route path='goals' element={<Goals />} />
					{/* Account page */}
					<Route path='account' element={<Account />} />
				</Route>

				{/* Login page */}
				<Route
					path='/login'
					element={
						<AuthGuard isProtected={false} redirectTo='/dashboard'>
							<Login />
						</AuthGuard>
					}
				/>
				{/* Register page */}
				<Route
					path='/sign-up'
					element={
						<AuthGuard isProtected={false} redirectTo='/dashboard'>
							<SignUp />
						</AuthGuard>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
