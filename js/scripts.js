document.addEventListener('DOMContentLoaded', function () {
    fetch("http://localhost/projekt/dane/text.txt")
        .then(response => {
            return response.text();
        })
        .then(dane => {
            document.getElementById("opis").innerHTML = dane;
        })

}, false);

