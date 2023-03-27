import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import logo from "../assest/kunji-logo2.svg";
import styles from "./NavBar.module.css";
function NavBar() {

  return (
    <>
    <Navbar className={styles.navbarHero} expand="lg">
      <Container >
        <Navbar.Brand href="/">
          <Image src={logo} alt="Logo" height={70} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3" >
            <Nav.Link href="/" className={styles.navbarLink}>Home</Nav.Link>
            <Nav.Link href="/userform" className={styles.navbarLink}>Get help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <div>
          <button className={styles.buttonHelp} >Call Helpline</button>
          </div>
      </Container>
    </Navbar>
    <h5 className={styles.helpline}>
  Help line (<a href="tel:18003134963" className={styles.helplineLink}>toll-free 1800-313-4963</a>)
</h5>

    </>
  );
}

export default NavBar;