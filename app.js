// URL ajustada para exportação direta em CSV
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ/edit?usp=sharing';

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true, // Ignora linhas em branco
  complete: function(results) {
    const dados = results.data;
    const container = document.getElementById('resultado');

    if (!dados || dados.length === 0) {
      container.innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    // Pega os nomes dos cabeçalhos (colunas) automaticamente
    const colunas = Object.keys(dados[0]);

    // Monta o cabeçalho da tabela
    let html = '<table><thead><tr>';
    colunas.forEach(coluna => {
      html += `<th>${coluna}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Monta as linhas da tabela
    dados.forEach(linha => {
      html += '<tr>';
      colunas.forEach(coluna => {
        html += `<td>${linha[coluna] || ''}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';

    // Exibe a tabela na tela
    container.innerHTML = html;
  },
  error: function(err) {
    console.error('Erro ao ler a planilha:', err);
    document.getElementById('resultado').innerHTML = '<p class="erro">Erro ao carregar os dados da planilha. Verifique se a planilha está compartilhada publicamente.</p>';
  }
});
