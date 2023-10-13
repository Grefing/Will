import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "/styles/menu.css";
import { AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../helpers/queriesBack";


const Menu = ({ usuarioLogueado, setUsuarioLogueado, render, theme,  setTheme }) => {
  const [usuario, setUsuario] = useState({});
  const navegacion = useNavigate();
  const [expanded, setExpanded] = useState(false);

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
  }, [usuarioLogueado, render]);

  return (
    <>
      <Navbar expanded={expanded} variant="dark" expand="lg" className="navBar">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            {/* <img src="/src/assets/logo.png" className="logo" alt="" /> */}
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={
              expanded ? () => setExpanded(false) : () => setExpanded(true)
            }
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navContainer">
              <NavLink
                end
                className={"nav-item nav-link"}
                to={"/"}
                onClick={() => setExpanded(false)}
              >
                Inicio
              </NavLink>

              {!usuarioLogueado.nombreUsuario ? (
                <>
                  <NavLink end className={"nav-item nav-link"} to={"/registro"} onClick={() => setExpanded(false)}>
                    Registro
                  </NavLink>
                  <NavLink end className={"nav-item nav-link"} to={"/login"} onClick={() => setExpanded(false)}>
                    Login
                  </NavLink>{" "}
                </>
              ) : (
                <>
                  <NavLink
                    to={"/user/favoritos"}
                    className={"nav-item nav-link"}
                    onClick={() => setExpanded(false)}
                  >
                    <AiOutlineHeart></AiOutlineHeart>
                  </NavLink>
                  <NavLink
                    to={"/user/seeLater"}
                    className={"nav-item nav-link"}
                    onClick={() => setExpanded(false)}
                  >
                    <AiOutlineClockCircle className="seeLaterIcon"></AiOutlineClockCircle>
                  </NavLink>
                  <Button onClick={logOut} className="btnLogOut">
                    Logout
                  </Button>
                  <NavLink to={"/user/perfil"} className={"perfilImg"} onClick={() => setExpanded(false)}>
                    <img
                      src={usuario.fotoPerfil}
                      className="linkPerfil img-fluid"
                      alt="imgUsuario"
                    />
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
