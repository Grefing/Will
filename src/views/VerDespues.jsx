import { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import CardFavoritos from "./pelicula/CardFavoritos";
import "/styles/favoritos.css";
import { obtenerListaVerDespues } from "../helpers/queriesBack";

const VerDespues = ({ usuarioLogueado }) => {
  const [data, setData] = useState([]);

  const showFilms = () => {
    obtenerListaVerDespues().then((res) => {
      const filtrado = res.filter(
        (item) => item.idUsuario === usuarioLogueado.id && item.tipo === "films"
      );
      setData(filtrado);
    });
  };

  const showSeries = () => {
    obtenerListaVerDespues().then((res) => {
      const filtrado = res.filter(
        (item) =>
          item.idUsuario === usuarioLogueado.id && item.tipo === "series"
      );
      setData(filtrado);
    });
  };

  const showAll = () => {
    obtenerListaVerDespues().then((res) => {
      const filtrado = res.filter(
        (item) => item.idUsuario === usuarioLogueado.id
      );
      setData(filtrado);
    });
  };

  useEffect(() => {
    obtenerListaVerDespues().then((res) => {
      const filtrado = res.filter(
        (item) => item.idUsuario === usuarioLogueado.id
      );
      setData(filtrado);
    });
  }, [usuarioLogueado]);

  return (
    <section className="mainSection">
      <Container>
        <h1 className="titleFavoritos">Pelis y series para ver mas tarde:</h1>
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
            No se encontraron pelis o series para ver mas tarde!
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

export default VerDespues;
