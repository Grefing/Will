import { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import {
  borrarLike,
  crearLike,
  obtenerLike,
  obtenerListaLikes,
} from "../helpers/queriesBack";

const Like = ({
  colorLike,
  usuarioLogueado,
  id,
  type,
  setIdLike,
  idLike,
  setColorLike,
}) => {
  
  const colorChangerLike = (pintar) => {
    if (colorLike === "") {
      crearLike(usuarioLogueado.id, id, type).then((res) => {
        setIdLike(res.id);
        setColorLike(pintar);
      });
    } else {
      borrarLike(idLike).then(() => {
        setIdLike("");
        setColorLike("");
      });
    }
  };

  useEffect(() => {
    if (usuarioLogueado.nombreUsuario) {
      obtenerListaLikes().then((res) => {
        const filtrado = res.filter(
          (like) =>
            like.idUsuario === usuarioLogueado.id &&
            like.idPelicula === parseInt(id)
        );

        if (filtrado.length > 0) {
          setIdLike(filtrado[0]._id);
        }else{
          setColorLike('')
          setIdLike('')
        }
      });

      if (idLike !== "") {
        obtenerLike(idLike).then((res) => {
          if (res.status === 200) {
            setColorLike("#ff5e00");
          }
        });
      }
    }
  }, [id, idLike]);

  return (
    <>
      <AiFillHeart
        className="likeIcon"
        style={{ color: colorLike }}
        onClick={() => {
          colorChangerLike("#ff5e00");
        }}
      ></AiFillHeart>
    </>
  );
};

export default Like;
