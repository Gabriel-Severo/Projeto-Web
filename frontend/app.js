const BASE_URL = "http://localhost:1337/"

async function carregarDados(colecao) {
    const resposta = await fetch(`${BASE_URL}${colecao}`)
    const dados = await resposta.json()
    return dados
}

async function buscarProdutos() {
    const produtos = await carregarDados('products')
    console.log(produtos)
}

async function buscarTamanhos() {
    const produtos = await carregarDados('sizes')
    console.log(produtos)
}

async function buscarEstilos() {
    const produtos = await carregarDados('styles')
    console.log(produtos)
}

buscarTamanhos()
buscarEstilos()
buscarProdutos()