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
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ContainerForms = styled.div`
  display: flex;
  gap: 30px;
`;

const ContainerGrids = styled.div`
  display: flex;
`;

const ContainerGeral = styled.div`
  display: flex;
  flex-direction: column;
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
        <ContainerForms>
        {/* Usuários */}
        <Container>
          <Title>USUÁRIOS</Title>
          <FormUser onEdit={onEditUser} setOnEdit={setOnEditUser} getUsers={getUsers} />
        </Container>

        {/* Produtos */}
        <Container>
          <Title>PRODUTOS</Title>
          <FormProduto onEdit={onEditProduto} setOnEdit={setOnEditProduto} getProdutos={getProdutos} />
        </Container>

        {/* Vendas */}
        <Container>
          <Title>VENDAS</Title>
          <FormVenda onEdit={onEditVenda} setOnEdit={setOnEditVenda} getVendas={getVendas} getProdutos={getProdutos}/>
        </Container>
        </ContainerForms>


        <ContainerGrids>
          <GridUser users={users} setUsers={setUsers} setOnEdit={setOnEditUser} />
          <GridProduto produtos={produtos} setProdutos={setProdutos} setOnEdit={setOnEditProduto} />
          <GridVenda vendas={vendas} setVendas={setVendas} setOnEdit={setOnEditVenda} />
        </ContainerGrids>

      </ContainerGeral>
      
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
