import axios from "axios";
const axiosInstance = axios.create({
	baseURL: "https://localhost:8000/api",
});

let token = localStorage.getItem("auth:token");
if (token) {
	axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Always check that there is a token or not before sending the request
// Also modifies the headers if necessary
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("auth:token");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	} else {
		delete config.headers["Authorization"];
	}
	return config;
});

export default axiosInstance;
