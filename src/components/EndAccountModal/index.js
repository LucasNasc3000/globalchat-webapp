import React from "react";
import { toast } from "react-toastify";
import { get } from "lodash";

import { useParams } from "react-router-dom";
import { Container } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

export default function EndAccountModal() {
  const params = useParams("profile/endAccount/:id");
  const { id } = params;

  async function handleDelete(e) {
    e.preventDefault();

    try {
      await axios.delete(`/users/${id}`);
      history.push("/login");
      toast.success("Conta deletada");
    } catch (err) {
      const status = get(err, "response.status", 0);

      if (status === 401) {
        toast.error("Você precisa fazer login");
        history.push("/login");
      } else {
        toast.error("Ocorreu um erro ao encerrar a conta");
      }
    }
  }

  const returnProfile = (e) => {
    e.preventDefault();
    return history.goBack();
  };

  return (
    <Container>
      <div>
        <p>
          Deseja realmente excluir sua conta? Esta ação não poderá ser desfeita
          e seus dados serão apagados permanentemente até que você crie outra
          conta
        </p>
      </div>
      <button
        type="button"
        className="deleteBtn"
        onClick={(e) => handleDelete(e)}
      >
        Excluir
      </button>
      <button
        type="button"
        className="cancelBtn"
        onClick={(e) => returnProfile(e)}
      >
        Cancelar
      </button>
    </Container>
  );
}
