document.addEventListener("DOMContentLoaded", () => {
    // Estado inicial da aplicação
    let chamados = [
        { id: 1, titulo: 'Trocar lâmpada', categoria: 'Manutenção' },
        { id: 2, titulo: 'Computador não liga', categoria: 'Suporte' }
    ];

    // Mapeamento dos elementos do DOM
    const form = document.getElementById('form-chamado');
    const inputTitulo = document.getElementById('titulo');
    const selectCategoria = document.getElementById('categoria');
    const listaUI = document.getElementById('lista-chamados');
    const campoBusca = document.getElementById('campo-busca');
    const erroTitulo = document.getElementById('erro-titulo');
    const erroCategoria = document.getElementById('erro-categoria');

    // Renderiza a lista de chamados na interface
    function renderizarLista(itens) {
        if (!listaUI) return;
        listaUI.innerHTML = '';

        if (itens.length === 0) {
            const liVazio = document.createElement('li');
            liVazio.className = 'chamado-vazio';
            liVazio.textContent = 'Nenhum chamado encontrado.';
            listaUI.appendChild(liVazio);
            return;
        }

        itens.forEach(item => {
            const li = document.createElement('li');
            li.className = 'chamado-item';

            const spanTexto = document.createElement('span');
            // Uso de textContent para prevenir vulnerabilidades XSS
            spanTexto.textContent = `[${item.categoria}] ${item.titulo}`;

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.className = 'btn btn-danger';
            
            btnExcluir.addEventListener('click', () => {
                removerChamado(item.id);
            });

            li.appendChild(spanTexto);
            li.appendChild(btnExcluir);
            listaUI.appendChild(li);
        });
    }

    // Aplica o filtro de busca sobre os chamados
    function dispararBusca() {
        const termo = campoBusca ? campoBusca.value.toLowerCase().trim() : '';
        const chamadosFiltrados = chamados.filter(item =>
            item.titulo.toLowerCase().includes(termo)
        );
        renderizarLista(chamadosFiltrados);
    }

    // Remove chamado pelo ID
    function removerChamado(id) {
        chamados = chamados.filter(c => c.id !== id);
        dispararBusca();
    }

    // Validação e manipulação do formulário
    if (form) {
        form.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            let formularioValido = true;

            // Limpa mensagens anteriores
            if (erroTitulo) erroTitulo.textContent = '';
            if (erroCategoria) erroCategoria.textContent = '';

            // Validação do Título
            if (!inputTitulo || inputTitulo.value.trim() === '') {
                if (erroTitulo) erroTitulo.textContent = 'O título é obrigatório!';
                formularioValido = false;
            }

            // Validação da Categoria
            if (!selectCategoria || selectCategoria.value === '') {
                if (erroCategoria) erroCategoria.textContent = 'Selecione uma categoria!';
                formularioValido = false;
            }

            // Inserção caso válido
            if (formularioValido) {
                const novoChamado = {
                    id: Date.now(),
                    titulo: inputTitulo.value.trim(),
                    categoria: selectCategoria.value
                };

                chamados.push(novoChamado);
                form.reset(); 
                dispararBusca(); 
            }
        });
    }

    // Ouvinte para busca em tempo real
    if (campoBusca) {
        campoBusca.addEventListener('input', dispararBusca);
    }

    // Carga inicial
    renderizarLista(chamados);
});