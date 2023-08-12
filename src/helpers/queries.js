import axios from "axios";

const apiKey = "54eab7b85f3da695b88f8cb23488ffec";

// *Peliculas
export const obtenerPeliculas = async (cont) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?page=${cont}`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    const responseData = {
      status: response.status,
      data: response.data.results,
    };

    return responseData;
  } catch (e) {
    console.log(e);
  }
};

export const obtenerPelicula = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const buscarPelis = async (info, cont) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${info}&page=${cont}`
    );
    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const buscarTrailerPelicula = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    const videos = response.data.results;
    const trailer = videos.filter((video) => video.type === "Trailer");

    return {
      trailer,
      status: response.status,
    };
  } catch (e) {
    console.log(e);
  }
};

export const filtrarPeliculas = async (idGenre, cont) =>{
  try {
    const response = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${idGenre}&page=${cont}`)
    return (await response).data.results;
  } catch (e) {
    console.log(e);
  }
}

export const obtenerListaGenerosPeliculas = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );

    const listaGeneros = response.data.genres;
    return listaGeneros;
  } catch (error) {
    console.error('Error en la petición:', error);
  }
};

export const obtenerPeliculasRelacionadas = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
    );
    return data.results;
  } catch (e) {
    console.log(e);
    return [];
  }
};

// *Series
export const obtenerSeries = async (cont) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?page=${cont}`, // Utiliza /discover/tv para obtener las series
      {
        params: {
          api_key: apiKey, // Asegúrate de tener la variable apiKey definida y asignada con tu clave de API
        },
      }
    );

    const responseData = {
      status: response.status,
      data: response.data.results,
    };

    return responseData;
  } catch (e) {
    console.log(e);
  }
};

export const buscarSeries = async (info, cont) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${info}&page=${cont}`
    );
    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const obtenerSerie = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const buscarTrailerSerie = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos`, // Utiliza /tv en lugar de /movie para series de televisión
      {
        params: {
          api_key: apiKey, // Asegúrate de tener la variable apiKey definida y asignada con tu clave de API
        },
      }
    );

    const videos = response.data.results;
    const trailer = videos.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return {
      trailer,
      status: response.status,
    };
  } catch (e) {
    console.log(e);
  }
};

export const obtenerListaGenerosSeries = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
    );

    const listaGeneros = response.data.genres;
    return listaGeneros;
  } catch (error) {
    console.error('Error en la petición:', error);
  }
};

export const filtrarSeries = async (idGenre, cont) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${idGenre}&page=${cont}`);
    return response.data.results;
  } catch (e) {
    console.log(e);
  }
};

export const obtenerSeriesRelacionadas = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}`
    );
    return data.results;
  } catch (e) {
    console.log(e);
  }
};
// *Peliculas y series

export const obtenerPelisYSeries = async (info, cont) => {
  try {
    const [moviesRes, seriesRes] = await axios.all([
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${cont}&query=${info}&sort_by=popularity.desc`),
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&page=${cont}&query=${info}&sort_by=popularity.desc`)
    ]);

    const movies = moviesRes.data.results;
    const series = seriesRes.data.results;
    const result = movies.concat(series);
    
    return result;
  } catch (e) {
    console.log(e);
  }
};

// *Reparto de peliculas y series

export const obtenerReparto = async (type, id) =>{
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`);

    return data.cast;

  } catch (e) {
    console.log(e);
  }
}

