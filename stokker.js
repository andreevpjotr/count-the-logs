const grid = document.getElementById("grid");
const startBtn = document.getElementById("startBtn");

let totalLogs = 0;
let active = false;
let spawnInterval = null;

// Local log image
const logImage = "log1.jpg"; // make sure this image file is in the same folder or adjust path

function createLog() {
  if (!active) return;

  const img = document.createElement("img");
  img.classList.add("log");
  img.src = logImage;

  // Random width:
  // 20% chance full width (300px), else between 100–250px
  let width;
  const chance = Math.random();
  if (chance < 0.2) {
    width = 300; // full width
  } else {
    width = Math.random() * 150 + 100; // 100–250px
  }

  const left = Math.random() * (300 - width);
  img.style.width = `${width}px`;
  img.style.left = `${left}px`;

  grid.appendChild(img);
  totalLogs++;

  let y = 0;
  const speed = 1.2; // 👈 slower (was 1.6)

  const moveInterval = setInterval(() => {
    if (!active) {
      clearInterval(moveInterval);
      img.remove();
      return;
    }

    y += speed;
    img.style.transform = `translateY(${y}px)`;

    if (y > 500) {
      clearInterval(moveInterval);
      img.remove();
    }
  }, 16);
}

function startGame() {
  totalLogs = 0;
  grid.innerHTML = "";
  active = true;

  startBtn.disabled = true;
  startBtn.textContent = "Running...";

  let lastSpawnY = 0;
  const spawnDelay = 300; // fallback delay in case logs are slow to move

function spawnNext() {
  if (!active) return;

  // Create the new log
  createLog();

  // Base delay between logs
  let delay = 350;

  // Occasionally add a pause (e.g., 20% chance)
  if (Math.random() < 0.1) {
    delay += 800; // Extra pause time here
  }

  // Spawn next log after delay
  setTimeout(spawnNext, delay);
}

  // Start spawning logs
  spawnNext();

  // Random game duration between 10–20 seconds
  const duration = Math.random() * 10000 + 10000; // 10–20 seconds

  // Stop after random duration
  setTimeout(() => {
    active = false;
    startBtn.disabled = false;
    startBtn.textContent = "Start";

    setTimeout(() => {
      const guess = prompt("How many logs did you see?");
      alert(`You guessed ${guess}. The correct answer was ${totalLogs}.`);
    }, 800);
  }, duration);
}

startBtn.addEventListener("click", startGame);
