import { Link, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";


export default function WrapperAdmin() {
  const { isLoading, error, isAuthenticated, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div>
      <Navbar className="mb-3" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin/users" >Users</Nav.Link>
              <Nav.Link as={Link} to="/admin/ngos" >NGOs</Nav.Link>
              {isAuthenticated && <Button variant="light" size="sm" onClick={() => logout({ returnTo: window.location.origin + "/admin" })}>Logout</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}