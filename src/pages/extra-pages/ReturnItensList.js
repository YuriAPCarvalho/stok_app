import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StockList = () => {
  const navigate = useNavigate();
  const [subEstoques, setSubEstoques] = useState([]);
  const [estoques, setEstoques] = useState([]);

  const fetchSubEstoques = async () => {
    try {
      const responseSubEstoque = await fetch('http://191.252.212.69:3001/api/sub-estoque');
      const dataSubEstoque = await responseSubEstoque.json();
      setSubEstoques(dataSubEstoque);
    } catch (error) {
      console.error('Error fetching sub-estoque data: ', error);
    }
  };

  const fetchEstoques = async () => {
    try {
      const responseEstoque = await fetch('http://191.252.212.69:3001/api/estoque');
      const dataEstoque = await responseEstoque.json();
      setEstoques(dataEstoque);
    } catch (error) {
      console.error('Error fetching estoque data: ', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`http://191.252.212.69:3001/api/sub-estoque/${id}`, { method: 'DELETE' });
      fetchSubEstoques();
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  useEffect(() => {
    fetchSubEstoques();
    fetchEstoques();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" component={Link} to="/sub-estoque">
        Adicionar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Nome do Estoque</TableCell>
            <TableCell align="left">Nome da Fazenda</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subEstoques.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell align="left">{item.descricao}</TableCell>
              <TableCell align="left">{estoques.find((estoque) => estoque.id === item.estoqueId)?.descricao || 'N/A'}</TableCell>
              <TableCell align="center">
                <Button color="primary" onClick={() => navigate(`/sub-estoque/${item.id}`)}>
                  <EditIcon />
                </Button>
                <Button color="secondary" onClick={() => deleteItem(item.id)}>
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

export default StockList;
