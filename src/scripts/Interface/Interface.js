import { gerarProduto } from "./Componentes/produto.js";

$("#adicionar-produto").on("click", () => {
    let nProduto = $(".produto-container").length + 1;
    if(nProduto==1)
    {
        $("#sem-produtos").remove();
    }
    let produto = gerarProduto(nProduto);
    $("#produtos-main").append(produto);
    $(produto).find(".excluir-produto").on("click", ()=>{
        removerProduto(()=>{$(produto).remove();});
    });
    $(".v-unitario").on("input", (e)=>{
        valorTotal(e.target.parentElement.parentElement);
    });
    $(".estoque").on("input", (e)=>{
        valorTotal(e.target.parentElement.parentElement);
    });
});

function valorTotal(elemento)
{
    let quantidade = $(elemento).find("#estoque").val();
    let valorUnitario = $(elemento).find("#v-unitario").val();
    let valorTotal = quantidade * valorUnitario;
    $(elemento).find("#v-total").val(valorTotal);
}

function removerProduto(callback)
{
    FLUIGC.message.confirm({
        message: 'Deseja remover este produto?',
        title: 'Remover produto',
        labelYes: 'Remover',
        labelNo: 'Cancelar'
    }, function(result, el, ev) {
        if(result) {
            callback();
        }
    });
}