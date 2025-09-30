import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "./Authenticator/AuthContext";

export function Menu() {
    const { user, logout } = useContext(AuthContext);

    if (!user)
        return null;

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/inicio">Estudo de React</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/inicio">Inicio</Nav.Link>
                        <NavDropdown title="Livro" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/livro">Listagem</NavDropdown.Item>
                            <NavDropdown.Item href="/venda">Venda</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        <NavDropdown title={user.ds_nome} id="basic-nav-dropdown-autenticacao">
                            <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
