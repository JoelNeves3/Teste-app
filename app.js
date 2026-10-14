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

    const colunas = Object.keys(dados[0]);

    let html = '<table><thead><tr>';
    colunas.forEach(coluna => {
      html += `<th>${coluna}</th>`;
    });
    html += '</tr></thead><tbody>';

    dados.forEach(linha => {
      html += '<tr>';
      colunas.forEach(coluna => {
        html += `<td>${linha[coluna] !== undefined ? linha[coluna] : ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  },
  error: function(err) {
    console.error('Erro PapaParse:', err);
    document.getElementById('resultado').innerHTML = 
      '<p class="erro">Falha ao carregar dados. Certifique-se de estar rodando em um servidor local (ex: Live Server) e que a planilha esteja pública.</p>';
  }
});
