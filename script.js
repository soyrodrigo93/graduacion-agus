const targetDate = new Date("2026-11-17T16:00:00-03:00").getTime();
const $ = id => document.getElementById(id);
let isFinished = false;

function updateCountdown() {
  const diff = targetDate - Date.now();
  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      if ($(id)) $(id).textContent = "00";
    });
    if ($("finished-msg")) $("finished-msg").classList.remove("hidden");
    if (!isFinished) {
      isFinished = true;
      createEffects(["🎊", "🎓", "✨"], 100);
    }
    return;
  }
  
  const totalSeconds = Math.floor(diff / 1000);
  if ($("days")) $("days").textContent = Math.floor(totalSeconds / 86400).toString().padStart(2, "0");
  if ($("hours")) $("hours").textContent = Math.floor((totalSeconds % 86400) / 3600).toString().padStart(2, "0");
  if ($("minutes")) $("minutes").textContent = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  if ($("seconds")) $("seconds").textContent = (totalSeconds % 60).toString().padStart(2, "0");
}

function createEffects(chars, count) {
  const container = $("effects-container");
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.textContent = chars[Math.floor(Math.random() * chars.length)];
    el.style.position = "absolute";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-5vh";
    el.style.fontSize = (Math.random() * 15 + 15) + "px";
    el.style.opacity = Math.random() * 0.5 + 0.5;
    
    const duration = Math.random() * 3 + 2;
    el.style.transition = `transform ${duration}s linear, top ${duration}s linear, opacity ${duration}s ease-in`;
    
    container.appendChild(el);
    
    setTimeout(() => {
      el.style.top = "110vh";
      el.style.transform = `rotate(${Math.random() * 720 - 360}deg) translateX(${Math.random() * 100 - 50}px)`;
      el.style.opacity = 0;
    }, 50);
    
    setTimeout(() => el.remove(), duration * 1000);
  }
}

// Botones de interacción
if ($("confettiBtn")) $("confettiBtn").onclick = () => createEffects(["🎊", "🎉"], 50);
if ($("sparkleBtn")) $("sparkleBtn").onclick = () => createEffects(["✨", "✦", "✧"], 50);
if ($("heartBtn")) $("heartBtn").onclick = () => createEffects(["💗", "🤍", "💕"], 50);

// Reproductor de música
const audio = $("audio");
const musicBtn = $("musicBtn");
if (musicBtn && audio) {
  musicBtn.onclick = async () => {
    try {
      if (audio.paused) {
        await audio.play();
        musicBtn.textContent = "❚❚ Pausar";
      } else {
        audio.pause();
        musicBtn.textContent = "▶ Play";
      }
    } catch (e) {
      musicBtn.textContent = "⚠ Error (revisá musica.mp3)";
    }
  };
}

// Animaciones de scroll (Fade-in)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Iniciar cuenta regresiva
updateCountdown();
setInterval(updateCountdown, 1000);
document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
  if (
    event.key === 'F12' || 
    (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C')) || 
    (event.ctrlKey && (event.key === 'u' || event.key === 'U' || event.key === 's' || event.key === 'S'))
  ) {
    event.preventDefault();
  }
});