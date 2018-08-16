import {
  resultOK,
} from 'api/utils';

import {
  verifyUnchainedTokenAPI,
} from 'api/auth';

export const USER_AUTH_UNCHAINED_TOKEN_VALID = 'USER_AUTH_UNCHAINED_TOKEN_VALID';

export function USER_AUTH_VERIFY_UNCHAINED_TOKEN(token) {
  return async (dispatch) => {
    const result = await verifyUnchainedTokenAPI(token);

    if (resultOK(result)) {
      dispatch({ type: USER_AUTH_UNCHAINED_TOKEN_VALID, data: true });
      // return null;
    }
    dispatch({ type: USER_AUTH_UNCHAINED_TOKEN_VALID, data: false });
    // return null;
  };
}
