export function uploadArquivo()
{
    const input = document.getElementById('input-anexo');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        const clickable = document.createElement('a');
        let link;
        reader.onload = function (event) {
            const arquivo = event.target.result;

            const blob = new Blob([arquivo], { type: file.type });

            link = URL.createObjectURL(blob);
            clickable.href = link;
            clickable.download = file.name;
            clickable.classList.add("link-anexo");
        };
        reader.readAsArrayBuffer(file);
        return {clickable, link};
    }  
}


