// Endpoint do CSV direto da aba 'Clientes'
const CSV_URL = 'https://docs.google.com/spreadsheets/d/1_sleJps2U8sjup_JIioBvbDDzQS9U2Uy3xrAh6LUxtQ/export?format=csv&sheet=Clientes';

let dadosGlobais = [];
let colunasGlobais = [];

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    dadosGlobais = results.data;

    if (!dadosGlobais || dadosGlobais.length === 0) {
      document.getElementById('resultado').innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    colunasGlobais = Object.keys(dadosGlobais[0]);
    
    // Renderiza a tabela inicial e atualiza o contador
    renderizarTabela(dadosGlobais);
    configurarBusca();
  },
  error: function(err) {
    console.error('Erro ao carregar o CSV:', err);
    document.getElementById('resultado').innerHTML = 
      '<p class="erro">Erro ao carregar dados. Verifique no Google Sheets em "Arquivo > Compartilhar > Publicar na Web" se a aba "Clientes" está publicada em formato CSV.</p>';
  }
});

function renderizarTabela(dados) {
  const container = document.getElementById('resultado');
  const contador = document.getElementById('contador');

  if (dados.length === 0) {
    container.innerHTML = '<p class="erro">Nenhum registro encontrado para a busca.</p>';
    contador.innerText = '0 registros';
    return;
  }

  contador.innerText = `${dados.length} registro(s)`;

  let html = '<table><thead><tr>';
  colunasGlobais.forEach(col => {
    html += `<th>${col}</th>`;
  });
  html += '</tr></thead><tbody>';

  dados.forEach(linha => {
    html += '<tr>';
    colunasGlobais.forEach(col => {
      html += `<td>${linha[col] !== undefined ? linha[col] : ''}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function configurarBusca() {
  const input = document.getElementById('inputBusca');

  input.addEventListener('input', function() {
    const termo = this.value.toLowerCase().trim();

    if (!termo) {
      renderizarTabela(dadosGlobais);
      return;
    }

    const filtrados = dadosGlobais.filter(linha => {
      return colunasGlobais.some(col => {
        const valor = String(linha[col] || '').toLowerCase();
        return valor.includes(termo);
      });
    });

    renderizarTabela(filtrados);
  });
}
