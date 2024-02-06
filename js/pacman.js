'use strict'

var PACMAN = '👉🏻'

var gPacman 

var isSuper

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        }
        gameOver()
        return
    }

    else if (nextCell === FOOD) {
        updateScore(1)
        // handleFood()
    } else if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        handleSuperFood()
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }


    //if next cell Super Food

    PACMAN = gPacman.isSuper ? '🥷' : '👉🏻'
    
    if (nextCell === SUPERFOOD) {
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
        }, 5000)
    }
    
    
    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            gPacman.deg = -90
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = 0
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = 90
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = 180
            nextLocation.j--
            break;
    }
    return nextLocation
}

function getPacmanHTML(deg) {
    return `<div style ="transform: rotate(${deg}deg)">${PACMAN}</div`
}

function handleFood() {
    gGame.foodcount--
    updateScore(1)
    
}

function handleSuperFood() {
    gPacman.isSuper = true
    renderGhosts()
    setTimeout(() => {
        gPacman.isSuper = false
        reviveGhosts()
        renderGhosts()
    }, 5000)
}