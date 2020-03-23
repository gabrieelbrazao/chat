import { createStore } from "redux";

const INITIAL_STATE = {
  token: null
};

function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "signIn":
      return { token: action.token };
    case "signOut":
      return INITIAL_STATE;
    default:
      return state;
  }
}

const store = createStore(auth);

export default store;
