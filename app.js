let listaDeNumerosSorteados = [];
let numeroLimite = 100
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let listaDeChutes = [];

//Gera um número aletório de 1 a 100
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if (quantidadeDeElementos == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }

}

exibirMensagemInicial()

//Verifica se o chute é válido ou se é igual ao número secreto
function verificarChute() {
    let chuteInput = document.querySelector('input');
    let chuteValor = chuteInput.value;

    if (chuteValor === '') {
        exibirTextoNaTela('p', '⛔ Por favor, digite um número antes de chutar!');
        return;
    }

    let chute = parseInt(chuteValor);

    if (chute < 1 || chute > 100) {
        exibirTextoNaTela('p', '❌ O número deve estar entre 1 e 100!');
        limparCampo();
        return;
    }


    if (!listaDeChutes.includes(chute)) {
        listaDeChutes.push(chute);
        exibirNumerosJogados();
    } 

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentaviva';
        let mensagemTentativas = `Você descobriu o número  secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('P', mensagemTentativas);

        document.querySelector('h1').classList.add('pulse');
    setTimeout(() => document.querySelector('h1').classList.remove('pulse'), 1000);

        document.getElementById('reiniciar').removeAttribute('disabled')
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `O numero secreto é menor que ${chute}`);
    } else {
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
    }
    tentativas++; //Conta quantidade de tentativas 
    limparCampo()

}

//Reinicia o jogo quando o botão "novo jogo" é clicado
function reiniciarJogo() {
    listaDeChutes = [];
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial()
    exibirNumerosJogados();
    document.getElementById('reiniciar').setAttribute('disabled', true)

}

//Função que exibe as mensagens na tela
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100:');
}

//Função que exibe os número tentados na tela
function exibirNumerosJogados() {
    let numerosTentados = listaDeChutes.join(', ');
    exibirTextoNaTela('#numerosJogados', `Números já tentados: ${numerosTentados}`)
}

//Adiciona a animação para mensagem de erro (feito pelo deepseek)
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if (texto.includes('⛔') || texto.includes('❌')) {
        campo.classList.add('shake');
        setTimeout(() => campo.classList.remove('shake'), 300);
    }
}

//Limpa a tela
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}