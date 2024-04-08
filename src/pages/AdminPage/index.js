/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { get } from "lodash";
import { toast } from "react-toastify";
import { UsersContainer, AdminView, Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

// O email do usuário podem ser usado neste componente ateravés do useSelector, que
// acessa esses dados que são armazenados no redux (pasta auth) após o login.
export default function AdminPage() {
  const emailStored = useSelector((state) => state.auth.user.email);

  /* Aqui é realizada uma verificação do email armazenado no redux, para o usuário comum não
     conseguir acessar a página do administrador. Se o usuário não for o administrado, ele é
     automáticamente redirecionado para a home, onde está o chat dos usuários comuns. */
  if (emailStored !== process.env.REACT_APP_ADMIN_USER) {
    console.log(emailStored, process.env.REACT_APP_ADMIN_USER);
    history.push("/");
  }

  const [users, setUsers] = useState([]);
  const [isBanned, setIsBanned] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const key = 0;
  const numberRegex = /^[0-9]+$/;
  const alphabetRegex = /^[a-zA-Z]+$/;

  /* Esta função é constantemente executada através do useEffect e ela traz todos os dados de todos
     os usuários cadastrados e os armazena na variável users */
  useEffect(() => {
    async function getUsers() {
      try {
        const usersData = await axios.get("/users");
        setUsers(usersData.data);
       } catch (e) {
        console.log(e);
      }
    }
    getUsers();
  }, [users]);

  /* A função neste useEffect verifica se um usuário está ou não banido e com esta informação, a pá-
     gina define o valor da variável isBanned, que representa o campo com o mesmo nome na base de dados.
     Isso é feito porque o valor deste campo na base de dados é booleano e isso dificultaria o entendi-
     mento do usuário administrador sobre o status do usuário. */
  useEffect(() => {
    function GetIsBanned() {
      // eslint-disable-next-line array-callback-return
      users.map((user) => {
        if (user.isbanned) {
          setIsBanned("Banido");
        } else {
          setIsBanned("Não-banido");
        }
      });
    }
    GetIsBanned();
  });

  /* SetSearchValues verifica o que é enviado na url por meio da pesquisa que pode ser feita pelo usuário
     administrador e define o caminho anterior para que a busca seja feita corretamente. Por exemplo, se
     o administrador pesquisa por um id é feita uma verificação se aquele valor enviado na url (que é uma string)
     é o correspondente de um número (mesmo sendo uma string) e assim define o caminho anterior como /id/, o mesmo
     vale para buscas feitas com nome ou email. E o valor deste caminho anterior ao valor enviado na pesquisa será armazenado na variável searchBy. */
  useEffect(() => {
    function SetSearchValues() {
      if (alphabetRegex.test(searchValue)) {
        setSearchBy("name");
      }
      else if (numberRegex.test(searchValue)) {
        setSearchBy("id");
      } else {
        setSearchBy("email");
      }
    }
    SetSearchValues();
  }, [searchValue, searchBy]);

  /* Função responsável por retirar o banimento de um usuário, alterando o campo isbanned para false na base
     de dados. */
  const BanOut = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}`, {
        isbanned: false,
      });
      toast.success("Banimento retirado");
    } catch (err) {
      const status = get(err, "response.status", 0);

      if (status === 401) {
        toast.error("Você precisa fazer login");
        history.push("/login");
      } else {
        toast.error("Ocorreu um erro ao banir o usuário");
      }
    }
  };

  /* Assim como nas páginas de chat, aqui é mostrado, usando a mesma lógica, todos os usuários cadastrados na
     aplicação e seus dados, juntamente com as opções de realizar uma pesquisa e os links responsáveis por levar
     ao modal de banimento e por retirar o banimento. */
  return (
    <AdminView>
      <Form>
        <input
          className="AdminSearchInput"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Pesquisar usuários..."
        />
        <Link
        to={`/adminpage/users/search/${searchBy}/${searchValue}`}
        className="searchLink"
        >
          <FaSearch size={26} />
        </Link>
      </Form>
      <UsersContainer>
        {users.map((user) => {
          return (
            <div key={key}>
              <span>{user.email}</span>
              <span>{user.nome}</span>
              <span>{user.id}</span>
              <span>{isBanned}</span>
              <span className="labels">Email:</span>
              <span className="labels">nome:</span>
              <span className="labels">Id:</span>
              <span className="labels">Status:</span>
              <Link to={`/adminpage/users/${user.id}/ban`} className="userBan">
                Banir
              </Link>
              <button
                type="button"
                onClick={(e) => BanOut(e, user.id)}
                className="banOut"
              >
                Retirar banimento
              </button>
            </div>
          );
        })}
      </UsersContainer>
    </AdminView>
  );
}
