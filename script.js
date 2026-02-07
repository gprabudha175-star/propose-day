const scenes = document.querySelectorAll(".scene");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

const bgMusic = document.getElementById("bgMusic");
const happyMusic = document.getElementById("happyMusic");
const sadMusic = document.getElementById("sadMusic");

const emojiContainer = document.getElementById("emoji-container");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw5kfe4dwqXXJcPgkCMQi4wcsAPBOImjyZ5NI94F5I6RLeQ9yMcvkYPUmO06qdin16vXA/exec";

let currentScene = 0;
const AUTO_SCENE_TIME = 15000;
let autoTimer;

const emojis = ["💖", "🌸", "🍓", "💐", "💕", "💍", "🫶", "✨"];

function logResponse(response) {
    const img = new Image();
    img.src = WEB_APP_URL +
        "?response=" + response +
        "&device=" + encodeURIComponent(navigator.userAgent) +
        "&t=" + Date.now();
}

function createEmoji() {
    const emoji = document.createElement("div");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = "absolute";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = "110vh";
    emoji.style.fontSize = (18 + Math.random() * 28) + "px";
    emoji.style.opacity = 0.6;
    emoji.style.animation = "floatUp " + (12 + Math.random() * 10) + "s linear";
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 20000);
}

setInterval(createEmoji, 350);

const style = document.createElement("style");
style.innerHTML =
    "@keyframes floatUp { from { transform: translateY(0); } to { transform: translateY(-130vh); } }";
document.head.appendChild(style);

function typeText(el, text, speed = 35) {
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

function runTyping(scene) {
    scene.querySelectorAll(".typing").forEach(el => {
        typeText(el, el.dataset.text);
    });
}

function showScene(index) {
    scenes.forEach(scene => scene.classList.remove("active"));
    scenes[index].classList.add("active");
    currentScene = index;
    runTyping(scenes[index]);
}

function startAutoScenes() {
    autoTimer = setInterval(() => {
        if (currentScene < scenes.length - 3) {
            showScene(currentScene + 1);
        } else {
            clearInterval(autoTimer);
        }
    }, AUTO_SCENE_TIME);
}

startBtn.addEventListener("click", () => {

    // 🔒 Explicitly load audio files FIRST
    bgMusic.load();
    happyMusic.load();
    sadMusic.load();

    // 🔓 Force play after load (inside user gesture)
    bgMusic.play().catch(err => {
        console.log("Audio play blocked:", err);
    });

    showScene(1);
    startAutoScenes();
});




nextBtn.addEventListener("click", () => {
    showScene(currentScene + 1);
});

yesBtn.addEventListener("click", () => {
    logResponse("YES");
    bgMusic.pause();
    happyMusic.play();
    showScene(scenes.length - 2);
});

noBtn.addEventListener("click", () => {
    logResponse("NO");
    bgMusic.pause();
    sadMusic.play();
    showScene(scenes.length - 1);
});
