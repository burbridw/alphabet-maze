let greenCount = 0
let isgreen = 0
let answer = []
let gotOne = false
let lower = false
let answerSeen = false
let stepPath = []
let takingFirstStep = 0
let refreshCount = 0
let looping = 0
let gameWonDisplay = 0
let hintCount = 0

const firstCol = [0,15,30,45,60,75,90,105,120,135]
const lastCol = [14,29,44,59,74,89,104,119,134,149]
const topRow = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
const bottomRow = [135,136,137,138,139,140,141,142,143,144,145,146,147,148,149]
const moves = [1,-15,15]

const gameGrid = document.querySelector(".game-grid")
const gameCover = document.querySelector(".game-grid-cover")

const mainMenuBtn = document.querySelectorAll(".main-menu-button")
const startBtn = document.querySelector(".start-button")
const bigSmallBtn = document.querySelector(".big-small")
const newGameBtn = document.querySelector(".new-game")
const showAnswerBtn = document.querySelector(".show-answer")

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x","y", "z"]
const lines =   [
    [0, 1, 16, 31, 32, 33, 34, 19, 20, 21, 22, 37, 52, 53, 68, 83, 84, 85, 70, 55, 56, 57, 72, 87, 88, 89],
    [0, 1, 2, 3, 18, 33, 48, 47, 62, 63, 64, 65, 50, 51, 52, 67, 82, 97, 98, 99, 114, 115, 116, 117, 118, 119],
    [90, 75, 76, 91, 92, 77, 78, 79, 80, 95, 110, 111, 96, 97, 82, 83, 84, 69, 70, 71, 72, 87, 102, 103, 104, 89],
    [120, 105, 90, 75, 76, 77, 78, 63, 64, 79, 94, 95, 96, 97, 82, 83, 84, 85, 100, 101, 86, 71, 72, 73, 74, 89],
    [90, 91, 76, 61, 46, 31, 16, 17, 18, 3, 4, 5, 6, 21, 36, 37, 38, 39, 24, 25, 40, 41, 42, 43, 58, 59],
    [120, 105, 90, 91, 92, 77, 78, 93, 108, 123, 138, 139, 140, 141, 142, 143, 128, 129, 144, 145, 130, 131, 146, 147, 148, 149],
    [15, 0, 1, 2, 3, 4, 5, 20, 21, 22, 23, 8, 9, 24, 39, 54, 55, 40, 41, 56, 57, 42, 43, 58, 73, 74],
    [120, 105, 106, 107, 122, 123, 124, 109, 110, 111, 126, 141, 142, 127, 128, 129, 130, 115, 116, 131, 132, 117, 118, 119, 134, 149],
    [90, 91, 92, 93, 78, 79, 64, 65, 50, 51, 36, 37, 38, 39, 54, 69, 70, 85, 86, 71, 72, 87, 88, 103, 104, 89],
    [75, 90, 91, 92, 107, 108, 93, 94, 109, 124, 139, 140, 141, 142, 127, 128, 113, 114, 115, 116, 117, 118, 119, 104, 89, 74],
    [120, 121, 106, 107, 122, 123, 124, 125, 126, 111, 96, 97, 112, 113, 114, 99, 100, 85, 86, 87, 72, 57, 58, 43, 28, 29],
    [45, 46, 47, 48, 63, 64, 49, 50, 35, 36, 51, 52, 53, 38, 39, 40, 41, 56, 71, 72, 57, 42, 27, 28, 29, 14],
    [90, 75, 76, 77, 92, 107, 108, 109, 110, 111, 126, 127, 112, 97, 82, 83, 98, 113, 114, 115, 116, 101, 102, 117, 118, 119],
    [45, 30, 31, 46, 47, 48, 33, 34, 19, 20, 5, 6, 7, 8, 9, 10, 11, 26, 27, 42, 57, 58, 43, 44, 59, 74],
    [45, 60, 75, 76, 77, 78, 79, 80, 65, 66, 51, 52, 53, 68, 69, 84, 85, 100, 115, 130, 145, 146, 147, 132, 133, 134],
    [90, 105, 120, 121, 122, 137, 138, 123, 108, 109, 94, 95, 96, 111, 112, 113, 128, 143, 144, 145, 130, 131, 132, 147, 148, 149],
    [135, 136, 137, 138, 139, 140, 141, 126, 127, 142, 143, 144, 129, 114, 115, 130, 145, 146, 131, 132, 117, 102, 87, 88, 103, 104],
    [120, 135, 136, 137, 138, 123, 108, 109, 94, 95, 96, 81, 82, 83, 84, 69, 54, 55, 40, 41, 26, 27, 28, 13, 14, 29],
    [90, 75, 76, 77, 78, 79, 64, 49, 50, 65, 66, 67, 82, 97, 112, 113, 98, 99, 100, 115, 116, 117, 132, 133, 134, 149],
    [90, 91, 76, 61, 62, 77, 78, 79, 80, 65, 50, 51, 52, 37, 22, 23, 38, 53, 54, 55, 56, 41, 42, 27, 28, 29],
    [75, 76, 77, 78, 93, 94, 95, 96, 97, 112, 113, 114, 99, 100, 101, 86, 71, 56, 57, 72, 87, 102, 103, 88, 89, 74],
    [90, 105, 106, 91, 92, 93, 94, 109, 124, 139, 140, 141, 142, 143, 144, 129, 114, 115, 130, 131, 146, 147, 148, 133, 118, 119],
    [15, 30, 31, 46, 47, 48, 49, 50, 51, 66, 81, 96, 111, 112, 113, 114, 115, 130, 145, 146, 147, 132, 133, 148, 149, 134],
    [105, 90, 75, 76, 91, 92, 93, 78, 63, 48, 49, 34, 35, 20, 21, 6, 7, 8, 9, 10, 11, 12, 13, 28, 29, 14],
    [120, 121, 106, 107, 108, 93, 94, 79, 64, 49, 50, 65, 80, 81, 96, 111, 112, 113, 114, 115, 116, 131, 146, 147, 148, 149],
    [90, 105, 106, 121, 136, 137, 122, 123, 124, 109, 110, 111, 126, 127, 128, 129, 114, 115, 100, 85, 86, 87, 88, 103, 118, 119],
    [75, 76, 91, 106, 121, 136, 137, 138, 139, 140, 141, 142, 143, 128, 113, 114, 129, 130, 115, 116, 117, 132, 133, 118, 103, 104],
    [30, 15, 16, 1, 2, 17, 32, 33, 18, 19, 34, 35, 20, 5, 6, 7, 8, 9, 24, 39, 40, 41, 26, 27, 28, 29],
    [15, 16, 31, 32, 47, 48, 63, 64, 65, 50, 51, 66, 67, 52, 37, 38, 39, 40, 55, 70, 71, 86, 87, 72, 73, 74],
    [45, 46, 31, 32, 33, 34, 19, 20, 35, 36, 51, 66, 81, 82, 83, 84, 85, 100, 101, 116, 131, 132, 147, 148, 149, 134],
    [75, 60, 61, 46, 47, 62, 63, 78, 93, 94, 79, 80, 81, 96, 97, 98, 113, 128, 143, 144, 145, 146, 147, 148, 133, 134],
    [60, 75, 76, 77, 62, 47, 32, 33, 34, 49, 50, 35, 36, 21, 22, 23, 8, 9, 24, 25, 40, 41, 26, 27, 28, 29],
    [135, 120, 121, 122, 107, 92, 77, 78, 93, 108, 109, 110, 111, 112, 127, 128, 113, 98, 83, 84, 99, 100, 101, 102, 103, 104],
    [15, 16, 1, 2, 17, 18, 19, 20, 5, 6, 7, 22, 23, 38, 39, 54, 69, 84, 85, 86, 87, 88, 103, 118, 119, 104],
    [15, 30, 31, 32, 33, 48, 49, 50, 35, 20, 21, 22, 23, 24, 9, 10, 25, 40, 41, 26, 11, 12, 27, 28, 43, 44],
    [120, 135, 136, 137, 122, 107, 92, 93, 94, 95, 96, 97, 98, 99, 100, 115, 130, 131, 146, 147, 148, 149, 134, 119, 104, 89],
    [15, 0, 1, 16, 17, 2, 3, 4, 5, 6, 21, 36, 37, 38, 23, 24, 39, 54, 55, 56, 57, 72, 73, 74, 59, 44],
    [120, 135, 136, 121, 106, 107, 108, 93, 78, 79, 94, 109, 124, 125, 126, 141, 142, 143, 144, 145, 146, 147, 148, 149, 134, 119],
    [45, 60, 61, 62, 77, 78, 79, 64, 65, 50, 51, 52, 53, 54, 55, 70, 85, 100, 115, 130, 131, 132, 147, 148, 149, 134],
    [135, 136, 137, 138, 123, 124, 125, 140, 141, 142, 127, 128, 129, 114, 99, 84, 69, 54, 55, 56, 41, 26, 11, 12, 13, 14],
    [45, 46, 61, 62, 47, 32, 33, 34, 35, 36, 51, 52, 67, 68, 83, 98, 99, 100, 115, 116, 101, 86, 71, 72, 73, 74],
    [60, 61, 76, 77, 78, 93, 94, 95, 110, 111, 112, 97, 82, 83, 84, 99, 100, 85, 70, 71, 86, 101, 102, 103, 104, 119],
    [75, 76, 91, 106, 107, 108, 109, 94, 79, 80, 65, 50, 51, 52, 53, 54, 39, 40, 25, 10, 11, 12, 27, 28, 29, 44],
    [90, 75, 76, 77, 78, 79, 80, 95, 96, 97, 98, 83, 84, 85, 70, 71, 56, 57, 72, 87, 102, 103, 118, 119, 104, 89],
    [15, 16, 17, 18, 33, 48, 49, 50, 51, 52, 67, 82, 97, 112, 113, 114, 115, 116, 131, 146, 147, 132, 133, 118, 103, 104],
    [0, 15, 16, 1, 2, 17, 18, 19, 20, 21, 36, 51, 52, 53, 54, 39, 40, 55, 70, 71, 72, 73, 88, 89, 74, 59],
    [90, 105, 120, 121, 136, 137, 138, 139, 140, 141, 142, 143, 128, 113, 114, 115, 130, 131, 132, 117, 118, 103, 104, 119, 134, 149],
    [30, 31, 16, 17, 2, 3, 4, 19, 34, 35, 36, 21, 22, 23, 8, 9, 10, 25, 26, 41, 42, 27, 12, 13, 28, 29],
    [0, 15, 16, 17, 32, 47, 48, 49, 34, 19, 20, 35, 36, 37, 52, 67, 68, 69, 84, 85, 86, 87, 88, 73, 58, 59],
    [105, 106, 91, 92, 93, 78, 63, 48, 49, 64, 65, 50, 51, 52, 53, 54, 55, 40, 41, 56, 57, 42, 43, 58, 73, 74],
    [135, 136, 137, 138, 123, 124, 125, 140, 141, 142, 127, 128, 129, 114, 99, 84, 85, 86, 71, 72, 57, 42, 27, 28, 29, 14],
    [30, 31, 16, 17, 32, 47, 48, 49, 64, 79, 80, 95, 110, 125, 126, 141, 142, 143, 144, 145, 146, 147, 132, 133, 148, 149],
    [105, 106, 91, 92, 93, 94, 95, 80, 65, 50, 35, 36, 37, 52, 53, 54, 69, 84, 85, 86, 71, 72, 57, 58, 73, 74],
    [15, 16, 1, 2, 17, 18, 19, 34, 49, 50, 51, 52, 67, 82, 97, 98, 99, 100, 101, 102, 117, 132, 133, 118, 119, 104],
    [135, 136, 137, 138, 139, 124, 125, 126, 111, 112, 97, 98, 83, 68, 69, 54, 55, 40, 41, 42, 27, 28, 43, 44, 29, 14],
    [15, 16, 1, 2, 3, 4, 19, 20, 5, 6, 21, 36, 37, 52, 53, 54, 55, 70, 85, 86, 101, 116, 117, 118, 119, 134],
    [0, 1, 2, 17, 18, 3, 4, 19, 20, 35, 50, 65, 80, 95, 96, 97, 98, 99, 114, 115, 116, 131, 146, 147, 148, 149],
    [120, 121, 106, 107, 108, 109, 94, 95, 80, 81, 66, 67, 82, 83, 98, 99, 84, 69, 70, 71, 72, 73, 74, 59, 44, 29],
    [135, 120, 121, 106, 107, 92, 77, 78, 63, 64, 49, 34, 19, 4, 5, 6, 7, 8, 9, 24, 39, 40, 41, 42, 43, 44],
    [15, 16, 1, 2, 3, 18, 33, 48, 49, 50, 65, 80, 95, 96, 97, 98, 113, 114, 115, 116, 101, 102, 87, 72, 73, 74],
    [15, 30, 45, 46, 61, 62, 63, 64, 79, 80, 95, 110, 111, 126, 141, 142, 143, 144, 145, 130, 131, 116, 117, 118, 133, 134],
    [105, 106, 107, 122, 123, 138, 139, 124, 125, 126, 127, 142, 143, 144, 129, 114, 99, 84, 85, 70, 55, 56, 57, 72, 73, 74],
    [30, 31, 46, 61, 76, 77, 92, 107, 122, 123, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 132, 133, 118, 103, 88, 89],
    [15, 30, 45, 46, 31, 32, 47, 48, 49, 50, 65, 80, 81, 82, 83, 84, 85, 100, 115, 130, 145, 146, 147, 148, 149, 134],
    [15, 0, 1, 2, 3, 4, 5, 6, 21, 22, 37, 52, 67, 68, 69, 84, 85, 100, 101, 86, 87, 102, 103, 104, 119, 134],
    [15, 30, 31, 32, 17, 18, 19, 34, 49, 64, 65, 80, 95, 110, 111, 112, 97, 98, 83, 84, 85, 86, 87, 102, 103, 104],
    [120, 135, 136, 121, 122, 123, 124, 139, 140, 125, 110, 95, 96, 97, 98, 113, 114, 115, 116, 117, 102, 87, 88, 89, 74, 59],
    [0, 15, 16, 31, 32, 33, 48, 49, 50, 65, 80, 81, 66, 67, 82, 83, 84, 85, 100, 115, 116, 131, 132, 133, 134, 149]
    ]

mainMenuBtn.forEach( (x)=> {
    x.addEventListener("click",()=>{
    x.classList.add("clicked")
    setTimeout( ()=> {
        x.classList.remove("clicked")
    }, 500)
})
})

bigSmallBtn.addEventListener("click",()=>{
    let allLetters = document.querySelectorAll(".letter-box")
    if ( !lower ) {
        lower = true
        allLetters.forEach( (x) => {
            x.textContent = x.textContent.toLowerCase()
            })
    } else {
        lower = false
        allLetters.forEach( (x) => {
            x.textContent = x.textContent.toUpperCase()
            })
    }
})

newGameBtn.addEventListener("click",()=>{
    restart()
    if ( newGameBtn.classList.contains("make-white") ) {
        newGameBtn.classList.remove("make-white")
    }
})

showAnswerBtn.addEventListener("click",()=>{
    /*if (!answerSeen) {
        answerSeen = true
        let alreadyGreen = document.querySelectorAll(".gogreen")
        alreadyGreen.forEach( (x)=>{
            x.classList.remove("gogreen")
            if ( x.classList.contains("clicked") ) {
            x.classList.remove("clicked")
            }
        })
        greenCount = 26
        let answerBoxes = document.querySelectorAll(".answer")
        answerBoxes.forEach( (x) => {
            x.classList.add("gogreen")
        })
    } else if (answerSeen) {
        answerSeen = false
        greenCount = 0
        let allGreens = document.querySelectorAll(".gogreen")
        allGreens.forEach( (x) => {
            x.classList.remove("gogreen")
        })
    }*/
    giveHint()
    
})
function giveHint() {
    if ( greenCount < 26 ) {
        let currentBox = gameGrid.children[answer[hintCount]]
        if ( !currentBox.classList.contains("gogreen") ) {
            currentBox.classList.add("gogreen")
            currentBox.classList.add("clicked")
            currentBox.classList.add("show-hint")
            setTimeout( ()=>{
                currentBox.classList.remove("show-hint")
            },1500)
            greenCount++
            if ( greenCount === 26 ) {
                checkAnswer()
                hintCount = 0
            }
        } else {
            hintCount++
            giveHint()
        }
    } else {
        let allGreens = document.querySelectorAll(".gogreen")
        allGreens.forEach( (x) => {
            if ( !x.classList.contains("answer") ) {
                x.classList.remove("gogreen")
                x.classList.add("show-mistake")
                setTimeout(()=>{
                    x.classList.remove("show-mistake")
                },1500)
                greenCount--
                if ( x.classList.contains("clicked") ) {
                    x.classList.remove("clicked")
                }
            }
        })
    }
}


function setPattern(line) {
    answer = line
    for ( let i = 0; i < 26; i++ ) {
        let thisBox = line[i]
        let currentBox = gameGrid.children[thisBox]
        if (!lower) {
        currentBox.innerHTML = `<div class="letter-box">${letters[i].toUpperCase()}</div>`
        } else {
            currentBox.innerHTML = `<div class="letter-box">${letters[i].toLowerCase()}</div>`
        }
        ready()
        currentBox.classList.add("answer")
    }
}

function start() {
    for ( let i = 0; i < 10*15; i++) {
        let getRandom = Math.floor( Math.random()*letters.length)
        if (!lower) {
            gameGrid.innerHTML += `
            <div class="grid-box"><div class="letter-box">${letters[getRandom].toUpperCase()}</div></div>
            `
        } else {
            gameGrid.innerHTML += `
            <div class="grid-box"><div class="letter-box">${letters[getRandom].toLowerCase()}</div></div>
            `
        }
        let allBoxes = document.querySelectorAll(".grid-box")
        allBoxes.forEach( (x) => {
            x.addEventListener("click",()=>{
                if ( !x.classList.contains("gogreen") && greenCount < 26) {
                    x.classList.add("gogreen")
                    greenCount++
                    x.classList.add("clicked")
                    if ( greenCount === 26 ) {
                        checkAnswer()
                    }
                } else if ( x.classList.contains("gogreen") ) {
                    x.classList.remove("gogreen")
                    greenCount--
                    x.classList.remove("clicked")
                }
            })
        })
    }
    takeFirstStep()
    /*let getRandom = Math.floor( Math.random()*lines.length )
    setPattern(lines[getRandom])
    answer = lines[getRandom]*/
}
start()

function checkAnswer() {
    isgreen = 0
    for ( i of answer ) {
        let thisBox = gameGrid.children[i]
        if ( thisBox.classList.contains("gogreen") ) {
            isgreen++
        }
    } if ( isgreen === 26 ) {
        gameWon()
    }
}


function takeFirstStep(){
    if ( takingFirstStep < 200 && !gotOne) {
    takingFirstStep++
    stepPath = []
    looping = 0
    let getRandom = Math.floor( Math.random()*firstCol.length )
    let firstStep = firstCol[getRandom]
    stepPath.push( firstStep )
    takeNextStep(firstStep)
    } else if ( takingFirstStep >= 200 && !gotOne ) {
        let getRandom = Math.floor( Math.random()*lines.length )
        let backup = lines[getRandom]
        setPattern(backup)
    }
}
function takeNextStep(num){
    if ( stepPath.length != 26 && !gotOne) {
        let getRandom = Math.floor( Math.random()*moves.length )
        let thisStep = moves[getRandom]
        let nextStep = thisStep + num
        if ( nextStep < 0 || nextStep > 149 || stepPath.includes( nextStep ) ) {
            looping++
            if ( looping > 10 ) {
                takeFirstStep()
            } else {
            takeNextStep(num)
            }
        }
        looping = 0
        if ( stepPath.length < 26 ) {
            stepPath.push( nextStep )
            takeNextStep( nextStep )
        }
    }
    let finalStep = stepPath[25]
    if ( lastCol.includes( finalStep ) ) {
        let final = [...new Set(stepPath)]
        if (final.length === 26 && !gotOne) {
            gotOne = true
            setPattern(stepPath)
        } /*else {
            return;
            takeFirstStep()
        }*/
    } else {
            takeFirstStep()
    }
}

function ready() {
    startBtn.classList.add("ready")
    startBtn.textContent = "READY"
    let newStart = document.querySelector(".ready")
    newStart.addEventListener("click",()=>{
        gameOn()
    })
}
function gameOn() {
    startBtn.classList.remove("ready")
    startBtn.textContent = "PLEASE WAIT"
    gameCover.classList.add("hide-me")
    gameGrid.classList.remove("hide-me")
}

function restart() {
    gotOne = false
    answerSeen = false
    takingFirstStep = 0
    greenCount = 0
    gameWonDisplay = 0
    hintCount = 0
    answer = []
    gameGrid.innerHTML = ""
    gameGrid.classList.add("hide-me")
    gameCover.classList.remove("hide-me")
    start()
}


function gameWon() {
    setTimeout( () => {
        let thisBox = gameGrid.children[answer[gameWonDisplay]]
        thisBox.classList.add("win")
        gameWonDisplay++
        if (gameWonDisplay < 26) {
            gameWon()
        } else {
            newGameBtn.classList.add("make-white")
        }
    },100)
}