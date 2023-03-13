import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/home/Home";
import UserPreferences from "./pages/user-preferences/UserPreferences";
import NGOs from "./pages/admin/NGOs";

const App = () => (
	<div>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/UserPreferences" element={<UserPreferences />} />
			<Route path="/admin/ngos" element={<NGOs />} />
		</Routes>
	</div>
);

export default App;
