import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { httpCreateUser } from "../helpers/requests";

const Register = () => {
	const [userData, setUserData] = useState({ provider: "local" });
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const { validations } = useAuthContext();
	const navigate = useNavigate();

	function handleChange(e) {
		setUserData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	}

	async function registerAccount(e) {
		e.preventDefault();
		// Validations here
		const { email, firstname, password, confirmpassword } = userData;
		if (!email || !password || !confirmpassword || !firstname) {
			setError("Please fill in all credentials");
			return;
		}
		if (!validations.validateEmail(email)) {
			setError("Please enter a valid email address");
			return;
		}
		if (!validations.validatePassword(password)) {
			setError("Password must contain at least eight characters, at least one number , both lower and uppercase letters and special characters");
			return;
		}
		if (password !== confirmpassword) {
			setError("Passwords do not match");
			return;
		}

		// store data
		let response = await httpCreateUser(userData);
		if (response?.error) {
			setError(response.error);
			return;
		}
		// Redirect
		navigate("/login");
	}
	return (
		<div className="w-full h-[100vh] flex justify-center items-center bg-slate-100 sm:bg-white">
			<div className="w-full sm:w-3/5  h-auto bg-slate-100 rounded-[5px] flex justify-start flex-col items-center py-6">
				<h3 className="text-medium text-xl mb-4">Register An Account</h3>
				<form action="" className="w-4/5 h-auto mt-2" onSubmit={registerAccount}>
					<article className="w-full grid xs:grid-cols-2 grid-cols-1 gap-[10px] mb-3">
						<div className="w-full">
							<label htmlFor="firstname" className="block text-[11px] mb-[2px] w-full">
								First name:
							</label>
							<input
								name="firstname"
								type="text"
								aria-label="First Name"
								id="firstname"
								className="w-full px-2 text-[13px]  focus:outline-0 py-1"
								placeholder="First Name"
								onChange={handleChange}
								onFocus={() => setError(null)}
								value={userData.firstname || ""}
							/>
						</div>
						<div className="w-full">
							<label htmlFor="email" className="block text-[11px] mb-[2px] w-full">
								Email:
							</label>

							<input
								name="email"
								type="text"
								aria-label="Email Address"
								id="email"
								className="w-full px-2 text-[13px]  focus:outline-0 py-1"
								placeholder="Email Address"
								onChange={handleChange}
								onFocus={() => setError(null)}
								value={userData.email || ""}
							/>
						</div>
						<div className="w-full">
							<label htmlFor="password" className="block text-[11px] mb-[2px] w-full">
								Password:
							</label>
							<input
								name="password"
								type="password"
								aria-label="First Name"
								id="password"
								className="w-full px-2 text-[13px] focus:outline-0 py-1"
								placeholder="********"
								onChange={handleChange}
								onFocus={() => setError(null)}
								value={userData.password || ""}
							/>
						</div>
						<div className="w-full">
							<label htmlFor="confirmpassword" className="block text-[11px] mb-[2px] w-full">
								Confirm Password:
							</label>
							<input
								name="confirmpassword"
								type="password"
								aria-label="First Name"
								id="confirmpassword"
								className="w-full px-2 text-[13px]  focus:outline-0 py-1"
								placeholder="********"
								onChange={handleChange}
								onFocus={() => setError(null)}
								value={userData.confirmpassword || ""}
							/>
						</div>
					</article>
					{error && <p className="text-red-500 text-center text-[12px] h-auto">{error}</p>}
					<button className="w-full h-10 text-[12px] bg-white text-black flex justify-center items-center rounded-[5px] my-3">Register</button>
				</form>

				<p>Or</p>
				<a href="https://localhost:8000/api/auth/google" className="w-3/5 h-10 text-[12px] bg-black text-white flex justify-center items-center rounded-[5px] mt-3">
					Sign Up With Google
				</a>

				<div className="h-auto mt-4 flex gap-3">
					<p className="text-[12px]">
						Already have an account?
						<Link to="/login" className="text-blue-400 ml-2 hover:underline hover:cursor-pointer">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
