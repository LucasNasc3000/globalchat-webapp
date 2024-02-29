/* Os estados neste arquivo são globais, são os mesmos em qualquer lugar da aplicação. É isso que o redux faz.
   E isso é necessário quando o estado de algum componente precisaria passar por vários componentes */
/* eslint-disable import/no-extraneous-dependencies */
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import persistStore from "redux-persist/es/persistStore";
import persistedReducers from "./modules/reduxPersist";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

// Reducer deve sempre retornar um estado (atual ou um novo estado). Ele também não fará nada enquanto não não ouvir ações
// Todos os reducers ouvirão todas as ações disparadas, cabe ao desenvolvedor escutar uma ação específica manipular a ação de um estado baseado nessa ação escutada
// As actions são objetos que têm um tipo e esse tipo vai comunicar ao reducer o que ele deve fazer e ele funciona de acordo com a orientação dessas actions
// O reducer comumente é configurado desta forma. Assim, somente vai acontecer algo quando a primeira ação no switch for disparada no login e ouvida aqui
// O estado (state parâmetro) atual da aplicação nunca é alterado diretamente, e sim copiado para um novo estado, então esse novo estado é alterado e retornado
// eslint-disable-next-line default-param-last
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
