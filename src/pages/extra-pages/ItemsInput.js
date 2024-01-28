import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Select, MenuItem, Button, Grid, Paper, Typography, FormControl, InputLabel } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';

const schema = yup.object().shape({
  quantidade: yup.number().required('Campo obrigatório'),
  dataEntrada: yup.date().required('Campo obrigatório'),
  estoqueId: yup.array().required('Campo obrigatório'),
  preco: yup.number().required('Campo obrigatório')
});

const ItemsInput = () => {
  const { id: itemId } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [produtoId, setProdutoId] = useState([]);
  const [produtosId, setProdutosId] = useState([]);
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [estoqueId, setEstoqueId] = useState([]);
  const [estoques, setEstoques] = useState([]);
  const [dataEntrada, setData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleProdutoIdChange = (e) => {
    setProdutoId(e.target.value);
  };

  const handleEstoqueChange = (event) => {
    setEstoqueId(event.target.value);
  };

  const onSubmit = async () => {
    const method = itemId ? 'PUT' : 'POST';
    const url = itemId
      ? `http://orion.vps-kinghost.net:3001/api/entrada-item/${itemId}`
      : 'http://orion.vps-kinghost.net:3001/api/entrada-item';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ produtoId, quantidade, preco: parseFloat(preco.replace(',', '.')), dataEntrada, estoqueId })
    });

    if (response.ok) {
      navigate('/lista-entrada-itens');
    } else {
      console.log('ERRO');
    }
  };

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://orion.vps-kinghost.net:3001/api/entrada-item/${itemId}`);
          const data = await response.json();
          setId(data.id);
          setProdutoId(data.produtoId);
          setQuantidade(data.quantidade);
          setPreco(data.preco);
          setData(data.dataEntrada);
          setEstoqueId(data.estoqueId);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

      fetchData();
    }
  }, [itemId]);

  useEffect(() => {
    const fetchProduto = async () => {
      const response = await fetch('http://orion.vps-kinghost.net:3001/api/produto');
      const data = await response.json();
      setProdutosId(data);
    };

    fetchProduto();
  }, []);
  useEffect(() => {
    const fetchEstoque = async () => {
      const response = await fetch('http://orion.vps-kinghost.net:3001/api/estoque');
      const data = await response.json();
      setEstoques(data);
    };

    fetchEstoque();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Entrada de Itens
      </Typography>
      <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
        <Grid item xs={1}>
          <TextField label="ID" type="number" disabled fullWidth value={id} onChange={(e) => setId(e.target.value)} />
        </Grid>
        <Grid item xs={11}>
          <FormControl fullWidth>
            <InputLabel id="produtoId-label">Buscar por Produtos</InputLabel>
            <Select labelId="produtoId-label" value={produtoId} onChange={handleProdutoIdChange}>
              {produtosId.map((produto) => (
                <MenuItem key={produto.id} value={produto.id}>
                  {produto.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            sx={{ width: '100%' }}
            {...register('quantidade')}
            error={!!errors.quantidade}
            helperText={errors.quantity?.message}
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            sx={{ width: '100%' }}
            {...register('preco')}
            error={!!errors.preco}
            helperText={errors.preco?.message}
            label="Preço"
            type="text"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            sx={{ width: '100%' }}
            {...register('dataEntrada')}
            error={!!errors.dataEntrada}
            helperText={errors.dataEntrada?.message}
            label="Data de entrada"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            value={dataEntrada}
            onChange={(e) => setData(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="origin-stock-label">Fazenda de Origem</InputLabel>
            <Select labelId="origin-stock-label" value={estoqueId} onChange={handleEstoqueChange}>
              {estoques.map((estoque) => (
                <MenuItem key={estoque.id} value={estoque.id}>
                  {estoque.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            sx={{ width: '100%' }}
            {...register('user')}
            error={!!errors.user}
            helperText={errors.user?.message}
            label="Usuário responsável"
            defaultValue="Usuário Logado"
            disabled
            value={localStorage.getItem('user')}
          />
        </Grid>

        <Grid item xs={1}>
          <Button variant="contained" onClick={onSubmit} color="success" fullWidth>
            Salvar
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" component={Link} to="/lista-entrada-itens" color="primary" fullWidth>
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemsInput;
