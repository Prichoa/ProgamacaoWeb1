function minhaFuncao(){
document.write("olá são lucas!");
document.write ("<br> <a href='index.HTML'>VOLTAR </a>");alert("FIM!");

}

function pergunta(){
let nome = prompt("Qual é o seu nome?");
document.getElementById("res1").innerHTML = "Seu nome é:"+nome;


}

function mostrarTexto(){
let texto = document.getElementById("entrada").value;
document.getElementById("res2").innerHTML = "Você escreveu:"+texto;

}

function somar(){
let num1 = parseFloat(document.getElementById("num1")).value;
let num2 = parseFloat(document.getElementById("num2")).value;

if (isNaN(num1)|| isNaN (num2)){
    alert("Digite números válidos!");
}else{
    let resultado = num1 + num2;
    document.getElementById("res3").innerHTML = num1+"+"+num2+"="+resultado;
}

}

function calcularMedia(){
let nota1 = parseFloat(document.getElementById("nota1")).value;
let nota2 = parseFloat(document.getElementById("nota2")).value;
let nota3 = parseFloat(document.getElementById("nota3")).value;

let media = (nota1 + nota2 + nota3) / 3;

 if (media > 7.0) {
        alert("Sua nota é " + media.toFixed(2) + " - Aprovado!");
    } else {
        alert("Sua nota é " + media.toFixed(2) + " - Reprovado!");
    }

}

function converterDolar(){
    let dolar = parseFloat(document.getElementById("dolar").value);
    let cotacao = parseFloat(document.getElementById("cotacao").value);

    if (isNaN(dolar) || isNaN(cotacao)) {
        alert("Digite valores válidos!");
    } else {
        let resultado = dolar * cotacao;
        document.getElementById("res5").innerHTML = "O valor em reais é: R$ " + resultado.toFixed(2);

    }
}


