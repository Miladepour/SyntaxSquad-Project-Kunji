import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import UserPreferences from "./pages/user-preferences/UserPreferences";
import Result from "./pages/result/Result";
import UserView from "./pages/admin/UserView";
import NGOs from "./pages/admin/NGOs";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
	<div>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/user-preferences" element={<UserPreferences />} />
      <Route path="/result" element={<Result />} />
      <Route path="/admin/user-view" element={<UserView />} />
      <Route path="/admin/ngos" element={<NGOs />} />
      <Route path="/admin/user" element={<UserView />} />
		</Routes>
	</div>
);

export default App;
