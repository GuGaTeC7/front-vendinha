import GlobalStyle from "./styles/global";
import styled from "styled-components";
import FormUser from "./components/users/Form";
import FormProduto from "./components/produtos/Form";
import FormVenda from "./components/vendas/Form";
import GridUser from "./components/users/Grid";
import GridProduto from "./components/produtos/Grid";
import GridVenda from "./components/vendas/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 101%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ContainerDataUsers = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;
const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerGrids = styled.div`
  display: flex;
`;

const ContainerGeral = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;

`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEditUser, setOnEditUser] = useState(null);

  const [produtos, setProdutos] = useState([]);
  const [onEditProduto, setOnEditProduto] = useState(null);

  const [vendas, setVendas] = useState([]);
  const [onEditVenda, setOnEditVenda] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users");
      setUsers(res.data.sort((a, b) => a.id - b.id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/produtos");
      setProdutos(res.data.sort((a, b) => a.id - b.id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getVendas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/vendas");
      setVendas(res.data.sort((a, b) => a.id - b.id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
    getProdutos();
    getVendas();
  }, []); // Apenas roda ao montar o componente

  return (
    <>
      <ContainerGeral>
        <ContainerDataUsers>
          {/* Usuários */}
          <Container>
            <Title>USUÁRIOS</Title>
            <FormUser
              onEdit={onEditUser}
              setOnEdit={setOnEditUser}
              getUsers={getUsers}
            />
          </Container>

          <GridUser
            users={users}
            setUsers={setUsers}
            setOnEdit={setOnEditUser}
          />
        </ContainerDataUsers>

        <ContainerData>
          {/* Produtos */}
          <Container>
            <Title>PRODUTOS</Title>
            <FormProduto
              onEdit={onEditProduto}
              setOnEdit={setOnEditProduto}
              getProdutos={getProdutos}
            />

            <GridProduto
              produtos={produtos}
              setProdutos={setProdutos}
              setOnEdit={setOnEditProduto}
            />
          </Container>
        </ContainerData>

        <ContainerData>
          {/* Vendas */}
          <Container>
            <Title>VENDAS</Title>
            <FormVenda
              onEdit={onEditVenda}
              setOnEdit={setOnEditVenda}
              getVendas={getVendas}
              getProdutos={getProdutos}
            />
            <GridVenda
              vendas={vendas}
              setVendas={setVendas}
              setOnEdit={setOnEditVenda}
            />
          </Container>
        </ContainerData>

        <ContainerGrids></ContainerGrids>
      </ContainerGeral>

      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
