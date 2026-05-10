/* ════════════════════════════════════════════════════════════
   NexusGameHub — styleIndex.js
═══════════════════════════════════════════════════════════ */

/* ── BACKGROUND CANVAS (partículas + linhas) ─────────────── */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PALETTE = ['#bf00ff', '#00ffcc', '#39ff14'];
const NUM_P   = 80;

const particles = Array.from({ length: NUM_P }, () => ({
  x:     Math.random() * canvas.width,
  y:     Math.random() * canvas.height,
  vx:    (Math.random() - .5) * .4,
  vy:    (Math.random() - .5) * .4,
  r:     Math.random() * 1.8 + .5,
  col:   PALETTE[Math.floor(Math.random() * PALETTE.length)],
  alpha: Math.random() * .5 + .1
}));

const LINK_DIST = 140;

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* conexões */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < LINK_DIST) {
        const a = (1 - d / LINK_DIST) * .15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(191,0,255,${a})`;
        ctx.lineWidth   = .6;
        ctx.stroke();
      }
    }
  }

  /* pontos */
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    /* halo */
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
    grad.addColorStop(0, p.col + '22');
    grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    /* núcleo */
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle   = p.col;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

setInterval(drawScene, 20);


/* ── TRANSIÇÃO ENTRADA → MENU ────────────────────────────── */
const entrance = document.getElementById('entrance');
const app      = document.getElementById('app');
let   launched = false;

function launch() {
  if (launched) return;
  launched = true;

  entrance.classList.add('out');

  setTimeout(() => {
    entrance.style.display = 'none';
    app.classList.add('on');
    animateStats();     /* contar números */
    updateScoreCards(); /* mostrar vitórias salvas */
    revealCards();      /* animar entrada dos cards */
  }, 850);
}

document.getElementById('startBtn').addEventListener('click', launch);
document.addEventListener('keydown', launch, { once: true });


/* ── CONTAGEM ANIMADA DOS STATS ──────────────────────────── */
function countUp(el, target, duration = 900) {
  if (target === 0) { el.textContent = '0'; return; }
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(p * p * target); /* easing quadrático */
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function animateStats() {
  const jp    = JSON.parse(localStorage.getItem('jp_score')    || '{"wins":0,"total":0}');
  const dados = JSON.parse(localStorage.getItem('dados_score') || '{"wins":0,"total":0}');
  const cc    = JSON.parse(localStorage.getItem('cc_score')    || '{"wins":0,"total":0}');

  const wins  = (jp.wins  || 0) + (dados.wins  || 0) + (cc.wins  || 0);
  const total = (jp.total || 0) + (dados.total || 0) + (cc.total || 0);

  setTimeout(() => {
    countUp(document.getElementById('statWins'),  wins,  1000);
    countUp(document.getElementById('statGames'), total, 1000);
  }, 200);
}


/* ── VITÓRIAS POR JOGO NOS CARDS ─────────────────────────── */
function updateScoreCards() {
  const jp    = JSON.parse(localStorage.getItem('jp_score')    || '{"wins":0}');
  const dados = JSON.parse(localStorage.getItem('dados_score') || '{"wins":0}');
  const cc    = JSON.parse(localStorage.getItem('cc_score')    || '{"wins":0}');

  document.getElementById('jpWins').textContent    = jp.wins    || 0;
  document.getElementById('dadosWins').textContent = dados.wins || 0;
  document.getElementById('ccWins').textContent    = cc.wins    || 0;
}


/* ── REVEAL ANIMADO DOS CARDS ────────────────────────────── */
function revealCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'none';

    setTimeout(() => {
      card.style.transition = `opacity .55s ease, transform .55s cubic-bezier(.175,.885,.32,1.275)`;
      card.style.opacity    = '1';
      card.style.transform  = 'translateY(0)';
    }, 120 + i * 130);
  });
}


/* ── TILT 3D NOS CARDS (hover) ───────────────────────────── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const rx = ((e.clientY - cy) / (r.height / 2)) * 7;
    const ry = ((e.clientX - cx) / (r.width  / 2)) * -7;
    card.style.transform = `translateY(-10px) scale(1.015) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});