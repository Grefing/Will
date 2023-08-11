import { useEffect, useState } from "react";
import { obtenerListaLikes } from "../helpers/queriesBack";
import { Card, Container, Row } from "react-bootstrap";
import CardFavoritos from "./pelicula/CardFavoritos";
import "/styles/favoritos.css";
import Paginador from "./Paginador";

const Favoritos = ({ usuarioLogueado }) => {
  const [data, setData] = useState([]);
  const [cont, setCont] = useState(1);

  const showFilms = () => {
    obtenerListaLikes().then((res) => {
      const filtrar = res.filter(
        (like) => like.idUsuario === usuarioLogueado.id && like.tipo === "films"
      );
      setData(filtrar);
    });
  };

  const showSeries = () => {
    obtenerListaLikes().then((res) => {
      const filtrar = res.filter(
        (like) =>
          like.idUsuario === usuarioLogueado.id && like.tipo === "series"
      );
      setData(filtrar);
    });
  };

  const showAll = () => {
    obtenerListaLikes().then((res) => {
      const filtrar = res.filter(
        (like) => like.idUsuario === usuarioLogueado.id
      );
      setData(filtrar);
    });
  };

  useEffect(() => {
    obtenerListaLikes().then((res) => {
      const filtrar = res.filter(
        (like) => like.idUsuario === usuarioLogueado.id
      );
      setData(filtrar);
    });
  }, [usuarioLogueado]);

  return (
    <section className="mainSection">
      <Container>
        <h1 className="titleFavoritos">Pelis y series que te gustaron:</h1>
        <div className="titleLine"></div>

        <div className="btnContainer">
          <button onClick={showFilms} className="btnFavoritos">
            Mostrar peliculas
          </button>
          <button onClick={showSeries} className="btnFavoritos">
            Mostrar series
          </button>
          <button onClick={showAll} className="btnFavoritos">
            Mostrar todo
          </button>
        </div>
        {data.length === 0 ? (
          <h2 className="titleEmpty">
            {" "}
            No se encontraron pelis o series que te hayan gustado!
          </h2>
        ) : (
          <Row className="rowContainer">
            {data.map((item) => (
              <CardFavoritos
                key={item.idPelicula}
                idPeliOSerie={item.idPelicula}
                type={item.tipo}
              ></CardFavoritos>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Favoritos;
