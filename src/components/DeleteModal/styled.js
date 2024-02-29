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
    border-radius: 8px;
    z-index: 1;
    width: 400px;
    height: 250px;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    left: 425px;
  }

  p {
    display: flex;
    font-size: 28px;
    font-weight: bold;
    margin-top: 60px;
  }

  .deleteBtn {
    display: flex;
    position: absolute;
    background-color: red;
    z-index: 1;
    margin-left: 660px;
    bottom: 215px;
  }

  .cancelBtn {
    display: flex;
    position: absolute;
    z-index: 1;
    margin-left: 860px;
    bottom: 215px;
  }
`;
