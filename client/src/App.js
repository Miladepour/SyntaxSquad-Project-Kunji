import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import UserPreferences from "./pages/user-preferences/UserPreferences";
import Result from "./pages/result/Result";
import UserView from "./pages/admin/UserView";
import NGOs from "./pages/admin/NGOs";
import UserForm from "./components/UserForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
const App = () => (
	<div className="app">
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/user-preferences" element={<UserPreferences />} />
			<Route path="/userform" element={<UserForm />} />
            <Route path="/result" element={<Result />} />
            <Route path="/admin/user-view" element={<UserView />} />
            <Route path="/admin/ngos" element={<NGOs />} />
		</Routes>
	</div>
);

export default App;
