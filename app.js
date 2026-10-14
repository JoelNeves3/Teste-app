// Link de exportação CSV direta baseado no seu documento
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

    // Identifica dinamicamente todos os cabeçalhos das colunas
    const colunas = Object.keys(dados[0]);

    // Monta a estrutura do cabeçalho da tabela
    let html = '<table><thead><tr>';
    colunas.forEach(coluna => {
      html += `<th>${coluna}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Varre todas as linhas e preenche as células
    dados.forEach(linha => {
      html += '<tr>';
      colunas.forEach(coluna => {
        html += `<td>${linha[coluna] !== undefined ? linha[coluna] : ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';

    // Insere a tabela gerada no HTML
    container.innerHTML = html;
  },
  error: function(err) {
    console.error('Erro ao ler a planilha:', err);
    document.getElementById('resultado').innerHTML = '<p class="erro">Erro ao carregar os dados. Verifique se o compartilhamento da planilha está configurado para "Qualquer pessoa com o link".</p>';
  }
});
