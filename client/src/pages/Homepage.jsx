import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Homepage = () => {
	const { loading, userData } = useAuthContext();
	return (
		<div className="w-full h-[100vh] flex justify-center items-center bg-slate-100 sm:bg-white">
			<div className="w-full sm:w-3/5 lg:w-2/5 h-auto bg-slate-100 rounded-[5px] flex justify-start flex-col items-center py-12">
				<h3 className="text-medium text-xl mb-3">Welcome to NASA Picture Hub</h3>
				<p className="text-center text-sm w-4/5 ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ipsa neque earum minus laborum mollitia officiis quam amet rem veniam?</p>
				<>
					<div className="h-auto flex gap-3 flex-col items-center justify-center  sm:flex-row w-3/5 sm:w-full mt-10">
						{!loading && (
							<>
								{!userData.firstname && (
									<>
										<Link to="/register" className="bg-red-400 w-full sm:w-2/5 md:w-1/5 rounded-[5px] px-4 py-2 flex items-center justify-center">
											Register
										</Link>
										<Link to="/login" className="border-red-400 w-full sm:w-2/5 md:w-1/5 border-[1px] rounded-[5px] px-4 py-2 flex items-center justify-center">
											{" "}
											Login
										</Link>
									</>
								)}
								{userData.firstname && (
									<Link to="/dashboard" className="bg-red-400 rounded-[5px] px-4 py-2">
										Go to Dashboard
									</Link>
								)}
							</>
						)}
					</div>
					{/* {userData && <>} */}
				</>
			</div>
		</div>
	);
};

export default Homepage;
