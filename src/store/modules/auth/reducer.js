import * as types from "../types";
import axios from "../../../services/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: {},
  isLoading: false,
};

// O reducer escuta todas as actions, não só as definidas nesta aplicação. Por isso é possível usar a action persist/REHYDRATE para
// salvar os dados de initialState no localStorage e quando a página for atualizada, devolver estes dados para initialState, realizando
// assim a persistência de dados.
// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    }

    case types.LOGIN_FAILURE: {
      // O estado nunca é alterado e sim copiado e a cópia com as alterações é que retorna
      // garante que o token do usuário deslogado não permaneça ativo
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }

    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_UPDATED_SUCCESS: {
      const newState = { ...state };
      // Nome e email estão sendo salvos no estado
      newState.user.nome = action.payload.nome;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_CREATED_SUCCESS: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    default:
      return state;
  }
}
