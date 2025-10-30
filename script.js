// Countdown + confetti + music autoplay for hosted or local test

const countdown = document.getElementById("countdown");
const surprise = document.getElementById("surprise");
const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const confettiCanvas = document.getElementById("confetti");

// 🎯 Countdown target: 5 seconds from now (for testing)
const targetDate = Date.now() + 5000;

const timer = setInterval(() => {
  const now = Date.now();
  const diff = targetDate - now;

  if (diff > 0) {
    const seconds = Math.ceil(diff / 1000);
    countdown.textContent = `${seconds}s`;
  } else {
    clearInterval(timer);
    document.getElementById("countdown-section").style.display = "none";
    surprise.classList.remove("hidden");
    startConfetti();
    tryAutoPlay();
  }
}, 500);

function tryAutoPlay() {
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      console.log("Autoplay success 🎶");
    }).catch(() => {
      playBtn.style.display = "inline-block";
    });
  }
}

playBtn.addEventListener("click", () => {
  music.play();
  startConfetti();
});

// 💥 Confetti animation
const ctx = confettiCanvas.getContext("2d");
let confetti = [];

function startConfetti() {
  confetti = [];
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  for (let i = 0; i < 120; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 4 + 1,
      d: Math.random() * 100,
      color: `hsl(${Math.random() * 360},100%,70%)`,
    });
  }
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.y += Math.random() * 3 + 2;
    if (c.y > confettiCanvas.height) c.y = -10;
  });
  requestAnimationFrame(drawConfetti);
}
