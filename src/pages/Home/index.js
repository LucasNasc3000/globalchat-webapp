/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { Container } from "../../styles/GlobalStyles";
import { Form, TextContainer } from "./styled";
import axios from "../../services/axios";
import * as actions from "../../store/modules/auth/actions";

// No componente home, em resumo, a lógica utilizada é o registro das mensagens seguido da obtenção das mesmas, juntamente
// com todas as outras que estão salvas na base de dados, assim é possível exibir as mensagens logo que elas são enviadas
// pelos usuários.
// O email e o id do usuário podem ser usados neste componente ateravés do useSelector, que
// acessa esses dados que são armazenados no redux (pasta auth) após o login.
export default function Home() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user.id);
  const emailStored = useSelector((state) => state.auth.user.email);
  const [textcontent, setTextcontent] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  let msghour = "";

  // Função responsável por verificar se o usuário que fez login está ou não banido e caso esteja ele é deslogado pelo
  // disparo da action loginFailure e redirecionado para a página de login.
  /* A verificação é feita por meio de uma pesquisa na base de dados, no caminho de emails, usando o email armazenado
     no redux, dentro do objeto user, na pasta auth. Este email é definido no momento em que o usuário faz login.
     Depois de obter os dados do usuário é realizada a verificação do campo isbanned, dentro do objeto data, que por
     sua vez está dentro do array contendo outras informações além dos dados do usuário que são recebidas caso a requi-
     sição à API seja bem sucedida.
      O campo isbanned é booleano. Se ele estiver como true o usuário está banido, se estiver false não está.
  */
  async function getUserData() {
    try {
      const userData = await axios.get(`/users/search/email/${emailStored}`);
      if (userData.data[0].isbanned === true) {
        toast.error("Você foi banido");
        dispatch(actions.loginFailure());
      }
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }
    }
  }

  // Se o usuário não estiver banido e consequentemente permanecer na home, que é o chat a variável
  // userEmail receberá o valor do email que vêm do redux (objeto user, pasta auth).
  useEffect(() => {
    if (!user_id) return;

    setUserEmail(emailStored);
  }, [emailStored, user_id]);

  /* Esta função obtêm todos os dados da tabela responsável pelas mensagens e os dados relativos às mesmas.
      Os dados recebidos da API da tabela das mensagens é colocado da variável userMessage.
  */
  async function getData() {
    try {
      const message = await axios.get("/text");
      setUserMessage(message.data);
    } catch (e) {
      toast.error("Erro de conexão");
      console.log(e);
    }
  }

  // Função que obtêm a hora e o minuto em que a mensagem foi enviada
  function SetMessageTime() {
    const data = new Date();

    msghour = data.toLocaleTimeString("pt-BR", {
      hour12: false,
    });
    return msghour;
  }

  // Função executada quando o usuário envia uma mensagem
  async function handleClick(e) {
    e.preventDefault();

    let formErrors = false;

    if (textcontent.length < 1 || textcontent.length > 1000) {
      toast.error("As mensagens não devem ter entre 1 e 1000 caracteres");
      formErrors = true;
    }

    if (formErrors) return;

    try {
      SetMessageTime();
      await axios.post("/text", {
        textcontent,
        useremail,
        user_id,
        msghour,
      });
      setTextcontent("");
    } catch (err) {
      const errors = get(err, "response.data.errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }
    }
  }
  getUserData();
  getData();

  /* No component TextContainer, por meio da função map utilizada na variável userMessage, os dados relevantes para
     os usuários da aplicação (usuário comum e moderador/administrador) são obtidos e renderizados de uma única vez com
     o uso de javascript e JSX.
     */
  return (
    <Container>
      <Form action="" onSubmit={(e) => handleClick(e)}>
        <input
          type="text"
          value={textcontent}
          onChange={(e) => setTextcontent(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </Form>
      <TextContainer>
        {userMessage.map((msg) => {
          return (
            <div key={user_id}>
              <div className="email">{msg.useremail}</div>
              <div className="msg">{msg.textcontent}</div>
              <div className="hour">{msg.msghour.slice(0, 5)}</div>
            </div>
          );
        })}
      </TextContainer>
    </Container>
  );
}

// <a href="https://www.flaticon.com/br/icones-gratis/globo" title="globo ícones">Globo ícones criados por Creative Stall Premium - Flaticon</a>
