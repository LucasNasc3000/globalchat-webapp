/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isEmail } from "validator";
import { Container } from "../../styles/GlobalStyles";
import { Form, Title } from "./styled";
import * as actions from "../../store/modules/auth/actions";

// O input não precisa de id por estar dentro de label, que já tem o nome do campo no htmlFor
export default function Register() {
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Validação do front-end. Neste método é feita a verificação da quantidade de linhas nos inputs responsáveis
     pelo nome e senha. Já o email será validado usando a dependência isEmail. A senha aqui só têm a sua validação
     pela quantidade de caracteres, assim como no back-end. Há uma quantidade mínima de caracteres para a criação
     da senha, nada além disso. A validação da senha só é feita no login. */
  async function handleSubmit(e) {
    e.preventDefault();
    const whiteSpaceRegex = /\s/;
    let FormErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      FormErrors = true;
      toast.error("O nome deve ter entre 3 e 255 caracteres");
    }

    if (whiteSpaceRegex.test(nome)) {
      FormErrors = true;
      toast.error("O nome não pode conter espaços em branco");
    }

    if (!isEmail(email)) {
      FormErrors = true;
      toast.error("E-mail inválido");
    }

    if (password.length < 8 || password.length > 60) {
      // eslint-disable-next-line no-unused-vars
      FormErrors = true;
      toast.error("A senha deve ter entre 6 e 50 caracteres");
    }

    if (FormErrors) return;

    /* Depois da validação do front-end a ação registerRequest é disparada e os dados são enviados
       ao sagas, onde é verificado se existe um id de usuário no reducer de auth. Se não houver, uma
       nova conta é criada com os dados enviados por este componente. Depois de criada a conta, o usuário
       é redirecionado para a página de login.
    */
    dispatch(actions.registerRequest({ nome, email, password }));
  }

  return (
    <Container>
      <Title>Cadastre-se</Title>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu primeiro nome"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escolha um email"
          />
        </label>

        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha"
          />
        </label>

        <button type="submit">Criar conta</button>
      </Form>
    </Container>
  );
}
