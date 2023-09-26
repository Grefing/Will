import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "/styles/menu.css";
import {AiOutlineClockCircle, AiOutlineHeart} from "react-icons/ai"
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../helpers/queriesBack";

const Menu = ({ usuarioLogueado, setUsuarioLogueado, render }) => {
  const [usuario, setUsuario] = useState({})
  const navegacion = useNavigate();

  const logOut = () => {
    localStorage.removeItem("usuario");
    setUsuarioLogueado({});
    navegacion("/login");
  };

  useEffect(() => {
    if (usuarioLogueado.id) {
      obtenerUsuario(usuarioLogueado.id).then((res) => {
        setUsuario(res);
      });
    } else {
      setUsuario({});
    }
  }, [usuarioLogueado, render])
  
  return (
    <>
      <Navbar variant="dark" expand="lg" className="navBar">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <img src="/src/assets/logo.png" className="logo" alt="" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navContainer">
              <NavLink end className={"nav-item nav-link"} to={"/"}>
                Inicio
              </NavLink>

              {!usuarioLogueado.nombreUsuario ? (
                <>
                  <NavLink end className={"nav-item nav-link"} to={"/registro"}>
                    Registro
                  </NavLink>
                  <NavLink end className={"nav-item nav-link"} to={"/login"}>
                    Login
                  </NavLink>{" "}
                </>
              ) : (
                <>
                <NavLink to={"/user/favoritos"} className={"nav-item nav-link"}><AiOutlineHeart></AiOutlineHeart></NavLink>
                <NavLink to={"/user/seeLater"} className={"nav-item nav-link"}><AiOutlineClockCircle className="seeLaterIcon"></AiOutlineClockCircle></NavLink>
                <Button onClick={logOut} className="btnLogOut">
                  Logout
                </Button>
                <NavLink to={'/user/perfil'} className={'perfilImg'}> 
                  <img src={usuario.fotoPerfil} className="linkPerfil img-fluid" alt="imgUsuario" />
                </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
