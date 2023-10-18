const anexoHTML = `
    <img src="src/assets/trash.png" class="btn fs-bg-danger fs-md-margin-right excluir-produto" id="delete" style="height: 30px;">
    <div id="link-container">

    </div>
    <p>Documento anexo 1</p>
`

function gerarAnexo(nAnexo)
{
    let html = anexoHTML;
    html = html.replace(/Documento anexo 1/g, `Documento anexo ${nAnexo}`);
    const elemento = document.createElement("div");
    elemento.classList.add("anexo" ,"fs-display-flex", "fs-md-margin", "fs-align-items-center", )
    elemento.innerHTML = html;
    return elemento;
}

export { gerarAnexo }