import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserList = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://191.252.212.69:3001/api/usuario');
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://191.252.212.69:3001/api/usuario/${id}`, { method: 'DELETE' });
      const response = await fetch('http://191.252.212.69:3001/api/usuario');
      const data = await response.json();
      setUsuario(data);
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" component={Link} to="/cadastro-usuario">
        Adicionar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Senha</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuario.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.nome}</TableCell>
              <TableCell align="left">{item.email}</TableCell>
              <TableCell align="left">{item.senha}</TableCell>
              <TableCell align="center">
                <Button color="primary" onClick={() => navigate(`/cadastro-usuario/${item.id}`)}>
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

export default UserList;
