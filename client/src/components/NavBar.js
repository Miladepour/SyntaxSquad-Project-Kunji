import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import logo from "../assest/kunji-logo2.svg";
import styles from "./NavBar.module.css";
function NavBar() {

  return (
    <Navbar  className={styles.navbar}bg="bg-transparent" expand="lg">
      <Container >
        <Navbar.Brand href="/">
          <Image src={logo} alt="Logo" height={70} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3" >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/userform">Go to Form</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <div>
          <button className={styles.button} >Call Help Line</button>
          </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;