export const initialState = {
  unchainedAppData: {},
  isPageDataLoading: false
};

export const getUnchainedAppData = (state = initialState) => state.unchainedAppData;
export const isPageDataLoading = (state = initialState) => state.isPageDataLoading;
