// ID extraído da URL da sua planilha: 1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ
const SPREADSHEET_ID = '1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ';

// Nome da aba exata na planilha ('Clientes') cobrindo todas as colunas de A até BB e até 2000 linhas
const RANGE = 'Clientes!A1:BB2000'; 

// Substitua pela sua Chave de API criada no Google Cloud Console
const API_KEY = 'SUA_CHAVE_DE_API_AQUI'; 

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

async function carregarTodosOsDados() {
  const container = document.getElementById('resultado');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length === 0) {
      container.innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    // A primeira linha (índice 0) contém os cabeçalhos de todas as 54 colunas
    const colunas = rows[0];
    
    // As linhas seguintes contêm os dados dos clientes (cerca de 1.018 registros)
    const dados = rows.slice(1);

    // Início da construção da tabela HTML
    let html = '<table><thead><tr>';
    colunas.forEach(col => {
      html += `<th>${col || ''}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Varre todas as linhas e colunas trazidas
    dados.forEach(row => {
      html += '<tr>';
      colunas.forEach((_, index) => {
        // Se a célula estiver vazia na planilha, exibe uma string vazia
        html += `<td>${row[index] !== undefined ? row[index] : ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    
    // Injeta o HTML completo na div #resultado
    container.innerHTML = html;

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    container.innerHTML = `<p class="erro">Falha ao carregar os dados. Verifique sua API Key e certifique-se de que a planilha está pública para leitura.</p>`;
  }
}

// Executa o carregamento assim que o script é lido
carregarTodosOsDados();
