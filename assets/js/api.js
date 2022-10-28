fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
.then(response => response.json())
.then(data => {

    let divCapitalUsd = document.getElementById("capitalUsd")
    let dolarBlue = parseInt(data[1].casa.compra)
    let capitalDolar = capital / dolarBlue
    divCapitalUsd.innerHTML = `${capitalDolar}`
})

