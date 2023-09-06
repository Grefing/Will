import axios from "axios";

const URL_usuario = import.meta.env.VITE_API_USUARIO;
const URL_like = import.meta.env.VITE_API_LIKE;
const URL_verDespues= import.meta.env.VITE_API_VER_DESPUES;
const URL_comentario = import.meta.env.VITE_API_COMENTARIO;


// ?USUARIOS
export const registro = async (usuario) => {
  try {
    const response = await axios.post(URL_usuario + "nuevo", usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respuesta = {
      status: response.status,
      mensaje: "Usuario registrado con éxito",
    };
    return respuesta;
  } catch (e) {
    console.log(e);
    return e.response.data.mensaje;
  }
};

export const login = async (usuario) => {
  try {
    const response = await axios.post(URL_usuario, usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = response;
    return {
      status: response.status,
      id: data.id,
      nombreUsuario: data.nombreUsuario,
    };
  } catch (e) {
    console.log(e);
  }
};

export const obtenerUsuario = async (idUsuario) => {
  try {
    const response = await axios.get(URL_usuario + `usuario/${idUsuario}`)
    const { data } = response;
    return {
      status: response.status,
      id: data.id,
      nombreUsuario: data.nombreUsuario,
    };
  } catch (e) {
    console.log(e);
  }
};
// ?LIKES

export const crearLike = async (idUsuario, idPelicula, tipo) => {
    try {
      const response = await axios.post(
        URL_like + "nuevoLike",
        { idUsuario, idPelicula, tipo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const respuesta = {
        status: response.status,
        mensaje: "Likeado con éxito",
        id: response.data.id,
      };
      return respuesta;
    } catch (e) {
      console.error(e);
    }
  };

export const borrarLike = async (id) =>{
    try {
        const response = await axios.delete(`${URL_like}searchLike/${id}`);
        return response.status;
      } catch (e) {
        console.log(e);
      }
}

export const obtenerLike = async (id) => {
    try {
      const response = await axios.get(URL_like + "searchLike/" + id);
    
      return response;

    } catch (e) {
      console.log(e);
    }
  };

export const obtenerListaLikes = async () =>{
    try {
        const response= await axios.get(URL_like);
        const {data} = response;

        return data;
      } catch (e) {
        console.log(e);
      }
}
  
// ?VER DESPUES
export const crearVerDespues = async (idUsuario, idPelicula, tipo) => {
  try {
    const response = await axios.post(
      URL_verDespues + "nuevoSeeLater",
      { idUsuario, idPelicula, tipo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const respuesta = {
      status: response.status,
      mensaje: "Ver despues",
      id: response.data.id,
    };
    return respuesta;
  } catch (e) {
    console.error(e);
  }
};

export const borrarVerDespues = async (id) =>{
  try {
      const response = await axios.delete(`${URL_verDespues}searchSeeLater/${id}`);
      return response.status;
    } catch (e) {
      console.log(e);
    }
}

export const obtenerVerDespues = async (id) => {
  try {
    const response = await axios.get(URL_verDespues + "searchSeeLater/" + id);
  
    return response;

  } catch (e) {
    console.log(e);
  }
};

export const obtenerListaVerDespues= async () =>{
  try {
      const response= await axios.get(URL_verDespues);
      const {data} = response;

      return data;
    } catch (e) {
      console.log(e);
    }
}

// ?COMENTARIOS

export const crearComentario= async ( idPelicula, idUsuario, nombreUsuario, descripcion) => {
  try {
    const response = await axios.post(
      URL_comentario + "nuevoComentario",
      { idPelicula, idUsuario, nombreUsuario, descripcion },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
       return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const obtenerListaComentarios = async () =>{
  try {
      const response= await axios.get(URL_comentario);
      const {data} = response;

      return data;
    } catch (e) {
      console.log(e);
    }
}

export const borrarComentario = async (idComentario) =>{
  try {
      const response= await axios.delete(URL_comentario + `eliminarComentario/${idComentario}`);
      const {data} = response;

      return data;
    } catch (e) {
      console.log(e);
    }
}


