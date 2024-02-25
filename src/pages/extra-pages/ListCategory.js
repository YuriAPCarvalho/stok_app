import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ListCategory = () => {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categoria');
        const data = await response.json();
        setCategoria(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/categoria/${id}`, { method: 'DELETE' });
      const response = await fetch('http://localhost:3001/api/categoria');
      const data = await response.json();
      setCategoria(data);
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" component={Link} to="/cadastro-categoria">
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
          {categoria.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.descricao}</TableCell>
              <TableCell align="center">
                <Button color="primary" onClick={() => navigate(`/cadastro-categoria/${item.id}`)}>
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

export default ListCategory;
