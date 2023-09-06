import { BsStopwatchFill } from "react-icons/bs";
import {
    borrarVerDespues,
    crearVerDespues,
  obtenerListaVerDespues,
  obtenerVerDespues,
} from "../helpers/queriesBack";
import { useEffect } from "react";

const VerDespues = ({
  colorClock,
  usuarioLogueado,
  id,
  type,
  setIdSeeLater,
  setColorClock,
  idSeeLater,
}) => {
    
  const colorChangerClock = (pintar) => {
    if (colorClock === "") {
      crearVerDespues(usuarioLogueado.id, id, type).then((res) => {
        setIdSeeLater(res.id);
        setColorClock(pintar);
      });
    } else {
      borrarVerDespues(idSeeLater).then(() => {
        setIdSeeLater("");
        setColorClock("");
      });
    }
  };

  useEffect(() => {
    if (Object.keys(usuarioLogueado).length > 0) {
      obtenerListaVerDespues().then((res) => {
        const filtrado = res.filter(
          (verDespues) =>
            verDespues.idUsuario === usuarioLogueado.id &&
            verDespues.idPelicula === parseInt(id)
        );
        if (filtrado.length > 0) {
          setIdSeeLater(filtrado[0]._id);
        }
      });

      if (idSeeLater !== "") {
        obtenerVerDespues(idSeeLater).then((res) => {
          if (res.status === 200) {
            setColorClock("#ff5e00");
          }
        });
      }
    }
  }, [idSeeLater]);

  return (
    <>
      <BsStopwatchFill
        className="watchLaterIcon"
        style={{ color: colorClock }}
        onClick={() => {
          colorChangerClock("#ff5e00");
        }}
      ></BsStopwatchFill>
    </>
  );
};

export default VerDespues;
