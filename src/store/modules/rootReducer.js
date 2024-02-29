import { combineReducers } from "redux";

import auth from "./auth/reducer";

export default combineReducers({
  auth,
});

// Todos os reducers da aplicação serão importados e combinados aqui
