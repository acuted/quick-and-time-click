let round = 0;
let squaresCount = 0;
let timer;
let countdownTime = 10;
const countdownDisplay = document.getElementById('countdown');
const levelDisplay = document.getElementById('levelDisplay');
const startButton = document.getElementById('startButton');

// Carregar nível salvo do localStorage
window.onload = () => {
    const savedLevel = localStorage.getItem('savedLevel');
    if (savedLevel) {
        round = parseInt(savedLevel);
        levelDisplay.textContent = `Level: ${round}`;
    }
};

// Iniciar o jogo
startButton.addEventListener('click', function() {
    this.disabled = true;
    round++; 
    squaresCount = round; 
    levelDisplay.textContent = `Level: ${round}`; 
    clearSquares();
    startCountdown(); 
    createSquares(squaresCount);
    localStorage.removeItem('savedLevel');
});

// Inicia a contagem regressiva
function startCountdown() {
    countdownTime = 10; // Reseta o tempo
    countdownDisplay.textContent = countdownTime; // Atualiza a exibição do tempo

    clearInterval(timer); // Limpa qualquer temporizador anterior
    timer = setInterval(function() {
        countdownTime--; // Decrementa o tempo
        countdownDisplay.textContent = countdownTime; // Atualiza a exibição do tempo
        
        if (countdownTime <= 0) {
            clearInterval(timer); // Para o temporizador
            clearSquares(); // Limpa os quadrados se o tempo acabar
            showLoseModal(); // Mostra o modal de perda
        }
    }, 1000);
}

// Cria os quadrados na tela
function createSquares(num) {
    const container = document.body;

    for (let i = 0; i < num; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        positionSquare(square); 
        square.addEventListener('click', handleSquareClick);
        container.appendChild(square);
    }
}

// Posiciona o quadrado aleatoriamente
function positionSquare(square) {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;
}

function handleSquareClick(event) {
    event.target.remove();
    squaresCount--; // Decrementa o contador de quadrados

    if (squaresCount === 0) {
        clearInterval(timer);
        startButton.disabled = false; // Habilita o botão "Iniciar"
        showWinModal(); // Se não houver mais quadrados, exibe o modal de vitória
    }
}

function showWinModal() {
    document.getElementById('winModal').style.display = 'block'; // Exibe o modal de vitória
}

function showLoseModal() {
    document.getElementById('loseModal').style.display = 'block'; // Exibe o modal de perda
}

document.getElementById('winCloseButton').addEventListener('click', function() {
    document.getElementById('winModal').style.display = 'none'; // Esconde o modal de vitória
    clearSquares(); // Limpa os quadrados
});

document.getElementById('loseCloseButton').addEventListener('click', function() {
    document.getElementById('loseModal').style.display = 'none'; // Esconde o modal de perda
    clearSquares(); // Limpa os quadrados
    round = 0; // Reseta o nível
    levelDisplay.textContent = `Level: ${round}`; // Atualiza o nível
    startButton.disabled = false; // Habilita o botão "Iniciar"
});

function clearSquares() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.remove()); // Remove todos os quadrados
}

document.getElementById('saveButton').addEventListener('click', function() {
    localStorage.setItem('savedLevel', round); // Salva o nível no localStorage
    alert('Nível salvo com sucesso!'); // Mensagem de confirmação
});

document.getElementById('infoButton').addEventListener('click', function() {
    document.getElementById('infoModal').style.display = 'block'; // Exibe o modal informativo
});

document.getElementById('infoCloseButton').addEventListener('click', function() {
    document.getElementById('infoModal').style.display = 'none'; // Esconde o modal informativo
});

window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Esconde o modal se o clique for fora
        }
    });
});
