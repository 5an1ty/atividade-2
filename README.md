Sistema de Chamados - Front-End

Projeto de prototipo de sistema interno para abertura e filtragem de chamados operacionais.

Tecnologias Utilizadas
- HTML5 (Semantica e Acessibilidade)
- CSS3 (Layout Flexbox, Responsividade e Variaveis)
- JavaScript ES6+ (Manipulacao Dinamica do DOM e Validacoes)

Ajustes de Qualidade Executados (Refatoracao)
- Seguranca e Boas Praticas: Substituicao de insercoes via innerHTML por textContent no JS para evitar falhas de XSS.
- Separacao de Responsabilidades: Remocao de regras CSS genericas injetadas via JavaScript (li.style), centralizando toda a estilizacao e classes no style.css.
- Correcoes CSS: Correcao de sintaxe erronea na propriedade box-shadow.
- Organizacao de Codigo: Padronizacao de nomes de classes CSS em kebab-case e padronizacao no JavaScript utilizando Arrow Functions e comentarios explicativos.
- Padronizacao do Projeto: Conversao da documentacao original Readme.txt para o padrao Markdown (README.md).

Como Executar o Projeto
1. Clone este repositorio ou baixe os arquivos.
2. Abra o arquivo index.html em qualquer navegador web.
3. Preencha o formulario para adicionar novos chamados ou utilize o campo de busca para filtrar registros existentes.

Rastreabilidade
As tarefas deste ciclo de refatoracao foram registradas e organizadas no quadro Trello do projeto, garantindo o fluxo continuo e rastreavel do desenvolvimento.

Link para o quadro de tarefas
https://trello.com/b/FOLuI9fC/meu-quadro-do-trello
