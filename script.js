// Selectors
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");

// list of words for game
const words = [
  "came",
  "come",
  "letter",
  "end",
  "I",
  "all",
  "number",
  "oil",
  "within",
  "now",
  "right",
  "feet",
  "leave",
  "what",
  "now",
  "fall",
  "came",
  "live",
  "year",
  "about",
  "got",
  "came",
  "set",
  "were",
  "follow",
  "study",
  "day",
  "eye",
  "over",
  "why",
  "why",
  "talk",
  "soon",
  "because",
  "eye",
  "watch",
  "year",
  "her",
  "any",
  "by",
  "I",
  "both",
  "around",
  "book",
  "line",
  "mother",
  "open",
  "now",
  "that",
  "mile",
  "go",
  "by",
  "found",
  "said",
  "eye",
  "come",
  "so",
  "place",
  "food",
  "got",
  "city",
  "always",
  "these",
  "any",
  "use",
  "been",
  "was",
  "read",
  "their",
  "without",
  "as",
  "change",
  "leave",
  "can",
  "they",
  "those",
  "eat",
  "never",
  "no",
  "eat",
  "story",
];

// init word
let randomWord;

// Inti score
let score = 0;

// Init time
let time = 10;

// Set difficulty 
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// focus on text on start
text.focus();

// count down
const timeInterval = setInterval(updateTime, 1000);

// Random words generator from Array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM 
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// update score
function updateScore() {
    score++;
    scoreElement.innerHTML = score;
}

// update time
function updateTime() {
    time--;
    timeElement.innerHTML = time + "s";
  
    if (time === 0) {
      clearInterval(timeInterval);
  
      //   game over
      gameOver();
    }
}

// show game over
function gameOver() {
    endGameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is: ${score}</p>
    <button onclick="location.reload()" style="
    background: #222831; color: #ddd;>Reload</button>`;

    endGameElement.style.display = "flex";
}

addWordToDOM();

// Typing Event 
text.addEventListener("input", (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        e.target.value = "";

        if (difficulty === "hard") {
            time += 2;
        } else if (difficulty === "medium") {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

// Setting Select
difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
})