import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../helpers/queriesBack";
import "/styles/perfil.css";
import Loader from "../components/Loader";
import VentanaModal from "../components/VentanaModal";

const Perfil = ({ usuarioLogueado, setRender, render }) => {
  const [usuario, setUsuario] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setIsLoading(true);
    obtenerUsuario(usuarioLogueado.id).then((res) => {
      setUsuario(res);
      setIsLoading(false);
    });
  }, [render]);

  return (
    <section className="mainSection">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <Container className="my-5">
          <div className="miPerfil">
            <h1>Mi perfil:</h1>
          </div>

          <div className="d-flex justify-content-center flex-column">
            <img
              src={usuario.fotoPerfil}
              className="imgFotoPerfil rounded-circle "
              alt=""
              onClick={handleShow}
            />
            <VentanaModal show={show} setShow={setShow} handleClose={handleClose} usuario={usuario} setRender={setRender} ></VentanaModal>
            <h3 className="nombrePerfil">{usuario.nombreUsuario}</h3>
          </div>

          <div className="my-4">
            <h5>ID: {usuario.id}</h5>
            <h5>Email: {usuario.email}</h5>
          </div>
        </Container>
      )}
    </section>
  );
};

export default Perfil;
