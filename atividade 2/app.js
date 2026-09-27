document.addEventListener("DOMContentLoaded", function () {
    console.log("LINKADO TÁ!");

    let chamados = [
        { id: 1, titulo: 'Trocar lâmpada', categoria: 'Manutenção' },
        { id: 2, titulo: 'Computador não liga', categoria: 'Suporte' }
    ];

    const form = document.getElementById('form-chamado');
    const inputTitulo = document.getElementById('titulo');
    const selectCategoria = document.getElementById('categoria');
    const listaUI = document.getElementById('lista-chamados');
    const campoBusca = document.getElementById('campo-busca');
    const erroTitulo = document.getElementById('erro-titulo');
    const erroCategoria = document.getElementById('erro-categoria');

    function renderizarLista(itens) {
        if (!listaUI) return;
        listaUI.innerHTML = '';

        if (itens.length === 0) {
            listaUI.innerHTML = '<li style="color: gray; margin-top: 10px;">Nenhum chamado encontrado.</li>';
            return;
        }

        itens.forEach(item => {
            const li = document.createElement('li');
            li.style.marginTop = '10px';
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';

            const spanTexto = document.createElement('span');
            spanTexto.innerHTML = `<strong>[${item.categoria}]</strong> ${item.titulo}`;
            li.appendChild(spanTexto);

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.style.marginLeft = '10px';
            btnExcluir.style.padding = '2px 6px';
            
            btnExcluir.addEventListener('click', function () {
                chamados = chamados.filter(c => c.id !== item.id);
                dispararBusca();
            });

            li.appendChild(btnExcluir);
            listaUI.appendChild(li);
        });
    }

    function dispararBusca() {
        if (!campoBusca) {
            renderizarLista(chamados);
            return;
        }
        const termo = campoBusca.value.toLowerCase();
        const chamadosFiltrados = chamados.filter(item =>
            item.titulo.toLowerCase().includes(termo)
        );
        renderizarLista(chamadosFiltrados);
    }

    if (form) {
        form.addEventListener('submit', function (evento) {
            evento.preventDefault(); 
            let formularioValido = true;

            if (inputTitulo && inputTitulo.value.trim() === '') {
                if (erroTitulo) erroTitulo.innerText = 'O título é obrigatório!';
                formularioValido = false;
            } else if (erroTitulo) {
                erroTitulo.innerText = '';
            }

            if (selectCategoria && selectCategoria.value === '') {
                if (erroCategoria) erroCategoria.innerText = 'Selecione uma categoria!';
                formularioValido = false;
            } else if (erroCategoria) {
                erroCategoria.innerText = '';
            }

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

    if (campoBusca) {
        campoBusca.addEventListener('input', dispararBusca);
    }

    renderizarLista(chamados);
});