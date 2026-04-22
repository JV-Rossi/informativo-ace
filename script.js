document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {        
        direction: 'vertical',                     // Direção vertical para parecer "Stories/TikTok"
        noSwiping: true,                        // Ativa a verificação de áreas que não deslizam
        noSwipingClass: 'slider-wrapper',          // O nome da classe que contém seu slider
        mousewheel: true,                           // Permite usar a roda do mouse no PC       
        speed: 600,                             // Efeito de transição suave        
        resistanceRatio: 0.5,                    // Resistência na borda para não "escapar"
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

function atualizarDoseVisual() {
    const slider = document.getElementById('volumeSlider');
    const img = document.getElementById('imgDeposito');
    const txtVolume = document.getElementById('txtVolume');
    const txtDose = document.getElementById('txtDose');

    // Tabela de Dados (Passo: [Volume, Dose, Imagem])
    const niveis = {
        1: ["50L", "0,5", "deposito_50.png"],
        2: ["100L", "1,0", "deposito_50.png"],
        3: ["200L", "1,5", "deposito_250.png"],
        4: ["250L", "2,0", "deposito_250.png"],
        5: ["300L", "2,5", "deposito_500.png"],
        6: ["500L", "4,0", "deposito_500.png"],
        7: ["1000L", "8,0", "deposito_1000.png"]
    };

    const selecionado = niveis[slider.value];

    txtVolume.innerText = selecionado[0];
    txtDose.innerText = selecionado[1];
    img.src = selecionado[2];

    // Efeito de vibração leve ao mudar (Haptic Feedback)
    if (navigator.vibrate) navigator.vibrate(10);
}

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
