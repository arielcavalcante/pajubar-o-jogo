
/* ~~~~~ Funções ~~~~~ */
// Adiciona pontos ao placar
const addPonto = () => {
  for(let i = 0; i < data.perguntas.length; i++){
    resultados.innerText = i
  }
}

// Mostra as opções se o texto for uma pergunta (desnecessário pra apresentação de hoje)
/* 
const esconder = () => form.classList.add("invisivel");

const mostrar = () => form.classList.toggle("invisivel");

const ehUmaPergunta = () => textoPrincipal.innerHTML.indexOf('?') != -1 ? mostrar() : esconder();
*/

// Loopa os dados e insere no html alterando o DOM só 1 vez
const criarQuiz = () => {
  const html = [];
  data.forEach(
    (perguntaAtual, i) => {

      const respostas = [];
      for(letra in perguntaAtual.respostas){

        respostas.push(
          `<input
            type='radio' 
            name='pergunta_${i}' 
            value='${letra}' 
            class='resposta_${i} resultados' 
            id='resposta_${perguntaAtual.respostas[letra]}' 
            />
            <label class='rotulo' for='pergunta_${perguntaAtual.respostas[letra]}'>
              ${perguntaAtual.respostas[letra]}
              </label>`
        );
      }

      html.push(
        `<div class='slide'>
          <div class='texto container'>
            <span class='texto principal'>${perguntaAtual.perguntas}</span>
            <span class='icone texto'>▼</span>
          </div>
          <div class='respostas opcoes container'>
            ${respostas.join('')}
          </div>
        </div>`
      );
    }
  );
    // Calcula, valida e exibe os resultados do quiz na tela
    quiz.innerHTML = html.join("")
}

const calcularResultados = () => {
  const containersDeCadaResposta = quiz.querySelectorAll('.respostas');
  let acertos = 0;

  data.forEach((perguntaAtual, numeroDaQuestao) => {
    
    const containerDasRespostas = containersDeCadaResposta[numeroDaQuestao];
    const seletor = `input[name='pergunta_${numeroDaQuestao}']:checked`;
    const respostaDoUsuario = (containerDasRespostas.querySelector(seletor) || {}).value;

    if(respostaDoUsuario === perguntaAtual.respostaCerta){
      acertos++
      addPonto()
    }else{
    }
    
  });
  // show number of correct answers out of total
  placarTaxa.innerHTML = `${acertos}/${quiz.length}`;
}

const mostrarSlide = (n) => {
  slides[slideAtual].classList.remove('slide-ativo');
  slides[n].classList.add('slide-ativo');
  slideAtual = n;

  if(slideAtual === 0){
    botaoVoltar.style.display = 'none';
  } else {
    botaoVoltar.style.display = 'inline-block'
    if (slideAtual === slides.length - 1) {
      botaoAvancar.style.display = 'none';
      submit.style.display = 'inline-block';
    } else {
      botaoAvancar.style.display = 'inline-block';
      submit.style.display = 'none';
    }
  }
}

const mostrarSlideSeguinte = () => {
  mostrarSlide(slideAtual+1);
}
const mostrarSlideAnterior = () => {
  mostrarSlide(slideAtual-1);
}

/* ~~~~~ Variáveis ~~~~~ */
let quizContainer = document.querySelector(".quiz.wrapper")
let quiz = document.querySelector(".quiz.interno");
let form = document.querySelector("form");
let textoPrincipal = document.querySelector(".texto.principal");
let resultados = document.querySelector(".placar.numero");
let placarTaxa = document.querySelector(".placar.taxa");


/* ~~~~~ Chamada das funções ~~~~~ */
criarQuiz()

//Paginação
const botaoVoltar = document.querySelector('.voltar');
const botaoAvancar = document.querySelector('.avancar');
let submit = document.querySelector("button.enviar");
const slides = document.querySelectorAll('.slide');
let slideAtual = 0;

mostrarSlide(slideAtual);

/* ~~~~~ Manipuladores de eventos pra chamar a função ~~~~~ */
botaoAvancar.addEventListener('click', mostrarSlideSeguinte);
botaoVoltar.addEventListener('click', mostrarSlideAnterior);
submit.addEventListener('click', calcularResultados);