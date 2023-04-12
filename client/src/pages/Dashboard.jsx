import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPictureOfTheDay } from '../helpers/nasa';
import loading from '../assets/index.mjs';
const Dashboard = () => {
	const { userData, setUserData } = useAuthContext();
	const [pictureOfTheDay, setPictureOfTheDay] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPictureOfTheDay = async () => {
			const data = await getPictureOfTheDay();
			setPictureOfTheDay(data);
			setTimeout(() => {
				setIsLoading(false);
			}, 1000); // set a 3 second delay
		};
		fetchPictureOfTheDay();
	}, []);
	const navigate = useNavigate();

	function signOut() {
		localStorage.removeItem('auth:token');
		setUserData({});
		navigate('/');
	}
	return (
		<main className='w-full h-[100vh] bg-white  '>
			<header className='w-full h-12 bg-white px-2 sm:px-12 flex items-center border-b-[2px] border-red-400 justify-between '>
				<p className='uppercase font-bold tracking-[12px]'>
					{userData.firstname}
				</p>
				<button
					onClick={signOut}
					className='bg-black text-white px-5 rounded-[5px] text-sm py-[6px]'
				>
					Sign Out
				</button>
			</header>
			<div className=' px-2 sm:px-12 mt-12'>
				<h3>Hello, {userData.firstname} </h3>
				<p>Your picture for today is below</p>
			</div>

			{isLoading ? (
				<div className='w-2/5    h-44  ml-28 md:ml-96 pt-16'>
					<img src={loading} className='  h-20' />
				</div>
			) : pictureOfTheDay ? (
				<div className='md:w-2/5    w-4/5    ml-12 md:ml-96 pt-16'>
					<h1>{pictureOfTheDay.title}</h1>
					<img src={pictureOfTheDay.url} alt={pictureOfTheDay.title} />
				</div>
			) : (
				<div className='w-2/5 ml-96 pt-16'>
					<h1>Failed to load the picture of the day</h1>
				</div>
			)}
		</main>
	);
};

export default Dashboard;
