/*---------------------------------------------------------------------
            DISTRIBUIDOR DE TRABALHO - LÓGICA DE EQUIPES
-----------------------------------------------------------------------*/
function gerarEscalaAutomatica() {
    const inputImoveis = document.getElementById('listaImoveis').value;
    const totalAgentesInput = parseInt(document.getElementById('qtdAgentesAuto').value);

    if (!inputImoveis || !totalAgentesInput || totalAgentesInput <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    const imoveisPorQuart = inputImoveis.split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));

    const totalImoveis = imoveisPorQuart.reduce((a, b) => a + b, 0);
    const metaPorAgente = totalImoveis / totalAgentesInput;

    document.getElementById('res-total-q').innerText = imoveisPorQuart.length;
    document.getElementById('res-total-i').innerText = totalImoveis;
    document.getElementById('res-media-ideal').innerText = metaPorAgente.toFixed(1);
    document.getElementById('resultadoEscala').style.display = 'block';

    let distribuicao = [];
    let acumuloImoveisLote = 0; // <--- Verifique este nome exatamente
    let agentesAlocadosTotal = 0;
    let inicioLote = 1;

    imoveisPorQuart.forEach((qtd, index) => {
        const numQuartAtual = index + 1;
        acumuloImoveisLote += qtd; // <--- Linha 177 aproximada

        let agentesParaEsteLote = Math.round(acumuloImoveisLote / metaPorAgente);

        if (agentesParaEsteLote >= 1 && index < imoveisPorQuart.length - 1) {
            distribuicao.push({
                equipe: distribuicao.length + 1,
                textoQuart: inicioLote === numQuartAtual ? `Q${numQuartAtual}` : `Q${inicioLote} a Q${numQuartAtual}`,
                totalI: acumuloImoveisLote,
                agentes: agentesParaEsteLote,
                media: (acumuloImoveisLote / agentesParaEsteLote).toFixed(1)
            });

            agentesAlocadosTotal += agentesParaEsteLote;
            acumuloImoveisLote = 0;
            inicioLote = numQuartAtual + 1;
        }
    });

    const agentesRestantes = totalAgentesInput - agentesAlocadosTotal;
    const agentesFinais = agentesRestantes > 0 ? agentesRestantes : 1;

    distribuicao.push({
        equipe: distribuicao.length + 1,
        textoQuart: inicioLote === imoveisPorQuart.length ? `Q${inicioLote}` : `Q${inicioLote} a Q${imoveisPorQuart.length}`,
        totalI: acumuloImoveisLote,
        agentes: agentesFinais,
        media: (acumuloImoveisLote / agentesFinais).toFixed(1)
    });

    exibirResultadoAuto(distribuicao);
}

function exibirResultadoAuto(dados) {
    const corpo = document.getElementById('corpoResultadoAuto');

    // LIMPEZA DE SEGURANÇA
    corpo.innerHTML = "";

    dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>Equipe ${item.equipe}</td>
            <td>${item.textoQuart}</td>
            <td>${item.totalI}</td>
            <td><strong>${item.agentes}</strong></td>
            <td>${item.media}</td>
        `;
        corpo.appendChild(tr);
    });
}

function limparCalculadora() {
    // 1. Esconde a tabela de resultados
    document.getElementById('resultadoEscala').style.display = 'none';

    // 2. Limpa os campos de entrada (Inputs)
    document.getElementById('listaImoveis').value = "";
    document.getElementById('qtdAgentesAuto').value = "";

    // 3. Zera os textos do resumo estatístico
    document.getElementById('res-total-q').innerText = "0";
    document.getElementById('res-total-i').innerText = "0";
    document.getElementById('res-media-ideal').innerText = "0";

    // Opcional: foca no primeiro campo para o usuário começar de novo
    document.getElementById('listaImoveis').focus();
}

function gerarPDF() {
    // Seleciona o elemento que queremos transformar em PDF (nossa seção da tabela)
    const elemento = document.querySelector(".table-panel");

    // Configurações do PDF
    const opcoes = {
        margin: [10, 10, 10, 10], // Margens [topo, esquerda, baixo, direita]
        filename: 'Mutirao_Dengue_Cuiaba.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 }, // Aumenta a resolução para não ficar embaçado
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' } // 'landscape' deixa a folha deitada (melhor para tabelas largas)
    };

    // Executa o comando para gerar e baixar
    html2pdf().set(opcoes).from(elemento).save();
}

function mostrarPagina(idPagina) {
    // Esconde todas as seções
    const paginas = document.querySelectorAll('.view');
    paginas.forEach(p => p.style.display = 'none');

    // Mostra apenas a que clicamos
    document.getElementById('page-' + idPagina).style.display = 'block';
}

// Executa sempre que o software abre para carregar os dados salvos
document.addEventListener('DOMContentLoaded', carregarPEs);