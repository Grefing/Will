import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "/styles/paginador.css";

const Paginador = ({ cont, setCont, data }) => {
  return (
    <>
      <div className="d-flex containerPaginador">
        {cont !== 1 && (
          <IoIosArrowBack
            className="align-self-center mx-2 paginador"
            onClick={() => setCont(cont - 1)}
          />
        )}
        <h1>{cont}</h1>
        {data.length > 0 && (
          <IoIosArrowForward
            className={`align-self-center mx-2 paginador`}
            onClick={() => setCont(cont + 1)}
          />
        )}
      </div>
    </>
  );
};

export default Paginador;
