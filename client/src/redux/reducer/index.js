// Importa las action types acá
import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_DETAILS,
  DELETE_DETAIL,
  GET_PLATFORMS,
  GET_NAME,
  GET_GENRES,
  ORDER_BY_NAME,
  POST_VIDEOGAME,
  FILTER_MASTER,
  CLEAR_MSG,
  ORDER_BY_RATING,
  ERROR_MSG,
} from '../actions';

const initialState = {
  videogames: [],
  allVideogames: [],
  videogameDetail: {},
  platforms: [],
  genres: [],
  message: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAME_DETAILS:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case DELETE_DETAIL:
      return {
        ...state,
        videogameDetail: {},
      };
    case GET_PLATFORMS:
      let platforms = state.videogames
        .slice(0, 100)
        .map((e) => e.platforms[0].platform.name);
      const uniquePlatforms = [...new Set(platforms)];

      return {
        ...state,
        platforms: uniquePlatforms,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case FILTER_MASTER:
      const allVideogames = state.allVideogames;

      let payload = action.payload;

      let filtered1 = allVideogames.filter((videogame) => {
        if (payload[0] === 'All') return allVideogames;
        return videogame.genres.find((e) => e.name === payload[0]);
      });
      let filtered2 = filtered1.filter((videogame) => {
        if (payload[1] === 'All') return filtered1;
        return videogame.platforms.find((e) => e.platform.name === payload[1]);
      });
      let filtered3 = filtered2.filter((videogame) => {
        if (payload[2] === 'All') return filtered2;
        if (payload[2] === 'db') return videogame.createdInDb;
        if (payload[2] === 'api') return !videogame.createdInDb;
      });
      return {
        ...state,
        videogames: filtered3,
      };
    case ORDER_BY_NAME:
      let sortedArr =
        action.payload === 'asc'
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: action.payload === 'All' ? state.videogames : sortedArr,
      };
    case ORDER_BY_RATING:
      let sortedRating =
        action.payload === 'lower'
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: action.payload === 'All' ? state.videogames : sortedRating,
      };
    case POST_VIDEOGAME:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_MSG:
      return {
        ...state,
        message: [],
      };
    case ERROR_MSG:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
