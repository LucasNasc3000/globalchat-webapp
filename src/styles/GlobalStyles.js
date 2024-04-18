/* eslint-disable import/no-extraneous-dependencies */
import { styled, createGlobalStyle } from "styled-components";
import * as colors from "../config/colors";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    overflow-y: auto;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 160ms;
  }

  button:hover {
    filter: brightness(86%);
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  /* Para trocar a cor das notificações do toastify -->
  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.successColor};
  }
  */
`;

export const Container = styled.section`
  max-width: 600px;
  max-height: 580px;
  background: #808080;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media only screen and (min-width: 600px) {
    section {
      max-width: 300px;
      max-height: 300px;
      margin-left: 100px;
    }
  }
`;
