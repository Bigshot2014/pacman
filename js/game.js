'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🥬'
const CHERRY = '🍒'

// Model
const gGame = {
    score: 0,
    isOn: false,
    isVictoy: false
}
var gBoard
var gFood
var gCherryInterval

function onInit() {
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    createSuperFood(gBoard)
    renderBoard(gBoard)
    renderSuperFood(gBoard)
    gGame.isOn = true
    hidePopup()

}
gCherryInterval = setInterval(addCherry, 15000)



function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL

                ///super good 
                if (
                    (i === 1 && j === 1) ||
                    (i === 1 && j === 8) ||
                    (i === 8 && j === 1) ||
                    (i === 8 && j === 8)
                ) {
                    board[i][j] = SUPERFOOD
                }
            }


        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML

    
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    const msg = gGame.isVictoy ? 'Winner!' :  'Game Over'
    showPopup()
    
}

function showPopup() {
    const elPopup = document.querySelector('.popup')
    elPopup.hidden = false
    // console.log('restart')
}

function hidePopup() {
    const elPopup = document.querySelector('.popup')
    elPopup.hidden = true
}


function renderSuperFood() {
    for (var i = 0; i < gSuperFood.length; i++) {
        var superFood = gSuperFood[i]
        // console.log(gSuperFood[i])
        renderCell(superFood, SUPERFOOD)
    }
}

function addCherry() {
    clearInterval
    const emptyCells = getEmptyCell(gBoard)
    if (!emptyCells) return

        gBoard[emptyCells.i][emptyCells.j] = CHERRY

        renderCell(emptyCells, CHERRY)
    }


function getEmptyCell(board) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    if (!emptyCells.length) return null
    const randIdx = getRandomIntInclusive(0, emptyCells.length -1)
    return emptyCells[randIdx]
}




var gSuperFood = []
function createSuperFood(board) {
    // 4 super foods
     gSuperFood = [
        { i: 1, j: 1 },
        { i: 1, j: 8 },
        { i: 8, j: 1 },
        { i: 8, j: 8 }
    ]
}
