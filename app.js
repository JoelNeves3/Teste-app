// ID extraído da sua planilha
const SPREADSHEET_ID = '1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ';

// Aba 'Clientes' e intervalo A até BB cobrindo todas as 54 colunas
const RANGE = 'Clientes!A1:BB2000';

// IMPORTANTE: Insira aqui uma API Key válida do Google Cloud (começa com AIzaSy...)
const API_KEY = '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';

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

async function carregarDadosComAPI() {
  const container = document.getElementById('resultado');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Erro HTTP ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    // A primeira linha contém os cabeçalhos das colunas
    const colunas = rows[0];

    // As linhas seguintes contêm todos os dados dos clientes
    const dados = rows.slice(1);

    // Monta o cabeçalho da tabela
    let html = '<table><thead><tr>';
    colunas.forEach(col => {
      html += `<th>${col || ''}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Preenche as linhas da tabela
    dados.forEach(row => {
      html += '<tr>';
      colunas.forEach((_, index) => {
        html += `<td>${row[index] !== undefined ? row[index] : ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';

    // Insere no DOM
    container.innerHTML = html;

  } catch (error) {
    console.error('Erro detalhado:', error);
    container.innerHTML = `<p class="erro">Falha ao carregar dados via API: <strong>${error.message}</strong></p>`;
  }
}

// Executa a requisição ao carregar o script
carregarDadosComAPI();
