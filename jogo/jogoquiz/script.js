document.getElementById("submitQuiz").addEventListener("click", function () {
    const answers = {};
    let selectedOptions = document.querySelectorAll("input[type='radio']:checked");

    selectedOptions.forEach((option) => {
        let dance = option.value;
        if (!answers[dance]) {
            answers[dance] = 0;
        }
        answers[dance]++;
    });

    let resultDance = Object.keys(answers).reduce((a, b) => (answers[a] > answers[b] ? a : b));

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `A dança que mais combina com você é: <strong>${resultDance}</strong>`;
});

