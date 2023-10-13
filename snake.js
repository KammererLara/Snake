const headEmoji = document.querySelector(".head");
const bodyEmoji = document.querySelector(".body");
const apfelEmoji = document.querySelector(".apfel");
const elem = document.querySelector("body");
const gameover = document.querySelector(".gameover");
const gameoverscore = document.querySelector(".gameoverscore");
const score = document.querySelector(".score");
const brett = document.querySelector(".brett");
const restart = document.querySelector(".restart");

let apple = {
    x: 0,
    y: 0
};

const directions = {
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    left: "ArrowLeft"
};

let head = {
    x: 0,
    y: 0,
    direction: directions.down
};

let body = [];
let bodyEmojis = [];

let newBodyPart = false;

function bodypart() {
    x = 0;
    y = 0;
};

let tempo = 0.3;

let sectionCount = 15;
const sectionsize = 500/sectionCount;

function createApple(){
    apple.x = Math.floor(Math.random()*(sectionCount+1));
    apple.y = Math.floor(Math.random()*(sectionCount+1));

    for (let i = 0; i< body.length; i++ ) {
        if (body[i].x == apple.x && body[i].y == apple.y) {
            createApple();
        }
    }

    apfelEmoji.style.left = `${apple.x*sectionsize}px`;
    apfelEmoji.style.top = `${apple.y*sectionsize}px`;
}

function changeDirection(event) {
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
    for (let i=body.length -1; i > 0; i--) {
        body[i].x= body[i-1].x;
        body[i].y= body[i-1].y;
    }

    if (body.length > 0) {
        body[0].x = head.x;
        body[0].y = head.y;
    }

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

    if (newBodyPart == true ) {
        if (body.length == 1) {
            bodyEmojis.push(bodyEmoji);
            bodyEmoji.style.display= "block";
        } else if (body.length > 1){
            bodyEmojis.push(bodyEmoji.cloneNode(true));
        }
        newBodyPart = false;
    }

    for (let i = 0; i < bodyEmojis.length; i++) {
        bodyEmojis[i].style.left = `${body[i].x*sectionsize}px`;
        bodyEmojis[i].style.top = `${body[i].y*sectionsize}px`;
        brett.appendChild(bodyEmojis[i]);
        bodyEmojis[i].style.display = "block";
    }

    //if (body.length > 0)
       // console.log(body);
    //if (bodyEmojis.length > 0)
        //console.log(bodyEmojis);

    //Wenn man stirbt
    let snakeEatsBorder = head.x<0 || head.x>sectionCount || head.y<0 || head.y>sectionCount;
    let snakeEatsItself = false;
    for (let i = 0; i < body.length; i++) {
        if (body[i].x == head.x && body[i].y == head.y) {
            snakeEatsItself = true;
            break;
        }
    }
    if (snakeEatsBorder || snakeEatsItself) {
        clearInterval(intervalId);
        gameover.style.display="block";
        gameoverscore.textContent = "Score: " + body.length;
        score.style.display="none";
        headEmoji.style.display="none";
        brett.style.display="none";
        apfelEmoji.style.display="none";
    }

    //Wenn man Apfel frisst
    if (head.x == apple.x && head.y == apple.y) {
        createApple();
        body.push(new bodypart);
        newBodyPart= true;
        score.textContent = "Score: " + body.length;
        // if (body.length % 3 == 0) {
        //     tempo = tempo*0.5;
        // }
    }
}
let intervalId = setInterval(function() {
    // alle 3 Sekunden ausführen
    moveSnake();
}, tempo*1000);

function toRestart () {
    location.reload();
}

createApple();
elem.addEventListener("keydown", changeDirection);
restart.addEventListener("click", toRestart);

