import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { filtrarPeliculas, filtrarSeries } from "../helpers/queries";
import "/styles/dropDown.css"
import { Button } from "react-bootstrap";

const DropdownMenu = ({ generos, setData, cont, setCont, nombreGen, setNombreGen, result }) => {
  const [idGenero, setIdGenero] = useState("");

  console.log(result);

  useEffect(() => {
   if (result === "allMovies") {
    filtrarPeliculas(idGenero, cont).then((res) => {
        setData(res);
      });
   }else{
    filtrarSeries(idGenero, cont).then((res) =>{
        setData(res);
    })
   }
  }, [cont, idGenero]);

  return (
    <>
      <div className="dropDownContainer">
        <DropdownButton
          className="customButton"
          title={nombreGen === "" ? "Filtrar" : nombreGen}
        >
          <div className="d-flex flex-column">
            {generos.map((genero) => (
              <Dropdown.Item
              className="dropDownItem"
                key={genero.id}
                onClick={() => {
                  setIdGenero(genero.id), setNombreGen(genero.name), setCont(1);
                }}

                active={idGenero === genero.id}
              >
                {genero.name}
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>
      </div>
    </>
  );
};

export default DropdownMenu;
