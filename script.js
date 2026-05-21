const quizData = [
  {
    level: "Nível 1 — Muito Fácil 😄",
    question: "1. Qual destas é uma cor primária?",
    options: ["A) Verde", "B) Roxo", "C) Vermelho", "D) Marrom"],
    answer: 2,
  },
  {
    level: "Nível 1 — Muito Fácil 😄",
    question: "2. Azul é considerado uma cor:",
    options: ["A) Quente", "B) Fria", "C) Neon", "D) Neutra"],
    answer: 1,
  },
  { level: "Nível 1 — Muito Fácil 😄", question: "3. Misturar vermelho e amarelo cria:", options: ["A) Verde", "B) Roxo", "C) Laranja", "D) Azul"], answer: 2 },
  { level: "Nível 1 — Muito Fácil 😄", question: "4. Qual objeto ajuda a organizar as cores?", options: ["A) Régua", "B) Círculo cromático", "C) Calculadora", "D) Tabela periódica"], answer: 1 },
  { level: "Nível 2 — Fácil 🙂", question: "5. Qual cor costuma representar calma?", options: ["A) Vermelho", "B) Azul", "C) Laranja", "D) Amarelo"], answer: 1 },
  { level: "Nível 2 — Fácil 🙂", question: "6. Cores complementares ficam:", options: ["A) Lado a lado", "B) Misturadas", "C) Opostas no círculo cromático", "D) Iguais"], answer: 2 },
  { level: "Nível 2 — Fácil 🙂", question: "7. Qual destas combinações é de cores quentes?", options: ["A) Azul e roxo", "B) Verde e azul", "C) Vermelho e laranja", "D) Azul e cinza"], answer: 2 },
  { level: "Nível 2 — Fácil 🙂", question: "8. O contraste serve para:", options: ["A) Deixar tudo igual", "B) Melhorar destaque e leitura", "C) Apagar cores", "D) Escurecer imagens"], answer: 1 },
  { level: "Nível 3 — Médio 😎", question: "9. Quais são as cores secundárias?", options: ["A) Verde, laranja e roxo", "B) Preto, branco e cinza", "C) Azul, vermelho e amarelo", "D) Rosa, azul-claro e bege"], answer: 0 },
  { level: "Nível 3 — Médio 😎", question: "10. O que são cores análogas?", options: ["A) Cores opostas", "B) Cores próximas no círculo cromático", "C) Apenas cores escuras", "D) Apenas cores frias"], answer: 1 },
  { level: "Nível 3 — Médio 😎", question: "11. Qual combinação possui ALTO contraste?", options: ["A) Branco e preto", "B) Azul e azul-claro", "C) Verde e verde-claro", "D) Rosa e rosa-claro"], answer: 0 },
  { level: "Nível 3 — Médio 😎", question: "12. O amarelo geralmente transmite:", options: ["A) Energia e alegria", "B) Medo", "C) Sono", "D) Silêncio"], answer: 0 },
  { level: "Nível 4 — Difícil 🔥", question: "13. Qual é a cor complementar do vermelho?", options: ["A) Verde", "B) Azul", "C) Roxo", "D) Laranja"], answer: 0 },
  { level: "Nível 4 — Difícil 🔥", question: "14. Uma paleta monocromática usa:", options: ["A) Apenas cores quentes", "B) Uma única cor com variações", "C) Apenas preto e branco", "D) Cores opostas"], answer: 1 },
  { level: "Nível 4 — Difícil 🔥", question: "15. Em design, cores frias costumam causar sensação de:", options: ["A) Calor intenso", "B) Velocidade", "C) Calma e distância", "D) Fome"], answer: 2 },
  { level: "Nível 4 — Difícil 🔥", question: "16. O RGB é usado principalmente em:", options: ["A) Pintura a óleo", "B) Impressão em papel", "C) Telas digitais", "D) Grafite"], answer: 2 },
  { level: "Nível 5 — Muito Difícil 🧠", question: "17. O sistema CMYK é usado principalmente para:", options: ["A) Monitores", "B) TVs", "C) Impressão", "D) LEDs"], answer: 2 },
  { level: "Nível 5 — Muito Difícil 🧠", question: "18. Qual destas combinações pode causar vibração visual excessiva?", options: ["A) Azul e azul-claro", "B) Vermelho e verde saturados", "C) Branco e cinza", "D) Bege e marrom"], answer: 1 },
  { level: "Nível 5 — Muito Difícil 🧠", question: "19. Saturação significa:", options: ["A) O brilho da tela", "B) A intensidade/pureza da cor", "C) O tamanho da imagem", "D) A posição da cor"], answer: 1 },
  { level: "Nível 5 — Muito Difícil 🧠", question: "20. Qual harmonia usa três cores igualmente espaçadas no círculo cromático?", options: ["A) Monocromática", "B) Complementar", "C) Triádica", "D) Acromática"], answer: 2 },
];

const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");
const questionCounter = document.getElementById("questionCounter");
const levelLabel = document.getElementById("levelLabel");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const scoreText = document.getElementById("scoreText");
const resultMessage = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");

let current = 0;
let score = 0;
let locked = false;

function renderQuestion() {
  const q = quizData[current];
  questionText.textContent = q.question;
  levelLabel.textContent = q.level;
  questionCounter.textContent = `Pergunta ${current + 1}/${quizData.length}`;
  progressFill.style.width = `${((current + 1) / quizData.length) * 100}%`;
  feedback.textContent = "";
  nextBtn.disabled = true;
  answers.innerHTML = "";
  locked = false;

  q.options.forEach((option, idx) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, idx));
    answers.appendChild(button);
  });
}

function selectAnswer(button, selected) {
  if (locked) return;
  locked = true;

  const q = quizData[current];
  const allButtons = [...document.querySelectorAll(".answer")];

  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add("correct");
  });

  if (selected === q.answer) {
    score += 1;
    feedback.textContent = "✅ Acertou!";
    feedback.style.color = "#86efac";
  } else {
    button.classList.add("wrong");
    feedback.textContent = `❌ Errou! Resposta certa: ${q.options[q.answer]}`;
    feedback.style.color = "#fca5a5";
  }

  quizCard.classList.remove("pulse");
  void quizCard.offsetWidth;
  quizCard.classList.add("pulse");

  nextBtn.disabled = false;
}

function nextQuestion() {
  current += 1;
  if (current < quizData.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  const percent = Math.round((score / quizData.length) * 100);
  scoreText.textContent = `Você acertou ${score} de ${quizData.length} perguntas (${percent}%).`;

  if (percent >= 90) resultMessage.textContent = "Excelente! Você domina teoria das cores! 🌈";
  else if (percent >= 70) resultMessage.textContent = "Muito bom! Seu conhecimento está bem sólido. 👏";
  else if (percent >= 50) resultMessage.textContent = "Bom começo! Continue praticando para evoluir. 🎯";
  else resultMessage.textContent = "Não desista! Revisar o círculo cromático vai ajudar bastante. 💪";
}

function restartQuiz() {
  current = 0;
  score = 0;
  quizCard.classList.remove("hidden");
  resultCard.classList.add("hidden");
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
