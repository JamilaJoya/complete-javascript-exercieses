/*
GAME CHALLENGE

1. Aplayer loses his ENTIRE ecores when he rolls two 6 in a row. after that its the next player turns
2. Add an input field to the HTML, where the players can set the winning scors, so the they can change the predefined score of 100. 
3. 
*/

var scores, roundScore, activePlayer, gamePlaying, finalScore
//finalScore = document.getElementById('final-score').value


init()
var lastDice

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1
        var dice2 = Math.floor(Math.random() * 6) + 1
        //2. Display the result


        document.querySelector('#dice-1').style.display = 'block'
        document.querySelector('#dice-2').style.display = 'block'
        document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png'
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png'

        //3. Update the round score if the rolled dice is NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2
            document.querySelector('#current-' + activePlayer).textContent = roundScore

        } else {
            // Next player
            nextPlayer()
        }
        /*
       if (dice === 6 && lastDice === 6) {
           //Player looses score
           scores[activePlayer] = 0;
           document.querySelector('#score-' + activePlayer).textContent = '0';
           nextPlayer();
       } else if (dice !== 1) {
           //Add score
           roundScore += dice;
           document.querySelector('#current-' + activePlayer).textContent = roundScore;
       } else {
           //Next player
           nextPlayer();
       }
       lastDice = dice;
       */
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBLE score
        scores[activePlayer] += roundScore

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        var input = document.querySelector('.final-score').value
        // Undefinded, 0, null, or "" is coerced to false
        // Anything else COERCED to true
        var winningScore
        if (input) {
            winningScore = input
        } else {
            winningScore = 100
        }
        // Check if player WIN the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('#dice-1').style.display = 'none'
            document.querySelector('#dice-2').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')

            gamePlaying = false

        } else {
            // Next player
            nextPlayer()
        }

    }

})

document.querySelector('.btn-new').addEventListener('click', init)

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0

    //document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('#dice-1').style.display = 'none'
    document.querySelector('#dice-2').style.display = 'none'

}

function init() {
    scores = [0, 0]
    roundScore = 0
    activePlayer = 0

    gamePlaying = true

    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.final-score').value = ''
    document.querySelector('#dice-1').style.display = 'none'
    document.querySelector('#dice-2').style.display = 'none'

}

