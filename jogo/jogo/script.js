const playerForm = document.getElementById("player-form");
const playerNameInput = document.getElementById("player-name");
const quizScreen = document.getElementById("quiz-screen");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextQuestionButton = document.getElementById("next-question");
const endScreen = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const dashboardScreen = document.getElementById("dashboard-screen");
const leaderboardBody = document.querySelector("#leaderboard tbody");

const questions = [
  { question: "Qual é a capital da Bolívia?", options: ["La Paz", "Sucre", "Cochabamba"], answer: 1 },
  { question: "Qual dança boliviana é conhecida por seus sinos?", options: ["Caporales", "Tinku", "Diablada"], answer: 0 },
  { question: "Qual dança é representada por máscaras de demônios?", options: ["Morenada", "Diablada", "Tinku"], answer: 1 },
];

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  playerName = playerNameInput.value;
  startQuiz();
});

function startQuiz() {
  document.getElementById("start-screen").classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) score++;
  nextQuestionButton.classList.remove("hidden");
}

nextQuestionButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextQuestionButton.classList.add("hidden");
  } else {
    endQuiz();
  }
});

function endQuiz() {
  quizScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScoreElement.textContent = `Pontuação final de ${playerName}: ${score}`;
  saveScore();
}

function saveScore() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name: playerName, score });
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

document.getElementById("view-dashboard").addEventListener("click", showDashboard);

function showDashboard() {
  endScreen.classList.add("hidden");
  dashboardScreen.classList.remove("hidden");
  updateLeaderboard();
}

function updateLeaderboard() {
  leaderboardBody.innerHTML = "";
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td>`;
    leaderboardBody.appendChild(row);
  });
}

document.getElementById("back-to-game").addEventListener("click", () => {
  dashboardScreen.classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});

document.getElementById("restart-game").addEventListener("click", () => {
  location.reload();
});
