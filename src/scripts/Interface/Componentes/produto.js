const produtoHTML = `    
    <img src="src/assets/trash.png" class="btn fs-bg-danger fs-md-margin-right excluir-produto" style="height: 40px;">
    
    <div class='texto-borda fs-md-margin-vertical fs-display-flex '>
        <div class="header">Produto - 1 </div>
        <img src="src/assets/caixa.png" class="fs-height-100 fs-md-margin fs-md-padding" style="align-self: center; background-color: cornflowerblue; border-radius: 50%;">
            <section class="fs-display-flex fs-flex-direction-column fs-sm-padding fs-no-border-top">
            
            <div class="form-group col-sm-12">
                <label for="nome">Produto</label>
                <input type="text" class="form-control" id="nome" placeholder="..." required>
            </div>
            
            <div class="fs-full-width fs-display-flex">
                <div class="form-group col-sm-4">
                    <label for="unidade">UND. Medida</label>
                    <select class="form-control" id="unidade" required>
                        <option value="litros">Litro</option>
                        <option value="kg">Kilogramas</option>
                        <option value="unidades">Unidades</option>
                    </select>
                </div>
                
                <div class="form-group col-sm-4 fs-sm-margin-left ">
                    <label for="estoque">QTDE. em estoque</label>
                    <input type="number" value="0" class="form-control estoque" id="estoque" placeholder="..." required>
                </div>
                
                <div class="form-group col-sm-4 fs-sm-margin-left ">
                    <label for="v-unitario">Valor unitário</label>
                    <input type="number" value="0" class="form-control v-unitario" id="v-unitario" placeholder="..." required>
                </div>
                
                <div class="form-group col-sm-4 fs-sm-margin-left ">
                    <label for="v-total">Valor total</label>
                    <input type="number" class="form-control" id="v-total" placeholder="..." disabled>
                
                    </div>
            </div>
            </section>
    </div>
`

function gerarProduto(nProduto){
    let html = produtoHTML;
    html = html.replace(/Produto - 1/g, `Produto - ${nProduto}`);
    const elemento = document.createElement("div");
    elemento.innerHTML = html;
    elemento.classList.add('produto-container', 'fs-display-flex', 'fs-full-width', 'fs-align-items-center', 'fs-justify-content-center');
    return elemento;
}

export { gerarProduto };