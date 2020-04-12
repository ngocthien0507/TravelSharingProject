import api from '../../services/APIservice';
import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  GET_ALL: 'GET_ALL',
  GET_ALL_FAIL: 'GET_ALL_FAIL',
  RESET: 'RESET',
};
async function getToken() {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.log('get token has error');
  }
}
export const actions = {
  get_all: () => {
    return async dispatch => {
      try {
        const url = '/api/travel/all';
        const token = await getToken();
        const result = await api.get(url, token);
        if (result.status === 200) {
          dispatch({
            type: types.GET_ALL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        } else {
          dispatch({
            type: types.GET_ALL_FAIL,
            payload: {
              data: result.data.data,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.GET_ALL_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  reset: () => {
    return async dispatch => {
      dispatch({
        type: types.RESET,
      });
    };
  },
  updateLoading: (status, type) => ({
    type: type,
    payload: {error: status},
  }),
};
const initialState = {
  data: null,
  type: null,
  token: null,
  status: null,
  error: null,
};
export const allLichTrinhReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.GET_ALL: {
      return {
        type: types.GET_ALL,
        data: payload.data,
      };
    }
    case types.GET_ALL_FAIL: {
      return {
        type: types.GET_ALL_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.RESET: {
      return {
        type: types.RESET,
        data: null,
        status: null,
      };
    }
    default: {
      return state;
    }
  }
};
