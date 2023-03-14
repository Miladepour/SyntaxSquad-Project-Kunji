import { Route, Routes, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/home/Home";
import UserPreferences from "./pages/user-preferences/UserPreferences";
import Result from "./pages/result/Result";


const App = () => (
	<div>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/user-preferences" element={<UserPreferences />} />
			<Route path="/about/this/site" element={<About />} />
      <Route path="/result" element={<Result />} />
		</Routes>
	</div>
);

export default App;
