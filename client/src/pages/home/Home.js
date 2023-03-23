import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Home.css";
import Hero from "../../components/Hero";

export function Home() {


	return (
		<main role="main">
			<NavBar />
            <Hero />
			<Footer />
		</main>
	);
}

export default Home;
