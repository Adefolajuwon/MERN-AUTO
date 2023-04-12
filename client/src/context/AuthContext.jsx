import { useContext, createContext, useMemo, useState, useEffect } from "react";
import Validations from "../helpers/validations";
import { useLocation, useNavigate } from "react-router-dom";
import { httpFetchUserWithToken } from "../helpers/requests";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const validations = useMemo(() => {
		return new Validations();
	}, []);

	useEffect(() => {
		// Fetch user data on startup
		let token = localStorage.getItem("auth:token");

		token &&
			(async function () {
				let response = await httpFetchUserWithToken();
				setLoading(false);
				if (response?.error) {
					localStorage.removeItem("auth:token");
					return;
				}
				setUserData(response);
			})();

		!token && setLoading(false);
	}, []);

	return <AuthContext.Provider value={{ validations, userData, setUserData, loading }}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
	return useContext(AuthContext);
}

export default AuthProvider;
