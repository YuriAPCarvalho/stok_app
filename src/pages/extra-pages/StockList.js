import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const StockList = () => {
  const navigate = useNavigate();
  const [estoque, setEstoques] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/estoque');
        const data = await response.json();
        setEstoques(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/estoque/${id}`, { method: 'DELETE' });
      const response = await fetch('http://localhost:3001/api/estoque');
      const data = await response.json();
      setEstoques(data);
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" component={Link} to="/cadastro-estoque">
        Adicionar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Descrição</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estoque.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.descricao}</TableCell>
              <TableCell align="center">
                <Button color="primary" onClick={() => navigate(`/cadastro-estoque/${item.id}`)}>
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

/*<Button sx={{ margin: '20px' }} variant="contained" color="primary" href="/free/cadastro-estoque">
          Novo
        </Button>*/
