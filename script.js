/**
 * ECO-ROTAÇÃO: SISTEMA DE MANEJO SUSTENTÁVEL
 * Lógica criada para demonstrar o equilíbrio entre produção e proteção ao solo.
 */

// Estado da Aplicação (Memória dos quadrantes)
const estadoFazenda = [
    { id: 0, historico: [], esgotado: false },
    { id: 1, historico: [], esgotado: false },
    { id: 2, historico: [], esgotado: false },
    { id: 3, historico: [], esgotado: false }
];

// Elementos capturados do DOM para manipulação
const selectQuadrante = document.getElementById('quadrante-select');
const botoesPlantio = document.querySelectorAll('.btn-plantar');
const btnResetar = document.getElementById('btn-resetar');
const painelFeedback = document.getElementById('feedback-painel');
const feedbackTitulo = document.getElementById('feedback-titulo');
const feedbackTexto = document.getElementById('feedback-texto');

// Inicializa os ouvintes de eventos de clique nos botões de plantio
botoesPlantio.forEach(botao => {
    botao.addEventListener('click', () => {
        const culturaSelecionada = botao.getAttribute('data-cultura');
        const indexQuadrante = parseInt(selectQuadrante.value);
        processarPlantio(indexQuadrante, culturaSelecionada);
    });
});

// Ouvinte do Botão de Reinicialização
btnResetar.addEventListener('click', resetarFazenda);

/**
 * Executa a lógica de plantio e verifica a sustentabilidade do manejo
 * @param {number} idx - Índice do quadrante selecionado
 * @param {string} cultura - Nome da planta escolhida (Soja, Milho, Pastagem)
 */
function processarPlantio(idx, cultura) {
    const q = estadoFazenda[idx];
    
    // Adiciona a cultura ao histórico do talhão
    q.historico.push(cultura);
    
    // Mantém no máximo os 3 últimos registros para análise de rotação
    if (q.historico.length > 3) {
        q.historico.shift();
    }

    const talthaoElement = document.getElementById(`quad-${idx}`);
    const culturaTxt = talthaoElement.querySelector('.cultura-atual');
    const historicoTxt = talthaoElement.querySelector('.historico');
    const badgeStatus = talthaoElement.querySelector('.badge');

    // Atualiza elementos textuais básicos do DOM
    culturaTxt.textContent = `Cultivando: ${cultura}`;
    historicoTxt.textContent = `Histórico: ${q.historico.join(' → ')}`;

    // Regra Algorítmica: Verifica se houve repetição prejudicial da mesma cultura consecutiva
    if (q.historico.length >= 2 && q.historico[q.historico.length - 1] === q.historico[q.historico.length - 2]) {
        // Monocultura detectada: Esgota o solo
        q.esgotado = true;
        talthaoElement.className = "quadrante exaurido";
        badgeStatus.className = "badge solo-esgotado";
        badgeStatus.textContent = "Infértil";
        
        dispararFeedback(
            "Alerta de Monocultura!", 
            `O Talhão foi desgastado devido ao plantio repetido de ${cultura}. Romper o equilíbrio biológico reduz nutrientes e prejudica o meio ambiente!`, 
            "perigo"
        );
    } else {
        // Manejo sustentável: Solo saudável ou recuperado
        q.esgotado = false;
        talthaoElement.className = "quadrante fertil";
        badgeStatus.className = "badge solo-fertil";
        badgeStatus.textContent = "Fértil";

        dispararFeedback(
            "Manejo Sustentável com Sucesso!", 
            `Excelente escolha! A rotação com ${cultura} permitiu que microrganismos trabalhassem, mantendo o solo produtivo e forte para o futuro.`, 
            "sucesso"
        );
    }
}

/**
 * Gerencia a exibição e estilização do painel de feedbacks dinâmicos
 */
function dispararFeedback(titulo, texto, tipo) {
    painelFeedback.className = tipo === "sucesso" ? "feedback-sucesso" : "feedback-perigo";
    feedbackTitulo.textContent = titulo;
    feedbackTexto.textContent = texto;
}

/**
 * Reseta o estado completo do simulador de volta aos padrões originais
 */
function resetarFazenda() {
    estadoFazenda.forEach((q, idx) => {
        q.historico = [];
        q.esgotado = false;
        
        const talthaoElement = document.getElementById(`quad-${idx}`);
        talthaoElement.className = "quadrante fertil";
        talthaoElement.querySelector('.cultura-atual').textContent = "Vazio";
        talthaoElement.querySelector('.historico').textContent = "Histórico: Nenhum";
        
        const badge = talthaoElement.querySelector('.badge');
        badge.className = "badge solo-fertil";
        badge.textContent = "Fértil";
    });

    painelFeedback.className = "feedback-escondido";
    console.log("Simulador limpo com sucesso. Nenhuns erros detectados.");
}