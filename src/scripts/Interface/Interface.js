import { gerarProduto } from "./Componentes/produto.js";
import { gerarAnexo } from "./Componentes/Anexo.js";
import { uploadArquivo } from "../Services/Upload.js";
import { validarFornecedor, validaCNPJ } from "../Services/Validar.js";

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

$("#adicionar-anexo").on("click", () => {
    let nAnexo = $(".anexo").length + 1;
    $("#input-anexo").trigger("click");
});

$("#input-anexo").on("change", (e) => {
    if($(".anexo").length==0)
    {
        $("#sem-anexo").remove();
    }
    const {clickable, link} = uploadArquivo(e.target);
    $(clickable).append(`<img src="src/assets/olho-aberto.png" class="btn fs-bg-info fs-md-margin-right excluir-produto" style="height: 30px;">`)
    let anexo = gerarAnexo($(".anexo").length + 1);
    $(anexo).find("#link-container")[0].append(clickable);
    $(anexo).find("#delete")[0].onclick = (e) => {
        removerAnexo(e.target.parentElement, link);
    };
    $("#anexos-main").append(anexo);
});

//validar cnpj
$("#cnpj").on("input", (e) => {
    let cnpj = e.target.value;
    if(cnpj.length == 18)
    {
        if(!validaCNPJ(cnpj))
        {
            $("#cnpj").parent().addClass("has-error");
            $("#erro-cnpj").fadeToggle();
            setTimeout(() => {
                $("#cnpj").val("")
                $("#cnpj").parent().removeClass("has-error");
                $("#erro-cnpj").fadeToggle();
            }, 2000);
        }
    }
});

$("#salvar").on("click", () => {
    validarFornecedor();
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

function removerAnexo(elemento, link)
{
    FLUIGC.message.confirm({
        message: 'Deseja remover este anexo?',
        title: 'Remover anexo',
        labelYes: 'Remover',
        labelNo: 'Cancelar'
    }, function(result, el, ev) {
        if(result) {
            $(elemento).remove();
            URL.revokeObjectURL(link);
        }
    });
}