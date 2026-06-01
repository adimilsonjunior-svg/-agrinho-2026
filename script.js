const plantarBtn = document.getElementById("plantarBtn");
const novaSafraBtn = document.getElementById("novaSafraBtn");
const culturaSelect = document.getElementById("cultura");
const mensagem = document.getElementById("mensagem");
const historico = document.getElementById("historico");
const contadorSafra = document.getElementById("contadorSafra");

const lotes = document.querySelectorAll(".lote");

let ultimaCultura = "";
let safra = 1;

plantarBtn.addEventListener("click", plantar);
novaSafraBtn.addEventListener("click", proximaSafra);

function plantar() {
    const culturaAtual = culturaSelect.value;

    lotes.forEach(function(lote){
        const texto = lote.querySelector("p");
        texto.textContent = culturaAtual;

        if(culturaAtual === ultimaCultura){
            lote.classList.remove("fertil");
            lote.classList.add("infertil");
            mensagem.textContent = "⚠ Solo degradado! A mesma cultura foi repetida.";
        } else {
            lote.classList.remove("infertil");
            lote.classList.add("fertil");
            mensagem.textContent = "✅ Rotação correta! Solo saudável e produtivo.";
        }
    });

    ultimaCultura = culturaAtual;

    historico.innerHTML += `<li>Safra ${safra}: Plantada ${culturaAtual}</li>`;
}

function proximaSafra() {
    safra++;
    contadorSafra.textContent = `Safra: ${safra}`;
    ultimaCultura = ""; // permite nova rotação
    mensagem.textContent = "Nova safra iniciada! Escolha uma cultura.";
}