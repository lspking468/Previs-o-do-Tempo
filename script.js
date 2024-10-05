const key = `aa318a52b8617b21663ce980eadf4968`

function imprimir_dados_na_web(api_dados){
    console.log(api_dados)
    document.querySelector(".tempo_estado").innerHTML = api_dados.name
    document.querySelector(".graus_celsius").innerHTML = Math.floor(api_dados.main.temp) + "ºC"
    document.querySelector(".json_precipitacao").innerHTML = api_dados.weather[0].description
    document.querySelector(".simbologia_precipitacao").src = `https://openweathermap.org/img/wn/${api_dados.weather[0].icon}.png`
    document.querySelector(".umidade").innerHTML = "Umidade - " + api_dados.main.humidity + "%"
}

async function buscar_cidade(estado) {
    let api_dados =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${estado}&appid=${key}&lang=pt_br&units=metric`).then(retornar_dados_climatologia => retornar_dados_climatologia.json()) 
    imprimir_dados_na_web(api_dados)
}

function buscar_climatologia() {
    const estado = document.querySelector(".input_busca_cidades").value

    buscar_cidade(estado)
}