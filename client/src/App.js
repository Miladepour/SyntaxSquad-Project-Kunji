import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/home/Home";
import UserPreferences from "./components/UserPreferences";

const App = () => (
	<div>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/UserPreferences" element={<UserPreferences />} />
			<Route path="/about/this/site" element={<About />} />

		</Routes>
	</div>
);

export default App;
