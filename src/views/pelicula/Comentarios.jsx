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
  const [usuario, setUsuario] = useState("")
  const navegacion = useNavigate();


  const onSubmit = (info) => {
    if (usuarioLogueado.nombreUsuario) {
      // const comment = {
      //   id,
      //   usuarioLogueadoId: usuarioLogueado.id,
      //   usuarioLogueadoNombre: usuarioLogueado.nombreUsuario,
      //   comentario: info.comentario
      // }

      crearComentario(
     id,
     usuarioLogueado.id,
     usuarioLogueado.nombreUsuario,
     info.comentario,
      ).then((res) => {
        setRender(res);
        // setComentarios(prev => [...prev, comment])
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
    obtenerListaComentarios().then((res) => {
      const filtrado = res.filter(
        (comentario) => comentario.idPelicula === parseInt(id)
      );
      setComentarios(filtrado);
    });

    obtenerUsuario(usuarioLogueado.id).then((res) =>{
      setUsuario(res);
    })
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

        <div className="containerAllComments">
          {[...comentarios]
            .reverse()
            .slice(paginador, paginador + 5)
            .map((comentario) => (
              <div key={comentario._id} className="containerComentario">
                <div className="d-flex flex-column">
                  <img
                    // src={usuario.fotoPerfil}
                    src="https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png"
                    alt="imgUsuario"
                    className="imgUsuario"
                  />
                  <p className="text-center align-self-center justify-content-center nombreComentario">
                    {comentario.nombreUsuario}
                  </p>
                </div>

                <div className="containerTexto">
                  <p className="descripcion">{comentario.descripcion}</p>
                </div>

                {comentario.idUsuario === usuarioLogueado.id &&
                comentario.idPelicula === parseInt(id) ? (
                  <AiOutlineClose
                    className="deleteCross"
                    onClick={() => eliminarComentario(comentario._id)}
                  ></AiOutlineClose>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Comentarios;
