const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const startButton = document.querySelector("#start-button");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let gameStarted = false;

function randomSquare() {
    clearInterval(timerId); // Oprește intervalul de timp anterior

    squares.forEach((square) => {
        square.classList.remove("emoji");
    });

    let randomSquare = squares[Math.floor(Math.random() * 11) + 1];
    randomSquare.classList.add("emoji");
    hitPosition = randomSquare.id;

    moveEmoji(); // Pornim un nou interval de timp
}

squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if (gameStarted.id && square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveEmoji() {
    timerId = setInterval(randomSquare, 500);
}

startButton.addEventListener("click", () => {
    gameStarted = true;
    result = 0; // Resetează scorul
    currentTime = 60; // Resetează timpul
    timeLeft.textContent = currentTime;
    score.textContent = result;
    moveEmoji(); // Mută emoji-ul
    countDown(); // Pornim numărătoarea timpului
});

function countDown() {
    if (!gameStarted) return;  // Verificăm dacă jocul a început deja

    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert(`Game Over! Your final Score Is ${result}`);
        resetGame();
    }
}

function resetGame() {
    // Sterge clasa "emoji" de pe fiecare pătrat din grilă
    squares.forEach(square => square.classList.remove("emoji"));
    // Resetează scorul și timpul
    result = 0;
    currentTime = 60;
    score.textContent = result;
    timeLeft.textContent = currentTime;
}

let countDownTimerId = setInterval(countDown, 1000);

