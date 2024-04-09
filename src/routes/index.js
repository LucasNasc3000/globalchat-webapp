/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Switch } from "react-router-dom";

import MyRoute from "./MyRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AdminPage from "../pages/AdminPage";
import AdminChat from "../pages/AdminChat";
import UserSearch from "../pages/UserSearch";
import Page404 from "../pages/Page404";
import BanModal from "../components/BanModal";
import DeleteModal from "../components/DeleteModal";
import EndAccountModal from "../components/EndAccountModal";

// O switch faz com que somente uma rota seja chamada por vez
// <Route path="/" component={Login} /> faz com que o componente Login seja renderizado na raiz da aplicação (a primeira página a ser vista)
// path="/" verifica se o caminho dentro nas aspas realmente existe nas rotas. O exact detecta qualquer caractere diferente do caminho indicado em path=""
export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/profile/:id" component={Profile} isClosed />
      <MyRoute exact path="/adminpage/" component={AdminChat} isClosed />
      <MyRoute exact path="/adminpage/users/" component={AdminPage} isClosed />
      <MyRoute
        exact
        path="/adminpage/users/:id/ban"
        component={BanModal}
        isClosed
      />
      <MyRoute
        exact
        path="/adminpage/users/search/:searchBy/:searchValue"
        component={UserSearch}
        isClosed
      />
      <MyRoute
        exact
        path="/adminpage/Texts/:id/delete"
        component={DeleteModal}
        isClosed
      />
      <MyRoute
        exact
        path="/profile/endAccount/:id"
        component={EndAccountModal}
        isClosed
      />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
