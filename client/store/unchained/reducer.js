import { initialState } from './selectors';

import {
  USER_AUTH_UNCHAINED_TOKEN_VALID,
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH_UNCHAINED_TOKEN_VALID:
      return {
        ...state,
        unchainedTokenValid: action.data
      };
    default:
      return state;
  }
};
