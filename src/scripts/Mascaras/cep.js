import { completaCep } from '../API/viaCep.js';

//mascara para o elemento cep, após o usuario digitar todos
//os numeros, a função completaCep é chamada para completar
$('#cep').on('input', function () {
    let cep = $(this).val();
    if(cep.length > 5) {
      cep = cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      cep = cep.slice(0, 5) + '-' + cep.slice(5);
    }
    $(this).val(cep);
    if(cep.length == 9) {
      completaCep(cep.replace(/\D/g, ''));
    }
  });


//mascara para o elemento cnpj
$("#cnpj").on("input", function(e)
{
    $(this).val(
        $(this).val()
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5"));
});