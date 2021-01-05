/* ~~~~~ Funções ~~~~~ */
// Adiciona pontos ao placar

// Mostra as opções se o texto for uma pergunta (desnecessário pra apresentação de hoje)
/* 
const esconder = () => form.classList.add("invisivel");

const mostrar = () => form.classList.toggle("invisivel");

const ehUmaPergunta = () => textoPrincipal.innerHTML.indexOf('?') != -1 ? mostrar() : esconder();
*/

// Loopa os dados e insere no html alterando o DOM só 1 vez
function criarQuiz() {
	const nodeArray = [];
	data.forEach((perguntaAtual, i) => {
		const respostas = [];
		for (alternativa in perguntaAtual.respostas) {
			respostas.push(
				`<div>
					<input
					 	tabindex='3'
						type='radio' 
						name='pergunta_${i}' 
						value='${alternativa}' 
						class='resposta_${i} resultados' 
						id='resposta_${perguntaAtual.respostas[alternativa]}'/>
						<label class='rotulo' for='resposta_${perguntaAtual.respostas[alternativa]}'>${perguntaAtual.respostas[alternativa]}</label>
					</div>`
			);
		}

		nodeArray.push(
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
	});
	// Calcula, valida e exibe os resultados do quiz na tela
	quiz.innerHTML = nodeArray.join('');
}

function calcularResultados() {
	const todasAsOpcoes = quiz.querySelectorAll('.respostas');
	let pontos = 0;

	data.forEach((perguntaAtual, numeroDaQuestao) => {
		const opcoesDaQuestao = todasAsOpcoes[numeroDaQuestao];
		const selecionada = `input[name=pergunta_${numeroDaQuestao}]:checked`;

		const respostaDoUsuario = (opcoesDaQuestao.querySelector(selecionada) || {})
			.value;

		if (respostaDoUsuario === perguntaAtual.respostaCerta) {
			pontos += 1;
			pontuacao.innerText = pontos;
		}
	});
	return pontos;
}

function enviarResultados() {
	const slideArray = [];

	results.forEach((resultadoAtual, i) => {
		slideArray.push(`
		<div class='slide slide_resultado'>
		<div class=porcentagem_${i * 20}>
		<img src=${resultadoAtual.image} alt="${resultadoAtual.alt}" title="${
			resultadoAtual.alt
		}">
		<span>${resultadoAtual.title}</span>
		</div>
		</div>
		`);
	});
	quizContainer.innerHTML = slideArray.join('');
	mostrarResultado();
}

function mostrarResultado() {
	const resultado = Number(pontuacao.innerText);
	const zero = document.querySelector('.porcentagem_0');
	const um = document.querySelector('.porcentagem_20');
	const dois = document.querySelector('.porcentagem_40');
	const tres = document.querySelector('.porcentagem_60');
	const quatro = document.querySelector('.porcentagem_80');
	const cinco = document.querySelector('.porcentagem_100');

	const removedor = [
		um.classList.remove('slide-ativo'),
		dois.classList.remove('slide-ativo'),
		tres.classList.remove('slide-ativo'),
		quatro.classList.remove('slide-ativo'),
		cinco.classList.remove('slide-ativo'),
		(submit.style.display = 'none'),
		(botaoVoltar.style.display = 'none'),
		(botaoAvancar.style.display = 'none'),
	];
	// slide_resultado.classList.remove('slide-ativo');

	switch (resultado) {
		case 0:
			zero.parentElement.classList.add('slide-ativo');
			removedor.join(';');
			break;
		case 1:
			um.parentElement.classList.add('slide-ativo');
			removedor.join(';');
			break;
		case 2:
			dois.parentElement.classList.add('slide-ativo');
			removedor.join(';');
			break;
		case 3:
			tres.parentElement.classList.add('slide-ativo');
			removedor.join(';');
			break;
		case 4:
			quatro.parentElement.classList.add('slide-ativo');
			removedor.join(';');
			break;
		case 5:
			cinco.parentElement.classList.add('slide-ativo');
			removedor.join(';');
			break;
		default:
	}
}
function mostrarSlide(n) {
	slides[slideAtual].classList.remove('slide-ativo');
	slides[n].classList.add('slide-ativo');
	slideAtual = n;

	if (slideAtual === 0) {
		botaoVoltar.style.display = 'none';
	} else {
		botaoVoltar.style.display = 'inline-block';
		if (slideAtual === slides.length - 1) {
			botaoAvancar.style.display = 'none';
			submit.style.display = 'flex';
		} else {
			botaoAvancar.style.display = 'inline-block';
			submit.style.display = 'none';
		}
	}
}

const mostrarSlideSeguinte = () => mostrarSlide(slideAtual + 1);

const mostrarSlideAnterior = () => mostrarSlide(slideAtual - 1);

/* ~~~~~ Variáveis ~~~~~ */
let quizContainer = document.querySelector('.quiz--wrapper');
let quiz = document.querySelector('.quiz--inject');
let slideAtivo = document.querySelector('.slide-ativo');
let textoPrincipal = document.querySelector('.pergunta span');
let pontuacao = document.querySelector('.numero');
let placarTaxa = document.querySelector('.placar .taxa');

/* ~~~~~ Chamada das funções ~~~~~ */
criarQuiz();

//Paginação
const botaoVoltar = document.querySelector('.voltar');
const botaoAvancar = document.querySelector('.avancar');
let submit = document.querySelector('.enviar button');
const slides = document.querySelectorAll('.slide');
let slideAtual = 0;

mostrarSlide(slideAtual);

/* ~~~~~ Manipuladores de eventos pra chamar a função ~~~~~ */
botaoAvancar.addEventListener('click', () => {
	calcularResultados(), mostrarSlideSeguinte();
});
botaoVoltar.addEventListener('click', mostrarSlideAnterior);
submit.addEventListener('click', enviarResultados);
