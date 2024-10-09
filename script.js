const key = `aa318a52b8617b21663ce980eadf4968`;

function imprimir_dados_na_web(api_dados) {
    // Verifica se a resposta foi bem-sucedida
    if (api_dados.cod === 200) {  // Código 200 significa sucesso na busca
        document.querySelector(".tempo_estado").innerHTML = api_dados.name;
        document.querySelector(".graus_celsius").innerHTML = Math.floor(api_dados.main.temp) + "ºC";
        document.querySelector(".json_precipitacao").innerHTML = api_dados.weather[0].description;
        document.querySelector(".simbologia_precipitacao").src = `https://openweathermap.org/img/wn/${api_dados.weather[0].icon}.png`;
        document.querySelector(".umidade").innerHTML = "Umidade - " + api_dados.main.humidity + "%";
    } else {
        // Caso a cidade não seja encontrada, exibe 'Indefinido'
        document.querySelector(".tempo_estado").innerHTML = "Indefinido";
        document.querySelector(".graus_celsius").innerHTML = "Indefinido";
        document.querySelector(".json_precipitacao").innerHTML = "Indefinido";
        document.querySelector(".simbologia_precipitacao").src = "";  // Remove a imagem do ícone
        document.querySelector(".umidade").innerHTML = "Indefinido";
    }
}

async function buscar_cidade(estado) {
    try {
        let api_dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${estado}&appid=${key}&lang=pt_br&units=metric`);
        api_dados = await api_dados.json();

        // Chama a função para imprimir os dados na página
        imprimir_dados_na_web(api_dados);
    } catch (error) {
        // Caso ocorra um erro na busca (exemplo: falta de conexão)
        document.querySelector(".tempo_estado").innerHTML = "Erro ao buscar dados";
        document.querySelector(".graus_celsius").innerHTML = "Indefinido";
        document.querySelector(".json_precipitacao").innerHTML = "Indefinido";
        document.querySelector(".simbologia_precipitacao").src = "";
        document.querySelector(".umidade").innerHTML = "Indefinido";
        console.error("Erro na busca da cidade: ", error);
    }
}

function buscar_climatologia() {
    const estado = document.querySelector(".input_busca_cidades").value;
    if (estado.trim() === "") {
        alert("Por favor, insira o nome de uma cidade.");
    } else {
        buscar_cidade(estado);
    }
}
