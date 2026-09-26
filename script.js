
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#restartBtn');
const btnAI = document.querySelector('#btnAI');
const btnFriend = document.querySelector('#btnFriend');
const scoreXEl = document.querySelector('#scoreX');
const scoreDrawEl = document.querySelector('#scoreDraw')
const scoreOEl = document.querySelector('#scoreO')
const playerOTitle = document.querySelector('#playerOTitle')

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "ai";
let scoreX = 0;
let scoreDraw = 0;
let scoreO = 0;


const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function handleCellClick(cell, index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkResult();

    if (gameActive && gameMode === 'ai' && currentPlayer === 'O') {
        setTimeout(makeAIMove, 300);
    }
}


function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") continue;

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent =` Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        if(currentPlayer==="X"){
            scoreX++;
            scoreXEl.textContent = scoreX;

        }
        else{
            scoreO++;
            scoreOEl.textContent = scoreO;
        }
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        scoreDraw++;
        scoreDrawEl.textContent =scoreDraw;
        return;
    }

    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Your turn — ${currentPlayer}`;
}


function makeAIMove() {
    if (!gameActive) return;

    
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] === 'O' && board[b] === 'O' && board[c] === "") return applyAIMove(c);
        if (board[a] === 'O' && board[c] === 'O' && board[b] === "") return applyAIMove(b);
        if (board[b] === 'O' && board[c] === 'O' && board[a] === "") return applyAIMove(a);
    }

   
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] === 'X' && board[b] === 'X' && board[c] === "") return applyAIMove(c);
        if (board[a] === 'X' && board[c] === 'X' && board[b] === "") return applyAIMove(b);
        if (board[b] === 'X' && board[c] === 'X' && board[a] === "") return applyAIMove(a);
    }


    if (board[4] === "") return applyAIMove(4);

  
    const availableMoves = [];
    board.forEach((val, index) => {
        if (val === "") availableMoves.push(index);
    });

    if (availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        applyAIMove(availableMoves[randomIndex]);
    }
}


function applyAIMove(index) {
    board[index] = "O";
    cells[index].textContent = "O";
    cells[index].classList.add('o');
    checkResult();
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });

    statusText.textContent = `Your turn — ${currentPlayer}`;
}
function resetScores() {
    scoreX =0;
    scoreDraw = 0;
    scoreO = 0;

    scoreXEl.textContent = "0";
    scoreDrawEl.textContent = "0";
    scoreOEl.textContent = "0";
}

function setGameMode(mode) {
    gameMode = mode;
    btnAI.classList.toggle('active', mode === 'ai');
    btnFriend.classList.toggle('active', mode === 'friend');
    if(mode ==='ai'){
        playerOTitle.textContent = "AI (O)";

    }
    else{
        playerOTitle.textContent = "Friend (O)"
    }
    resetScores();
    restartGame();
}


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

restartBtn.addEventListener('click', restartGame);
btnAI.addEventListener('click', () => setGameMode('ai'));
btnFriend.addEventListener('click', () => setGameMode('friend'));