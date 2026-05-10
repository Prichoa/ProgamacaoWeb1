/* ── BACKGROUND ──────────────────────────────────────────── */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
resize(); window.addEventListener('resize', resize);

const COLS  = ['rgba(57,255,20,.22)','rgba(191,0,255,.18)','rgba(0,255,204,.12)'];
const CHARS = 'CARACOROAHT01◈◆';
const cols  = Math.floor(innerWidth / 28);
const drops = Array.from({length:cols}, () => Math.random() * innerHeight / 20);

function drawBg() {
  ctx.fillStyle = 'rgba(4,2,14,.055)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drops.forEach((y, i) => {
    ctx.fillStyle = COLS[i % COLS.length];
    ctx.font = '13px monospace';
    ctx.globalAlpha = Math.random() * .35 + .05;
    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 28, y * 20);
    ctx.globalAlpha = 1;
    if (y * 20 > canvas.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawBg, 55);

/* ── GAME STATE ──────────────────────────────────────────── */
let score = JSON.parse(localStorage.getItem('cc_score') ||
  '{"wins":0,"loses":0,"total":0,"streak":0,"maxStreak":0,"history":[]}');

/* ── DOM ─────────────────────────────────────────────────── */
const coin        = document.getElementById('coin');
const coinFace    = document.getElementById('coinFace');
const coinBack    = document.getElementById('coinBack');
const outName     = document.getElementById('coinOutName');
const banner      = document.getElementById('resultBanner');
const winEl       = document.getElementById('scWins');
const totalEl     = document.getElementById('scTotal');
const loseEl      = document.getElementById('scLoses');
const streakCur   = document.getElementById('streakCur');
const streakMax   = document.getElementById('streakMax');
const caraBtn     = document.getElementById('caraBtn');
const coroaBtn    = document.getElementById('coroaBtn');

/* ── HELPERS ─────────────────────────────────────────────── */
function bumpNum(el) {
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

function updateHUD() {
  winEl.textContent   = score.wins;
  totalEl.textContent = score.total;
  loseEl.textContent  = score.loses;
  streakCur.textContent = score.streak;
  streakMax.textContent = score.maxStreak;

  const streakBar = document.getElementById('streakBar');
  if (streakBar) {
    streakBar.className = `streak-item${score.streak >= 3 ? ' hot' : ''}`;
  }
}

function renderHistory() {
  document.getElementById('historyList').innerHTML = score.history.map(h => `
    <div class="h-row ${h.win ? 'win' : 'lose'}">
      <span class="h-rnd">R${h.round}</span>
      <span class="h-mid">Escolheu: ${h.choice.toUpperCase()} &nbsp;→&nbsp; Saiu: ${h.result.toUpperCase()}</span>
      <span class="h-res">${h.win ? 'ACERTOU' : 'ERROU'}</span>
    </div>`).join('');
}

/* ── FLIP ────────────────────────────────────────────────── */
let flipping = false;

function choose(side) {
  if (flipping) return;
  flipping = true;

  // Update selection visual
  caraBtn.classList.toggle('selected', side === 'cara');
  coroaBtn.classList.toggle('selected', side === 'coroa');
  caraBtn.disabled = true;
  coroaBtn.disabled = true;

  // Reset coin glows
  coinFace.classList.remove('glow');
  coinBack.classList.remove('glow');
  banner.className = 'result-banner';
  outName.textContent = '···';
  outName.style.color = 'rgba(255,255,255,.3)';
  outName.style.textShadow = 'none';

  // Animate coin
  coin.classList.remove('flipping');
  void coin.offsetWidth;
  coin.classList.add('flipping');

  // Determine result after animation
  setTimeout(() => {
    const result = Math.random() < 0.5 ? 'cara' : 'coroa';
    const win    = result === side;
    coin.classList.remove('flipping');

    // Glow winning face
    if (result === 'cara')  coinFace.classList.add('glow');
    else                    coinBack.classList.add('glow');

    outName.textContent = result.toUpperCase();
    if (result === 'cara') {
      outName.style.color = 'var(--g)';
      outName.style.textShadow = '0 0 20px var(--g)';
    } else {
      outName.style.color = 'var(--p)';
      outName.style.textShadow = '0 0 20px var(--p)';
    }

    // Update score
    if (win) {
      score.wins++; score.streak++;
      if (score.streak > score.maxStreak) score.maxStreak = score.streak;
      bumpNum(winEl);
    } else {
      score.loses++; score.streak = 0;
      bumpNum(loseEl);
    }
    score.total++;

    const cls = win ? 'win' : 'lose';
    const msg = win ? '🏆 VOCÊ ACERTOU!' : '💀 VOCÊ ERROU!';
    const sub = `Escolheu: ${side.toUpperCase()} — Saiu: ${result.toUpperCase()}`;
    banner.className = `result-banner show ${cls}`;
    banner.innerHTML = `<span>${msg}</span><span class="result-sub">${sub}</span>`;

    score.history.unshift({ round:score.total, choice:side, result, win });
    if (score.history.length > 12) score.history.pop();
    localStorage.setItem('cc_score', JSON.stringify(score));

    updateHUD(); renderHistory();

    setTimeout(() => {
      flipping = false;
      caraBtn.disabled  = false;
      coroaBtn.disabled = false;
    }, 500);
  }, 950);
}

/* ── RESET ───────────────────────────────────────────────── */
function resetScore() {
  score = {wins:0,loses:0,total:0,streak:0,maxStreak:0,history:[]};
  localStorage.setItem('cc_score', JSON.stringify(score));
  caraBtn.classList.remove('selected');
  coroaBtn.classList.remove('selected');
  coinFace.classList.remove('glow');
  coinBack.classList.remove('glow');
  outName.textContent = '—';
  outName.style.color = '';
  outName.style.textShadow = '';
  banner.className = 'result-banner';
  updateHUD(); renderHistory();
}

/* ── INIT ────────────────────────────────────────────────── */
updateHUD();
renderHistory();