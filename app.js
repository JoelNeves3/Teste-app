// Substitua pela URL copiada no Passo 2 (termina em /exec)
const API_URL = 'https://script.google.com/a/macros/bling.com.br/s/AKfycbwBfnUZnOfbxH1lmjB3zyH9r0vZUqP7BJ5zEahhSRqsM-zjajdGHK3bNYCx40xdhB56iw/exec';

let dadosGlobais = [];
let colunasGlobais = [];

async function carregarDados() {
  const container = document.getElementById('resultado');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    dadosGlobais = await response.json();

    if (!dadosGlobais || dadosGlobais.length === 0) {
      container.innerHTML = '<p class="erro">Nenhum dado encontrado na planilha.</p>';
      return;
    }

    colunasGlobais = Object.keys(dadosGlobais[0]);

    renderizarTabela(dadosGlobais);
    configurarBusca();

  } catch (error) {
    console.error('Erro ao buscar API:', error);
    container.innerHTML = `<p class="erro">Falha ao carregar dados da API: <strong>${error.message}</strong>.<br><br>Verifique se na implantação do Apps Script a opção "Quem tem acesso" foi definida como "Qualquer pessoa".</p>`;
  }
}

function renderizarTabela(dados) {
  const container = document.getElementById('resultado');
  const contador = document.getElementById('contador');

  if (dados.length === 0) {
    container.innerHTML = '<p class="erro">Nenhum registro encontrado para a busca.</p>';
    if (contador) contador.innerText = '0 registros';
    return;
  }

  if (contador) contador.innerText = `${dados.length} registro(s)`;

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
  if (!input) return;

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

carregarDados();
