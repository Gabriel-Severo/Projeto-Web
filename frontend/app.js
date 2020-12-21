const BASE_URL = "http://localhost:1337"

async function carregarDados(colecao) {
    const resposta = await fetch(`${BASE_URL}${colecao}`)
    const dados = await resposta.json()
    return dados
}

async function buscarProdutos() {
    const produtos = await carregarDados('/products')
    return produtos
}

async function buscarTamanhos() {
    const tamanhos = await carregarDados('/sizes')
    return tamanhos
}

async function buscarEstilos() {
    const estilos = await carregarDados('/styles')
    return estilos
}

async function adicionarProdutosAODOM() {
    const produtos = await buscarProdutos()
    for (const produto of produtos) {
        let {name, regular_price, image} = produto
        regular_price = regular_price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector('.products').innerHTML += `
            <div class="product">
                <div class="product-image">
                    <img src="${BASE_URL}${image[0].url}" alt="Produto">
                </div>
                <div class="product-description">
                    <div class="product-name">
                        <p>${name}</p>
                    </div>
                    <div class="product-price">
                        <p>${regular_price}</p>
                    </div>
                </div>
            </div>
        `
    }
}

adicionarProdutosAODOM()