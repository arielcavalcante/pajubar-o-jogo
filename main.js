/* ~~~~~ Funções ~~~~~ */
// Adiciona pontos ao placar

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
			for(alternativa in perguntaAtual.respostas){

				respostas.push(
				`<div>
					<input
					 	tabindex='3'
						type='radio' 
						name='pergunta_${i+1}' 
						value='${alternativa}' 
						class='resposta_${i+1} resultados' 
						id='resposta_${perguntaAtual.respostas[alternativa]}' 
						/>
						<label class='rotulo' for='resposta_${perguntaAtual.respostas[alternativa]}'>${perguntaAtual.respostas[alternativa]}</label>
					</div>`
				);
			}

			html.push(
				`<div class='slide'>
					<div class='pergunta'>
						<span>${perguntaAtual.perguntas}</span>
						<span class='icone--pergunta'>▼</span>
					</div>
					<div class='respostas'>
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
const todasAsOpcoes = quiz.querySelectorAll('.respostas');
const addPonto = () => {
	for(let i = 0; i < data[perguntaAtual.perguntas.length]; i++){
		resultados.innerText = i
	}
}

	data.forEach((perguntaAtual, numeroDaQuestao) => {
		
		const opcoesDaQuestao = todasAsOpcoes[numeroDaQuestao];

		const selecionada = `input[name='pergunta_${numeroDaQuestao}']:checked`;
		
		const respostaDoUsuario = (opcoesDaQuestao.querySelector(selecionada) || {}).value;

		if(respostaDoUsuario === perguntaAtual.respostaCerta){
			addPonto()
		}
		
	});
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
	mostrarSlide(slideAtual + 1);
}

const mostrarSlideAnterior = () => {
	mostrarSlide(slideAtual - 1);
}

/* ~~~~~ Variáveis ~~~~~ */
let quizContainer = document.querySelector(".quiz--wrapper")
let quiz = document.querySelector(".quiz--inject");
let slideAtivo = document.querySelector(".slide-ativo");
let textoPrincipal = document.querySelector(".pergunta span");
let resultados = document.querySelector(".placar .numero");
let placarTaxa = document.querySelector(".placar .taxa");


/* ~~~~~ Chamada das funções ~~~~~ */
criarQuiz()

//Paginação
const botaoVoltar = document.querySelector('.voltar');
const botaoAvancar = document.querySelector('.avancar');
let submit = document.querySelector(".enviar button");
const slides = document.querySelectorAll('.slide');
let slideAtual = 0;

mostrarSlide(slideAtual);

/* ~~~~~ Manipuladores de eventos pra chamar a função ~~~~~ */
botaoAvancar.addEventListener('click', () => {
	mostrarSlideSeguinte(),
	calcularResultados()
});
// botaoAvancar.addEventListener('click', calcularResultados);
botaoVoltar.addEventListener('click', mostrarSlideAnterior);