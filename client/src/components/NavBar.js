import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function NavBar() {
  function handleClick() {
    fetch("https://your-api/help-line")
      .then((response) => response.json())
      .then((data )=> {
        console.log(data); // do something with the data
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">KUNJI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Go to Form</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <div>
          <button onClick={handleClick}>Call Help Line</button>
          </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;