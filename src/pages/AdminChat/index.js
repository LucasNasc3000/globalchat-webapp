/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "../../styles/GlobalStyles";
import { Form, TextContainer } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

// Este componente é básicamente uma cópia da home (chat dos usuários comuns), com apenas uma função dife-
// rente, a possibilidade de excluir qualquer mensagem (poder de moderação).
// O email e o id do usuário podem ser usados neste componente ateravés do useSelector, que
// acessa esses dados que são armazenados no redux (pasta auth) após o login.
export default function Home() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user.id);
  const emailStored = useSelector((state) => state.auth.user.email);
  const [textcontent, setTextcontent] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  let msghour = "";

  /* Aqui é realizada uma verificação do email armazenado no redux, para o usuário comum não
     conseguir acessar a página do administrador. Se o usuário não for o administrado, ele é
     automáticamente redirecionado para a home, onde está o chat dos usuários comuns. */
  if (emailStored !== process.env.REACT_APP_ADMIN_USER) history.push("/");

  // Se o usuário for o administrador e assim permanecer na home da adminpage, a variável
  // userEmail receberá o valor do email que vêm do redux (objeto user, pasta auth).
  useEffect(() => {
    if (!user_id) return;

    setUseremail(emailStored);
  }, [emailStored, user_id]);

  useEffect(() => {
    function AdminOut() {
      setTimeout(() => {
        dispatch(actions.loginFailure());
      }, 300000);
      toast.error("Tempo limite de uso da conta de admin atingido");
    }
    AdminOut();
  });

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

  function SetMessageTime() {
    const data = new Date();

    msghour = data.toLocaleTimeString("pt-BR", {
      hour12: false,
    });
    return msghour;
  }

  async function handleClick(e) {
    e.preventDefault();

    let formErrors = false;

    if (textcontent.length < 1 || textcontent.length > 1000) {
      toast.error("As mensagens não devem ter entre 1 e 1000 caracteres");
      formErrors = true;
    }

    // eslint-disable-next-line no-useless-return
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

  getData();

  /* No component TextContainer, por meio da função map utilizada na variável userMessage, os dados relevantes para
     os usuários da aplicação (usuário comum e moderador/administrador) são obtidos e renderizados de uma única vez com
     o uso de javascript e JSX.
     Neste componente, além dos dados relevantes existe um link do react que redireciona o administrador para um "pseudo-modal",
     que é outro componente que é renderizado para realizar a função de um modal.
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
              <p className="msghour">{msg.msghour.slice(0, 5)}</p>
              <Link
                to={`/adminpage/Texts/${msg.id}/delete`}
                className="msgDelete"
              >
                Excluir
              </Link>
            </div>
          );
        })}
      </TextContainer>
    </Container>
  );
}
