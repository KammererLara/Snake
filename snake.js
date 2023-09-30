const headEmoji = document.querySelector(".head");
const bodyEmoji = document.querySelector(".body");
const apfelEmoji = document.querySelector(".apfel");

let apple = {
    x: 0,
    y: 0
};
// let head = {x, y, direction};
// let tempo = {tempo, apples};
let sectionCount = 15;
const sectionsize = 500/sectionCount;
const base = headEmoji.getBoundingClientRect();

function createApple(){
    console.log("create apple");

    apple.x = Math.floor(Math.random()*(sectionCount+1));
    apple.y = Math.floor(Math.random()*(sectionCount+1));
    // console.log("x:" + x + ", y:" + y);
    apfelEmoji.style.left = `${apple.x*sectionsize}px`;
    apfelEmoji.style.top = `${apple.y*sectionsize}px`;
}

apfelEmoji.addEventListener("click", createApple);
