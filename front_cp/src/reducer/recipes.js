import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  recipeList: [],
};

export const ActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const recipeReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        recipeList: action.payload.recipes,
        // image_url: action.payload.methods,
      };
    default:
      throw new Error();
  }
}
