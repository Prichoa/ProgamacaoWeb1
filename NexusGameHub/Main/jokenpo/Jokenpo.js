/* ── BACKGROUND ──────────────────────────────────────────── */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
resize(); window.addEventListener('resize', resize);

const COLS  = ['rgba(191,0,255,.28)','rgba(0,255,204,.18)','rgba(57,255,20,.15)'];
const CHARS = '01✊🖐✌◈◆∑∂';
const cols  = Math.floor(innerWidth / 28);
const drops = Array.from({length:cols}, () => Math.random() * innerHeight / 20);

function drawBg() {
  ctx.fillStyle = 'rgba(4,2,14,.06)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drops.forEach((y, i) => {
    ctx.fillStyle = COLS[i % COLS.length];
    ctx.font = '13px monospace';
    ctx.globalAlpha = Math.random() * .4 + .05;
    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 28, y * 20);
    ctx.globalAlpha = 1;
    if (y * 20 > canvas.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawBg, 55);

/* ── GAME DATA ───────────────────────────────────────────── */
const CHOICES = {
  rock:     { icon:'✊', label:'PEDRA',   beats:'scissors' },
  paper:    { icon:'🖐️',  label:'PAPEL',   beats:'rock'     },
  scissors: { icon:'✌️',  label:'TESOURA', beats:'paper'    }
};
const CPU_OPTIONS = ['rock','paper','scissors'];

let score  = JSON.parse(localStorage.getItem('jp_score') ||
  '{"wins":0,"draws":0,"loses":0,"total":0,"streak":0,"maxStreak":0,"history":[]}');

/* ── DOM REFS ────────────────────────────────────────────── */
const playerEl  = document.getElementById('playerChoice');
const cpuEl     = document.getElementById('cpuChoice');
const banner    = document.getElementById('resultBanner');
const winEl     = document.getElementById('scWins');
const drawEl    = document.getElementById('scDraws');
const loseEl    = document.getElementById('scLoses');
const streakVal = document.getElementById('streakVal');

/* ── HELPERS ─────────────────────────────────────────────── */
function bumpNum(el) {
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

function updateHUD() {
  winEl.textContent  = score.wins;
  drawEl.textContent = score.draws;
  loseEl.textContent = score.loses;
  streakVal.textContent = `${score.streak} vitória${score.streak !== 1 ? 's' : ''}`;
}

function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = score.history.map(h => `
    <div class="h-row ${h.result}">
      <span class="h-rnd">R${h.round}</span>
      <span class="h-mid">${CHOICES[h.player].icon} ${CHOICES[h.player].label} vs ${CHOICES[h.cpu].label} ${CHOICES[h.cpu].icon}</span>
      <span class="h-res">${h.result === 'win' ? 'VITÓRIA' : h.result === 'draw' ? 'EMPATE' : 'DERROTA'}</span>
    </div>`).join('');
}

/* ── MAIN PLAY ───────────────────────────────────────────── */
let playing = false;

function play(playerChoice) {
  if (playing) return;
  playing = true;

  const cpuChoice = CPU_OPTIONS[Math.floor(Math.random() * 3)];

  // Animate choice circles
  const removeClass = cl => {
    cl.classList.remove('pop','result-win','result-lose','result-draw');
  };
  removeClass(playerEl); removeClass(cpuEl);
  void playerEl.offsetWidth;

  playerEl.textContent = CHOICES[playerChoice].icon;
  cpuEl.textContent    = CHOICES[cpuChoice].icon;
  playerEl.classList.add('pop');
  cpuEl.classList.add('pop');

  // Determine outcome
  let result, msg, sub, cls;
  if (playerChoice === cpuChoice) {
    result = 'draw'; cls = 'draw';
    msg = '🤝 EMPATE!';
    sub = `Ambos escolheram ${CHOICES[playerChoice].label}`;
    score.draws++; score.streak = 0;
  } else if (CHOICES[playerChoice].beats === cpuChoice) {
    result = 'win'; cls = 'win';
    msg = '🏆 VOCÊ VENCEU!';
    sub = `${CHOICES[playerChoice].label} bate ${CHOICES[cpuChoice].label}`;
    score.wins++; score.streak++;
    if (score.streak > score.maxStreak) score.maxStreak = score.streak;
  } else {
    result = 'lose'; cls = 'lose';
    msg = '💀 CPU VENCEU!';
    sub = `${CHOICES[cpuChoice].label} bate ${CHOICES[playerChoice].label}`;
    score.loses++; score.streak = 0;
  }
  score.total++;

  // Glow circles
  const glowClass = result === 'win'  ? 'result-win'
                  : result === 'lose' ? 'result-lose'
                  : 'result-draw';
  setTimeout(() => {
    playerEl.classList.add(glowClass);
    cpuEl.classList.add(result === 'win' ? 'result-lose' : result === 'lose' ? 'result-win' : 'result-draw');
  }, 200);

  // Banner
  banner.className = `result-banner show ${cls}`;
  banner.innerHTML = `<span>${msg}</span><span class="result-sub">${sub}</span>`;

  // Bump scores
  if (result === 'win')  bumpNum(winEl);
  if (result === 'lose') bumpNum(loseEl);
  if (result === 'draw') bumpNum(drawEl);

  // History
  score.history.unshift({ round:score.total, player:playerChoice, cpu:cpuChoice, result });
  if (score.history.length > 12) score.history.pop();

  localStorage.setItem('jp_score', JSON.stringify(score));
  updateHUD(); renderHistory();
  setTimeout(() => { playing = false; }, 600);
}

/* ── KEYBOARD SHORTCUTS ──────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === '1') play('rock');
  if (e.key === '2') play('paper');
  if (e.key === '3') play('scissors');
});

/* ── RESET ───────────────────────────────────────────────── */
function resetScore() {
  score = {wins:0,draws:0,loses:0,total:0,streak:0,maxStreak:0,history:[]};
  localStorage.setItem('jp_score', JSON.stringify(score));
  playerEl.textContent = '❓'; cpuEl.textContent = '❓';
  playerEl.className = 'choice-display';
  cpuEl.className    = 'choice-display';
  banner.className   = 'result-banner';
  updateHUD(); renderHistory();
}

/* ── INIT ────────────────────────────────────────────────── */
updateHUD();
renderHistory();