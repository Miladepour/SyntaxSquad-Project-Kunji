import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import logo from "../assets/kunji-w-logo.svg";
import styles from "./NavBar.module.css";
import mobileMenuIcon from "../assets/menu-icon.svg";
import { useTranslation } from 'react-i18next';
import { PersonGear } from "react-bootstrap-icons";

function NavBar() {
	const { t } = useTranslation();

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
								{t("userNav.linkHome")}
							</Nav.Link>
							<Nav.Link href="/userform" className={styles.navbarLink}>
								{t("userNav.linkGetHelp")}
							</Nav.Link>
							<Nav.Link href="/about-kunji" className={styles.navbarLink}>
								{t("userNav.linkAbout")}
							</Nav.Link>
							<Nav.Link href="#" className={styles.navbarLink}>
								{t("userNav.linkSuccessStories")}
							</Nav.Link>
							<Nav.Link href="#" className={styles.navbarLink}>
								{t("userNav.linkImpact")}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<div className="d-none d-md-block">
						<button className={styles.buttonHelp}>
							<a
								href="tel:18003134963"
								className="text-decoration-none text-white"
							>
								{t("userNav.linkCallHelpline")}
							</a>
						</button>
						<a href="/admin" className="ms-3">
						<PersonGear size={32} color="white" />
						</a>
					</div>
				</Container>
			</Navbar>
			<h5 className={styles.helpline}>

				{t("userNav.helpline.text")} (
				<a href="tel:18003134963" className={styles.helplineLink}>
					{t("userNav.helpline.link")}
				</a>
				)
			</h5>
		</>
	);
}

export default NavBar;
