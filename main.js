/* ~~~~~ Funções ~~~~~ */
const escreveTexto = () => {
  for(let i=0; i < conteudo.length; i++){
    textoPrincipal.innerText = conteudo[i]
  }
}

// Adiciona pontos ao placar
const addPonto = () => {
  for(let i = 0; i < perguntas.length; i++){
    resultados.innerText = i
  }
}

// Mostra as opções se o texto for uma pergunta
const esconder = () => form.classList.add("invisivel");

const mostrar = () => form.classList.toggle("invisivel");

const ehUmaPergunta = () => textoPrincipal.innerHTML.indexOf('?') != -1 ? mostrar(): esconder()

// Loopa os dados e insere no html alterando o DOM só 1 vez
const criarQuiz = () => {
  // variable to store the HTML output
  const html = [];
  // for each question...
  data.forEach(
    (perguntaAtual, i) => {

      // variable to store the list of possible answers
      const respostas = [];

      // and for each available answer...
      for(letra in perguntaAtual.respostas){

        // ...add an HTML radio button
        respostas.push(
          `<input
            id='pergunta_${i}' 
            type='radio' 
            name='pergunta_${i}' 
            value='${letra}' 
            class='resposta_${i} resultados' 
          />
          <label class='rotulo' for='pergunta_${i}'>
            ${letra}:
            ${perguntaAtual.respostas[letra]}
            </label>`
        );
      }
      // add this question and its answers to the output
      html.push(
        `<div class='slide'
          <div class='texto container'>
            ${perguntaAtual.perguntas}
            <span class='icone texto'>▼</span>
          </div>
            <div class='respostas opcoes container'>${respostas.join('')}</div>
          </div>
        `
      );
    }
  );
    // Calcula, valida e exibe os resultados do quiz na tela
    quiz.innerHTML = html.join("")
}
const calcularResultados = () => {
  // gather answer containers from our quiz
  const containersDeCadaResposta = quiz.querySelectorAll('.respostas');

  // keep track of user's answers
  let acertos = 0;

  // for each question...
  quiz.forEach((perguntaAtual, numeroDaQuestao) => {
    
    // find selected answer
    const containerDeTodasAsRespostas = containersDeCadaResposta[numeroDaQuestao];
    const seletor = `input[name=pergunta_${numeroDaQuestao}]:checked`;
    const respostaDoUsuario = (containerDeTodasAsRespostas.querySelector(seletor) || {}).value;

    // if answer is correct
    if(respostaDoUsuario === perguntaAtual.respostaCerta){
      // add to the number of correct answers
      acertos++
      // color the answers green
      // containersDeCadaResposta.style.color = '#BDC581';
      // if answer is wrong or blank
    } else {
      // color the answers red
      // containersDeCadaResposta.style.color = '#FD7272';
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
      botaoEnviar.style.display = 'inline-block';
    } else {
      botaoAvancar.style.display = 'inline-block';
      botaoEnviar.style.display = 'none';
    }
  }
}


/* ~~~~~ Variáveis ~~~~~ */
let quizContainer = document.querySelector(".quiz.wrapper")
let quiz = document.querySelector(".quiz.interno");
let form = document.querySelector("form");
let textoPrincipal = document.querySelector(".texto.principal");
let resultados = document.querySelector(".placar.numero");
let input = document.querySelector("input.opcoes");
let placarTaxa = document.querySelector(".placar.taxa");

let submit = document.querySelector("input.hack");


/* ~~~~~ Chamada das funções ~~~~~ */
criarQuiz()
ehUmaPergunta()

//Paginação
const botaoVoltar = document.querySelector('.voltar');
const botaoAvancar = document.querySelector('.avancar');
const slides = document.querySelector('.slide');
let slideAtual = 0;

mostrarSlide(slideAtual);
calcularResultados()
/* ~~~~~ Manipuladores de eventos pra chamar a função ~~~~~ */
// submit.addEventListener('click', calcularResultado);