import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://orion.vps-kinghost.net:3001/api/produto');
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        const data = await response.json();
        setProduto(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://orion.vps-kinghost.net:3001/api/produto/${id}`, { method: 'DELETE' });
      const response = await fetch('http://orion.vps-kinghost.net:3001/api/produto');
      const data = await response.json();
      setProduto(data);
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" component={Link} to="/cadastro-produto">
        Adicionar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Imagem</TableCell>
            <TableCell align="left">Patrimônio</TableCell>
            <TableCell align="left">Descrição</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Estado</TableCell>
            <TableCell align="left">Estoque Min.</TableCell>
            <TableCell align="left">Estoque Max.</TableCell>
            <TableCell align="left">Ponto de Pedido</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produto.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">
                  {item.fotoProduto && item.fotoProduto !== 'data:null;base64,bnVsbA==' ? (
                    <img src={item.fotoProduto} alt="Foto do produto" style={{ width: '100px', height: '100px' }} />
                  ) : (
                    'SEM IMAGEM'
                  )}
                </TableCell>
                <TableCell align="left"> {item.patrimonio}</TableCell>
                <TableCell align="left">{item.descricao}</TableCell>
                <TableCell align="left">{item.categoria.descricao}</TableCell>
                <TableCell align="left">{item.estado}</TableCell>
                <TableCell align="left">{item.estoqueMinimo}</TableCell>
                <TableCell align="left">{item.estoqueMaximo}</TableCell>
                <TableCell align="left">{item.pontoPedido}</TableCell>
                <TableCell align="center">
                  <Button color="primary" onClick={() => navigate(`/cadastro-produto/${item.id}`)}>
                    <EditIcon />
                  </Button>
                  <Button color="secondary" onClick={() => deleteItem(item.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
