var gameField = document.getElementById('field');
var squares = document.querySelectorAll('.square');
var newGame = document.getElementById('gamechoice');
var turn = document.getElementById('turn');
var nextStep = 0;
var permiss = false;
var player = 'x';
var pushNum = [];
var totalX = document.getElementById('X');
var total0 = document.getElementById('0');
var totalDraw = document.getElementById('draw');
score = {x: 0, '0': 0, draw: 0};
var winComb = [[0, 1, 2],
               [3, 4, 5],
               [6, 7, 8],
               [0, 3, 6],
               [1, 4, 7],
               [2, 5, 8],
               [0, 4, 8],
               [2, 4, 6]]

for (var i = 0; i < squares.length; i++) {
    makeGame(squares[i]);
}
newGame.addEventListener('click', restart);
//function disable(){
//    gameField.style.display = 'none';
//    
//}
function makeGame(square) {
    square.addEventListener('click', nextTurn);
    function nextTurn () {
        if(!permiss && !square.innerHTML){
            square.innerHTML = player;
            var num = this.getAttribute('data-id');
            pushNum[num] = player;
            nextStep++;
            if(whoWin()) {
                turn.innerHTML = 'Победили ' + player;
                score[player]++;
                nextStep = 0;
                permiss = true;
            } else {
                changePlayer();
            }
            if (nextStep >= 9) {
                score.draw++;
                nextStep = 0; 
                turn.innerHTML = 'Ничья';
            }
            total();
        }
        
    }
}
function whoWin(){
    for (var i = 0; i < winComb.length; i++) {
        var dataArr = winComb[i];
        if(pushNum[dataArr[0]] && pushNum[dataArr[0]] == pushNum[dataArr[1]] && pushNum[dataArr[1]] == pushNum[dataArr[2]]) {
            return true;
        }
    }
    return false;
}
function changePlayer(){
    if(player === 'x'){
        player = '0';
        turn.innerHTML = 'Ходят нолики';
    } else {
        player = 'x';
        turn.innerHTML = 'Ходят крестики';
    }
}



function clear() {
    for (var i = 0; i < squares.length; i++){
        squares[i].innerHTML = '';
    }
}
function restart() {
//    permiss = true;
    clear();
    changePlayer();
    pushNum = [];
    permiss = false;
}
function total() {
    totalX.innerHTML = score.x;
    total0.innerHTML = score['0'];
    totalDraw.innerHTML = score.draw;
}

