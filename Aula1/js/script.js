function minhaFuncao(){
    alert("Olá são lucas! FIM!");
}

function perguntar(){
    let nome = prompt("Qual é o seu nome?");
    document.getElementById("res1").innerHTML = "Seu nome é: " + nome;
}


function mostrarTexto(){
let texto = document.getElementById("entrada").value;
document.getElementById("res2").innerHTML = "Você escreveu:"+texto;

}

function somar() {
let num1 = parseFloat(document.getElementById("num1").value);
let num2 = parseFloat(document.getElementById("num2").value);

if (isNaN(num1) || isNaN(num2)) {
 alert("Digite números válidos!");
 } else {
let resultado = num1 + num2;
document.getElementById("res3").innerHTML = num1 + " + " + num2 + " = " + resultado;

  }

}

function calcularMedia(){

let nota1 = parseFloat(document.getElementById("nota1").value);
let nota2 = parseFloat(document.getElementById("nota2").value);
let nota3 = parseFloat(document.getElementById("nota3").value);

let media = (nota1 + nota2 + nota3) / 3;



 if (media > 7.0) {
        alert("Sua nota é " + media.toFixed(2) + " - Aprovado!");
    } else {
        alert("Sua nota é " + media.toFixed(2) + " - Reprovado!");
    }

  document.getElementById("res4").innerHTML = "A média é: " + media.toFixed(2);

}

function converterDolar(){
    let dolar = parseFloat(document.getElementById("dolar").value);
    let cotacao = parseFloat(document.getElementById("cotacao").value);

    if (isNaN(dolar) || isNaN(cotacao)) {
        alert("Digite valores válidos!");
    } else {
        let resultado = dolar * cotacao;
        document.getElementById("res5").innerHTML = "$" + dolar + " x R$" + cotacao + " = R$" + resultado.toFixed(2);

    }
}

function calcularArea(){
    let base = parseFloat(document.getElementById("base").value);
    let altura = parseFloat(document.getElementById("altura").value);

if (isNaN(base) || isNaN(altura)) {
    alert("Digite valores válidos!");
} else {
    let resultado = base * altura;
    document.getElementById("res6").innerHTML = "A área é: " + resultado.toFixed(2);
}

}

function calcularAntecessorSucessor(){
    let numero = parseInt(document.getElementById("numero").value);

if (isNaN(numero)) {
    alert("Digite um número válido!");
} else {
    let antecessor = numero - 1;
    let sucessor = numero + 1;
    document.getElementById("res7").innerHTML = "Número: " + numero + "<br> Antecessor: " + antecessor + "<br> Sucessor: " + sucessor;
}
}

function verificarParImpar(){

    let numero = parseInt(document.getElementById("numero2").value);


    if (isNaN(numero)) {
        alert("Digite um número válido!");
    }else{
        if (numero % 2 === 0) {
            document.getElementById("res8").innerHTML = numero + " é par.";
        } else {
            document.getElementById("res8").innerHTML = numero + " é ímpar.";
        }
    }
}

function verificarVelocidade(){
    let velocidade = parseFloat(document.getElementById("velocidade").value);

    if (isNaN(velocidade)) {
        alert("Digite um valor válido!");
    } else {
        if (velocidade > 80) {
            document.getElementById("res9").innerHTML = "Velocidade: " + velocidade + " km/h - Multado!";
        } else {
            document.getElementById("res9").innerHTML = "Velocidade: " + velocidade + " km/h - Dentro do limite.";
        }
    }
}

function maiorIdade(){
    let anoNascimento = parseInt(document.getElementById("anoNascimento").value);
    let anoAtual = parseInt(document.getElementById("anoAtual").value);

    if (isNaN(anoNascimento) || isNaN(anoAtual)) {
        alert("Digite valores válidos!");
    } else {
        let idade = anoAtual - anoNascimento;
        if (idade >= 18) {
            document.getElementById("res10").innerHTML = "Idade: " + idade + " anos - Maior de idade, você já pode dirigir.";
        } else {
            document.getElementById("res10").innerHTML = "Idade: " + idade + " anos - Menor de idade, você ainda não tem idade para dirigir.";
        }
    }
}

function calcularIMC(){
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("alturaImc").value);

    if (isNaN(peso) || isNaN(altura)) {
        alert("Digite valores válidos!");
    } else {
        let imc = peso / (altura * altura);
        let classificacao = " ";

        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
        } else if (imc < 25) {
            classificacao = "Peso normal";
        } else if (imc < 30) {
            classificacao = "Sobrepeso";
        } else {
            classificacao = "Obesidade";
        }

        document.getElementById("res11").innerHTML = "IMC: " + imc.toFixed(2) + " - " + classificacao;
    }
}

function calcularDesconto(){
    let preco = parseFloat(document.getElementById("valorCompra").value);

    if (isNaN(preco)) {
        alert("Digite um valor válido!");
    } else {
        let desconto = 0;
        if (preco > 500) {
            desconto = 15;
        } else {
            desconto = 5;
        }
        
        let valorDesconto = preco * (desconto / 100);
        let precoFinal = preco - valorDesconto;
        document.getElementById("res12").innerHTML = "Valor original: R$" + preco.toFixed(2) + "<br> Desconto: " + desconto + "%<br> O valor final da sua compra é R$ " + precoFinal.toFixed(2);
    }
}

function compararNumeros(){
    let num1 = parseFloat(document.getElementById("numero1").value);
    let num2 = parseFloat(document.getElementById("numero2").value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Digite números válidos!");
    } else {
        if (num1 > num2) {
            document.getElementById("res13").innerHTML = num1 + " é maior que " + num2;
        } else if (num1 < num2) {
            document.getElementById("res13").innerHTML = num2 + " é maior que " + num1;
        } else {
            document.getElementById("res13").innerHTML = num1 + " é igual a " + num2;
        }
    }
}

// 16
function classificarTriangulo(){

    let a = parseFloat(document.getElementById("lado1").value);
    let b = parseFloat(document.getElementById("lado2").value);
    let c = parseFloat(document.getElementById("lado3").value);

    if(isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0){
        document.getElementById("res14").innerHTML = "Digite valores válidos para os lados!";
        return;
    }

    if(a + b <= c || a + c <= b || b + c <= a){
        document.getElementById("res14").innerHTML = "Não forma um triângulo!";
        return;
    }

    if(a == b && b == c){
        document.getElementById("res14").innerHTML = "Triângulo Equilátero";
    }
    else if(a == b || a == c || b == c){
        document.getElementById("res14").innerHTML = "Triângulo Isósceles";
    }
    else{
        document.getElementById("res14").innerHTML = "Triângulo Escaleno";
    }
}


// 17
function menuBebidas(){

    let opcao = parseInt(document.getElementById("bebida").value);

    switch(opcao){

        case 1:
            document.getElementById("res15").innerHTML = "Você escolheu Suco";
            break;

        case 2:
            document.getElementById("res15").innerHTML = "Você escolheu Refrigerante";
            break;

        case 3:
            document.getElementById("res15").innerHTML = "Você escolheu Água";
            break;

        default:
            document.getElementById("res15").innerHTML = "Opção inválida";
    }

}


// 18
function verificarLetra(){

    let letra = document.getElementById("letra").value.toLowerCase();

    if(letra.length !== 1 || !/[a-z]/.test(letra)){
        document.getElementById("res16").innerHTML = "Digite uma única letra!";
        return;
    }

    if(letra == "a" || letra == "e" || letra == "i" || letra == "o" || letra == "u"){
        document.getElementById("res16").innerHTML = "VOGAL";
    }
    else{
        document.getElementById("res16").innerHTML = "CONSOANTE";
    }

}


// 19
function calculadora(){

    let n1 = parseFloat(document.getElementById("calc1").value);
    let n2 = parseFloat(document.getElementById("calc2").value);
    let op = document.getElementById("operacao").value;

    if(isNaN(n1) || isNaN(n2)){
        document.getElementById("res17").innerHTML = "Digite números válidos!";
        return;
    }

    switch(op){

        case "+":
            document.getElementById("res17").innerHTML = n1 + n2;
            break;

        case "-":
            document.getElementById("res17").innerHTML = n1 - n2;
            break;

        case "*":
            document.getElementById("res17").innerHTML = n1 * n2;
            break;

        case "/":
            if(n2 === 0){
                document.getElementById("res17").innerHTML = "Divisão por zero!";
            } else {
                document.getElementById("res17").innerHTML = n1 / n2;
            }
            break;

        default:
            document.getElementById("res17").innerHTML = "Operação inválida";
    }

}


// 20
function converterMoeda(){

    let valor = parseFloat(document.getElementById("valorReal").value);
    let opcao = parseInt(document.getElementById("tipoMoeda").value);

    if(isNaN(valor) || valor < 0){
        document.getElementById("res18").innerHTML = "Digite um valor válido!";
        return;
    }

    switch(opcao){

        case 1:
            document.getElementById("res18").innerHTML = "Dólar: " + (valor / 5.5).toFixed(2);
            break;

        case 2:
            document.getElementById("res18").innerHTML = "Euro: " + (valor / 6.2).toFixed(2);
            break;

        case 3:
            document.getElementById("res18").innerHTML = "Peso Argentino: " + (valor * 180).toFixed(2);
            break;

        default:
            document.getElementById("res18").innerHTML = "Opção inválida";
    }

}


// 21
function contagem(){
    let resultado = "";
    for(let i = 1; i <= 10; i++){
        resultado += i + " ";
    }
    document.getElementById("res19").innerHTML = resultado;
}


// 22
function tabuada(){
    let numero = parseInt(document.getElementById("tabuadaNumero").value);
    if(isNaN(numero)){
        alert("Digite um número válido!");
        return;
    }
    let resultado = "";
    for(let i = 1; i <= 10; i++){
        resultado += numero + " x " + i + " = " + (numero * i) + "<br>";
    }
    document.getElementById("res20").innerHTML = resultado;
}


// 23
function somador(){
    let s1 = parseFloat(document.getElementById("s1").value);
    let s2 = parseFloat(document.getElementById("s2").value);
    let s3 = parseFloat(document.getElementById("s3").value);
    let s4 = parseFloat(document.getElementById("s4").value);
    let s5 = parseFloat(document.getElementById("s5").value);
    if(isNaN(s1) || isNaN(s2) || isNaN(s3) || isNaN(s4) || isNaN(s5)){
        alert("Digite números válidos!");
        return;
    }
    let soma = s1 + s2 + s3 + s4 + s5;
    document.getElementById("res21").innerHTML = "Soma: " + soma;
}


// 24
function pares(){
    let resultado = "";
    for(let i = 2; i <= 20; i += 2){
        resultado += i + " ";
    }
    document.getElementById("res22").innerHTML = resultado;
}


// 25
function fatorial(){
    let numero = parseInt(document.getElementById("fatorialNumero").value);
    if(isNaN(numero) || numero < 0){
        alert("Digite um número inteiro não negativo!");
        return;
    }
    let resultado = 1;
    for(let i = 1; i <= numero; i++){
        resultado *= i;
    }
    document.getElementById("res23").innerHTML = "Fatorial de " + numero + " é " + resultado;
}


// 26
function validarDados(){
    let nota = parseFloat(document.getElementById("notaValidacao").value);
    if(isNaN(nota) || nota < 0 || nota > 10){
        document.getElementById("res24").innerHTML = "nota inválida! Deve ser entre 0 e 10!!!";
    } else {
        document.getElementById("res24").innerHTML = "Nota válida: " + nota;
    }
}


// 27
function mediaIdades(){
    let idadesStr = document.getElementById("idades").value;
    let idades = idadesStr.split(",").map(x => parseFloat(x.trim()));
    if(idades.some(isNaN)){
        alert("Digite idades válidas separadas por vírgula!");
        return;
    }
    let soma = idades.reduce((a, b) => a + b, 0);
    let media = soma / idades.length;
    document.getElementById("res25").innerHTML = "Média das idades: " + media.toFixed(2);
}


// 28
function listaNomes(){
    let nomes = ["João", "Maria", "Pedro", "Ana", "Carlos"];
    let resultado = "";
    for(let i = 0; i < nomes.length; i++){
        switch(i){
            case 0:
                resultado += nomes[i] + "<br>";
                break;
            case 1:
                resultado += nomes[i] + "<br>";
                break;
            case 2:
                resultado += nomes[i] + "<br>";
                break;
            case 3:
                resultado += nomes[i] + "<br>";
                break;
            case 4:
                resultado += nomes[i] + "<br>";
                break;
        }
    }
    document.getElementById("res26").innerHTML = "Nomes:<br>" + resultado;
}


// 29
function maiorValor(){
    let arrayStr = document.getElementById("arrayMaior").value;
    let array = arrayStr.split(",").map(x => parseFloat(x.trim()));
    if(array.length !== 10 || array.some(isNaN)){
        alert("Digite exatamente 10 números separados por vírgula!");
        return;
    }
    let maior = Math.max(...array);
    document.getElementById("res27").innerHTML = "Maior valor: " + maior;
}


// 30
function inverterArray(){
    let arrayStr = document.getElementById("arrayInverso").value;
    let array = arrayStr.split(",").map(x => parseFloat(x.trim()));
    if(array.length !== 5 || array.some(isNaN)){
        alert("Digite exatamente 5 números separados por vírgula!");
        return;
    }
    let invertido = array.reverse();
    document.getElementById("res28").innerHTML = "Array invertido: " + invertido.join(", ");
}


// 31
function localizarNome(){
    let nomes = ["Alana","Betina","Sheiny","Carol","Giselle","Dara","Julia","Amanda","Manu","kamila"];
    let buscar = document.getElementById("buscarNome").value.trim();
    if(nomes.includes(buscar)){
        document.getElementById("res29").innerHTML = "Nome encontrado: " + buscar;
    } else {
        document.getElementById("res29").innerHTML = "Nome não encontrado.";
    }
}


// 32
function filtroNotas(){
    let notasStr = document.getElementById("notasArray").value;
    let notas = notasStr.split(",").map(x => parseFloat(x.trim()));
    if(notas.length !== 10 || notas.some(isNaN)){
        alert("Digite exatamente 10 notas separadas por vírgula!");
        return;
    }
    let filtradas = notas.filter(nota => nota > 7);
    document.getElementById("res30").innerHTML = "Notas acima de 7: " + filtradas.join(", ");
}


// 33
function loginSistema(){
    let login = document.getElementById("login").value.trim();

    if(login === "Kelvyn" || login === "Prichoa" || login === "Kelso" || login === "Japinha" || login === "Nego"){
        document.getElementById("res31").innerHTML = "Login bem-sucedido!";
    } else {
        document.getElementById("res31").innerHTML = "Login falhou.";
    }

  
}


// 34
function mediaVendas(){
    let vendasStr = document.getElementById("vendas").value;
    let vendas = vendasStr.split(",").map(x => parseFloat(x.trim()));
    if(vendas.length !== 12 || vendas.some(isNaN)){
        alert("Digite exatamente 12 vendas separadas por vírgula!");
        return;
    }
    let soma = vendas.reduce((a, b) => a + b, 0);
    let media = soma / vendas.length;
    document.getElementById("res32").innerHTML = "Média de vendas: " + media.toFixed(2);
}


// 35
function carrinho(){
    let produto1 = document.getElementById("produto1").value;
    let preco1 = parseFloat(document.getElementById("preco1").value);
    let produto2 = document.getElementById("produto2").value;
    let preco2 = parseFloat(document.getElementById("preco2").value);
    let produto3 = document.getElementById("produto3").value;
    let preco3 = parseFloat(document.getElementById("preco3").value);
    if(!produto1 || !produto2 || !produto3 || isNaN(preco1) || isNaN(preco2) || isNaN(preco3)){
        alert("Preencha todos os campos corretamente!");
        return;
    }
    let total = preco1 + preco2 + preco3;
    let nota = "Nota Fiscal<br>" +
               "Produto 1: " + produto1 + " - R$" + preco1.toFixed(2) + "<br>" +
               "Produto 2: " + produto2 + " - R$" + preco2.toFixed(2) + "<br>" +
               "Produto 3: " + produto3 + " - R$" + preco3.toFixed(2) + "<br>" +
               "Total: R$" + total.toFixed(2);
    document.getElementById("res33").innerHTML = nota;
}


