// Countdown + confetti + music autoplay for hosted version

const countdown = document.getElementById("countdown");
const surprise = document.getElementById("surprise");
const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const confettiCanvas = document.getElementById("confetti");

// Countdown target: Oct 31, 2025 at 12:05 AM
const targetDate = new Date("Oct 31, 2025 00:05:00").getTime();

const timer = setInterval(() => {
  const now = Date.now();
  const diff = targetDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    clearInterval(timer);
    document.getElementById("countdown-section").style.display = "none";
    surprise.classList.remove("hidden");
    startConfetti();
    tryAutoPlay();
  }
}, 1000);

function tryAutoPlay() {
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      console.log("Autoplay success");
    }).catch(() => {
      playBtn.style.display = "inline-block";
    });
  }
}

playBtn.addEventListener("click", () => {
  music.play();
  startConfetti();
});

// Confetti
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