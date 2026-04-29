function minhaFuncao(){
document.write("olá são lucas!");
document.write ("<br> <a href='index.HTML'>VOLTAR </a>");alert("FIM!");

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



