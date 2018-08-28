import {
  resultOK,
} from 'api/utils';

import {
  getUnchainedAppData,
  setLocalToken,
  removeLocalToken
} from 'api/auth';

// import {
//   removeQueryParams
// } from 'utils';

export const UNCHAINED_APP_DATA = 'UNCHAINED_APP_DATA';
export const IS_UNCHAINED_APP_DATA_LOADING = 'IS_UNCHAINED_APP_DATA_LOADING';

export function GET_UNCHAINED_APP_DATA(page, token) {
  return async (dispatch) => {
    setLocalToken(token);
    dispatch({ type: IS_UNCHAINED_APP_DATA_LOADING, data: true });
    const result = await getUnchainedAppData(page);
    dispatch({ type: IS_UNCHAINED_APP_DATA_LOADING, data: false });
    if (resultOK(result)) {
      dispatch({ type: UNCHAINED_APP_DATA, data: result.data.data });
      // removeQueryParams();
      return null;
    }
    dispatch({ type: UNCHAINED_APP_DATA, data: null });
    removeLocalToken();
    return null;
  };
}
