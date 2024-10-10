import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px; I
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

const Grid = ({ users }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>nome</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
            <Tr>
                <Td alignCenter>{item.id}</Td>
                <Td alignCenter>{item.name}</Td>
                <Td alignCenter >
                    <FaEdit />
                </Td>
                <Td alignCenter>
                    <FaTrash />
                </Td>
            </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
export default Grid;
