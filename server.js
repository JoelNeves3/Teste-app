const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// ID da sua planilha privada
const SPREADSHEET_ID = '1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ';
const RANGE = 'Clientes!A1:BB2000';

// Configura a autenticação com a Conta de Serviço
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'credentials.json'), // Arquivo baixado do Google Cloud
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

app.get('/api/dados', async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    res.json(response.data.values || []);
  } catch (error) {
    console.error('Erro ao buscar planilha privada:', error);
    res.status(500).json({ error: 'Erro ao carregar os dados da planilha.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
