/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Verifica se o usuário não está logado e se a rota que ele quer acessar é fechada
  // Caso as duas condições sejam verdadeiras o usuário será redirecionado para a página de login com pathname: "/login"
  // Depois que o usuário logar, com  state: { prevPath: rest.location.pathname } o usuário será redirecionado para a página que ele tentou acessar. Isso caso
  // o usuário tenha recebido um erro que o deslogou.
  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: "/login", state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
