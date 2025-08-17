import dayjs from "dayjs";
import "./style.css";

async function carregarAgenda() {
    try {
        const response = await fetch("http://localhost:3000/horarios");

        if (!response.ok) {
            throw new Error("Falha na requisição: " + response.status);
        }

        const agenda = await response.json();
        console.log("Resposta da API:", agenda);

        
        if (Array.isArray(agenda)) {
            const horas = agenda.map(h => h.hora);
            aparecerhorarios(horas);
        } else {
            console.error("Os horários não estão disponíveis ou o formato da resposta está errado.");
        }
    } catch (error) {
        console.error("Erro ao carregar a agenda:", error);
    }
}

carregarAgenda();

dataatualnoinput();
console.log("Hello, World!");

function dataatualnoinput(){
    const inputdata = document.getElementById("data");
    const datahj = dayjs().format("YYYY-MM-DD");
    inputdata.value = datahj;
    inputdata.min = datahj;
}

var form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    console.log("Nome enviado:", nome);
   
});

function aparecerhorarios(horarios){
    const container = document.getElementById("horarios-container");
      if (!container) {
        console.error('Elemento com id "horarios-container" não encontrado!');
        return;  // Saia da função se não encontrar o elemento
    }
    container.innerHTML = "";
    horarios.forEach(horario => {
        const div = document.createElement("div");
        div.textContent = horario; 
        container.appendChild(div);
    });
}
