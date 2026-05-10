/* ── BACKGROUND ──────────────────────────────────────────── */
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');
const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
resize(); window.addEventListener('resize', resize);

const COLS  = ['rgba(0,255,204,.22)','rgba(57,255,20,.15)','rgba(191,0,255,.12)'];
const CHARS = '123456⚀⚁⚂⚃⚄⚅◈∑';
const cols  = Math.floor(innerWidth / 28);
const drops = Array.from({length:cols}, () => Math.random() * innerHeight / 20);

function drawBg() {
  ctx.fillStyle = 'rgba(4,2,14,.055)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drops.forEach((y, i) => {
    ctx.fillStyle = COLS[i % COLS.length];
    ctx.font = '14px monospace';
    ctx.globalAlpha = Math.random() * .35 + .05;
    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 28, y * 20);
    ctx.globalAlpha = 1;
    if (y * 20 > canvas.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawBg, 55);

/* ── GAME DATA ───────────────────────────────────────────── */
const FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];

let score = JSON.parse(localStorage.getItem('dados_score') ||
  '{"wins":0,"draws":0,"loses":0,"total":0,"history":[]}');

/* ── DOM REFS ────────────────────────────────────────────── */
const playerDice = document.getElementById('playerDice');
const cpuDice    = document.getElementById('cpuDice');
const playerNum  = document.getElementById('playerNum');
const cpuNum     = document.getElementById('cpuNum');
const banner     = document.getElementById('resultBanner');
const rollBtn    = document.getElementById('rollBtn');
const winEl      = document.getElementById('scWins');
const drawEl     = document.getElementById('scDraws');
const loseEl     = document.getElementById('scLoses');

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
}
function renderHistory() {
  document.getElementById('historyList').innerHTML = score.history.map(h => `
    <div class="h-row ${h.result}">
      <span class="h-rnd">R${h.round}</span>
      <span class="h-mid">${FACES[h.player-1]} ${h.player} &nbsp;vs&nbsp; ${h.cpu} ${FACES[h.cpu-1]}</span>
      <span class="h-res">${h.result==='win'?'VITÓRIA':h.result==='draw'?'EMPATE':'DERROTA'}</span>
    </div>`).join('');
}

/* ── ROLL ────────────────────────────────────────────────── */
let rolling = false;

function rollDice() {
  if (rolling) return;
  rolling = true;
  rollBtn.disabled = true;

  // Reset glows
  playerDice.className = 'dice spin-anim';
  cpuDice.className    = 'dice spin-anim';
  banner.className = 'result-banner';
  playerNum.className = 'dice-num';
  cpuNum.className    = 'dice-num';
  playerNum.textContent = '–';
  cpuNum.textContent    = '–';

  // Shuffle animation
  let ticks = 0;
  const iv = setInterval(() => {
    playerDice.textContent = FACES[Math.floor(Math.random() * 6)];
    cpuDice.textContent    = FACES[Math.floor(Math.random() * 6)];
    ticks++;
    if (ticks >= 12) {
      clearInterval(iv);
      finalize();
    }
  }, 55);
}

function finalize() {
  const pNum = Math.floor(Math.random() * 6) + 1;
  const cNum = Math.floor(Math.random() * 6) + 1;

  playerDice.className = 'dice';
  cpuDice.className    = 'dice';
  playerDice.textContent = FACES[pNum - 1];
  cpuDice.textContent    = FACES[cNum - 1];
  playerNum.textContent  = pNum;
  cpuNum.textContent     = cNum;
  playerNum.className    = 'dice-num big';
  cpuNum.className       = 'dice-num big';

  let result, cls, msg, sub;
  if (pNum > cNum) {
    result='win'; cls='win';
    msg='🏆 VOCÊ VENCEU!'; sub=`Seu dado: ${pNum} — CPU: ${cNum}`;
    playerDice.classList.add('glow-win'); cpuDice.classList.add('glow-lose');
    score.wins++;
  } else if (pNum < cNum) {
    result='lose'; cls='lose';
    msg='💀 CPU VENCEU!'; sub=`Seu dado: ${pNum} — CPU: ${cNum}`;
    playerDice.classList.add('glow-lose'); cpuDice.classList.add('glow-win');
    score.loses++;
  } else {
    result='draw'; cls='draw';
    msg='🤝 EMPATE!'; sub=`Ambos tiraram ${pNum}`;
    playerDice.classList.add('glow-draw'); cpuDice.classList.add('glow-draw');
    score.draws++;
  }
  score.total++;

  banner.className = `result-banner show ${cls}`;
  banner.innerHTML = `<span>${msg}</span><span class="result-sub">${sub}</span>`;

  if (result==='win')  bumpNum(winEl);
  if (result==='lose') bumpNum(loseEl);
  if (result==='draw') bumpNum(drawEl);

  score.history.unshift({ round:score.total, player:pNum, cpu:cNum, result });
  if (score.history.length > 12) score.history.pop();
  localStorage.setItem('dados_score', JSON.stringify(score));

  updateHUD(); renderHistory();
  setTimeout(() => { rolling = false; rollBtn.disabled = false; }, 450);
}

/* ── RESET ───────────────────────────────────────────────── */
function resetScore() {
  score = {wins:0,draws:0,loses:0,total:0,history:[]};
  localStorage.setItem('dados_score', JSON.stringify(score));
  playerDice.className = 'dice'; cpuDice.className = 'dice';
  playerDice.textContent = '🎲'; cpuDice.textContent = '🎲';
  playerNum.className = 'dice-num'; cpuNum.className = 'dice-num';
  playerNum.textContent = '–'; cpuNum.textContent = '–';
  banner.className = 'result-banner';
  updateHUD(); renderHistory();
}

/* ── INIT ────────────────────────────────────────────────── */
updateHUD();
renderHistory();