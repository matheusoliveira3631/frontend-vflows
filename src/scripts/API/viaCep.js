
//Busca o cep utilizando a API do viaCep e preenche os campos
function completaCep(cep) {
    var url = 'https://viacep.com.br/ws/' + cep + '/json/';

      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          if (data.erro) {
            console.log("CEP invalido")
          } else {
            console.log(data);
            $("#rua").val(data.logradouro);
            $("#complemento").val(data.complemento);
            $("#bairro").val(data.bairro);
            $("#municipio").val(data.localidade);
            $("#estado").val(data.uf);

        }
        },
        error: function (err) {
          console.error(err)
        }
      });
}


export { completaCep };