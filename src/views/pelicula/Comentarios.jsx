import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearComentario, obtenerListaComentarios } from "../../helpers/queriesBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Comentarios = ({usuarioLogueado, comentarios, setComentarios}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
      const {id} = useParams();
      const [prueba, setPrueba] = useState("")
      const navegacion = useNavigate();


  const onSubmit = (info) =>{
   if (usuarioLogueado.nombreUsuario) {
       crearComentario(id, usuarioLogueado.id, usuarioLogueado.nombreUsuario, info.comentario).then((res) =>{
      setPrueba(res)
    })
    reset();
   }else{
    navegacion("/login");
   }
}

useEffect(() => {
  obtenerListaComentarios().then((res)=>{  
    const filtrado = res.filter((comentario) => (
      comentario.idPelicula === parseInt(id)
    ))
    setComentarios(filtrado)
  })
}, [prueba])


  return (
    <>
      <div>
        <img
          src="https://assets.stickpng.com/images/585e4beacb11b227491c3399.png"
          alt="imgUsuario"
          width={"50px"}
        />
      </div>

      <div style={{ width: "100%" }} className="align-self-center">
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Comentarios..."
            maxLength={80}
            {
                ...register("comentario")
            }
          />
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </>
  );
};

export default Comentarios;
