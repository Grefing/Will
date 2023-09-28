import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "/styles/cardPelicula.css";
import { obtenerPelicula, obtenerSerie } from "../../helpers/queries";
import { useState, useEffect } from "react";

const CardFavoritos = ({ idPeliOSerie, type}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (type === "films") {
      obtenerPelicula(idPeliOSerie).then((res) => {
        setData(res);
      });
    }else{
      obtenerSerie(idPeliOSerie).then((res) => {
          setData(res);
      })
    }
  }, [idPeliOSerie]);

  return (
    <>
      <Col
        sm={6}
        md={4}
        lg={3}
        xl={3}
        className="mb-3 d-flex justify-content-center"
      >
        <Link
          className="card movie-card"
          to={`/detalles/${
            data.original_name === undefined ? "films" : "series"
          }/${data.id}`}
        >
          <img
            src={"https://image.tmdb.org/t/p/w342" + data.poster_path}
            className="card-img-top"
            alt="imagenPeli"
          />
          <div className="card-body">
            {data.original_title !== undefined ? (
              <h5 className="card-title">{data.original_title}</h5>
            ) : (
              <h5 className="card-title">{data.original_name}</h5>
            )}
          </div>
        </Link>
      </Col>
    </>
  );
};

export default CardFavoritos;
