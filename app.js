let titulo = document.querySelector("h1");
titulo.innerHTML = "Jogo do número secreto";
let paragraph = document.querySelector("p");
paragraph.innerHTML = "Escolha um número entre 1 e 10";
let listaNumerosSorteados = [];
let numeroSecreto;
let tentativas = 1;
let maxNum = 10;


function iniciaJogo()   {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoNaTela("h1", 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    document.getElementById("restart").setAttribute("disabled", true);

}
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function gerarNumeroAleatorio() {
    let randomNum = parseInt(Math.floor(Math.random() * maxNum + 1));
    if(listaNumerosSorteados.length == maxNum)  {
        listaNumerosSorteados = [];
    }
    if(listaNumerosSorteados.includes(randomNum))   {
        return gerarNumeroAleatorio();
    }else   {
        listaNumerosSorteados.push(randomNum);
        console.log(listaNumerosSorteados)
        return randomNum;
    }
    return randomNum;
}

function limparCampo()  {
    chute = document.querySelector('input');
    chute.value = "";

}

function verificarChute() {
    console.log(numeroSecreto)
    let palavraTentativa = tentativas > 1 ? 'tentativas' : "tentativa";
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto)  {
        
        let mensagemTentativa = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela("h1", "acertou! Gênial!");
        exibirTextoNaTela("p", mensagemTentativa);
        let resetButton = document.getElementById("restart");
        resetButton.removeAttribute('disabled');
        resetButton.addEventListener("click", () => {
            console.log("teste")
            iniciaJogo();
        });
    } else if (numeroSecreto > chute){
        exibirTextoNaTela("p", "O número secreto é maior");
    } else  {
        exibirTextoNaTela("p", "O número secreto é menor");
    }       
    tentativas++;
    limparCampo();
    


}

iniciaJogo();