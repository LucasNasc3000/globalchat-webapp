import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { get } from "lodash";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

// Parar e começar o servidor quando trocar um nome ou valor no arquivo env

export default function DeleteModal() {
  const emailStored = useSelector((state) => state.auth.user.email);
  if (emailStored !== process.env.REACT_APP_ADMIN_USER) history.push("/");
  /* usar uma arrow function no button em vez de chamar a função diretamente impede que a mesma seja executada
  automaticamente, tornando assim sua execução dependente do método onClick ser disparado pelo usuário */
  const params = useParams("adminpage/users/:id/ban");
  const { id } = params;
  let isbanned = false;

  async function handleBan(e) {
    e.preventDefault();
    isbanned = true;

    try {
      await axios.put(`/users/${id}`, {
        isbanned,
      });
      history.push("/adminpage/users");
    } catch (err) {
      const status = get(err, "response.status", 0);

      if (status === 401) {
        toast.error("Você precisa fazer login");
        history.push("/login");
      } else {
        toast.error("Ocorreu um erro ao banir o usuário");
      }
    }
  }

  const returnAdminPage = () => {
    return history.goBack();
  };

  return (
    <Container>
      <div>
        <p>{`Deseja realmente banir o usuário ${id}?`}</p>
      </div>
      <button type="button" className="banBtn" onClick={(e) => handleBan(e)}>
        Banir
      </button>
      <button type="button" className="cancelBtn" onClick={returnAdminPage}>
        Cancelar
      </button>
    </Container>
  );
}
