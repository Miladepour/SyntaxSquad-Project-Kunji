import { Route, Routes } from "react-router-dom";
import WrapperUser from "./components/wrappers/WrapperUser";
import Home from "./pages/home/Home";
import UserPreferences from "./pages/user-preferences/UserPreferences";
import Result from "./pages/result/Result";
import UserView from "./pages/admin/UserView";
import NGOs from "./pages/admin/NGOs";
import "bootstrap/dist/css/bootstrap.min.css";
import WrapperAdmin from "./components/wrappers/WrapperAdmin";
import Admin from "./pages/admin/Admin";

const App = () => (
	<div>
		<Routes>
			<Route path="/" element={<WrapperUser />}>
				<Route path="/" element={<Home />} />
				<Route path="/user-preferences" element={<UserPreferences />} />
				<Route path="/result" element={<Result />} />
			</Route>
			<Route path="/admin" element={<WrapperAdmin />}>
				<Route path="/admin" element={<Admin />} />
				<Route path="/admin/users" element={<UserView />} />
				<Route path="/admin/ngos" element={<NGOs />} />
			</Route>
		</Routes>
	</div>
);

export default App;
