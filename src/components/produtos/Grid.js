import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 400px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const GridProduto = ({ produtos, setProdutos, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/produtos/${id}`);
      const newArray = produtos.filter((produto) => produto.id !== id);
      setProdutos(newArray);
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar o produto!");
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Nome</Th>
          <Th>Quantidade</Th>
          <Th>Preço</Th>
        </Tr>
      </Thead>
      <Tbody>
        {produtos.map((item, i) => (
          <Tr key={i}>
            <Td alignCenter>{item.id}</Td>
            <Td alignCenter>{item.name}</Td>
            <Td alignCenter>{item.quantidade}</Td>
            <Td alignCenter>{item.preco}</Td>
            <Td alignCenter>
              <FaEdit onClick={() => handleEdit(item)} style={{ cursor: "pointer", marginLeft: "10px" }} />
            </Td>
            <Td alignCenter>
              <FaTrash onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridProduto;
