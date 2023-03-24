import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Admin() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return(
    <div>
      <Card className="mx-auto text-center" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Kunji Admin Panel</Card.Title>
          <Card.Text>
            {!isAuthenticated ? "Please login to access." : "You are logged in."}
          </Card.Text>
          {!isAuthenticated
            ? <Button variant="primary" onClick={() => loginWithRedirect()}>Login</Button>
            : <Button variant="danger" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
          }
        </Card.Body>
      </Card>
    </div>
  );
}