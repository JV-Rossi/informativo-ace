document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
        // Direção vertical para parecer "Stories/TikTok"
        direction: 'vertical',
        // Permite usar a roda do mouse no PC
        mousewheel: true,
        // Efeito de transição suave
        speed: 600,
        // Resistência na borda para não "escapar"
        resistanceRatio: 0.5,
        // Feedback visual
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
    });

    // Pequeno feedback tátil (vibration) se for mobile ao trocar de slide
    swiper.on('slideChange', () => {
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
});

function calcularDose() {
    const volumeInput = document.getElementById('volumeInput');
    const doseSpan = document.getElementById('doseResult');
    let volume = parseFloat(volumeInput.value);

    // 1. Lógica de Teto (Conforme página 10 do Boletim) 
    if (volume > 1000) {
        alert("Atenção: Volume máximo permitido 1000L.");
        volume = 1000;
        volumeInput.value = 1000;
    }

    // 2. Cálculo por Degraus (Tabela Técnica UVZ) 
    if (volume > 0) {
        let dose = 0;
        if (volume <= 50) dose = 0.5;
        else if (volume <= 100) dose = 1.0;
        else if (volume <= 200) dose = 1.5;
        else if (volume <= 250) dose = 2.0;
        else if (volume <= 300) dose = 2.5;
        else if (volume <= 500) dose = 4.0;
        else if (volume <= 1000) dose = 8.0;

        doseSpan.innerText = dose.toFixed(1).replace('.', ',');
    } else {
        doseSpan.innerText = "0";
    }
}

// 3. Função para baixar o teclado ao apertar "Enter/Enviar"
document.getElementById('volumeInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        this.blur(); // Tira o foco do campo e recolhe o teclado
        calcularDose(); // Garante o cálculo final
    }
});

document.getElementById('volumeInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        this.blur();
        // Força o Swiper a recalcular o tamanho da tela após o teclado sumir
        setTimeout(() => {
            window.scrollTo(0, 0);
            swiper.update();
        }, 100);
    }
});
