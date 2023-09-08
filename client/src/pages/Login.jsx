import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { httpLoginUser } from '../helpers/requests';

const Login = () => {
	const [userData, setUserData] = useState({});
	const [error, setError] = useState(null);
	const { validations } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();
	let query = new URLSearchParams(location.search);
	let { token, success, message } = Object.fromEntries(query);

	function handleChange(e) {
		setUserData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	}

	useEffect(() => {
		if (success === 'true' && token) {
			localStorage.setItem('auth:token', token);
			// Redirect
			window.location.href = '/dashboard';
			// navigate("/dashboard");

			return;
		}
		if (success === 'false' && message) {
			navigate('/login');
		}
	}, [location]);

	async function logInAccount(e) {
		e.preventDefault();
		// Validations here
		const { email, password } = userData;
		if (!email || !password) {
			setError('Please fill in all credentials');
			return;
		}
		if (!validations.validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}
		if (!validations.validatePassword(password)) {
			setError(
				'Password must contain at least eight characters, at least one number , both lower and uppercase letters and special characters'
			);
			return;
		}
		// fetch data
		let response = await httpLoginUser(userData);

		if (response?.error) {
			setError(response.error);
			return;
		}
		localStorage.setItem('auth:token', response.token);
		// Redirect
		window.location.href = '/dashboard';
	}
	return (
		<div className='w-full h-[100vh] flex justify-center items-center bg-slate-100 sm:bg-white'>
			{!success && (
				<div className='w-full sm:w-2/5  h-auto bg-slate-100 rounded-[5px] flex justify-start flex-col items-center py-6'>
					<h3 className='text-medium text-xl mb-4'>Log into your Account</h3>
					<form action='' className='w-4/5 h-auto mt-2' onSubmit={logInAccount}>
						<article className='w-full flex flex-col  gap-[10px] mb-3'>
							<div className='w-full'>
								<label
									htmlFor='email'
									className='block text-[11px] mb-[2px] w-full'
								>
									Email:
								</label>
								<input
									name='email'
									type='text'
									aria-label='First Name'
									id='firstname'
									className='w-full px-2 text-[13px]  focus:outline-0 py-1'
									placeholder='Email address'
									onChange={handleChange}
									onFocus={() => setError(null)}
									value={userData.email || ''}
								/>
							</div>
							<div className='w-full'>
								<label
									htmlFor='password'
									className='block text-[11px] mb-[2px] w-full'
								>
									Enter your password:
								</label>
								<input
									name='password'
									type='password'
									aria-label='First Name'
									id='password'
									className='w-full px-2 text-[13px] focus:outline-0 py-1'
									placeholder='********'
									onChange={handleChange}
									onFocus={() => setError(null)}
									value={userData.password || ''}
								/>
							</div>
						</article>
						{error && (
							<p className='text-red-500 text-center text-[12px] h-auto'>
								{error}
							</p>
						)}
						<button className='w-full h-10 text-[12px] bg-white text-black flex justify-center items-center rounded-[5px] my-3'>
							Log In
						</button>
					</form>

					<p>Or</p>
					<a
						href='http://localhost:8000/api/auth/google'
						className='w-3/5 h-10 text-[12px] bg-black text-white flex justify-center items-center rounded-[5px] mt-3'
					>
						Sign In With Google
					</a>

					<div className='h-auto mt-4 flex gap-3'>
						<p className='text-[12px]'>
							Don't have an account?
							<Link
								to='/register'
								className='text-blue-400 ml-2 hover:underline hover:cursor-pointer'
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
