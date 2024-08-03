// document.addEventListener('DOMContentLoaded', function() {
//     const submitBtn = document.getElementById('submitBtn');
//     const resultDiv = document.getElementById('result');
//     const qrcodeImg = document.getElementById('qrcode');

//     // Função para verificar se todas as respostas estão corretas
//     function verificarRespostas() {
//         // Respostas corretas
//         const respostasCorretas = {
//             q1: 'A', // Azul
//             q2: 'A', // Paris
//             q3: 'C'  // Júpiter
//         };

//         // Verifica se todas as perguntas foram respondidas corretamente
//         for (let pergunta in respostasCorretas) {
//             const respostaSelecionada = document.querySelector(`input[name="${pergunta}"]:checked`);
//             if (!respostaSelecionada || respostaSelecionada.value !== respostasCorretas[pergunta]) {
//                 return false;
//             }
//         }

//         return true;
//     }

//     // Função chamada ao clicar no botão de enviar
//     submitBtn.addEventListener('click', function() {
//         if (verificarRespostas()) {
//             resultDiv.style.display = 'block'; // Mostra o QR Code
//             resultDiv.classList.add('fade-in'); // Adiciona efeito visual de fade-in
//         } else {
//             alert('Alguma resposta está incorreta. Verifique suas respostas e tente novamente.');
//         }
//     });
// });


document.getElementById('submitBtn').addEventListener('click', verificarRespostas);

function verificarRespostas() {
    const respostasCorretas = {
        q1: 'A',
        q2: 'A',
        q3: 'C'
    };

    let corretas = 0;
    const form = document.querySelectorAll('.question');

    form.forEach((question, index) => {
        const qName = `q${index + 1}`;
        const selected = document.querySelector(`input[name="${qName}"]:checked`);
        if (selected) {
            if (selected.value === respostasCorretas[qName]) {
                corretas++;
                question.style.backgroundColor = '#d4edda'; // Verde claro para correta
            } else {
                question.style.backgroundColor = '#f8d7da'; // Vermelho claro para errada
            }
        } else {
            question.style.backgroundColor = '#f8d7da'; // Vermelho claro se não respondida
        }
    });

    const result = document.getElementById('result');

    if (corretas === 3) {
        result.style.display = 'block';
    } else {
        result.style.display = 'none';
    }

    console.log(`Número de respostas corretas: ${corretas}`);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Página carregada e script.js vinculado corretamente.");
});
