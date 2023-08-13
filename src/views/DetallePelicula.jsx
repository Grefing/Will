import { useEffect, useState } from "react";
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
import { borrarLike, borrarVerDespues, crearLike, crearVerDespues, obtenerLike, obtenerListaLikes, obtenerListaVerDespues, obtenerVerDespues } from "../helpers/queriesBack";
import { Container, Row } from "react-bootstrap";
import CardPelicula from "./pelicula/CardPelicula";
import CardReparto from "./pelicula/CardReparto";


const DetallePelicula = ({ usuarioLogueado }) => {
  const [detallePeli, setDetallePeli] = useState({});
  const [trailerPeli, setTrailerPeli] = useState("");
  const [colorLike, setColorLike] = useState("");
  const [colorClock, setColorClock] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idLike, setIdLike] = useState("")
  const [idSeeLater, setIdSeeLater] = useState("")
  const [recomendaciones, setRecomendaciones] = useState([])
  const [reparto, setReparto] = useState([]);
  let { type, id } = useParams();
  const navegacion = useNavigate();

 


  const colorChangerLike = (pintar) => {
    if (colorLike === "") {
      crearLike(usuarioLogueado.id, id, type).then((res) =>{
        setIdLike(res.id)
        setColorLike(pintar);   
      })
    }else{
      borrarLike(idLike).then((res) =>{
        setIdLike("")
        setColorLike("")
      })
    }
  };


  const colorChangerClock = (pintar) => {
    if (colorClock === "") {
      crearVerDespues(usuarioLogueado.id, id, type).then((res) =>{
        console.log(res);
        setIdSeeLater(res.id)
        setColorClock(pintar);
      })
    }else{
      borrarVerDespues(idSeeLater).then(()=>{
        setIdSeeLater("");
        setColorClock("");
      })
    }
  };

  const goToLogin = () =>{
    navegacion('/login')
  }

  const fetchData = async () => {
    setIsLoading(true);
    if (type === "films") {
       obtenerPelicula(id).then((res) => {
        setDetallePeli(res);
        setIsLoading(false)
      });
       buscarTrailerPelicula(id).then((res) => {
        if (res.trailer.length > 0 && res.status === 200) {
          const trailerKey = res.trailer[0].key;
          setTrailerPeli(`https://www.youtube.com/embed/${trailerKey}`);
          setIsLoading(false)
        }
      });
      obtenerPeliculasRelacionadas(id).then((res) =>{
        const cut = res.slice(0,14)
        setRecomendaciones(cut);
        setIsLoading(false);
      })

      obtenerReparto("movie", id).then((res)=>{
        const cut = res.slice(0, 19);
        setReparto(cut);
        setIsLoading(false)
      })

    } else {
      obtenerSerie(id).then((res) => {
        setDetallePeli(res);
        setIsLoading(false)
      });
       buscarTrailerSerie(id).then((res) => {
        if (res.trailer.length > 0 && res.status === 200) {
          const trailerKey = res.trailer[0].key;
          setTrailerPeli(`https://www.youtube.com/embed/${trailerKey}`);
          setIsLoading(false)
        }
      });
      obtenerSeriesRelacionadas(id).then((res) =>{
        const cut = res.slice(0,14)
        setRecomendaciones(cut);
        setIsLoading(false)
      })

      obtenerReparto("tv", id).then((res)=>{
        const cut = res.slice(0, 19);
        setReparto(cut);
        setIsLoading(false)
      })
    }
    window.scrollTo(0, 0);
  };


  useEffect(() => {    
    obtenerListaLikes().then((res) =>{
      const filtrado = res.filter((like) => like.idUsuario === usuarioLogueado.id && like.idPelicula === parseInt(id));
      if (filtrado.length > 0) {
        setIdLike(filtrado[0]._id);
      }
    })

    obtenerListaVerDespues().then((res) =>{
      const filtrado = res.filter((verDespues) => verDespues.idUsuario === usuarioLogueado.id && verDespues.idPelicula === parseInt(id));
      if (filtrado.length > 0) {
        setIdSeeLater(filtrado[0]._id);
      }
    })

    if (idLike !== "") {
      obtenerLike(idLike).then((res) =>{
        if (res.status=== 200) {
            setColorLike("#ff5e00")
        }
      })
    }

    if (idSeeLater !== "") {
      obtenerVerDespues(idSeeLater).then((res) =>{
        if (res.status=== 200) {
            setColorClock("#ff5e00")
        }
      })
    }
    
    fetchData();

  }, [id, idLike, idSeeLater]);

  return (
    <>
      <section className="mainSection">
        {isLoading ? (
          <Loader/>
        ) : (
          <>
            <div className="optionsContainer">
              {usuarioLogueado.nombreUsuario ? (
                <AiFillHeart className="likeIcon" style={{color: colorLike}} onClick={() => {colorChangerLike("#ff5e00")}}></AiFillHeart>
              ) : (
                  <AiFillHeart className="likeIcon" onClick={goToLogin}></AiFillHeart>
              )}

                {
                  usuarioLogueado.nombreUsuario? 
                  <BsStopwatchFill className="watchLaterIcon" style={{color: colorClock}} onClick={() => {colorChangerClock("#ff5e00")}}></BsStopwatchFill>
                  :
                    <BsStopwatchFill className="watchLaterIcon" onClick={goToLogin}></BsStopwatchFill>
                }
            </div>

            <div className="imgContainer">
              <Link onClick={() => navegacion(-1)}>
                <IoArrowBackOutline className="goBackIcon"></IoArrowBackOutline>
              </Link>
              <img
                src={`https://image.tmdb.org/t/p/original${detallePeli.backdrop_path}`}
                alt="imgDetallePeli"
                className="imgPeli"
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
                  <h2 >Reparto:</h2>
                  <div className="repartoLine"></div>
                </div> 
                <div className="actorsCards d-flex">
                {
                  reparto.map((actor) =>(
                    <CardReparto key={actor.id} actor={actor}> </CardReparto>
                  ))
                }
                </div>
               
            </Container>

            {trailerPeli !== "" ? (
              <div className="videoContainer my-5 d-flex flex-column">
                <h2 className="trailerTitle">Trailer:</h2>
                <div className="trailerLine"></div>
                <iframe
                  src={trailerPeli}
                  title="Trailer de la película"
                  className="trailerVideo align-self-center"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <></>
            )}

              <div className="d-flex flex-column">
                <h2 className="recTitle">Recomendaciones:</h2>
                <div className="trailerLine"></div>
                <div className="recommendations">
                {
                  recomendaciones.length > 0?(
                    recomendaciones.map((data) =>(
                      <CardPelicula key={data.id} data={data}></CardPelicula>
                    ))
                  ): (<h5 className="noRec">{type === "films"? "No se encontraron recomendaciones para esta pelicula": "No se encontraron recomendaciones para esta serie" }</h5>)
                 
                }
                </div>
              </div>

          </>
        )}
      </section>
    </>
  );
};

export default DetallePelicula;
