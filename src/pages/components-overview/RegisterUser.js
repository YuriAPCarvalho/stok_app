import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RegisterUser = () => {
  const navigate = useNavigate();
  const { id: itemId } = useParams();
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://191.252.212.69:3001/api/usuario/${itemId}`);
          const data = await response.json();
          setId(data.id);
          setNome(data.nome);
          setEmail(data.email);
          setSenha(data.senha);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

      fetchData();
    }
  }, [itemId]);

  const handleSave = async () => {
    const method = itemId ? 'PUT' : 'POST';
    const url = itemId ? `http://191.252.212.69:3001/api/usuario/${itemId}` : 'http://191.252.212.69:3001/api/usuario';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    });

    if (response.ok) {
      navigate('/lista-usuario');
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
        <Grid item xs={4}>
          <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="E-mail" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>
        <Grid item xs={2}>
          <TextField label="Senha" type="password" fullWidth value={senha} onChange={(e) => setSenha(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Button variant="contained" color="success" fullWidth onClick={handleSave}>
                Salvar
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" component={Link} to="/lista-usuario" color="primary" fullWidth>
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegisterUser;
