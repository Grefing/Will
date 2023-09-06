import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  crearComentario,
  obtenerListaComentarios,
} from "../../helpers/queriesBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "/styles/comentarios.css";

const Comentarios = ({ usuarioLogueado, comentarios, setComentarios, idComentario }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const [render, setRender] = useState("");
  const navegacion = useNavigate();

  const onSubmit = (info) => {
    if (usuarioLogueado.nombreUsuario) {
      crearComentario(
        id,
        usuarioLogueado.id,
        usuarioLogueado.nombreUsuario,
        info.comentario
      ).then((res) => {
        setRender(res);
      });
      reset();
    } else {
      navegacion("/login");
    }
  };

  useEffect(() => {
    obtenerListaComentarios().then((res) => {
      const filtrado = res.filter(
        (comentario) => comentario.idPelicula === parseInt(id)
      );
      setComentarios(filtrado);
    });
  }, [render, idComentario]);

  return (
    <>
      <div style={{ width: "100%" }} className="align-self-center">
        <form onSubmit={handleSubmit(onSubmit)} className="formComments">
          <div className="inputCommentContainer">
            <input
              type="text"
              className="inputComments"
              placeholder="Comentarios..."
              maxLength={80}
              {...register("comentario")}
            />
          </div>
          <div className="btnCommentContainer">
            <button type="submit" className="btnSendComment">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Comentarios;
