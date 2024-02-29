import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { AdminView, UsersContainer } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

// O email do usuário podem ser usado neste componente ateravés do useSelector, que
// acessa esses dados que são armazenados no redux (pasta auth) após o login.
export default function UserSearch() {
  /* Aqui é realizada uma verificação do email armazenado no redux, para o usuário comum não
     conseguir acessar a página do administrador. Se o usuário não for o administrado, ele é
     automáticamente redirecionado para a home, onde está o chat dos usuários comuns. */
  const emailStored = useSelector((state) => state.auth.user.email);
  if (emailStored !== process.env.REACT_APP_ADMIN_USER) history.push("/");

  /* Com o uso de useParams e da desestruturação de objetos, aqui são obtidos os valores
     de searchBy e searchValue da url para realizar a pesquisa na API. */
  const params = useParams("/adminpage/users/:searchBy/:searchValue");
  const { searchValue } = params;
  const { searchBy } = params;

  const [found, setFound] = useState(true);
  const [isBanned, setIsBanned] = useState("");
  const [userData, setUserData] = useState([]);
  const numberRegex = /^[0-9]+$/;
  const alphabetRegex = /^[a-zA-Z]+$/;
  const notFindMessage = "Usuário não encontrado";

  /* Nesta função é feita a pesquisa. Primeiro é feita uma checagem do conteúdo da variável searchBy, que
     veio da url e de acordo com o resultado, é definido o caminho de pesquisa, que muda de acordo com as variáveis
     searchBy e searchValue. Depois deste processo é feita a pesquisa na API e o resultado da pesquisa é colocado na
     variável userData. */
  async function Search() {
    try {
      if (alphabetRegex.test(searchBy)) {
        const usersData = await axios.get(
          `/users/search/${searchBy}/${searchValue}`
        );
        setUserData(usersData.data);
      }
      if (numberRegex.test(searchBy)) {
        const numberId = Number(searchValue);
        const usersData = await axios.get(
          `/users/search/${searchBy}/${numberId}`
        );
        setUserData(usersData.data);
      } else {
        const usersData = await axios.get(
          `/users/search/${searchBy}/${searchValue}`
        );
        setUserData(usersData.data);
      }
    } catch (err) {
      console.log(err);
      setFound(false);
    }
  }

  /* Se o usuário não for encontrado, a variável booleana "found" será definida como false e será ren-
  derizado na tela o conteúdo da variável notFindMessage. */
  useEffect(() => {
    function NotFindCheck() {
      if (userData.length < 1) {
        setFound(false);
      } else {
        setFound(true);
      }
      return found;
    }
    NotFindCheck();
  });

  /* A função neste useEffect verifica se um usuário está ou não banido e com esta informação, a pá-
     gina define o valor da variável isBanned, que representa o campo com o mesmo nome na base de dados.
     Isso é feito porque o valor deste campo na base de dados é booleano e isso dificultaria o entendi-
     mento do usuário administrador sobre o status do usuário. */
  useEffect(() => {
    function GetIsBanned() {
      // eslint-disable-next-line array-callback-return
      userData.map((user) => {
        if (user.isbanned) {
          setIsBanned("Banido");
        } else {
          setIsBanned("Não-banido");
        }
      });
    }
    GetIsBanned();
  });

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

  Search();

  /* No JSX é escrita uma condicional ternária para o valor da variável found. Se o valor for true o con-
  teúdo da variável userData (variável que armazena os dados do usuário encontrado) será renderizado na
  tela, juntamente com textos indicando os campos e os links para banir e retirar o banimento. Mas se o valor
  de found for false será renderizado na tela a mensagem de que o usuário pesquisado não foi encontrado. */
  return (
    <AdminView>
      <UsersContainer>
        {found ? (
          userData.map((user) => {
            return (
              <div key={user.id}>
                <span className="labels">Nome:</span>
                <span className="labels">Email:</span>
                <span className="labels">Id:</span>
                <span className="labels">Status:</span>
                <span className="nome">{user.nome}</span>
                <span className="email">{user.email}</span>
                <span className="id">{user.id}</span>
                <span className="isBanned">{isBanned}</span>
                <Link
                  to={`/adminpage/users/${user.id}/ban`}
                  className="userBan"
                >
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
          })
        ) : (
          <div className="notFound">{notFindMessage}</div>
        )}
      </UsersContainer>
    </AdminView>
  );
}
