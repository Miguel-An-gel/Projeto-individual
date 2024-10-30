// script.js
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function loadQuiz() {
    const response = await fetch("http://localhost:3000/api/questions");
    questions = await response.json();
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question_text;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct_option;
    if (selectedIndex === correctIndex) score++;
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        endQuiz();
    }
}

async function endQuiz() {
    document.getElementById("score").textContent = `Sua pontuação: ${score}`;
    const playerName = prompt("Digite seu nome:");
    await fetch("http://localhost:3000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: playerName, score })
    });
}
