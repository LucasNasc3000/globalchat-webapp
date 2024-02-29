/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { isEmail } from "validator";
import { Link } from "react-router-dom";
import { Container } from "../../styles/GlobalStyles";
import { Form, Title } from "./styled";
import axios from "../../services/axios";
import * as actions from "../../store/modules/auth/actions";

// O input não precisa de id por estar dentro de label, que já tem o nome do campo no htmlFor
// O email, nome e id do usuário podem ser usados neste componente ateravés do useSelector, que
// acessa esses dados que são armazenados no redux (pasta auth) após o login.
export default function Profile() {
  const userId = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // emailStored, id, nomeStored serão as dependências do useEffect
  // Se o usuário não estiver logado as demais linhas depois da 33 não serão executadas
  /* Se estiver logado a variável email receberá o valor de emailStored, o valor do email guardado
     no objeto user, no reducer do diretório auth. Já o valor da variável nome virá de uma pesquisa direcionada
     à base de dados, como consta na linha 37. O useEffect onde está essa função será constantemente executado para
     que os dados do usuário estejam sempre na tela. Por este motivo que foram adicionadas as dependências ao useEffect */

  useEffect(() => {
    if (!userId) return;

    async function GetUserName() {
      try {
        const userName = await axios.get(`/users/search/name/${nomeStored}`);
        setNome(userName.data[0].nome);
      } catch (e) {
        toast.error("Erro ao tentar obter o nome do usuário");
      } finally {
        setEmail(emailStored);
      }
    }
    GetUserName();
  }, [nomeStored, emailStored, userId]);

  /* Validação do front-end. Nesta função é feita a verificação da quantidade de linhas nos inputs responsáveis
     pelo nome e senha. Já o email será validado usando a dependência isEmail. (A senha e o nome também têm suas
     validações no back-end, principalmente a senha) */
  async function handleSubmit(e) {
    e.preventDefault();
    let FormErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      FormErrors = true;
      toast.error("O nome deve ter entre 3 e 255 caracteres");
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

    // Ação disparada para a realização da operação PUT no back-end, mediada pelo react-redux
    /* O usuário é deslogado por questões de segurança e por que ele não conse-
       guiria usar o chat, pois o email é necessário para gerar o JWT, email este que
       não será mais válido após o usuário mudar através do form deste componente.
        Isso é feito por meio da condicional if, na linha 84, onde o email armazenado
        no reducer da pasta auth é comparado com o email enviado para a action
        registerRequest, na linha 83. Como o email no reducer não muda enquano o usuário
        estiver logado, logo ele será diferente do novo email que o usuário enviar pelo
        form (linha 83) e a ação loginFailure será disparada e o login será desfeito.
    */
    dispatch(actions.registerRequest({ userId, nome, email, password }));
    if (emailStored !== email) dispatch(actions.loginFailure());
  }

  /* Form que mostrará os dados atuais do usuário, vindos do objeto user no reducer da pasta auth, que
     sua vez vieram do login feito pelo usuário antes de ele entrar na aplicação. Neste form o usuário
     também colocará seus novos dados quando quiser muda-los. */
  return (
    <Container>
      <Title>Editar dados</Title>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome aqui"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escolha um email"
          />
        </label>
        <p className="minitext">
          Caso você deseje mudar seu email, por razões de segurança, será
          deslogado automáticamente e terá que fazer login denovo
        </p>

        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha"
          />
        </label>
        <p className="minitext">
          Mude a senha ou digite a atual para confirmar as alterações de seus
          dados.
        </p>

        <Link to={`/profile/endAccount/${userId}`} className="endAccount">
          Encerrar conta
        </Link>
        <button type="submit" className="saveBtn">
          Salvar
        </button>
      </Form>
    </Container>
  );
}
