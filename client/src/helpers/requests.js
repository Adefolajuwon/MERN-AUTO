import axiosInstance from "../lib/axiosInstance";

export function httpValidateAuthToken() {}

export async function httpCreateUser(user) {
	try {
		let response = await axiosInstance({
			url: "/auth/local/register",
			method: "POST",
			data: user,
		});
		return response.data;
	} catch (e) {
		return e?.response?.data;
	}
}

export async function httpLoginUser(user) {
	try {
		let response = await axiosInstance({
			url: "/auth/local/login",
			method: "POST",
			data: user,
		});

		return response.data;
	} catch (e) {
		return e?.response?.data;
	}
}

export async function httpFetchUserWithToken() {
	try {
		let response = await axiosInstance({
			url: "/auth/verify",
			method: "GET",
		});

		return response.data;
	} catch (e) {
		return e?.response?.data;
	}
}
