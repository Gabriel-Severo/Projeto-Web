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

async function adicionarProdutosAODOM(produtos) {
    for (const produto of produtos) {
        let {name, regular_price, image} = produto
        regular_price = regular_price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector('.products').innerHTML += `
            <a class="link-product" href="#">
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
            </a>
        `
    }
}

async function atualizarQuantidadeProdutos(produtos) {
    document.querySelector('.count_products').innerHTML = `${produtos.length} produtos`
}

async function adicionarEventoDeClickAosProdutos(produtos) {
    console.log(produtos)
    const links = await document.querySelectorAll('.link-product')
    let i = 0
    for (link of links) {
        link.setAttribute('id', i)
        link.addEventListener('click', (event) => {
            const produtoID = event.target.parentElement.parentElement.parentElement.id
            let {name, regular_price, image, sizes, installments} = produtos[produtoID]
            regular_price = regular_price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            document.querySelector('.product-store').style.display = 'flex'
            document.querySelector('body').style.overflow = 'hidden'
            document.querySelector('.product-store').innerHTML = `
                <div class="product-store-image">
                    <img src="${BASE_URL}${image[0].url}" alt="Produto">
                </div>
                <div class="product-store-info">
                    <div class="product-store-name">
                        <strong>${name}</strong>
                    </div>
                    <div class="product-store-prices">
                        <strong class="product-store-price">${regular_price}</strong>
                        <p class="product-store-installments">${installments}</p>
                    </div>
                    <p class="text-info">Escolha o tamanho</p>
                    <div class="product-store-sizes">
                    </div>
                    <button class="submit">Adicionar a sacola</button>
                </div>
            `
            for(size of sizes) {
                document.querySelector('.product-store-sizes').innerHTML += `
                    <a class="size" href="#">${size.size}</a>
                `
            }
        })
        i++
    }
}

function adicionarEventoDeClickALogo() {
    const logo = document.querySelector('.logo')
    logo.addEventListener('click', () => {
        document.querySelector('.product-store').style.display = 'none'
        document.querySelector('body').style.overflow = 'auto'
    })
}

async function main() {
    const produtos = await buscarProdutos()
    await atualizarQuantidadeProdutos(produtos)
    await adicionarProdutosAODOM(produtos)
    adicionarEventoDeClickAosProdutos(produtos)
    adicionarEventoDeClickALogo()
}

main()