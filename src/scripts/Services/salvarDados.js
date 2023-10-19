function getProdutos()
{
    const produtos = [];
    $(".dados-produto").each((index, el)=>{
        let dadosUnitarios = {
            indice: index,
            descricaoProduto: $(el).find("#nome").val(),
            unidadeMedida: $(el).find("#unidade").val(),
            qtdeEstoque: $(el).find("#estoque").val(),
            valorUnitario: $(el).find("#v-unitario").val(),
            valorTotal: $(el).find("#v-total").val()
        }
        produtos.push(dadosUnitarios);
    })
    return produtos;
}

function getAnexos()
{
    const anexos = [];
    $(".anexo").each((index, el)=>{
        let link = $(el).find(".link-anexo")
        let dadosUnitarios = {
            indice: index,
            nomeArquivo: link.attr('download'),
            blobArquivo: link.attr('href')
        }
        anexos.push(dadosUnitarios);
    })
    return anexos;
}

export function salvarDados() {
    return {
    razaoSocial : $("#rSocial").val(),
    nomeFantasia : $("#nome-fantasia").val(),
    cnpj : $("#cnpj").val(),
    inscricaoEstadual : $("#inscricao-estadual").val(),
    inscricaoMunicipal : $("#inscricao-municipal").val(),
    nomeContato : $("#nome-contato").val(),
    telefoneContato : $("#telefone").val(),
    emailContato : $("#email").val(),
    produtos : getProdutos(),
    anexos : getAnexos()
    }
}