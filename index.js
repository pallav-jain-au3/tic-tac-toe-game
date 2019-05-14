var winningCombinations = [
  ["0", "4", "8"],
  ["6", "4", "2"],
  ["0", "3", "6"],
  ["2", "5", "8"],
  ["1", "4", "7"],
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"]
];
var totalEmptySquares = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let currentTurn = true;
var moves = 0;
var player1 = "X";
var player2 = "0";
var squares = $('.square');
var replay = $('button');
var player1Moves = [];
var player2Moves = [];
var isGameOver = false;
squares.on('click', checkForEmptySquares);

function checkForEmptySquares() {
  let indexOfSquareClicked = this.id;
  if (totalEmptySquares.includes(indexOfSquareClicked) && isGameOver == false) {
    var index = totalEmptySquares.indexOf(indexOfSquareClicked);
    if (index > -1) {
      totalEmptySquares.splice(index, 1);
      changeInnerHTML(indexOfSquareClicked);
    }
  }
  if (totalEmptySquares.length == 0) {
    $(".result").html("DRAW")
  }
}

function changeInnerHTML(indexOfSquareClicked) {
  if (currentTurn) {
    $("#" + indexOfSquareClicked).html(player1);
    player1Moves.push(...indexOfSquareClicked);
    moves++;
    if (moves >= 5) {
      checkForwin(player1Moves, currentTurn);
    }
  } else {
    $("#" + indexOfSquareClicked).html(player2);
    player2Moves.push(...indexOfSquareClicked);
    moves++;
    if (moves >= 5) {
      checkForwin(player2Moves, currentTurn);
    }
  }
  currentTurn = !currentTurn;
}

function checkForwin(currentPlayer, currentTurn) {
  let flag = 0;
  for (let i = 0; i < winningCombinations.length; i++) {
    for (let j = 0; j < currentPlayer.length; j++) {
      if (winningCombinations[i].includes(currentPlayer[j])) {
        flag++;
      }
      if (flag == 3) {

        playerwon(winningCombinations[i][0], winningCombinations[i][1], winningCombinations[i][2]);
      }
    }
    flag = 0;
  }
}

function playerwon(squareid1, squareid2, squareid3) {
  isGameOver = true;
  let square1 = "#" + squareid1;
  let square2 = "#" + squareid2;
  let square3 = "#" + squareid3;
  if (currentTurn) {
    $(square1).addClass('player1');
    $(square2).addClass('player1');
    $(square3).addClass('player1');
    $(".result").html("PLAYER-1 WINS")
  } else {
    $(square1).addClass('player2');
    $(square2).addClass('player2');
    $(square3).addClass('player2');
    $(".result").html("PLAYER-2 WINS")
  }

}
