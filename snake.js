const headEmoji = document.querySelector(".head");
const bodyEmoji = document.querySelector(".body");
const apfelEmoji = document.querySelector(".apfel");
const elem = document.querySelector("body");
const gameover = document.querySelector(".gameover");
const gameoverscore = document.querySelector(".gameoverscore");
const score = document.querySelector(".score");
const brett = document.querySelector(".brett");

let apple = {
    x: 0,
    y: 0
};

const directions = {
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    left: "ArrowLeft"
}
let head = {
    x: 0,
    y: 0,
    direction: directions.down
};

let body = {
    parts: 0
};


let tempo = 0.3;

let sectionCount = 15;
const sectionsize = 500/sectionCount;
// const base = headEmoji.getBoundingClientRect();

function createApple(){
    // console.log("create apple");

    apple.x = Math.floor(Math.random()*(sectionCount+1));
    apple.y = Math.floor(Math.random()*(sectionCount+1));
    apfelEmoji.style.left = `${apple.x*sectionsize}px`;
    apfelEmoji.style.top = `${apple.y*sectionsize}px`;
}

function changeDirection(event) {
    // console.log("change direction");
    switch (event.key) {
        case directions.up:
            head.direction = directions.up;
            headEmoji.style.rotate = "180deg";
            break;
        case directions.right:
            head.direction = directions.right;
            headEmoji.style.rotate = "-90deg";
            break;
        case directions.left:
            head.direction = directions.left;
            headEmoji.style.rotate = "90deg";
            break;
        case directions.down:
            head.direction = directions.down;
            headEmoji.style.rotate = "0deg";
            break
    }
}

function moveSnake() {
    // console.log("x: " + head.x);
    // console.log("y: " + head.y);
    switch (head.direction) {
        case directions.right:
            head.x = head.x+1;
            break;
        case directions.left:
            head.x = head.x-1;
            break;
        case directions.up:
            head.y = head.y-1;
            break;
        case directions.down:
            head.y = head.y+1;
            break;
    }
    headEmoji.style.left = `${head.x*sectionsize}px`;
    headEmoji.style.top = `${head.y*sectionsize}px`;

    if (head.x<0 || head.x>sectionCount || head.y<0 || head.y>sectionCount) {
        console.log("clear");
        clearInterval(intervalId);
        gameover.style.display="block";
        gameoverscore.textContent = "Score: " + body.parts;
        score.style.display="none";
        headEmoji.style.display="none";
        brett.style.display="none";
        apfelEmoji.style.display="none";
    }

    if (head.x == apple.x && head.y == apple.y) {
        body.parts = body.parts+1;
        score.textContent = "Score: " + body.parts;
        createApple();
        if (body.parts % 3 == 0) {
            tempo = tempo*0.5;
        }
    }
}
let intervalId = setInterval(function() {
    // alle 3 Sekunden ausführen
    moveSnake();
}, tempo*1000);

createApple();
// apfelEmoji.addEventListener("click", createApple);
elem.addEventListener("keydown", changeDirection);