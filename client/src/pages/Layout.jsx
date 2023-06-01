import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import NavBar from "../components/NavBar";

function Layout() {
  return (
    <>
    <NavBar />
 
    <Container fluid>
      <Outlet />
      </Container>
    </>
  );
}

export default Layout;
