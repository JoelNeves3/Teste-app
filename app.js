// Substitua pelo link CSV publicado do Google Sheets
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ/edit?usp=sharing';

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  complete: function(results) {
    const dados = results.data;
    let html = '<ul>';
    dados.forEach(row => {
      // Exemplo acessando colunas chamadas "Nome" e "Email"
      if(row.Nome) {
        html += `<li><strong>${row.Nome}:</strong> ${row.Email}</li>`;
      }
    });
    html += '</ul>';
    document.getElementById('resultado').innerHTML = html;
  }
});
