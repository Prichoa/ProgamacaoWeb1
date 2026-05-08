//CARA OU COROA
let vitoriasCC = 0;
let derrotasCC = 0;

function jogarMoeda(escolha) {

  const moeda = document.getElementById("moeda");

  // inicia animação da moeda
  moeda.classList.add("girando");

  // limpa resultado anterior (opcional)
  document.getElementById("resultado").innerHTML = "";

  setTimeout(() => {

    // sorteio
    const resultado = Math.random() < 0.5 ? "Cara" : "Coroa";

    let mensagem = "";

    // lógica do jogo
    if (escolha === resultado) {
      mensagem = "Você acertou!";
      vitoriasCC++;
    } else {
      mensagem = "Você errou!";
      derrotasCC++;
    }

    //finaliza animação
    moeda.classList.remove("girando");

    //resultado
    document.getElementById("resultado").innerHTML = `
      Sua aposta: <strong>${escolha}</strong><br>
      Resultado: <strong>${resultado}</strong><br><br>
      <strong>${mensagem}</strong>
    `;

    // atualiza placar
    atualizarPlacarCC();

  }, 800);
}

//ATUALIZAR PLACAR
function atualizarPlacarCC() {

  document.getElementById("vitorias").innerText = vitoriasCC;
  document.getElementById("derrotas").innerText = derrotasCC;
}

//RESET PLACAR
function resetarCaraOuCoroa() {

  vitoriasCC = 0;
  derrotasCC = 0;

  atualizarPlacarCC();

  document.getElementById("resultado").innerHTML = "";
}

  //DADOS
  let vitoriasDados = 0;
let derrotasDados = 0;
let empatesDados = 0;

function jogarDados() {

  const dadoUser = document.getElementById("dadoUsuario");
  const dadoBot = document.getElementById("dadoPC");

  dadoUser.classList.add("rolling");
  dadoBot.classList.add("rolling");

  setTimeout(() => {

    const usuario = Math.floor(Math.random() * 6) + 1;
    const bot = Math.floor(Math.random() * 6) + 1;

    dadoUser.src ='./img/dados.png';
    dadoBot.src = `./img/dados.png`;

    dadoUser.classList.remove("rolling");
    dadoBot.classList.remove("rolling");

    let resultado = "";

    if (usuario > bot) {

      resultado = "Você venceu!";
      vitoriasDados++;

    } else if (bot > usuario) {

      resultado = "Bot venceu!";
      derrotasDados++;

    } else {

      resultado = "Empate!";
      empatesDados++;

    }

    document.getElementById("resultado").innerHTML = `
      Você: <strong>${usuario}</strong><br>
      Bot: <strong>${bot}</strong><br><br>
      <strong>${resultado}</strong>
    `;

    atualizarPlacarDados();

  }, 800);
}

function atualizarPlacarDados() {

  document.getElementById("vitorias").innerText = vitoriasDados;
  document.getElementById("derrotas").innerText = derrotasDados;
  document.getElementById("empates").innerText = empatesDados;
}

function reiniciarDados() {

  vitoriasDados = 0;
  derrotasDados = 0;
  empatesDados = 0;

  atualizarPlacarDados();

  document.getElementById("resultado").innerHTML = "";

  document.getElementById("dadoUsuario").src =
    "./img/dados.png";

  document.getElementById("dadoPC").src =
    "./img/dados.png";
}



//JOKENPO
 
// placar
let vitorias = 0;
let derrotas = 0;
let empates = 0;

// opções da IA
const opcoes = ["Pedra", "Papel", "Tesoura"];

function jogar(jogador) {

  const computador =
    opcoes[Math.floor(Math.random() * 3)];

  let resultado = "";

  if (jogador === computador) {

    resultado = "Empate!";
    empates++;

  } else if (

    (jogador === "Pedra" && computador === "Tesoura") ||
    (jogador === "Papel" && computador === "Pedra") ||
    (jogador === "Tesoura" && computador === "Papel")

  ) {

    resultado = "Você venceu!";
    vitorias++;

  } else {

    resultado = "Você perdeu!";
    derrotas++;

  }

  document.getElementById("resultado").innerHTML = `
    Você escolheu: <strong>${jogador}</strong><br>
    Computador escolheu: <strong>${computador}</strong><br><br>
    <strong>${resultado}</strong>
  `;

  atualizarPlacar();
}

function atualizarPlacar() {

  document.getElementById("vitorias").innerText = vitorias;
  document.getElementById("derrotas").innerText = derrotas;
  document.getElementById("empates").innerText = empates;

}

function resetarPlacar() {

    vitorias = 0;
    derrotas = 0;
    empates = 0;
  
    document.getElementById("resultado").innerHTML =
      "<strong>Placar resetado!</strong>";
  
    atualizarPlacar();
  }
