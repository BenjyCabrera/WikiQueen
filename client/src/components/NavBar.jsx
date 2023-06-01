import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../context/auth";

import { NavLink } from "react-router-dom";

function NavBar() {
  const [user] = useAuth();
  console.log(user);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand as={NavLink} to="/">
          WikiQueen
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.isAdmin && (
              <Nav.Link as={NavLink} to="/news/create">
                Crear noticias
              </Nav.Link>
            )}

            {user.isAuth ? (
              <Nav.Link as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}

            <Nav.Link as={NavLink} to="/news">
              News
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
