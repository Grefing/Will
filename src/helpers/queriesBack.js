import axios from "axios";

const URL_usuario = import.meta.env.VITE_API_USUARIO;
const URL_like = import.meta.env.VITE_API_LIKE;
const URL_verDespues = import.meta.env.VITE_API_VER_DESPUES;
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
    const response = await axios.get(URL_usuario + `usuario/${idUsuario}`);
    const { data } = response;

    return {
      status: response.status,
      id: data._id,
      nombreUsuario: data.nombreUsuario,
      fotoPerfil: data.fotoPerfil,
      email: data.email,
    };
  } catch (e) {
    console.log(e);
  }
};

export const editarFotoUsuario = async (idUsuario, URL) => {
  try {
    const { data } = await axios.put(URL_usuario + `usuario/${idUsuario}`, {
      nuevaFotoPerfil: URL,
    });
    return data;
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

export const borrarLike = async (id) => {
  try {
    const response = await axios.delete(`${URL_like}searchLike/${id}`);
    return response.status;
  } catch (e) {
    console.log(e);
  }
};

export const obtenerLike = async (idUsuario) => {
  try {
    const { data } = await axios.get(URL_like + idUsuario);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const obtenerLikeId = async (id) => {
  try {
    const response = await axios.get(URL_like + "searchLike/" + id);

    return response;
  } catch (e) {
    console.log(e);
  }
};

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

export const borrarVerDespues = async (id) => {
  try {
    const response = await axios.delete(
      `${URL_verDespues}searchSeeLater/${id}`
    );
    return response.status;
  } catch (e) {
    console.log(e);
  }
};

export const obtenerVerDespues = async (idUsuario) => {
  try {
    const {data}  = await axios.get(URL_verDespues + idUsuario);

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const obtenerVerDespuesId = async (id) => {
  try {
    const response = await axios.get(URL_verDespues + "searchSeeLater/" + id);

    return response;
  } catch (e) {
    console.log(e);
  }
};

// ?COMENTARIOS

export const crearComentario = async (idPelicula, idUsuario, descripcion) => {
  try {
    const response = await axios.post(
      URL_comentario + "nuevoComentario",
      { idPelicula, descripcion, usuario: idUsuario },
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

export const obtenerListaComentarios = async (idPelicula) => {
  try {
    const { data } = await axios.get(
      `${URL_comentario}comentario/${idPelicula}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const borrarComentario = async (idComentario) => {
  try {
    const response = await axios.delete(
      URL_comentario + `eliminarComentario/${idComentario}`
    );
    const { data } = response;

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const editarFotoComentarios = async (
  comentariosIds,
  nuevaFotoComentario
) => {
  try {
    const response = await axios.put(`${URL_comentario}editarFoto`, {
      ids: comentariosIds,
      nuevaFotoComentario: nuevaFotoComentario,
    });

    return response.data.mensaje;
  } catch (e) {
    console.log(e);
  }
};
