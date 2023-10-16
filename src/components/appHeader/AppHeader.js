import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <Navbar
      expand="xxl"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      style={{ height: "100px" }}
    >
      <Container>
        <img
          src="https://i.ibb.co.com/Tr42KQq/jksenby.png"
          alt="logo"
          style={{ width: "90px", marginRight: "10px" }}
        />
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
        <Link to="/basket" style={{ textDecoration: "none" }}>
          <Navbar.Brand>Basket</Navbar.Brand>
        </Link>
        <Link to="/shops" style={{ textDecoration: "none" }}>
          <Navbar.Brand>Shops</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item>
                {" "}
                <Link
                  to="/basket/category/men's%20clothing"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Man's closing{" "}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                {" "}
                <Link
                  to="/basket/category/women's%20clothing"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Woman's closing{" "}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/basket/category/jewelery"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Jewelery{" "}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/basket/category/electronics"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Electronics{" "}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
