/* eslint-disable import/no-extraneous-dependencies */
import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { get } from "lodash";
import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";

// O call chama uma função (pode ser normal ou geradora) que retorna uma promise (aqui são os dados do usuário e o token)
// O put dispara uma ação
// eslint-disable-next-line require-yield
function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/tokens", payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success("Logado!");

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    if (payload.password === process.env.REACT_APP_ADMIN_PASS) {
      history.push("/adminpage");
    } else {
      history.push("/");
    }
  } catch (e) {
    toast.error("Usuário ou senha inválidos");

    yield put(actions.loginFailure());
  }
}

// Esta função recupera o token que desapareceria do cabeçalho depois que o login fosse feito e o site atualizado
// O terceiro parâmetro de get será um valor padrão
function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// Esta função atualiza dos dados do usuário
// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { userId, nome, email, password } = payload;

  try {
    if (userId) {
      yield call(axios.put, `/users/${userId}`, {
        nome,
        email,
        password,
      });
      toast.success("Dados atualizados com sucesso");
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      // Caso respose seja necessário deve ser usado como uma variável dentro deste try
      // history.push("/login"); redireciona o usuário, depois de fazer o cadastro para a página de login
      // setisLoading(true);
      yield call(axios.post, "/users", {
        nome,
        email,
        password,
      });
      toast.success("Conta criada com sucesso");
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push("/login");
    }
  } catch (e) {
    const errors = get(e, "response.data.errors", []);
    // eslint-disable-next-line no-unused-vars
    const status = get(e, "response.status", 0);

    if (status === 401) {
      toast.error("Você precisa fazer login novamente");
      yield put(actions.loginFailure());
      return history.push("/login");
    }

    if (errors.legth > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error("Erro desconhecido");
    }

    yield put(actions.registerFailure());
  }
}

// O takeLatest recebe no primeiro parâmetro a ação que vai ser ouvida e no segundo a função que vai ser executada
// Quando se usa o takeLatest qualquer action anterior é cancelada para que a função do segundo parâmetro seja executada no lugar
// O all faz com que o middleware execute vários efeitos em paralelo e espera todos para finalizar o processo
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
