import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';

const ItemsInputList = () => {
  const navigate = useNavigate();
  const [itemsInput, setItemsInput] = useState([]);
  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/entrada-item');
        const data = await response.json();
        setItemsInput(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const fetchEstoques = async () => {
      try {
        const responseEstoque = await fetch('http://localhost:3001/api/estoque');
        const dataEstoque = await responseEstoque.json();
        setEstoques(dataEstoque);
      } catch (error) {
        console.error('Error fetching estoque data: ', error);
      }
    };

    fetchData();
    fetchEstoques();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/entrada-item/${id}`, { method: 'DELETE' });
      const response = await fetch('http://localhost:3001/api/entrada-item');
      const data = await response.json();
      setItemsInput(data);
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" component={Link} to="/entrada-itens">
        Adicionar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Descrição de Produto</TableCell>
            <TableCell align="left">Quantidade</TableCell>
            <TableCell align="left">Preço</TableCell>
            <TableCell align="left">Descrição da Fazenda</TableCell>
            <TableCell align="left">Data de Entrada</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsInput.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.produto.descricao}</TableCell>
              <TableCell align="left">{item.quantidade}</TableCell>
              <TableCell align="left">{parseFloat(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
              <TableCell align="left">{estoques.find((estoque) => estoque.id === item.estoqueId)?.descricao || 'N/A'}</TableCell>
              <TableCell align="left">{new Date(item.dataEntrada).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell align="center">
                <Button disabled color="primary" onClick={() => navigate(`/entrada-itens/${item.id}`)}>
                  <EditIcon />
                </Button>
                <Button disabled color="secondary" onClick={() => deleteItem(item.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsInputList;
