import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RegisterCategory = () => {
  const { id: itemId } = useParams();
  const [id, setId] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/categoria/${itemId}`);
          const data = await response.json();
          setId(data.id);
          setDescricao(data.descricao);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

      fetchData();
    }
  }, [itemId]);

  const handleSave = async () => {
    const method = itemId ? 'PUT' : 'POST';
    const url = itemId ? `http://localhost:3001/api/categoria/${itemId}` : 'http://localhost:3001/api/categoria';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ descricao })
    });

    if (response.ok) {
      navigate('/lista-categoria');
    } else {
      console.log('ERRO');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <TextField label="ID" type="number" disabled fullWidth value={id} onChange={(e) => setId(e.target.value)} />
        </Grid>
        <Grid item xs={11}>
          <TextField label="Descrição" fullWidth value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="success" fullWidth onClick={handleSave}>
            Salvar
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" component={Link} to="/lista-categoria" color="primary" fullWidth>
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegisterCategory;
