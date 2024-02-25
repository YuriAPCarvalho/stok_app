import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';

const OutputItemsList = () => {
  const navigate = useNavigate();
  const [outputItems, setOutputItems] = useState([]);
  const [estoques, setEstoques] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/saida-item');
        const data = await response.json();
        setOutputItems(data);
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

    const fetchUsuarios = async () => {
      try {
        const responseUsuarios = await fetch('http://localhost:3001/api/usuario');
        const dataUsuarios = await responseUsuarios.json();
        setUsuarios(dataUsuarios);
      } catch (error) {
        console.error('Error fetching usuarios data: ', error);
      }
    };

    const fetchSolicitantes = async () => {
      try {
        const responseSolicitantes = await fetch('http://localhost:3001/api/solicitante');
        const dataSolicitantes = await responseSolicitantes.json();
        setSolicitantes(dataSolicitantes);
      } catch (error) {
        console.error('Error fetching solicitantes data: ', error);
      }
    };

    fetchData();
    fetchEstoques();
    fetchUsuarios();
    fetchSolicitantes();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/saida-item/${id}`, { method: 'DELETE' });
      const response = await fetch('http://localhost:3001/api/saida-item');
      const data = await response.json();
      setOutputItems(data);
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" component={Link} to="/saida-itens">
        Adicionar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Descrição de Produto</TableCell>
            <TableCell align="left">Quantidade</TableCell>
            <TableCell align="left">Data</TableCell>
            <TableCell align="left">Descrição da Fazenda</TableCell>
            <TableCell align="left">Nome do Usuário</TableCell>
            <TableCell align="left">Nome do Solicitante</TableCell>
            <TableCell align="left">Gerar Recibo</TableCell>
            <TableCell align="left">Tipo de Saída</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outputItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.produto.descricao}</TableCell>
              <TableCell align="left">{item.quantidade}</TableCell>
              <TableCell align="left">{new Date(item.data).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell align="left">{estoques.find((estoque) => estoque.id === item.estoqueId)?.descricao || 'N/A'}</TableCell>
              <TableCell align="left">{usuarios.find((usuario) => usuario.id === item.usuarioId)?.nome || 'N/A'}</TableCell>
              <TableCell align="left">{solicitantes.find((solicitante) => solicitante.id === item.solicitanteId)?.nome || 'N/A'}</TableCell>
              <TableCell align="left">{item.gerarRecibo ? 'Sim' : 'Não'}</TableCell>
              <TableCell align="left">{item.tipoSaida}</TableCell>
              <TableCell align="center">
                <Button color="primary" onClick={() => navigate(`/saida-itens/${item.id}`)}>
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

export default OutputItemsList;
