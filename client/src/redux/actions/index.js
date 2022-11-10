import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_DETAILS = 'GET_VIDEOGAME_DETAILS';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const DELETE_DETAIL = 'DELETE_DEAIL';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_NAME = 'GET_NAME';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const FILTER_MASTER = 'FILTER_MASTER';
export const CLEAR_MSG = 'CLEAR_MSG';
export const ERROR_MSG = 'ERROR_MSG';
//export const SET_MESSAGE = 'SET_MESSAGE';

export const getAllVideogames = () => {
  return async function (dispatch) {
    const datos = await axios('http://localhost:3001/videogames');
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: datos.data,
    });
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    const datos = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({ type: GET_VIDEOGAME_DETAILS, payload: datos.data });
  };
};

export const createVideogame = (payload) => {
  return {
    type: CREATE_VIDEOGAME,
    payload: { ...payload },
  };
};
export const deleteDetailStore = () => {
  return {
    type: DELETE_DETAIL,
  };
};
export const getPlatforms = () => {
  return {
    type: GET_PLATFORMS,
  };
};
export const getName = (name) => {
  return async function (dispatch) {
    try {
      var datos = await axios(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type: GET_NAME,
        payload: datos.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: ERROR_MSG,
        payload: error.response.data,
      });
    }
  };
};
export const getGenres = () => {
  return async function (dispatch) {
    const datos = await axios(`http://localhost:3001/genres`);
    return dispatch({ type: GET_GENRES, payload: datos.data });
  };
};
export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};
export const filterMaster = (genre, platform, origin) => {
  return {
    type: FILTER_MASTER,
    payload: [genre, platform, origin],
  };
};
export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};
export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};
export const orderByRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
};
export const postVideogame = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        'http://localhost:3001/videogames',
        payload
      );
      return dispatch({ type: POST_VIDEOGAME, payload: response.data });
    } catch (error) {
      console.log(error);
      return dispatch({ type: POST_VIDEOGAME, payload: error.response.data });
    }
  };
};
export const clearMessageStatus = () => {
  return {
    type: CLEAR_MSG,
  };
};
