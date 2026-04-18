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
    
    // 1. Validação do Teto de 1000L
    if (volume > 1000) {
        alert("Atenção: Volume máximo para esta dosagem é 1000L. Para volumes maiores, consulte a supervisão.");
        volumeInput.value = 1000; // Trava o input em 1000
        volume = 1000;
    }

    // 2. Lógica baseada na tabela técnica da UVZ (Página 10 do PDF)
    if (volume > 0) {
        let dose = 0;
        
        // Seguindo os degraus exatos do seu boletim:
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