/* eslint-disable import/no-extraneous-dependencies */
import styled from "styled-components";
import * as colors from "../../config/colors";

export const Title = styled.h1`
  color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;
  }

  .endAccount {
    position: relative;
    width: 90px;
    bottom: -3px;
    background-color: red;
    color: white;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    padding: 2px;
  }

  .endAccount:hover {
    filter: brightness(65%);
  }

  .saveBtn {
    position: relative;
    bottom: -10px;
  }

  .minitext {
    position: relative;
    padding: 3px;
    bottom: 5px;
    background-color: #c0c0c0;
    border-radius: 4px;
    color: #fff;
    filter: brightness(90%);
  }

  &:focus {
    border: 1px solid ${colors.primaryColor};
  }
`;
