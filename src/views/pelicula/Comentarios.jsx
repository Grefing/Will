import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  borrarComentario,
  crearComentario,
  obtenerListaComentarios,
  obtenerUsuario,
} from "../../helpers/queriesBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "/styles/comentarios.css";
import Swal from "sweetalert2";
import Puntuacion from "../../components/Puntuacion";

const Comentarios = ({
  usuarioLogueado,
  comentarios,
  setComentarios,
  idComentario,
  setIdComentario,
  paginador,
}) => {
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
        info.comentario,
      ).then((res) => {
        setRender(res);

      });
      reset();
    } else {
      navegacion("/login");
    }
  };

  const eliminarComentario = (idComentario) => {
    borrarComentario(idComentario).then(() => {
      setIdComentario(idComentario);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Comentario eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    });
  };

  useEffect(() => {
    obtenerListaComentarios(id).then((res) => {
      setComentarios(res);
    });
  }, [render, idComentario]);


  return (
    <>
      <div style={{ width: "100%" }} className="align-self-center">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="formComments">
            <div className="inputCommentContainer">
              <input
                type="text"
                className="inputComments"
                placeholder="Comentarios..."
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

        <div className="containerAllComments">
          {[...comentarios]
            .reverse()
            .slice(paginador, paginador + 5)
            .map((comentario) => (
              <div key={comentario._id} className="containerComentario">

                <div className="d-flex flex-column my-2">
                  <img
                    src={comentario.usuario.fotoPerfil}
                    alt="imgUsuario"
                    className="imgUsuario"
                  />
                  <p className="text-center nombreComentario">
                    {comentario.usuario.nombreUsuario}
                  </p>
                </div>

                <div className="containerTexto">
                  <h6>{comentario.hora.substring(0, 10)}</h6>
                  <p className="descripcion">{comentario.descripcion}</p>
                </div>
                

                {comentario.usuario._id === usuarioLogueado.id &&
                comentario.idPelicula === parseInt(id) && (
                  <AiOutlineClose
                    className="deleteCross"
                    onClick={() => eliminarComentario(comentario._id)}
                  ></AiOutlineClose>
                )}

              </div>
            ))}
        </div>

        <Puntuacion></Puntuacion>
      </div>
    </>
  );
};

export default Comentarios;
