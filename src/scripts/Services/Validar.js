function validarFornecedor() {
    const requiredInputs = document.querySelectorAll('form#form-dados [required]');
    let isValid = true;

    requiredInputs.forEach(input => {
        input.parentElement.classList.remove("has-error");
        if (!input.checkValidity() || input.value == "" || input.value == 0) {
            isValid = false;
            input.parentElement.classList.add("has-error");
        }
    });
    if(!isValid){
        FLUIGC.toast({
            title: 'Campos vazios:  ',
            message: 'Os campos em vermelho devem ser preenchidos corretamente.',
            type: 'warning',
            timeout: 'fast'
            });
    }

    if(!temProduto()){
        FLUIGC.toast({
            title: 'Nenhum produto adicionado:  ',
            message: 'Adicione pelo menos um produto.',
            type: 'warning',
            timeout: 'fast'
            });
        isValid = false;
    }

    if(!temAnexo()){
        FLUIGC.toast({
            title: 'Nenhum anexo adicionado:  ',
            message: 'Adicione pelo menos um anexo.',
            type: 'warning',
            timeout: 'fast'
            });
        isValid = false;
    }

    return isValid;
}

function temProduto()
{
    return $(".produto-container").length > 0;
}

function temAnexo()
{
    return $(".anexo").length > 0;
}

function validaCNPJ (cnpj) {
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    var c = String(cnpj).replace(/[^\d]/g, '')
    
    if(c.length !== 14)
        return false

    if(/0{14}/.test(c))
        return false

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true
}

export { validarFornecedor, validaCNPJ }