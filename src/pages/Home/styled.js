/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import * as colors from "../../config/colors";

export const TextContainer = styled.div`
  margin-top: -510px;
  height: 400px;
  overflow: auto;
  max-height: 400px;

  div {
    display: flex;
    margin: auto;
    margin-left: 10px;
    border-radius: 10px;
    max-height: 200px;
    width: 210px;
    background-color: ${colors.primaryColor};
    padding: 4px 0;
  }

  div + div {
    margin-top: 15px;
  }

  .email {
    margin-left: 0px;
    font-weight: bold;
    font-size: 12px;
    margin-top: -4px;
    background-color: #6495ed;
    border-radius: 10px;
    height: 18px;
    padding-left: 6px;
    padding-top: 2px;
    width: 215px;
  }

  .msg {
    font-size: 15px;
    word-break: normal;
    margin: auto;
    margin-top: 15px;
    margin-left: -140px;
    max-width: 210px;
    max-height: 150px;
  }

  .hour {
    position: relative;
    left: -5px;
    bottom: -5px;
    width: 60px;
    font-size: 12px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  height: 70px;
  width: 450px;
  margin-top: 450px;
  margin-left: 40px;
  align-items: center;
  position: sticky;
  z-index: 1;
  border-radius: 8px;
  background-color: ${colors.primaryColor};
  box-shadow: 2px 1.5px #363636;

  input {
    height: 30px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 5px;
    border-radius: 4px;
    margin-top: 0px;
    margin-left: 36px;
  }

  button {
    background-color: ${colors.primaryDarkColor};
    width: 60px;
    height: 27px;
    width: 100px;
    border: none;
    color: ${colors.primaryColor};
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    font-size: 16;
    justify-content: center;
    padding: 5px;
    margin-left: 50px;
  }
`;
