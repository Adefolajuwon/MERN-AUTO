import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/output.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import LogInRequired from "./components/LogInRequired";
import CheckLoggedIn from "./components/CheckLoggedIn";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/login" element={<CheckLoggedIn element={<Login />} />}></Route>
				<Route path="/register" element={<CheckLoggedIn element={<Register />} />}></Route>
				<Route path="/dashboard" element={<LogInRequired element={<Dashboard />} />}></Route>
			</Routes>
		</div>
	);
}

export default App;
