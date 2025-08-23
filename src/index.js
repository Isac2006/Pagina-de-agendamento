import dayjs from "dayjs";
import "./style.css";


let horario_selecionado = null;
// Função para carregar a agenda do backend
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

// Insere a data atual no input
function dataatualnoinput(){
    const inputdata = document.getElementById("data");
    const datahj = dayjs().format("YYYY-MM-DD");
    inputdata.value = datahj;
    inputdata.min = datahj;
}
function aparecerhorarios(horarios){
    const container = document.getElementById("horarios-container");
    if (!container) {
        console.error('Elemento com id "horarios-container" não encontrado!');
        return;  
    }
    container.innerHTML = "";

    horarios.forEach(horario => {
        const button = document.createElement("button");
        button.textContent = horario; 
        button.classList.add("horario-button");
        button.type = "button";

        // Evento de clique no botão
        button.addEventListener("click", function() {
            // Remove "selecionado" de todos
            const todos = document.querySelectorAll(".horario-button");
            todos.forEach(b => b.classList.remove("selecionado"));
             horario_selecionado = button.textContent
            // Marca só o clicado
            this.classList.add("selecionado");
        });

        container.appendChild(button);
    });
}

// Captura envio do formulário
var form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault();
    const dataEscolhida = document.getElementById("data").value;
    const nome = document.getElementById("nome").value;
    console.log("Nome enviado:", nome, "Horário selecionado:", horario_selecionado,"DATA:", dataEscolhida);
});




// Inicialização
carregarAgenda();
dataatualnoinput();
console.log("Hello, World!");
