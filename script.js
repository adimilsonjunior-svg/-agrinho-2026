/**
 * LÓGICA DO SIMULADOR DE ROTAÇÃO DE CULTURAS - CONCURSO AGRINHO
 */

// Estado interno do sistema
let safraAtual = 1;
const historicoLotes = {
    "lote-1": [],
    "lote-2": [],
    "lote-3": [],
    "lote-4": []
};

// Mapeamento de emojis visuais para enriquecer a experiência do usuário
const emojisCulturas = {
    'Soja': '🌱 Soja',
    'Milho': '🌽 Milho',
    'Pastagem': '🌾 Pastagem'
};

// Seleção de Elementos DOM
const selectCultura = document.getElementById('cultura-select');
const btnPlantarTodos = document.getElementById('btn-plantar-todos');
const btnProximaSafra = document.getElementById('btn-proxima-safra');
const safraValorElement = document.getElementById('safra-valor');
const statusTextoElement = document.getElementById('status-texto');

// Evento: Plantar em todos os lotes simultaneamente
btnPlantarTodos.addEventListener('click', () => {
    const culturaSelecionada = selectCultura.value;
    let houveMonocultura = false;

    // Percorre cada um dos 4 lotes cadastrados
    for (let i = 1; i <= 4; i++) {
        const idLote = `lote-${i}`;
        const listaHistorico = historicoLotes[idLote];
        
        // Adiciona a cultura atual ao histórico do respectivo lote
        listaHistorico.push(culturaSelecionada);

        // Atualiza a interface gráfica do cartão do lote
        const cardLote = document.getElementById(idLote);
        const displayCultura = cardLote.querySelector('.cultura-display');
        const badgeStatus = cardLote.querySelector('.status-badge');

        displayCultura.textContent = emojisCulturas[culturaSelecionada];

        // Validação de Sustentabilidade: Se plantou a mesma coisa duas safras seguidas
        if (listaHistorico.length >= 2 && listaHistorico[listaHistorico.length - 1] === listaHistorico[listaHistorico.length - 2]) {
            cardLote.style.borderColor = '#ff5252';
            badgeStatus.textContent = 'Exaurido';
            badgeStatus.className = 'status-badge status-exaurido';
            houveMonocultura = true;
        } else {
            cardLote.style.borderColor = '#00e676';
            badgeStatus.textContent = 'Fértil';
            badgeStatus.className = 'status-badge status-fertil';
        }
    }

    // Atualiza o quadro de relatório técnico baseado nas ações tomadas
    if (houveMonocultura) {
        statusTextoElement.innerHTML = `⚠️ <strong style="color:#ff5252">Aviso de Degradação:</strong> Você repetiu a cultura de <strong>${culturaSelecionada}</strong> de forma consecutiva. O solo começou a empobrecer devido à quebra de nutrientes e fixação biológica! Alterne as culturas na próxima safra para recuperar a fertilidade natural.`;
    } else {
        statusTextoElement.innerHTML = `✅ <strong style="color:#00e676">Manejo Sustentável Eficiente:</strong> A inserção de <strong>${culturaSelecionada}</strong> em rotação mantém o ecossistema equilibrado, reduz a incidência de pragas e otimiza a produtividade biológica da fazenda.`;
    }
});

// Evento: Avançar o contador cronológico de safras
btnProximaSafra.addEventListener('click', () => {
    safraAtual++;
    safraValorElement.textContent = safraAtual;
    
    // Limpa os displays visuais para simular o novo ciclo de preparação da terra
    for (let i = 1; i <= 4; i++) {
        const cardLote = document.getElementById(`lote-${i}`);
        cardLote.querySelector('.cultura-display').textContent = 'Preparado';
    }
    
    statusTextoElement.textContent = `Safra ${safraAtual} iniciada. Escolha a próxima cultura para dar continuidade ao plano de manejo sustentável.`;
});