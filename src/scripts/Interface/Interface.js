import { gerarProduto } from "./Componentes/produto.js";
import { gerarAnexo } from "./Componentes/Anexo.js";
import { uploadArquivo } from "../Services/Upload.js";
import { validarFornecedor, validaCNPJ } from "../Services/Validar.js";
import { salvarDados } from "../Services/salvarDados.js";


/**
 * Listener para o botão de adicionar produto
 * gera um componente de produto e adiciona ao DOM.
 * adiciona listeners para os campos de quantidade e valor unitário. para cálculo do valor total.
 */
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

/**
 * Listener para o input de anexo.
 * gera um componente de anexo e adiciona ao DOM.
 * adiciona listener para o botão de excluir anexo.
 */
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

/**
 * Listener para o botão de salvar dados
 * caso o fornecedor seja válido, salva os dados em um arquivo JSON e 
 * faz o download do mesmo.
*/
$("#salvar").on("click", () => {
    if(validarFornecedor())
    {
        const dados = salvarDados();
        console.log(dados)
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(dados)], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = "dados.json";
        a.click();
        FLUIGC.modal({
            title: "Dados salvos com sucesso!",
            content: `
                <h3>Razão social: ${$("#rSocial").val()}</h2>
                <br>
                <h3>CNPJ: ${$("#cnpj").val()}</h2>
                <br>
                <h3>Produtos cadastrados: ${$(".produto-container").length}</h2>
            `,
            actions: [{
                'label': 'Fechar',
                'autoClose': true
            }]
        }); 
          
    } 
});


/**
 * Função para calcular o valor total de um produto.
 * com base na quantidade e no valor unitário.
 * @param {Element} elemento - O elemento HTML do produto a ser calculado.
 * */
function valorTotal(elemento)
{
    let quantidade = $(elemento).find("#estoque").val();
    let valorUnitario = $(elemento).find("#v-unitario").val();
    let valorTotal = quantidade * valorUnitario;
    $(elemento).find("#v-total").val(valorTotal);
}

/**
 * Função que remove um produto e todos os seus dados.
 * @param {Function} callback - Função a ser executada após a confirmação da remoção.
 */
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

/**
 * Função que remove um anexo e revoga a URL do link correspondente.
 * @param {Element} elemento - O elemento HTML do anexo a ser removido.
 * @param {string} link - A URL do link correspondente ao anexo.
 */
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
