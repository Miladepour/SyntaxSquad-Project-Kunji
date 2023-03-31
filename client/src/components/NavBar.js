import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import logo from "../assets/kunji-w-logo.svg";
import styles from "./NavBar.module.css";
import mobileMenuIcon from "../assets/menu-icon.svg";
import { PersonGear } from "react-bootstrap-icons";

function NavBar() {
	return (
		<>
			<Navbar className={styles.navbarHero} expand="lg">
				<Container>
					<Navbar.Brand href="/">
						<Image src={logo} alt="Logo" height={70} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
						<Image src={mobileMenuIcon} alt="Mobile Menu Icon" height={25} />
					</Navbar.Toggle>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link href="/" className={styles.navbarLink}>
								Home
							</Nav.Link>
							<Nav.Link href="/userform" className={styles.navbarLink}>
								Get help
							</Nav.Link>
							<Nav.Link href="/about-kunji" className={styles.navbarLink}>
								About Kunji
							</Nav.Link>
							<Nav.Link href="#" className={styles.navbarLink}>
								Success Stories
							</Nav.Link>
							<Nav.Link href="#" className={styles.navbarLink}>
								Impact
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<div className="d-none d-md-block">
						<button className={styles.buttonHelp}>
							<a
								href="tel:18003134963"
								className="text-decoration-none text-white"
							>
								Call Helpline
							</a>
						</button>
						<a href="/admin" className="ms-3">
						<PersonGear size={32} color="white" />
						</a>
					</div>
				</Container>
			</Navbar>
			<h5 className={styles.helpline}>
				Help line (
				<a href="tel:18003134963" className={styles.helplineLink}>
					toll-free 1800-313-4963
				</a>
				)
			</h5>
		</>
	);
}

export default NavBar;
