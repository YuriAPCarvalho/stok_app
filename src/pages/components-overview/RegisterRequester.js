import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RegisterRequester = () => {
  const { id: itemId } = useParams();
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/solicitante/${itemId}`);
          const data = await response.json();
          setId(data.id);
          setNome(data.nome);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

      fetchData();
    }
  }, [itemId]);

  const handleSave = async () => {
    const method = itemId ? 'PUT' : 'POST';
    const url = itemId ? `http://localhost:3001/api/solicitante/${itemId}` : 'http://localhost:3001/api/solicitante';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome })
    });

    if (response.ok) {
      navigate('/lista-solicitante');
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
          <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="success" fullWidth onClick={handleSave}>
            Salvar
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" component={Link} to="/lista-solicitante" color="primary" fullWidth>
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegisterRequester;
