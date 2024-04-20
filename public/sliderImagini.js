const pics = document.querySelectorAll(".pic");
const dots = document.querySelectorAll(".dot");

// Initialize the current picture number
let currentPic = 0;

function displayPic(newNum) {
    if (newNum < 1 || newNum > pics.length) return;

    // Move each image accordingly
    pics.forEach((pic, index) => {
        pic.style.left = `${(index - (newNum - 1)) * 800}px`;
    });

    currentPic = newNum;

    // Check the corresponding dot
    dots[currentPic - 1].checked = true;
}

function moveLeft() {
    const newNum = (currentPic - 2 + pics.length) % pics.length + 1;
    displayPic(newNum);
}

function moveRight() {
    const newNum = currentPic % pics.length + 1;
    displayPic(newNum);
}

document.querySelector("#leftArrow").addEventListener("click", moveLeft);
document.querySelector("#rightArrow").addEventListener("click", moveRight);

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
        displayPic(i + 1);
    });
}

// la prima glisare totul de produce instant (ramane de rezolvat asta)
// ori anulam glisarea la toate :))