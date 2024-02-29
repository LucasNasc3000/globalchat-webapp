/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;

  a {
    color: #fff;
    font-weight: bold;
  }
  .logoutAdmin:hover {
    color: #c0c0c0;
  }
  .logoutAdmin {
    position: relative;
    left: 90px;
    top: 41px;
  }
  .logoutUser {
    position: relative;
    left: 500px;
    top: 40px;
  }
  .logoutUser:hover {
    color: #c0c0c0;
  }
  .userRegister {
    position: relative;
    left: 910px;
    margin-top: 28px;
    font-size: 19px;
  }
  .userRegister:hover {
    color: #c0c0c0;
  }
  .userLogin {
    position: relative;
    margin-left: 950px;
    margin-top: 28px;
    font-size: 19px;
  }
  .userLogin:hover {
    color: #c0c0c0;
  }
  .userChat {
    position: relative;
    left: 370px;
    top: 40px;
  }
  .userChat:hover {
    color: #c0c0c0;
  }
  .logged {
    position: relative;
    margin-left: 970px;
    top: 30px;
  }
  .profile {
    position: relative;
    top: 40px;
    left: 490px;
  }
  .profile:hover {
    color: #c0c0c0;
  }
  .adminUsers {
    position: relative;
    margin-top: 40px;
    margin-left: 400px;
  }
  .adminUsers:hover {
    color: #c0c0c0;
  }
  .adminChat {
    position: relative;
    top: 41px;
    left: 43px;
  }
  .adminChat:hover {
    color: #c0c0c0;
  }
  .logo {
    position: relative;
    background-color: #fff;
    height: 95px;
    width: 95px;
    top: 1px;
    left: 10px;
  }
`;
