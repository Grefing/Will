import { Button, Container, Row } from "react-bootstrap";
import CardPelicula from "./pelicula/CardPelicula";
import { useState, useEffect, useRef } from "react";
import Paginador from "./Paginador";
import { BsSearch } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  filtrarPeliculas,
  obtenerListaGenerosPeliculas,
  obtenerListaGenerosSeries,
  obtenerPeliculas,
  obtenerPelisYSeries,
  obtenerSeries,
} from "../helpers/queries";
import { useNavigate, useParams } from "react-router-dom";
import "/styles/resultadoPelis.css";
import DropdownMenu from "../components/DropdownMenu";

const ResultadoBusqueda = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [data, setData] = useState([]);
  const [cont, setCont] = useState(1);
  const [generos, setGeneros] = useState([])
  const [nombreGen, setNombreGen] = useState("");
  let { type, result } = useParams();
  const navegacion = useNavigate();
  const containerRef = useRef();


  const onSubmit = async (info) => {
    obtenerPelisYSeries(info.peliBuscada, cont).then((res) => {
      setData(res);
      navegacion(`/resultado-busqueda/all/${info.peliBuscada}`);
      setCont(1)
    });
  };

  const filtrarPelis = () => {
    if (result === "allMovies") {
      obtenerListaGenerosPeliculas().then((res) =>{
        setGeneros(res)
      })
    }else if (result === "allSeries") {
      obtenerListaGenerosSeries().then((res) =>{
        setGeneros(res);
      })
    }
  };

  const mostrarPelis = () => {
    obtenerPeliculas(cont).then((res) => {
      setData(res.data);
      setCont(1);
      navegacion(`/resultado-busqueda/films/allMovies`);
      setValue("peliBuscada", "");
    });
    setNombreGen("")
  };

  const mostrarSeries = () => {
    obtenerSeries(cont).then((res) => {
      setData(res.data);
      setCont(1);
      navegacion(`/resultado-busqueda/series/allSeries`);
      setValue("peliBuscada", "");
    });
    setNombreGen("")
  };

  useEffect(() => {
    if (result === "allMovies" || result === "allSeries") {
      filtrarPelis();
      if (type === "films") {
        obtenerPeliculas(cont).then((res) => {
          setData(res.data);
          setValue("peliBuscada", "");
          containerRef.current.scrollIntoView({ behavior: "smooth" });
        });
      } else if (type === "series") {
        obtenerSeries(cont).then((res) => {
          setData(res.data);
          setValue("peliBuscada", "");
          containerRef.current.scrollIntoView({ behavior: "smooth" });
        });
      }
    } else {
      obtenerPelisYSeries(result, cont).then((res) => {
        setData(res);
        setValue("peliBuscada", result);
        containerRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [cont, result]);

  return (
    <section className="mainSection containerResBus d-flex">
      <div className="filterContainer">
        {result === "allMovies" || result === "allSeries" ? (
          <div className="dropDownContainer">
            <DropdownMenu generos={generos} setData={setData} cont={cont} setCont={setCont} nombreGen={nombreGen} setNombreGen={setNombreGen} result={result}></DropdownMenu>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Container className="mt-4 ">
        <div className="containerResult" ref={containerRef}>
          <div>
            <button onClick={mostrarPelis} className="btnAllMovies">
              Mostrar todas las Peliculas
            </button>
            <button onClick={mostrarSeries} className="btnAllMovies">
              Mostrar todas las Series
            </button>
          </div>

          <form className="d-flex searchForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-3 d-flex">
              <Button type="submit" className="inputBtn">
                <BsSearch className="align-self-center lupa"></BsSearch>
              </Button>
            </div>
            <input
              type="text"
              className="searchInput"
              placeholder="Buscar..."
              {...register("peliBuscada", {
                required:
                  "Porfavor ingrese el nombre de la pelicula que desee buscar",
              })}
            />
          </form>
        </div>
        {result !== "allMovies" && result !== "allSeries" ? (
          <>
            <h1 className="resultTitle">Resultados de: {result}</h1>
            <div className="resultLine"></div>
          </>
        ) : null}
        <Row className="d-flex justify-content-center">
          {data.length > 0 ? (
            data.map((peli, index) => (
              <CardPelicula data={peli} type={type} key={index}></CardPelicula>
            ))
          ) : (
            <h1 className="notFoundError">No se encontró ninguna pelicula</h1>
          )}
        </Row>
        <div className="d-flex justify-content-center ">
          <Paginador cont={cont} setCont={setCont}></Paginador>
        </div>
      </Container>
    </section>
  );
};

export default ResultadoBusqueda;
