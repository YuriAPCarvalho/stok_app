import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, Select, MenuItem, InputLabel, Grid, Paper, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';

const OutputItems = () => {
  const navigate = useNavigate();
  const { id: itemId } = useParams();
  const [id, setId] = useState('');
  const [produtoId, setProdutoId] = useState([]);
  const [produtosId, setProdutosId] = useState([]);
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState();
  const [estoqueId, setEstoqueId] = useState([]);
  const [estoques, setEstoques] = useState([]);
  const [usuarioId, setUsuarioId] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [solicitanteId, setSolicitanteId] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);
  const [gerarRecibo, setGerarRecibo] = useState(false);
  const [destinationStock, setDestinationStock] = useState('');
  const [tipoSaida, setTipoSaida] = useState('');

  const handleSave = async () => {
    const method = itemId ? 'PUT' : 'POST';
    const url = itemId ? `http://191.252.212.69:3001/api/saida-item/${itemId}` : 'http://191.252.212.69:3001/api/saida-item';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ produtoId, quantidade, data, estoqueId, usuarioId, solicitanteId, gerarRecibo, tipoSaida })
    });

    if (response.ok) {
      navigate('/lista-saida-itens');
    } else {
      console.log('ERRO');
    }
  };

  const handleProdutoIdChange = async (event) => {
    setProdutoId(event.target.value);

    if (produtoId) {
      try {
        let response = await fetch(`http://191.252.212.69:3001/api/saida-item/produtoId/${produtoId}`);
        let data = await response.json();

        if (!data) {
          response = await fetch(`http://191.252.212.69:3001/api/saida-item/descricao/${produtoId}`);
          data = await response.json();
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    }
  };

  const handleSolicitanteChange = (event) => {
    setSolicitanteId(event.target.value);
  };

  const handleUsuarioChange = (event) => {
    setUsuarioId(event.target.value);
  };

  const handleEstoqueChange = (event) => {
    setEstoqueId(event.target.value);
  };

  const handleGerarReciboChange = (e) => {
    setGerarRecibo(e.target.value);
  };

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://191.252.212.69:3001/api/saida-item/${itemId}`);
          const data = await response.json();
          setId(data.id);
          setProdutoId(data.produtoId);
          setQuantidade(data.quantidade);
          setData(data.dataEntrada);
          setEstoqueId(data.estoqueId);
          setUsuarioId(data.usuarioId);
          setSolicitanteId(data.solicitanteId);
          setGerarRecibo(data.gerarRecibo);
          setTipoSaida(data.tipoSaida);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

      fetchData();
    }
  }, [itemId]);

  useEffect(() => {
    const fetchProduto = async () => {
      const response = await fetch('http://191.252.212.69:3001/api/produto');
      const data = await response.json();
      setProdutosId(data);
    };

    fetchProduto();
  }, []);

  useEffect(() => {
    const fetchEstoque = async () => {
      const response = await fetch('http://191.252.212.69:3001/api/estoque');
      const data = await response.json();
      setEstoques(data);
    };

    fetchEstoque();
  }, []);

  useEffect(() => {
    const fetchSolicitante = async () => {
      const response = await fetch('http://191.252.212.69:3001/api/solicitante');
      const data = await response.json();
      setSolicitantes(data);
    };

    fetchSolicitante();
  }, []);

  useEffect(() => {
    const fetchUsuario = async () => {
      const response = await fetch('http://191.252.212.69:3001/api/usuario');
      const data = await response.json();
      setUsuarios(data);
    };

    fetchUsuario();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Saída de Itens
      </Typography>
      <Grid container spacing={2}>
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
        <Grid item xs={3}>
          <TextField
            sx={{ width: '100%' }}
            type="number"
            label="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField sx={{ width: '100%' }} type="date" value={data} onChange={(e) => setData(e.target.value)} />
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
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="solicitants-label">Usuário</InputLabel>
            <Select labelId="solicitants-label" value={usuarioId} onChange={handleUsuarioChange}>
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="solicitants-label">Solicitante</InputLabel>
            <Select labelId="solicitants-label" value={solicitanteId} onChange={handleSolicitanteChange}>
              {solicitantes.map((solicitante) => (
                <MenuItem key={solicitante.id} value={solicitante.id}>
                  {solicitante.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="generate-receipt-label">Gerar recibo</InputLabel>
            <Select labelId="generate-receipt-label" value={gerarRecibo} onChange={handleGerarReciboChange}>
              <MenuItem value={false}>Não</MenuItem>
              <MenuItem value={true}>Sim</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="output-type-label">Tipo de Saída</InputLabel>
            <Select labelId="output-type-label" value={tipoSaida} onChange={(e) => setTipoSaida(e.target.value)}>
              <MenuItem value="Produto">Saída de Produtos</MenuItem>
              <MenuItem value="Transferência">Transferência entre Estoques</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {tipoSaida === 'transfer' && (
          <Grid item xs={3}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="destination-stock-label">Estoque de Destino</InputLabel>
              <Select labelId="destination-stock-label" value={destinationStock} onChange={(e) => setDestinationStock(e.target.value)}>
                <MenuItem value="Stock 1">Stock 1</MenuItem>
                <MenuItem value="Stock 2">Stock 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Button variant="contained" color="success" fullWidth onClick={handleSave}>
                Salvar
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" component={Link} to="/lista-saida-itens" color="primary" fullWidth>
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OutputItems;
