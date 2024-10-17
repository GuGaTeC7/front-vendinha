import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width: 460px;
  justify-content: center;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 90px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getVendas, onEdit, setOnEdit, getProdutos }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const venda = ref.current;
      venda.name.value = onEdit.name;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venda = ref.current;

    if (!venda.name.value || !venda.produto.value || !venda.quantidade.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios.put("http://localhost:8080/vendas/" + onEdit.id, {
        name: venda.name.value,
      });
      try {
        toast.success("Venda atualizada com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar!");
      }
    } else {
      await axios.post("http://localhost:8080/vendas", {
        userId: venda.name.value,
        produtoId: venda.produto.value,
        quantity: venda.quantidade.value,
      });
      try {
        getProdutos();
        toast.success("Venda criada com sucesso!");
      } catch (error) {
        toast.error("Erro ao criar venda!");
      }
    }

    venda.name.value = "";
    venda.produto.value = "";
    venda.quantidade.value = "";

    setOnEdit(null);
    getVendas();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Id do usuário</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Id do produto</Label>
        <Input name="produto" />
      </InputArea>
      <InputArea>
        <Label>Quantidade</Label>
        <Input name="quantidade" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
