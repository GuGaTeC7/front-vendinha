import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 101%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
  font-size: 15px;
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

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/users/" + id);
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar o usuário!");
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Cpf/Cnpj</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td alignCenter>{item.id}</Td>
            <Td alignCenter>{item.name}</Td>
            <Td alignCenter>{item.email}</Td>
            <Td alignCenter>{item.cpfCnpj}</Td>
            <Td alignCenter>{item.isActive ? "Ativo" : "Inativo"}</Td>
            <Td alignCenter>
              {/* Adicionar o evento de clique para editar */}
              <FaEdit
                onClick={() => handleEdit(item)}
                style={{ cursor: "pointer" }}
              />
            </Td>
            <Td alignCenter>
              {/* Adicionar o evento de clique para deletar */}
              <FaTrash
                onClick={() => handleDelete(item.id)}
                style={{ cursor: "pointer" }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
