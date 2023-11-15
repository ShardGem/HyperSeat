const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector("#menu-icon");
let navmenu = document.querySelector(".navmenu");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navmenu.classList.toggle("open");
}


// Simulando dados de produtos
let produtos = [
    { nome: 'Cadeira Gamer Elite', preco: 799.90, modelo: 'EG-1001', fabricante: 'HyperSeat', descricao: 'Conforto e estilo em um só produto.' },
    { nome: 'Cadeira Ultimate Pro', preco: 1599.90, modelo: 'UP-2022', fabricante: 'GamingMaster', descricao: 'Design ergonômico e materiais de alta qualidade.' },
    { nome: 'Cadeira StealthX', preco: 1299.90, modelo: 'SX-500', fabricante: 'StealthGaming', descricao: 'Perfeita para longas sessões de jogos intensos.' },
    { nome: 'Cadeira Vortex X', preco: 849.90, modelo: 'VX-800', fabricante: 'TechPro', descricao: 'Performance e elegância em um só lugar.' },
    { nome: 'Cadeira Prodigy Plus', preco: 1699.90, modelo: 'PP-8000', fabricante: 'UltimateGamer', descricao: 'Projetada para gamers exigentes.' },
    { nome: 'Cadeira Galaxy Explorer', preco: 1349.90, modelo: 'GE-200', fabricante: 'CosmicTech', descricao: 'Explore o universo do gaming com estilo.' },
    { nome: 'Cadeira Thunderbolt', preco: 659.90, modelo: 'TB-1200', fabricante: 'StrikeForce', descricao: 'Potência e conforto para sua experiência gamer.' },
    { nome: 'Cadeira Supreme Commander', preco: 799.90, modelo: 'SC-5000', fabricante: 'CommandTech', descricao: 'Comande sua vitória com esta cadeira.' },

    //Adicione mais produtos conforme necessário
];

// Função para renderizar a tabela de produtos
function renderizarTabela() {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = ''; // Limpa o corpo da tabela antes de renderizar

    // Adiciona os produtos à tabela
    produtos.forEach(produto => {
        const linha = corpoTabela.insertRow();
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$${produto.preco.toFixed(2)}</td>
            <td>${produto.modelo}</td>
            <td>${produto.fabricante}</td>
            <td>${produto.descricao}</td>
            <td><a href="editar.html"><i class='bx bxs-edit-alt'></i></a></td>
            <td><a href="#remover-produto"><i class='bx bxs-trash-alt'></i></a></td>
        `;
    });
}

// Função para ordenar os produtos com base nas opções selecionadas
function ordenarProdutos(ordenacao, ordem) {
    return produtos.sort((a, b) => {
        if (ordenacao === 'preco') {
            return ordem === 'crescente' ? a[ordenacao] - b[ordenacao] : b[ordenacao] - a[ordenacao];
        } else {
            return ordem === 'crescente' ? a[ordenacao].localeCompare(b[ordenacao]) : b[ordenacao].localeCompare(a[ordenacao]);
        }
    });
}

// Função para aplicar a ordenação e renderizar a tabela
function aplicarOrdenacao() {
    const ordenacao = document.getElementById('ordenacao').value;
    const ordem = document.getElementById('ordem').value;

    // Ordena os produtos com base nas opções selecionadas
    produtos = ordenarProdutos(ordenacao, ordem);

    // Renderiza a tabela com os produtos ordenados
    renderizarTabela();
}

// Função para adicionar um novo produto
function adicionarProduto() {
    const nome = prompt('Digite o nome do produto:');
    const preco = parseFloat(prompt('Digite o preço do produto:'));
    const modelo = prompt('Digite o modelo do produto:');
    const fabricante = prompt('Digite o fabricante do produto:');
    const descricao = prompt('Digite a descrição do produto:');

    // Verifica se todos os campos foram preenchidos
    if (nome && !isNaN(preco) && modelo && fabricante && descricao) {
        // Adiciona o novo produto à lista
        const novoProduto = { nome, preco, modelo, fabricante, descricao };
        produtos.push(novoProduto);

        // Chama a função para renderizar a tabela atualizada
        renderizarTabela();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function abrirFormularioEdicao(indice) {
    const produto = produtos[indice];

    document.getElementById('nomeProduto').value = produto.nome;
    document.getElementById('precoProduto').value = produto.preco.toFixed(2);
    document.getElementById('modeloProduto').value = produto.modelo;
    document.getElementById('fabricanteProduto').value = produto.fabricante;
    document.getElementById('descricaoProduto').value = produto.descricao;

    // Atualiza o índice do produto sendo editado
    produtoEditandoIndice = indice;

    // Exibe o formulário de edição e oculta o de adição
    document.getElementById('formEdicao').style.display = 'block';
}

// Adicione uma função para criar botões de edição na tabela
function criarBotoesEdicao(indice) {
    const botaoEdicao = document.createElement('button');
    botaoEdicao.innerHTML = '<i class="fas fa-edit"></i>'; // Ícone de edição (Font Awesome)
    botaoEdicao.addEventListener('click', function () {
        abrirFormularioEdicao(indice);
    });

    const celulaAcoes = document.createElement('td');
    celulaAcoes.appendChild(botaoEdicao);

    return celulaAcoes;
}

// Adicione uma função para atualizar o produto editado
function atualizarProduto() {
    // Obtenha os valores do formulário de edição
    const nome = document.getElementById('nomeProduto').value;
    const preco = parseFloat(document.getElementById('precoProduto').value);
    const modelo = document.getElementById('modeloProduto').value;
    const fabricante = document.getElementById('fabricanteProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;

    // Verifique se todos os campos foram preenchidos
    if (nome && !isNaN(preco) && modelo && fabricante && descricao) {
        // Atualize as informações do produto na lista
        produtos[produtoEditandoIndice] = {
            nome,
            preco,
            modelo,
            fabricante,
            descricao
        };

        // Renderize a tabela novamente para refletir as alterações
        renderizarTabela();
        
        // Oculte o formulário de edição e exiba o de adição
        document.getElementById('formEdicao').style.display = 'none';
        document.getElementById('formProduto').style.display = 'block';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

// Inicialize uma variável global para rastrear o índice do produto sendo editado
let produtoEditandoIndice = -1;

// Inicializa a tabela quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
    renderizarTabela();
});
