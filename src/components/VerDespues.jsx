import { BsStopwatchFill } from "react-icons/bs";
import {
  borrarVerDespues,
  crearVerDespues,
  obtenerVerDespues,
  obtenerVerDespuesId,
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
    if (usuarioLogueado.nombreUsuario) {
      obtenerVerDespues(usuarioLogueado.id).then((res) => {
        const filtrado = res.filter(
          (verDespues) =>
            verDespues.idPelicula === parseInt(id)
        );
        if (filtrado.length > 0) {
          setIdSeeLater(filtrado[0]._id);
        } else {
          setColorClock('');
          setIdSeeLater('')
        }
      });

      if (idSeeLater !== "") {
        obtenerVerDespuesId(idSeeLater).then((res) => {
          if (res.status === 200) {
            setColorClock("#ff5e00");
          }
        });
      }
    }
  }, [id, idSeeLater]);

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
