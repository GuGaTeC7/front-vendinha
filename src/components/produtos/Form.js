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
  width: 360px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 145px;
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

const FormProduto = ({ getProdutos, onEdit, setOnEdit }) => {
  const ref = useRef();

  // Carrega os dados do produto no formulário quando onEdit muda
  useEffect(() => {
    if (onEdit) {
      const produto = ref.current;
      produto.nome.value = onEdit.name; // Corrigido para 'name'
      produto.quantidade.value = onEdit.quantidade;
      produto.preco.value = onEdit.preco;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = ref.current;

    // Validação dos campos
    if (!produto.name.value || !produto.quantidade.value || !produto.preco.value) {
      return toast.warn("Preencha todos os campos!");
    }

    // Criação do objeto produto
    const produtoData = {
      name: produto.name.value,
      quantidade: parseInt(produto.quantidade.value, 10),
      preco: parseFloat(produto.preco.value),
    };

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8080/produtos/${onEdit.id}`, produtoData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8080/produtos", produtoData);
        toast.success("Produto criado com sucesso!");
      }

      // Limpar os campos do formulário após o sucesso
      produto.name.value = "";
      produto.quantidade.value = "";
      produto.preco.value = "";
      setOnEdit(null);
      getProdutos();
    } catch (error) {
      toast.error("Erro ao salvar o produto!");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Quantidade</Label>
        <Input name="quantidade" type="number" />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input name="preco" type="number" step="0.01" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormProduto;
