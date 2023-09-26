import { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import CardFavoritos from "./pelicula/CardFavoritos";
import "/styles/favoritos.css";
import { obtenerVerDespues } from "../helpers/queriesBack";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "../components/Loader";

const VerDespues = ({ usuarioLogueado }) => {
  const [data, setData] = useState([]);
  const [paginador, setPaginador] = useState(0);
  const [cont, setCont] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const showFilms = () => {
    setIsLoading(true);
    obtenerVerDespues(usuarioLogueado.id).then((res) => {
      const filtrado = res.filter(
        (item) => item.tipo === "films"
      );
      setData(filtrado);
    setIsLoading(false);
    });
  };

  const showSeries = () => {
    setIsLoading(true);
    obtenerVerDespues(usuarioLogueado.id).then((res) => {
      const filtrado = res.filter(
        (item) =>
          item.tipo === "series"
      );
      setData(filtrado);
    setIsLoading(false);
    });
  };

  const showAll = () => {
    setIsLoading(true);
    obtenerVerDespues(usuarioLogueado.id).then((res) => {
      setData(res);
    setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    obtenerVerDespues(usuarioLogueado.id).then((res) => {
      setData(res);
    setIsLoading(false);
    });
  }, [usuarioLogueado]);

  return (
    <section className="mainSection">
      {isLoading ? (
        <Loader></Loader>
      ) : (
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
              {data.slice(paginador, paginador + 20).map((item) => (
                <CardFavoritos
                  key={item.idPelicula}
                  idPeliOSerie={item.idPelicula}
                  type={item.tipo}
                ></CardFavoritos>
              ))}
            </Row>
          )}

          <div className="d-flex justify-content-center">
            {paginador !== 0 ? (
              <IoIosArrowBack
                className="moveComments"
                onClick={() => (
                  setPaginador(paginador - 20), setCont(cont - 1)
                )}
              ></IoIosArrowBack>
            ) : (
              <></>
            )}
            {data.length > 20 ? <h1>{cont}</h1> : <></>}
            {data.slice(paginador + 20, paginador + 40).length > 0 ? (
              <IoIosArrowForward
                className="moveComments"
                onClick={() => (
                  setPaginador(paginador + 20), setCont(cont + 1)
                )}
              ></IoIosArrowForward>
            ) : (
              <></>
            )}
          </div>
        </Container>
      )}
    </section>
  );
};

export default VerDespues;
