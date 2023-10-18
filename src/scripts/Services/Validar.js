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


export { validarFornecedor }