import { createActions, handleActions } from "redux-actions";

const defaultState = {
  accessToken: null,
};

export const { setAccessToken } = createActions({
  SET_ACCESS_TOKEN: (new_value) => ({ new_value }),
});

export default handleActions(
  {
    [setAccessToken]: (state, { payload: { new_value } }) => {
      return { ...state, accessToken: new_value };
    },
  },
  defaultState
);
