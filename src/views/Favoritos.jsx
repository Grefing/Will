import { useEffect, useState } from "react";
import { obtenerLike } from "../helpers/queriesBack";
import { Card, Container, Form, Row } from "react-bootstrap";
import CardFavoritos from "./pelicula/CardFavoritos";
import "/styles/favoritos.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "../components/Loader";

const Favoritos = ({ usuarioLogueado }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [paginador, setPaginador] = useState(0);
  const [cont, setCont] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

 
  const showFilms = () => {
    setIsLoading(true);
    obtenerLike(usuarioLogueado.id).then((res) => {
      const filtrar = res.filter((like) => like.tipo === "films");
      setOriginalData(filtrar);
      setData(filtrar);
      setIsLoading(false);
    });
    setCont(1);
    setPaginador(0);
  };

  const showSeries = () => {
    setIsLoading(true);
    obtenerLike(usuarioLogueado.id).then((res) => {
      const filtrar = res.filter((like) => like.tipo === "series");
      setOriginalData(filtrar);
      setData(filtrar);
      setIsLoading(false);
    });
    setCont(1);
    setPaginador(0);
  };

  const showAll = () => {
    setIsLoading(true);
    obtenerLike(usuarioLogueado.id).then((res) => {
      setOriginalData(res);
      setData(res);
      setIsLoading(false);
    });
    setCont(1);
    setPaginador(0);
  };

  const handleInputChange = (evento) => {
    const minus = evento.toLowerCase();
    if (minus === "") {
      setData(originalData);
    } else {
      const buscar = originalData.filter((dato) =>
        dato.nombrePelicula.toLowerCase().includes(minus)
      );
      setData(buscar);
    }
  };


  useEffect(() => {
    setIsLoading(true);
    obtenerLike(usuarioLogueado.id).then((res) => {
      setOriginalData(res); 
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
          <h1 className="titleFavoritos">Pelis y series que te gustaron:</h1>
          <div className="titleLine"></div>

          <div className="btnContainer">
            <div>
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

            <div className="containerInputSearch">
              <Form.Control type="text" placeholder="Buscar..." className="searchInputFavoritos" onChange={(e) => handleInputChange(e.target.value)}/>
            </div>
          </div>

          {data.length === 0 ? (
            <h2 className="titleEmpty">
              {" "}
              No se encontraron pelis o series que te hayan gustado!
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
            {paginador !== 0 && (
              <IoIosArrowBack
                className="moveComments"
                onClick={() => (
                  setPaginador(paginador - 20), setCont(cont - 1)
                )}
              ></IoIosArrowBack>
            )}
            {data.length > 20 && <h1>{cont}</h1>}
            {data.slice(paginador + 20, paginador + 40).length > 0 && (
              <IoIosArrowForward
                className="moveComments"
                onClick={() => (
                  setPaginador(paginador + 20), setCont(cont + 1)
                )}
              ></IoIosArrowForward>
            )}
          </div>
        </Container>
      )}
    </section>
  );
};

export default Favoritos;
