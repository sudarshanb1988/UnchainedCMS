import { initialState } from './selectors';

import {
  UNCHAINED_APP_DATA,
  IS_UNCHAINED_APP_DATA_LOADING
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case UNCHAINED_APP_DATA:
      return {
        ...state,
        unchainedAppData: action.data
      };
    case IS_UNCHAINED_APP_DATA_LOADING:
      return {
        ...state,
        isPageDataLoading: action.data
      };
    default:
      return state;
  }
};
