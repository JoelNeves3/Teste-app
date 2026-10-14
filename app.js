// URL de exportação CSV direta apontando para a aba 'Clientes'
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ/export?format=csv&sheet=Clientes';

// Função para converter o texto CSV recebido em uma matriz/array
function parseCSV(text) {
  const lines = text.split('\n');
  return lines.map(line => {
    // Trata valores entre aspas contendo vírgula
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const row = [];
    let match;
    while ((match = regex.exec(line)) && match[0] !== '') {
      let val = match[1] || '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      row.push(val.trim());
    }
    return row;
  });
}

async function carregarDadosCSV() {
  const container = document.getElementById('resultado');

  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Erro ao acessar planilha: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText).filter(r => r.length > 1);

    if (rows.length === 0) {
      container.innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    const colunas = rows[0];
    const dados = rows.slice(1);

    let html = '<table><thead><tr>';
    colunas.forEach(col => {
      html += `<th>${col || ''}</th>`;
    });
    html += '</tr></thead><tbody>';

    dados.forEach(row => {
      html += '<tr>';
      colunas.forEach((_, index) => {
        html += `<td>${row[index] !== undefined ? row[index] : ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Erro:', error);
    container.innerHTML = `<p class="erro">Falha ao carregar dados: <strong>${error.message}</strong></p>`;
  }
}

carregarDadosCSV();
