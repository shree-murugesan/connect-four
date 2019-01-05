/** DEFINING SOME VARIABLES TO BE USED **/
var board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

var config = {
    startPlayer: "red",
    invalidMove: "This move is invalid, please choose another position",
    gameDraw: "This game is a draw!",
    winnerDisp: "The winner of this game is: ",
    winAmount: 3,
};

var currentPlayer = config.startPlayer;



/** FUNCTIONS **/
function isPlaceTaken(x_pos, y_pos) {
    if (board[x_pos][y_pos] === 0) {
        return false;
    } else {
        return true;
    }
}


function addToBoard(x_pos, y_pos, colour) {
    board[x_pos][y_pos] = colour;
}


function switchPlayer() {
    if (currentPlayer === "red") {
        currentPlayer = "yellow";
    } else {
        currentPlayer = "red";
    }
}


function horizontalWin() {
    var counter = 0;
    
    for (var x = 0; x < 6; x++) {
        counter = 0;
        for (var y = 0; y < 6; y++) {
            if (board[x][y] != 0 && board[x][y] === board[x][y+1]) {
                counter += 1;
            } else {
                counter = 0;
            }
            
            if (counter === config.winAmount) {
                return true;
            }
        }
    }
    
    return false;
}


function verticalWin() {
    var counter = 0;
    
    for (var y = 0; y < 7; y++) {
        counter = 0;
        for (var x = 0; x < 5; x++) {
            if (board[x][y] != 0 && board[x][y] === board[x+1][y]) {
                counter += 1;
            } else {
                counter = 0;
            }
            
            if (counter === config.winAmount) {
                return true;
            }
        }
    }
    
    return false;
}


function diagonalWin() {
    var counter = 0;
    
    //Checking a win down-right from the top
    for (var y = 0; y < 7; y++) {
        var x = 0;
        counter = 0;
        var y_temp = y;
        
        while (x < 5  && y_temp < 6) {
            if (board[x][y_temp] != 0 && board[x][y_temp] === board[x+1][y_temp+1]) {
                counter += 1;
            } else {
                counter = 0;
            }
            
            if (counter === config.winAmount) {
                return true;
            }
            
            x++;
            y_temp++;
        }
    }
    
    //Checking a win down-left from the top
    for (var y = 6; y >= 0; y--) {
        var x = 0;
        counter = 0;
        var y_temp = y;
        
        while (x < 5 && y_temp > 0) {
            if (board[x][y_temp] != 0 && board[x][y_temp] === board[x+1][y_temp-1]) {
                counter += 1;
            } else {
                counter = 0;
            }
            
            if (counter === config.winAmount) {
                return true;
            }
            
            x++;
            y_temp--;
        }
    }
    
    //Checking a win down-right from the left side
    for (var x = 1; x < 6; x++) {
        var y = 0;
        counter = 0;
        var x_temp = x;
        
        while (x_temp < 5  && y < 6) {
            if (board[x_temp][y] != 0 && board[x_temp][y] === board[x_temp+1][y+1]) {
                counter += 1;
            } else {
                counter = 0;
            }
            
            if (counter === config.winAmount) {
                return true;
            }
            
            x_temp++;
            y++;
        }
    }
    
    //Checking a win down-left from the right side
    for (var x = 0; x < 6; x++) {
        var y = 6;
        counter = 0;
        var x_temp = x;
        
        while (x_temp < 5 && y > 0) {
            if (board[x_temp][y] != 0 && board[x_temp][y] === board[x_temp+1][y-1]) {
                counter += 1;
            } else {
                counter = 0;
            }
            
            if (counter === config.winAmount) {
                return true;
            }
            
            x_temp++;
            y--;
        }
    }
    
    return false;
}


function dropToBottom(x_pos, y_pos) {
    var x_temp = x_pos;
    for (var x = x_pos+1; x < 6; x++) {
        if (board[x][y_pos] === 0) {
            x_temp = x;
        }
    }
    return x_temp;
}


function displayBoard() {
    for (var x = 0; x < 6; x++) {
        for (var y = 0; y < 7; y++) {
            if (board[x][y] != 0) {
                $('#game-board tr').eq(x).find('td').eq(y).children('button').addClass(board[x][y]);
            }
        }
    }
}

function gamePlay() {
    $('#game-board button').click(function(e) {
        var x_pos = $(this).closest("tr").index();
        var y_pos = $(this).closest("td").index();
        x_pos = dropToBottom(x_pos, y_pos);

        if (isPlaceTaken(x_pos, y_pos)) {
            alert(config.invalidMove);
        } else {
            addToBoard(x_pos, y_pos, currentPlayer);
            displayBoard();

            if (verticalWin() || horizontalWin() || diagonalWin()) {
                if (currentPlayer === "yellow") {
                    $('.winner-message').addClass('player');
                    $('.winner-message').html(config.winnerDisp + "Player 2");
                    $('.winner-message').css('display', 'block');
                    var playerTwoScore =  parseInt($('.player-two-score').html()) + 1;
                    $('.player-two-score').html(playerTwoScore);
                } else {
                    $('.winner-message').addClass('player');
                    $('.winner-message').html(config.winnerDisp + "Player 1");
                    $('.winner-message').css('display', 'block');
                    var playerOneScore =  parseInt($('.player-one-score').html()) + 1;
                    $('.player-one-score').html(playerOneScore);
                }
                console.log($('.winner-message').html());
                $('#game-board button').unbind('click');
                $('.play-again').css('display', 'block');
                return;  
            }

            switchPlayer();  
        }
        });
}


/** ACTUAL GAMEPLAY **/
$(document).ready(function() {

    gamePlay();
    
    $('.play-again').click(function(e) {
        board = [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]];
        currentPlayer = config.startPlayer;
        $('.play-again').css('display', 'none');
        $('#game-board button').removeClass();
        $('.winner-message').removeClass('player');
        $('.winner-message').css('display', 'none');
        $('.winner-message').html(config.winnerDisp);
        gamePlay();
    });

    
});