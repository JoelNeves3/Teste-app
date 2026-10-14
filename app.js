// ID extraído da sua URL: 1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ
const SPREADSHEET_ID = '1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ';
// Nome da aba dentro da planilha (ex: 'Clientes' ou 'Página1')
const RANGE = 'Clientes!A1:ZZ1000'; 
// Insira a sua API Key gerada no Google Cloud Console
const API_KEY = 'AQ.Ab8RN6IuaLsZnMk4r1rFwS-2GCvTQLxMIv5Rx7NmSooryMbsxg'; 

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

async function carregarDadosComAPI() {
  const container = document.getElementById('resultado');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    // A primeira linha contém os cabeçalhos (colunas)
    const colunas = rows[0];
    const dados = rows.slice(1);

    // Monta o cabeçalho
    let html = '<table><thead><tr>';
    colunas.forEach(col => {
      html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Monta as linhas
    dados.forEach(row => {
      html += '<tr>';
      colunas.forEach((_, index) => {
        html += `<td>${row[index] || ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    container.innerHTML = '<p class="erro">Falha ao carregar dados via Google Sheets API. Verifique a API Key e as permissões de compartilhamento.</p>';
  }
}

// Executa a busca ao carregar
carregarDadosComAPI();
