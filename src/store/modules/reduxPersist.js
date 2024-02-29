/* eslint-disable import/no-extraneous-dependencies */
// O persistReducer faz a persistência dos dados (salva) automaticamente, o que permite que os dados não sejam apagados quando a página for atualizada
// Este storage irá salvar os dados no local storage do navegador
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// A primeira das três chaves, key, receberá o nome da aplicação
// Será salvo pelo persist os módulos que estiverem dentro da whitelist. Aqui no caso será example, que está dentro do rootReducer
export default (reducers) => {
  const persistReducers = persistReducer(
    {
      key: "CHAT",
      storage,
      whitelist: ["auth"],
    },
    reducers
  );

  return persistReducers;
};
