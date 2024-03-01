import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const bufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const Inventory = () => {
  const navigate = useNavigate();

  const [estoqueId, setEstoqueId] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [inventoryStarted, setInventoryStarted] = useState(false);
  const [products, setProducts] = useState([]);
  const [newSaldos, setNewSaldos] = useState({});
  const [estoques, setEstoques] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [grupoData, setGrupoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEstoque = await fetch('http://191.252.212.69:3001/api/estoque');
        const dataEstoque = await responseEstoque.json();
        setEstoques(dataEstoque);

        const responseLocal = await fetch('http://191.252.212.69:3001/api/sub-estoque');
        const dataLocal = await responseLocal.json();
        setLocalData(dataLocal);

        const responseGrupo = await fetch('http://191.252.212.69:3001/api/categoria');
        const dataGrupo = await responseGrupo.json();
        setGrupoData(dataGrupo);
      } catch (error) {
        console.error('Erro ao buscar dados: ', error);
      }
    };

    fetchData();
  }, []);

  const fetchProducts = async () => {
    try {
      if (searchEnabled && (estoqueId || selectedLocal || selectedGrupo)) {
        const queryParams = new URLSearchParams({
          estoqueId,
          local: selectedLocal,
          grupo: selectedGrupo
        });

        const responseSaldo = await fetch(`http://191.252.212.69:3001/api/saldo/busca?${queryParams}`);
        const dataSaldo = await responseSaldo.json();

     
        const productsData = dataSaldo.map((saldo) => ({
          produtoId: saldo.id,
          saldo: saldo.saldo,
          descricaoProduto: saldo.descricao,
          descricaoEstoque: saldo.descricaoEstoque,
          descricaoLocal: saldo.descricaoLocal,
          descricaoCategoria: saldo.descricaoCategoria,
          fotoProduto: saldo.fotoProduto, 
          mimeType: 'image/jpeg' 
        }));

        setProducts(productsData);
      }
    } catch (error) {
      console.error('Erro ao buscar saldo: ', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchEnabled, estoqueId, selectedLocal, selectedGrupo]);

  const handleSearchClick = () => {
    setSearchEnabled(true);
  };

  const startInventory = () => {
    console.log('Inventário iniciado!');
    setInventoryStarted(true);
  };

  const saveInventory = async () => {
    try {
      const saveRequests = Object.entries(newSaldos).map(async ([productId, newSaldo]) => {
        console.log('Produto ID:', productId, 'Novo Saldo:', newSaldo);
  
        if (!isNaN(newSaldo) || newSaldo === '') {
          const url = `http://191.252.212.69:3001/api/saldo/${productId}/${estoqueId}/${selectedLocal}`;
          console.log('URL:', url);
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              saldo: newSaldo
            })
          });
  
          if (!response.ok) {
            const responseBody = await response.text(); 
            console.error(`Erro ao salvar saldo para o produto ${productId}. Detalhes: ${responseBody}`);
          }
        } else {
          console.error(`Novo saldo para o produto ${productId} não é um número válido.`);
        }
      });
  
      await Promise.all(saveRequests);
  
      generatePDF();
  
      console.log('Inventário salvo com sucesso!');
      setInventoryStarted(false);
  
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar inventário: ', error);
    }
  };

  const cancelInventory = () => {
    console.log('Inventário cancelado');
    setInventoryStarted(false);
    navigate('/inventario');
  };

  const handleNewSaldoChange = (productId) => (e) => {
    const value = e.target.value;

    const newSaldoValue = value !== '' ? parseFloat(value) : '';

    setNewSaldos((prevSaldos) => ({
      ...prevSaldos,
      [productId]: newSaldoValue
    }));
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const fontSize = 10;

    const logoPath = 'https://i.ibb.co/Qfx8nnJ/logo.png';
    const logoWidth = 30;
    const logoHeight = 30;

    const logoImage = new Image();
    logoImage.src = logoPath;

    pdf.addImage(logoImage, 'PNG', 20, 10, logoWidth, logoHeight);

    pdf.setFontSize(14);
    pdf.text('STOK - Inventário Inteligente', 120, 20, { align: 'center' });

    const currentDateTime = new Date().toLocaleString();
    pdf.setFontSize(fontSize);
    pdf.text(`Data e Hora: ${currentDateTime}`, 89, 25);

    const columns = ['Produto ID', 'Descrição Produto', 'Descrição Fazenda', 'Saldo Atual', 'Novo Saldo', 'Diferença'];

    const pdfData = products.map((product) => {
      const diferenca = (newSaldos[product.produtoId] || 0) - product.saldo;
      return [
        product.produtoId,
        product.descricaoProduto,
        product.descricaoEstoque,
        product.saldo,
        newSaldos[product.produtoId] || '',
        diferenca
      ];
    });

    pdf.autoTable({
      startY: 50,
      head: [columns],
      body: pdfData,
      theme: 'striped',
      styles: {
        fontSize: fontSize,
        cellPadding: 2,
        overflow: 'linebreak'
      }
    });

    pdf.save('relatorio_inventario.pdf');
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
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
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="local-label">Estoque / Local</InputLabel>
            <Select labelId="local-label" id="local" value={selectedLocal} onChange={(e) => setSelectedLocal(e.target.value)}>
              {localData.map((local) => (
                <MenuItem key={local.id} value={local.id}>
                  {local.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="grupo-label">Grupo</InputLabel>
            <Select labelId="grupo-label" id="grupo" value={selectedGrupo} onChange={(e) => setSelectedGrupo(e.target.value)}>
              {grupoData.map((grupo) => (
                <MenuItem key={grupo.id} value={grupo.id}>
                  {grupo.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <Button variant="contained" color="primary" onClick={handleSearchClick} fullWidth>
              Buscar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            {inventoryStarted ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                onClick={saveInventory}
                fullWidth
              >
                Salvar
              </Button>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={3} sx={{ display: 'flex', gap: '8px' }}>
            {inventoryStarted ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
                onClick={cancelInventory}
                fullWidth
              >
                Cancelar
              </Button>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={startInventory} fullWidth>
                  Iniciar Inventário
                </Button>
                <Button variant="contained" onClick={generatePDF} fullWidth>
                  Gerar Relatório PDF
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto ID</TableCell>
              <TableCell>Foto do Produto</TableCell>
              <TableCell>Descrição Produto</TableCell>
              <TableCell>Descrição Fazenda</TableCell>
              <TableCell>Descrição Estoque/Local</TableCell>
              <TableCell>Descrição Categoria</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Novo Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.produtoId}>
                <TableCell>{product.produtoId}</TableCell>
                <TableCell>
                  <img
                    src={`data:${product.mimeType};base64,${bufferToBase64(product.fotoProduto.data)}`}
                    alt={`Foto ${product.descricaoProduto}`}
                    style={{ width: '40px', height: '40px' }}
                  />
                </TableCell>
                <TableCell>{product.descricaoProduto}</TableCell>
                <TableCell>{product.descricaoEstoque}</TableCell>
                <TableCell>{product.descricaoLocal}</TableCell>
                <TableCell>{product.descricaoCategoria}</TableCell>
                <TableCell>{product.saldo}</TableCell>
                <TableCell>
                  {inventoryStarted ? (
                    <TextField
                      fullWidth
                      id={`new-saldo-${product.produtoId}`}
                      variant="outlined"
                      type="number"
                      value={newSaldos[product.produtoId] !== undefined ? newSaldos[product.produtoId] : ''}
                      onChange={handleNewSaldoChange(product.produtoId)}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Inventory;
