document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Função para formatar data
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    // Função para criar badge de status
    const createStatusBadge = (plano) => {
      let badgeClass, statusText;
      
      if (plano === 'Premium') {
        badgeClass = 'bg-success';
        statusText = 'Ativo';
      } else if (plano === 'Teste') {
        badgeClass = 'bg-info';
        statusText = 'Teste';
      } else {
        badgeClass = 'bg-secondary';
        statusText = 'Inativo';
      }
      
      return `<span class="badge ${badgeClass} status-badge">${statusText}</span>`;
    };

    // Buscar dados da API
    const response = await fetch('/api/data');
    let data = await response.json();

    // Garantir que data seja um array
    if (!Array.isArray(data)) {
      data = [];
    }
    
    // Atualizar cards de resumo
    document.getElementById('total-users').textContent = data.length;
    document.getElementById('paid-users').textContent = data.filter(u => u.plano === 'Premium').length;
    document.getElementById('trial-users').textContent = data.filter(u => u.plano === 'Teste').length;
    document.getElementById('inactive-users').textContent = data.filter(u => !['Premium', 'Teste'].includes(u.plano)).length;
    
    // Preencher tabela
    const tableBody = document.querySelector('#data-table');
    tableBody.innerHTML = '';
    
    data.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td>${user.plano}</td>
        <td>${createStatusBadge(user.plano)}</td>
        <td>${formatDate(user.data_cadastro)}</td>
      `;
      tableBody.appendChild(row);
    });

    // Adicionar event listeners aos botões de filtro
    document.getElementById('btn-week').addEventListener('click', () => {
      alert('Filtro semanal aplicado!');
      // Lógica para filtrar dados semanais
    });
    
    document.getElementById('btn-month').addEventListener('click', () => {
      alert('Filtro mensal aplicado!');
      // Lógica para filtrar dados mensais
    });

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    alert('Erro ao carregar dados. Verifique o console para mais detalhes.');
  }
});
