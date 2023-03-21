import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Home.css";

export function Home() {


	return (
		<main role="main">
			<NavBar />
			{/* <!-- Hero Section --> */}
        <div className="jumbotron">
            <h1 className="display-4">Welcome to My Homepage</h1>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <hr className="my-4" />
            <a className="btn btn-primary btn-lg" href="http://localhost:3000/userForm" role="button">Go to Form</a>
        </div>
			<Footer />
		</main>
	);
}

export default Home;
