// Link do CSV exportado diretamente da aba 'Clientes' da sua planilha
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ/export?format=csv&sheet=Clientes';

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    const dados = results.data;
    const container = document.getElementById('resultado');

    if (!dados || dados.length === 0) {
      container.innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    // Pega automaticamente os nomes de todas as colunas
    const colunas = Object.keys(dados[0]);

    // Monta o cabeçalho da tabela
    let html = '<table><thead><tr>';
    colunas.forEach(coluna => {
      html += `<th>${coluna}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Preenche as linhas da tabela com os dados recebidos
    dados.forEach(linha => {
      html += '<tr>';
      colunas.forEach(coluna => {
        html += `<td>${linha[coluna] !== undefined ? linha[coluna] : ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';

    // Insere a tabela gerada no container
    container.innerHTML = html;
    container.classList.remove('carregando');
  },
  error: function(err) {
    console.error('Erro ao carregar a planilha:', err);
    document.getElementById('resultado').innerHTML = 
      '<p class="erro">Falha ao carregar os dados.<br>' +
      '1. Certifique-se de que a planilha no Google Sheets está configurada como <strong>"Qualquer pessoa com o link"</strong>.<br>' +
      '2. Execute o projeto usando um servidor local (ex: extensão <strong>Live Server</strong> no VS Code ou <code>python -m http.server</code>).</p>';
  }
});
