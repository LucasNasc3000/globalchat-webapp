/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "./styled";
import * as actions from "../../store/modules/auth/actions";
import history from "../../services/history";
import logo from "../../uploads/logoChat2.png";

// O useSelector é uma função seletora que extrai conteúdo do store
export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.user.id);
  const emailStored = useSelector((state) => state.auth.user.email);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push("/login");
  };

  return (
    <Nav>
      <img src={logo} alt="Logo" className="logo" />
      {emailStored === process.env.REACT_APP_ADMIN_USER ? (
        <>
          <Link to="/adminpage/users" class="adminUsers">
            Usuários
          </Link>
          <Link to="/adminpage" class="adminChat">
            Chat
          </Link>
          <Link onClick={handleLogout} to="/logout" class="logoutAdmin">
            Sair
          </Link>
          <FaUserCircle size={26} color="#66ff33" class="loggedAdmin" />
        </>
      ) : (
        ""
      )}

      {isLoggedIn && emailStored !== process.env.REACT_APP_ADMIN_USER ? (
        <>
          <Link to={`/profile/${userId}`} class="profile">
            Perfil
          </Link>
          <Link to="/" class="userChat">
            Chat
          </Link>
          <Link onClick={handleLogout} to="/logout" class="logoutUser">
            Sair
          </Link>
        </>
      ) : (
        ""
      )}

      {!isLoggedIn ? (
        <>
          <Link to="/register" class="userRegister">
            Cadastre-se
          </Link>
          <Link to="/login" class="userLogin">
            Login
          </Link>
        </>
      ) : (
        ""
      )}

      {isLoggedIn && <FaUserCircle size={36} color="#66ff33" class="logged" />}
    </Nav>
  );
}
