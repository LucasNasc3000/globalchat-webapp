import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
  height: 500px;
  top: 100;
  left: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  div {
    display: flex;
    position: absolute;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 1;
    width: 450px;
    height: 330px;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    left: 400px;
  }

  p {
    display: flex;
    font-size: 28px;
    font-weight: bold;
    margin-top: 30px;
  }

  .deleteBtn {
    display: flex;
    position: absolute;
    background-color: red;
    z-index: 1;
    margin-left: 650px;
    bottom: 230px;
  }

  .cancelBtn {
    display: flex;
    position: absolute;
    z-index: 1;
    margin-left: 880px;
    bottom: 230px;
  }
`;
