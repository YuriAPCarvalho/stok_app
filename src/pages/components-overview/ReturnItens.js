import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RegisterStock = () => {
  const { id: itemId } = useParams();
  const [id, setId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estoqueId, setEstoqueId] = useState('');
  const [estoques, setEstoques] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEstoque = await fetch('http://191.252.212.69:3001/api/estoque');
        const dataEstoque = await responseEstoque.json();
        setEstoques(dataEstoque);

        if (itemId) {
          const responseSubEstoque = await fetch(`http://191.252.212.69:3001/api/sub-estoque/${itemId}`);
          const dataSubEstoque = await responseSubEstoque.json();
          setId(dataSubEstoque.id);
          setDescricao(dataSubEstoque.descricao);
          setEstoqueId(dataSubEstoque.estoqueId);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [itemId]);

  const handleSave = async () => {
    try {
      const url = itemId ? `http://191.252.212.69:3001/api/sub-estoque/${itemId}` : 'http://191.252.212.69:3001/api/sub-estoque';

      const method = itemId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descricao, estoqueId })
      });

      if (response.ok) {
        navigate('/lista-sub-estoque');
      } else {
        console.log('Erro ao salvar estoque');
      }
    } catch (error) {
      console.error('Error handling save: ', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <TextField label="ID" type="number" disabled fullWidth value={id} onChange={(e) => setId(e.target.value)} />
        </Grid>

        <Grid item xs={5}>
          <FormControl fullWidth>
            <InputLabel id="estoque-label">Fazenda</InputLabel>
            <Select labelId="estoque-label" id="estoque" value={estoqueId} onChange={(e) => setEstoqueId(e.target.value)}>
              {estoques.map((estoque) => (
                <MenuItem key={estoque.id} value={estoque.id}>
                  {estoque.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField label="Descrição Estoque" fullWidth value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="success" fullWidth onClick={handleSave}>
            Salvar
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" component={Link} to="/lista-sub-estoque" color="primary" fullWidth>
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegisterStock;
