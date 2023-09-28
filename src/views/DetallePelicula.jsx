import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  buscarTrailerPelicula,
  buscarTrailerSerie,
  obtenerPelicula,
  obtenerPeliculasRelacionadas,
  obtenerSerie,
  obtenerSeriesRelacionadas,
  obtenerReparto,
} from "../helpers/queries";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { BsStopwatchFill } from "react-icons/bs";
import "/styles/detallePelicula.css";
import Loader from "../components/Loader";
import { Container } from "react-bootstrap";
import CardPelicula from "./pelicula/CardPelicula";
import CardReparto from "./pelicula/CardReparto";
import Comentarios from "./pelicula/Comentarios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Like from "../components/Like";
import VerDespues from "../components/VerDespues";

const DetallePelicula = ({ usuarioLogueado }) => {
  const [detallePeli, setDetallePeli] = useState({});
  const [trailerPeli, setTrailerPeli] = useState("");
  const [colorLike, setColorLike] = useState("");
  const [colorClock, setColorClock] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idLike, setIdLike] = useState("");
  const [idSeeLater, setIdSeeLater] = useState("");
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [reparto, setReparto] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [paginador, setPaginador] = useState(0);
  const [cont, setCont] = useState(1);
  const [idComentario, setIdComentario] = useState("");
  const containerRef = useRef();
  let { type, id } = useParams();

  const navegacion = useNavigate();

  const goToLogin = () => {
    navegacion("/login");
  };

  const fetchData = async () => {
    setIsLoading(true);
    setTrailerPeli("");
    if (type === "films") {
      obtenerPelicula(id).then((res) => {
        setDetallePeli(res);
        setIsLoading(false);
      });
      buscarTrailerPelicula(id).then((res) => {
        if (res.trailer.length > 0 && res.status === 200) {
          const trailerKey = res.trailer[0].key;
          setTrailerPeli(`https://www.youtube.com/embed/${trailerKey}`);
          setIsLoading(false);
        }
      });
      obtenerPeliculasRelacionadas(id).then((res) => {
        const cut = res.slice(0, 14);
        setRecomendaciones(cut);
        setIsLoading(false);
      });

      obtenerReparto("movie", id).then((res) => {
        const cut = res.slice(0, 19);
        setReparto(cut);
        setIsLoading(false);
      });
    } else {
      obtenerSerie(id).then((res) => {
        setDetallePeli(res);
        setIsLoading(false);
      });
      buscarTrailerSerie(id).then((res) => {
        if (res.trailer.length > 0 && res.status === 200) {
          const trailerKey = res.trailer[0].key;
          setTrailerPeli(`https://www.youtube.com/embed/${trailerKey}`);
          setIsLoading(false);
        }
      });
      obtenerSeriesRelacionadas(id).then((res) => {
        const cut = res.slice(0, 14);
        setRecomendaciones(cut);
        setIsLoading(false);
      });

      obtenerReparto("tv", id).then((res) => {
        const cut = res.slice(0, 19);
        setReparto(cut);
        setIsLoading(false);
      });
    }
  };



  useEffect(() => {
    fetchData();
    setPaginador(0);
    setCont(1);
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [id, type]);

  return (
    <>
      <section className="mainSection">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="optionsContainer">
              {usuarioLogueado.nombreUsuario ? (
                <Like
                  colorLike={colorLike}
                  usuarioLogueado={usuarioLogueado}
                  id={id}
                  type={type}
                  setIdLike={setIdLike}
                  idLike={idLike}
                  setColorLike={setColorLike}
                ></Like>
              ) : (
                <AiFillHeart
                  className="likeIcon"
                  onClick={goToLogin}
                ></AiFillHeart>
              )}

              {usuarioLogueado.nombreUsuario ? (
                <div className="containerClock">
                  <VerDespues
                    colorClock={colorClock}
                    usuarioLogueado={usuarioLogueado}
                    id={id}
                    type={type}
                    idSeeLater={idSeeLater}
                    setIdSeeLater={setIdSeeLater}
                    setColorClock={setColorClock}
                  ></VerDespues>
                </div>
              ) : (
                <div className="containerClock">
                  <BsStopwatchFill
                    className="watchLaterIcon"
                    onClick={goToLogin}
                  ></BsStopwatchFill>
                </div>
              )}
            </div>

            <div className="imgContainer">
              <Link onClick={() => navegacion(-1)}>
                <IoArrowBackOutline className="goBackIcon"></IoArrowBackOutline>
              </Link>
              <img
                src={`https://image.tmdb.org/t/p/original${detallePeli.backdrop_path}`}
                alt="imgDetallePeli"
                ref={containerRef}
                className="imgPeli img-fluid"
              />
              {type === "films" ? (
                <>
                  <h1 className="title">{detallePeli.original_title}</h1>
                  <h5 className="description">{detallePeli.overview}</h5>
                  <h5 className="date">{detallePeli.release_date}</h5>
                </>
              ) : (
                <>
                  <h1 className="title">{detallePeli.original_name}</h1>
                  {/* <h4 className="date">{detallePeli.first_air_date}</h4> */}
                  <h5 className="description">{detallePeli.overview}</h5>
                  <h5 className="date">{detallePeli.first_air_date}</h5>
                </>
              )}
            </div>

            <Container className="repartoContainer">
              <div>
                <h2>Reparto:</h2>
                <div className="repartoLine"></div>
              </div>
              <div className="actorsCards d-flex">
                {reparto.map((actor) => (
                  <CardReparto key={actor.id} actor={actor}>
                    {" "}
                  </CardReparto>
                ))}
              </div>
            </Container>

            {trailerPeli !== "" && (
              <Container className="videoContainer my-5 d-flex flex-column">
                <h2>Trailer:</h2>
                <div className="trailerLine"></div>
                <iframe
                  src={trailerPeli}
                  title="Trailer de la película"
                  className="trailerVideo align-self-center"
                  allowFullScreen
                ></iframe>
              </Container>
            )}

            <Container className="recommendationsContainer">
              <div>
                <h2>Recomendaciones:</h2>
                <div className="recLine"></div>
              </div>

              <div className="recommendations d-flex">
                {recomendaciones.length > 0 ? (
                  recomendaciones.map((data) => (
                    <CardPelicula key={data.id} data={data} columns={2}></CardPelicula>
                  ))
                ) : (
                  <h5 className="noRec">
                    {type === "films"
                      ? "No se encontraron recomendaciones para esta pelicula"
                      : "No se encontraron recomendaciones para esta serie"}
                  </h5>
                )}
              </div>

              <Container className="my-5">

                <div>
                  <h2>Comentarios:</h2>
                  <div className="recLine"></div>
                </div>

                <div className="my-4">
                  <Comentarios
                    usuarioLogueado={usuarioLogueado}
                    comentarios={comentarios}
                    setComentarios={setComentarios}
                    idComentario={idComentario}
                    setIdComentario={setIdComentario}
                    paginador={paginador}
                  ></Comentarios>
                </div>


                <div className="paginadorComentarios">
                  {paginador !== 0 ? (
                    <IoIosArrowBack
                      className="moveComments"
                      onClick={() => (
                        setPaginador(paginador - 5), setCont(cont - 1)
                      )}
                    >
                    </IoIosArrowBack>
                  ) : (
                    <></>
                  )}
                  {comentarios.length > 5 ? <h1>{cont}</h1> : <></>}
                  {comentarios.slice(paginador + 5, paginador + 10).length >
                  0 ? (
                    <IoIosArrowForward
                      className="moveComments"
                      onClick={() => (
                        setPaginador(paginador + 5), setCont(cont + 1)
                      )}
                    >
                    </IoIosArrowForward>
                  ) : (
                    <></>
                  )}
                </div>
              </Container>
            </Container>
          </>
        )}
      </section>
    </>
  );
};

export default DetallePelicula;
