import { Button, Container, Row, Spinner } from "react-bootstrap";
import CardPelicula from "./pelicula/CardPelicula";
import { useState, useEffect, useRef } from "react";
import Paginador from "./Paginador";
import { BsSearch } from "react-icons/bs";
import "/styles/inicioGral.css";
import { useForm } from "react-hook-form";
import { obtenerPeliculas, obtenerSeries } from "../helpers/queries";
import Banner from "./pelicula/Banner";
import { Form, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Inicio = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [data, setData] = useState([]);
  const [cont, setCont] = useState(1);
  const [type, setType] = useState("films");
  const [isLoading, setIsLoading] = useState(false);
  const navegacion = useNavigate();
  const containerRef = useRef();

  const handleAPI = async () => {
    setIsLoading(true);
    if (type === "films") {
      await obtenerPeliculas(cont).then((res) => {
        if (res && res.status === 200) {
          setData(res.data);
          setIsLoading(false);
        }
      });
    } else if (type === "series") {
      await obtenerSeries(cont).then((res) => {
        if (res && res.status === 200) {
          setData(res.data);
          setIsLoading(false);
        }
      });
    }
  };

  const onSubmit = async (info) => {
    navegacion(`/resultado-busqueda/all/${info.peliBuscada}`);
  };

  useEffect(() => {
    handleAPI();
    containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [cont, type]);

  return (
    <section className="mainSection">
      <Banner data={data} type={type} />
      <Container className="mt-4" ref={containerRef}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <button className="filmOrSeries" onClick={() => {
              setType("films"),
              setCont(1)
            }}>
              Peliculas
            </button>
            <button className="filmOrSeries" onClick={() => {
              setType("series"),
              setCont(1)
            }}>
              TV shows
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
        <Row className="d-flex justify-content-center">
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              {data.length > 0 ? (
                data.map((peli, index) => (
                  <CardPelicula
                    data={peli}
                    type={type}
                    key={index}
                  ></CardPelicula>
                ))
              ) : (
                <h1 className="notFoundError">
                  No se encontró ninguna pelicula
                </h1>
              )}
            </>
          )}
        </Row>
      </Container>
      <div className="d-flex justify-content-center">
        {data.length > 0 ? (
          <Paginador cont={cont} setCont={setCont}></Paginador>
        ) : undefined}
      </div>
    </section>
  );
};

export default Inicio;
