import styled from "styled-components";
// import * as colors from "../../config/colors";

export const AdminView = styled.section`
  max-width: 780px;
  max-height: 540px;
  overflow: auto;
  background: #808080;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  span {
    margin-left: 80px;
  }
`;

export const Form = styled.form`
  height: 100px;
  width: 300px;
  position: sticky;

  .AdminSearchInput {
    position: relative;
    width: 215px;
    height: 25px;
    border-radius: 2px;
    border-style: none;
    left: 230px;
  }

  .searchLink {
    position: relative;
    left: 240px;
    top: 10px;
  }

  .searchLink:hover {
    filter: brightness(80%);
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 550px;

  span {
    display: flex;
    position: relative;
    max-width: 300px;
    justify-content: space-between;
    border-bottom: 0.5px solid #fff;
    margin-left: 100px;
    margin-top: 3px;
    top: 22px;
  }

  .labels {
    font-weight: bold;
    border-bottom: 0.5px solid #fff;
    display: flex;
    position: relative;
    justify-content: space-between;
    margin-left: 0px;
    margin-top: 3px;
    top: -66px;
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
    left: 450px;
    bottom: 112px;
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
    left: 560px;
    bottom: 160px;
    width: 110px;
  }
`;
