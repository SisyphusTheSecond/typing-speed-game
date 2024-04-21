// Selectors
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
    "yacine", "oussama", "albert", "camus", "sisyphe", "nietzsche", "spinoza", "kafka", "fyodor", "dostoevsky",
    "voltaire", "candide", "zadig", "ingenu", "stupide", "idiot", "came", "malin", "gentil", "vif",
    "curieux", "loyal", "creatif", "puissant", "genial", "honnete", "drole", "charmant", "sage", "rapide", "parfait",
    "kanye", "dahmane", "malade", "interessant", "abel", "cain", "disgrace", "santiago", "elle", "larme", "beau",
    "marcus", "aurelius", "aristotle", "plato", "manipulative", "estin", "Tabalizt", "ange", "sharp", "divin", "sun tzu",
    "intergouvernementalisation"
];

// Init word
let randomWord;

// Init score
let score = 0; 
 

// Init time
let time = 10;

// Set difficulty 
let difficulty = localStorage.getItem("difficulty") || "medium";

// Set difficulty select value
difficultySelect.value = localStorage.getItem("difficulty") || "medium";

// Focus on text on start
text.focus();

// Countdown
let timeInterval;

// Random words generator from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM 
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreElement.innerHTML = score;
    
}

// Update time
function updateTime() {
    time--;
    timeElement.innerHTML = time + "s"; 

    if (time === 0) {   
        clearInterval(timeInterval);   

        // Game over
        gameOver();
    }
}

// Show game over
function gameOver() {
    endGameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is: ${score}</p>
    <button id="reload-button" onclick="reloadGame()">Reload</button>`;

    endGameElement.style.display = "flex";
}

// Function to start the game
function startGame() { 
    addWordToDOM();
    timeInterval = setInterval(updateTime, 1000);
}

document.getElementById("start-btn").addEventListener("click", function() {
            
            startGame();
            document.getElementById("text").focus();
            
        });

// Typing event 
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

// Setting select
difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
});

// Function to reload the game
function reloadGame() {
    location.reload();
}