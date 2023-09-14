import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "/styles/cardPelicula.css";

const CardPelicula = ({ data }) => {
  return (
    <>
      <Col
        sm={6}
        md={4}
        lg={3}
        xl={2}
        className="mb-3 d-flex justify-content-center"
      >
        <Link className="card movie-card" to={`/detalles/${data.original_name === undefined? "films" : "series"}/${data.id}`}>
          <img
            src={data.poster_path !== null? ('https://image.tmdb.org/t/p/w342' + data.poster_path) : ('https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png')}
            className="img-fluid"
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

export default CardPelicula;
