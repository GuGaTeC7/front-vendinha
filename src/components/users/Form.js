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
  padding: 15px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  justify-content: center;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
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

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.name.value = onEdit.name;
      user.senha.value = onEdit.password;
      user.email.value = onEdit.email;
      user.cpfCnpj.value = onEdit.cpfCnpj;
      user.status.value = onEdit.isActive ? "1" : "0"; // Ajuste para exibir 1 ou 0 baseado em isActive
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.senha.value ||
      !user.email.value ||
      !user.cpfCnpj.value ||
      !user.status.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const payload = {
        name: user.name.value,
        password: user.senha.value,
        email: user.email.value,
        cpfCnpj: user.cpfCnpj.value,
        isActive: Number(user.status.value, 10),
      };
      const isActive = user.status.value;

      if (onEdit) {
        await axios.put(`http://localhost:8080/users/${onEdit.id}`, payload);
        await axios.put(
          `http://localhost:8080/users/${onEdit.id}/status/${isActive}`,
          {}
        );
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8080/users", payload);
        toast.success("Usuário criado com sucesso!");
      }

      user.name.value = "";
      user.senha.value = "";
      user.email.value = "";
      user.cpfCnpj.value = "";
      user.status.value = "";

      setOnEdit(null);
      getUsers();
    } catch (error) {
      toast.error("Erro ao salvar o usuário!");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Senha</Label>
        <Input name="senha" type="password" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" />
      </InputArea>
      <InputArea>
        <Label>Cpf/Cnpj</Label>
        <Input name="cpfCnpj" />
      </InputArea>
      <InputArea>
        <Label>Status</Label>
        <Input name="status" placeholder="0 (inativo) ou 1 (ativo)" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
