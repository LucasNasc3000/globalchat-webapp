import styled from "styled-components";
// import * as colors from "../../config/colors";

export const AdminView = styled.section`
  max-width: 880px;
  max-height: 680px;
  background: #808080;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  span {
    margin-left: 80px;
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;
  overflow: auto;

  span {
    display: flex;
    position: relative;
    max-width: 300px;
    justify-content: space-between;
    border-bottom: 0.5px solid #fff;
    left: 50px;
    margin-top: 3px;
    top: -88px;
  }

  .labels {
    font-weight: bold;
    border-bottom: 0.5px solid #fff;
    display: flex;
    position: relative;
    justify-content: space-between;
    left: -40px;
    margin-top: 3px;
    top: 0px;
    width: 50px;
  }

  .userBan {
    display: flex;
    position: relative;
    justify-content: center;
    color: white;
    background-color: red;
    padding: 15px 22px;
    border-radius: 2px;
    font-weight: 700;
    left: 500px;
    bottom: 137px;
    width: 80px;
    height: 47px;
  }

  .userBan:hover {
    filter: brightness(80%);
  }

  .userBan:hover {
    filter: brightness(80%);
  }

  .banOut {
    display: flex;
    position: relative;
    left: 610px;
    bottom: 185px;
    width: 110px;
  }
`;
