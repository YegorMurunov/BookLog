import { lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';
import { useLocation } from 'react-router';

// import Dashboard from './components/pages/dashboard/Dashboard';
// import Books from './components/pages/books/Books';
import Layout from './components/ui/Layout/Layout';
import AuthGuard from './hoc/AuthGuard';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import Account from './pages/account/Account';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/Sign-Up/SignUp';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Books = lazy(() => import('./pages/books/Books'));

function App() {
	const location = useLocation();
	const { isOpen } = useTypedSelector(state => state.modal);
	const { closeModal } = useActions();

	useEffect(() => {
		if (isOpen && location.pathname !== '/books') {
			closeModal();
		}
	}, [location]);

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
					<Route path='dashboard' index element={<Dashboard />} />
					{/* Books page */}
					<Route path='books' index element={<Books />} />
					{/* Goals page */}
					<Route
						path='goals'
						index
						element={<Navigate to='/dashboard' replace />}
					/>
					{/* Account page */}
					<Route path='account' index element={<Account />} />
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
