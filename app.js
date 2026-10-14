async function carregarDadosPrivados() {
  const container = document.getElementById('resultado');

  try {
    // Consulta o backend local
    const response = await fetch('http://localhost:3000/api/dados');
    
    if (!response.ok) {
      throw new Error(`Erro no servidor: ${response.statusText}`);
    }

    const rows = await response.json();

    if (!rows || rows.length === 0) {
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
    container.innerHTML = `<p class="erro">Falha ao carregar dados: <strong>${error.message}</strong>. Verifique se o servidor backend está rodando.</p>`;
  }
}

carregarDadosPrivados();
