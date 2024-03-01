import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductList = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://191.252.212.69:3001/api/produto/paginado?page=${page}&perPage=${rowsPerPage}`
        );
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        const data = await response.json();

        if (data && data.produtos && Array.isArray(data.produtos)) {
          const totalPagesFromData = parseInt(data.totalPages, 10);
          if (!isNaN(totalPagesFromData) && totalPagesFromData > 0) {
            setTotalPages(totalPagesFromData);
          } else {
            console.error('Erro: totalPages inválido nos dados recebidos pela API.', data);
          }

          setProduto(data.produtos);
        } else {
          console.error('Erro: Formato inesperado nos dados recebidos pela API.', data);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, rowsPerPage, refresh]);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://191.252.212.69:3001/api/produto/${id}`, { method: 'DELETE' });
      handleRefresh();
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const handleRefresh = () => {
    // A função setRefresh atualiza o estado, disparando o useEffect
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleChangePage = (event, newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div>
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
              <TableCell align="left">Grupo</TableCell>
              <TableCell align="left">Estado</TableCell>
              <TableCell align="left">Estoque Min.</TableCell>
              <TableCell align="left">Estoque Max.</TableCell>
              <TableCell align="left">Ponto de Pedido</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : (
              produto && produto.length > 0 ? (
                produto.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="left">
                      {item.fotoProduto && item.fotoProduto !== 'data:null;base64,bnVsbA==' ? (
                        <img
                          src={item.fotoProduto}
                          alt="Foto do produto"
                          style={{ width: '100px', height: '100px' }}
                        />
                      ) : (
                        'SEM IMAGEM'
                      )}
                    </TableCell>
                    <TableCell align="left">{item.patrimonio}</TableCell>
                    <TableCell align="left">{item.descricao}</TableCell>
                    <TableCell align="left">{item.categoria?.descricao}</TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          siblingCount={2}
          boundaryCount={2}
        />
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          {/* Adicione outras opções conforme necessário */}
        </select>
      </Stack>
    </div>
  );
};

export default ProductList;
