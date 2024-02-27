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
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Inventory = () => {
  const [fazendas, setFazendas] = useState([]);
  const [locais, setLocais] = useState([]);
  const [fazenda, setFazenda] = useState('');
  const [local, setLocal] = useState('');
  const [relatorio, setRelatorio] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchFazendas();
    fetchLocais();
    fetchRelatorio();
  }, []);

  const getSortedRelatorio = () => {
    if (orderBy) {
      const orderMultiplier = order === 'asc' ? 1 : -1;
      return [...relatorio].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return -1 * orderMultiplier;
        }
        if (a[orderBy] > b[orderBy]) {
          return 1 * orderMultiplier;
        }
        return 0;
      });
    }
    return relatorio;
  };

  const sortedRelatorio = getSortedRelatorio();

  const fetchFazendas = async () => {
    try {
      const response = await fetch('http://191.252.212.69:3001/api/estoque');
      const fazendasData = await response.json();
      setFazendas(fazendasData);
    } catch (error) {
      console.error('Erro ao buscar fazendas: ', error);
    }
  };

  const fetchLocais = async () => {
    try {
      const response = await fetch('http://191.252.212.69:3001/api/sub-estoque');
      const locaisData = await response.json();
      setLocais(locaisData);
    } catch (error) {
      console.error('Erro ao buscar locais: ', error);
    }
  };

  const fetchRelatorio = async () => {
    try {
      let queryParams = '';
      if (fazenda && local) {
        const fazendaId = fazendas.find(fazendaItem => fazendaItem.descricao === fazenda)?.id;
        const localId = locais.find(localItem => localItem.descricao === local)?.id;
        queryParams = new URLSearchParams({
          fazenda: fazendaId,
          local: localId
        });
      } else if (fazenda) {
        const fazendaId = fazendas.find(fazendaItem => fazendaItem.descricao === fazenda)?.id;
        queryParams = new URLSearchParams({
          fazenda: fazendaId
        });
      } else if (local) {
        const localId = locais.find(localItem => localItem.descricao === local)?.id;
        queryParams = new URLSearchParams({
          local: localId
        });
      }

      const response = await fetch(`http://191.252.212.69:3001/api/produto/relatorio?${queryParams}`);
      const data = await response.json();

      const relatorioData = Array.isArray(data) ? data : [];
      setRelatorio(relatorioData);
    } catch (error) {
      console.error('Erro ao buscar relatório: ', error);
    }
  };

  const handleSort = (field) => {
    const newOrder = orderBy === field && order === 'asc' ? 'desc' : 'asc';
    setOrderBy(field);
    setOrder(newOrder);
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

    const columns = ['ID Material', 'Descrição Material', 'Fazenda', 'Local', 'Saldo'];

    const pdfData = relatorio.map(item => [
      item.id_material,
      item.material,
      item.fazenda,
      item.local,
      item.quantidade
    ]);

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
    pdf.save('relatorio_produto.pdf');
  };

  return (
    <div>
      <Grid container spacing={2}>
        {/* Fazenda */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="fazenda-label">Fazenda</InputLabel>
            <Select
              labelId="fazenda-label"
              id="fazenda"
              value={fazenda}
              onChange={(e) => setFazenda(e.target.value)}
            >
              <MenuItem value="" disabled>Select Fazenda</MenuItem>
              {fazendas.map((fazendaItem) => (
                <MenuItem key={fazendaItem.id} value={fazendaItem.descricao}>
                  {fazendaItem.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Local */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="local-label">Local</InputLabel>
            <Select
              labelId="local-label"
              id="local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            >
              <MenuItem value="" disabled>Select Local</MenuItem>
              {locais.map((localItem) => (
                <MenuItem key={localItem.id} value={localItem.descricao}>
                  {localItem.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Botões */}
        <Grid item xs={4}>
          <Box mb={1} sx={{ display: 'flex', gap: '8px' }}>
            <Button variant="contained" color="primary" onClick={fetchRelatorio} fullWidth>
              Buscar
            </Button>
            <Button variant="contained" onClick={generatePDF} fullWidth>
              Gerar Relatório PDF
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Tabela de Relatório */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button onClick={() => handleSort('id_material')}>
                  ID Material
                  {orderBy === 'id_material' && (
                    <span>{order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSort('material')}>
                  Material
                  {orderBy === 'material' && (
                    <span>{order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSort('fazenda')}>
                  Fazenda
                  {orderBy === 'fazenda' && (
                    <span>{order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSort('local')}>
                  Local
                  {orderBy === 'local' && (
                    <span>{order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSort('quantidade')}>
                  Quantidade
                  {orderBy === 'quantidade' && (
                    <span>{order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRelatorio.map((item) => (
              <TableRow key={item.id_material}>
                <TableCell>{item.id_material}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell>{item.fazenda}</TableCell>
                <TableCell>{item.local}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Inventory;
