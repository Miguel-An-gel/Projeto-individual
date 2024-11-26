let pontuacao = 0;
let acertos = 0;
let erros = 0;
let totalNotas = 0;
let intervalId;
const teclas = ["a", "s", "d", "f"];
const notasAtivas = [];

// Inicia o jogo
let GtempoMaximo = 10; // Duração do jogo em segundos
let GtempoAtual = GtempoMaximo; // Tempo restante
document.addEventListener("DOMContentLoaded", () => {
    let tempoMaximo = 10;
    let tempoAtual = tempoMaximo;
    let intervalId;

    function iniciarJogo() {
            GtempoAtual = GtempoMaximo;
        document.querySelector("#tempo-restante").textContent = `Tempo: ${GtempoAtual}s`;

        const intervaloTempo = setInterval(() => {
            GtempoAtual--;
            document.querySelector("#tempo-restante").textContent = `Tempo: ${GtempoAtual}s`;

            if (GtempoAtual < 1) {
                clearInterval(intervalId);
                clearInterval(intervaloTempo);
                alert("Tempo esgotado! Jogo finalizado.");
                finalizarJogo();
            }
        }, 1000);

        intervalId = setInterval(() => {
            console.log("Gerando uma nova nota...");
        }, 2000); // Simula geração de notas

        document.addEventListener("keydown", (e) => console.log(`Tecla: ${e.key}`));
    }

    /*function finalizarJogo() {
        clearInterval(intervalId);
        alert("Jogo finalizado!");
        finalizarJogo()
    }*/

    document.querySelector("#start").addEventListener("click", iniciarJogo);
});
/*
function iniciarJogo() {
    
    // Temporizador do tempo de jogo
    const intervaloTempo = setInterval(() => {
        tempoAtual--;
        document.querySelector("#tempo-restante").textContent = `Tempo: ${tempoAtual}s`;

        if (tempoAtual <= 0) {
            clearInterval(intervalId); // Para a geração de notas
            clearInterval(intervaloTempo); // Para o temporizador
            document.removeEventListener("keydown", verificarNota);
            alert("Tempo esgotado! Jogo finalizado.");
            finalizarJogo();
        }
    }, 100);

    // Começa a gerar notas e detectar as teclas
    intervalId = setInterval(gerarNota, intervaloNotas);
    document.addEventListener("keydown", verificarNota);
}

function iniciarJogo() {
    gerarNotas();
    document.addEventListener("keydown", verificarNota);
}*/
document.addEventListener("keydown", (event) => {
    const trilha = document.getElementById(`trilha-${event.key.toLowerCase()}`);
    if (trilha) {
        trilha.classList.add("ativa");
        setTimeout(() => trilha.classList.remove("ativa"), 200);
    }
});


function iniciarJogo(danca) {
    document.getElementById("escolha-danca").classList.add("hidden");
    document.getElementById("jogo").classList.remove("hidden");
    alert(`Você escolheu a dança ${danca}! Prepare-se para dançar!`);
    gerarNotas();
    document.addEventListener("keydown", verificarNota);
    
    
}

// Gera notas aleatórias
function gerarNotas() {
    intervalId = setInterval(() => {
        const trilha = teclas[Math.floor(Math.random() * teclas.length)];
        const nota = document.createElement("span");
        nota.className = "nota";
        nota.dataset.tecla = trilha;
        document.getElementById(`trilha-${trilha}`).appendChild(nota);
        notasAtivas.push(nota);
        totalNotas++;

        // Remove nota após certo tempo
        setTimeout(() => {
            if (nota.parentElement) {
                nota.remove();
                notasAtivas.splice(notasAtivas.indexOf(nota), 1);
                erros++;
                atualizarEstatisticas();
            }
        }, 3000); // Tempo para a nota "cair"
    }, 1000); // Nova nota a cada 1 segundo
}
// Verifica se a nota foi acertada
function verificarNota(event) {
    const teclaPressionada = event.key.toLowerCase();
    const nota = notasAtivas.find(n => n.dataset.tecla === teclaPressionada);

    if (nota) {
        acertos++;
        pontuacao += 10;
        nota.remove();
        notasAtivas.splice(notasAtivas.indexOf(nota), 1);
    } else {
        erros++;
        pontuacao -= 5;
    }
    atualizarEstatisticas();
}
function atualizarEstatisticas() {
    document.getElementById("pontuacao").textContent = pontuacao;
    document.getElementById("acertos").textContent = acertos;
    document.getElementById("erros").textContent = erros;
    document.getElementById("precisao").textContent = ((acertos / totalNotas) * 100).toFixed(2);
}

// Finaliza o jogo e exibe os KPIs
function finalizarJogo() {
    clearInterval(intervalId);
    document.removeEventListener("keydown", verificarNota);
    tempoMaximo=0

    const kpis = {
        jogador: prompt("Digite seu nome:"),
        pontuacao: pontuacao,
        acertos: acertos,
        erros: erros,
        precisao: ((acertos / totalNotas) * 100).toFixed(2), // Precisão calculada aqui
        totalNotas: totalNotas,
    };

    const historico = JSON.parse(localStorage.getItem("historicoJogadores")) || [];
    historico.push(kpis);
    localStorage.setItem("historicoJogadores", JSON.stringify(historico));

    const mensagem =
        pontuacao === 0
            ? "Não desanime, pratique mais!"
            : pontuacao < 50
            ? "Você pode melhorar! Continue tentando."
            : "Parabéns, você mandou muito bem!";

    alert(`Jogo finalizado! Sua pontuação: ${pontuacao}. ${mensagem}`);

    fetch("http://localhost:3000/salvar-dados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kpis),
    })
    .then(response => response.ok ? alert("Dados salvos no banco!") : alert("Erro ao salvar dados!"))
    .catch(error => console.error(error));
}

function exibirDashboard() {
    const kpis = JSON.parse(localStorage.getItem("kpisJogo"));
    
    const ctx1 = document.getElementById("graficoAcertosErros").getContext("2d");
    const grafico1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                label: 'Desempenho',
                data: [kpis.acertos, kpis.erros],
                backgroundColor: ['#2ECC40', '#FF4136'],
            }]
        },
    });

    const ctx2 = document.getElementById("graficoPrecisao").getContext("2d");
    const grafico2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Precisão', 'Erros'],
            datasets: [{
                label: 'Precisão (%)',
                data: [kpis.precisao, 100 - kpis.precisao],
                backgroundColor: ['#0074D9', '#FF851B'],
            }]
        },
    });
}

exibirDashboard();

function exibirHistorico() {
    const historico = JSON.parse(localStorage.getItem("historicoJogadores")) || [];
    const tabela = document.querySelector("#tabelaHistorico tbody");

    tabela.innerHTML = historico.map(jogador => `
        <tr>
            <td>${jogador.jogador}</td>
            <td>${jogador.pontuacao}</td>
            <td>${jogador.acertos}</td>
            <td>${jogador.erros}</td>
            <td>${jogador.precisao}%</td>
        </tr>
    `).join("");
}

exibirHistorico();


/*
Dashboard com KPIs:
Para exibir os dados no dashboard, você pode usar Chart.js:

Carregue os dados do localStorage:

javascript
Copiar código
const kpis = JSON.parse(localStorage.getItem("kpisJogo"));
Crie gráficos de barra ou pizza para:

Distribuição de acertos e erros.
Precisão por jogo.
*/