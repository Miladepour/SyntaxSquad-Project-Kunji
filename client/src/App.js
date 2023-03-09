import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Result from "./pages/result/Result";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/result" element={<Result />} />
	</Routes>
);

export default App;
