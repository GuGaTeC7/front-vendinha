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
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 245px;
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

const Form = ({ getVendas, onEdit, setOnEdit }) => {
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

    if (!venda.name.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios.put("http://localhost:8080/vendas/" + onEdit.id, {
        name: venda.name.value,
      });
      try {
        toast.success("Usuário atualizado com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar!");
      }
    } else {
      await axios.post("http://localhost:8080/vendas", {
        name: venda.name.value,
      });
      try {
        toast.success("Usuário criado com sucesso!");
      } catch (error) {
        toast.error("Erro ao criar usuário!");
      }
    }

    venda.name.value = "";

    setOnEdit(null);
    getVendas();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name" /> {/* Corrigido para 'name' */}
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
