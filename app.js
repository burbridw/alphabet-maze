const gameGrid = document.querySelector(".game-grid")
const mainMenu = document.querySelector(".main-menu-container")

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x","y", "z"]

const testBtn = document.getElementById("test")
const stepBtn = document.getElementById("step")

let testLine = [0,1,16,31,32,33,34,19,20,21,22,37,52,53,68,83,84,85,70,55,56,57,72,87,88,89]
let testLine2 = [0,1,2,3,18,33,48,47,62,63,64,65,50,51,52,67,82,97,98,99,114,115,116,117,118,119]

const lines =   [
    [0,1,16,31,32,33,34,19,20,21,22,37,52,53,68,83,84,85,70,55,56,57,72,87,88,89],
    [0,1,2,3,18,33,48,47,62,63,64,65,50,51,52,67,82,97,98,99,114,115,116,117,118,119]
    ]

testBtn.addEventListener("click",function() {
    let getRandom = Math.floor( Math.random()*lines.length )
    setPattern(lines[getRandom])
})
mainMenu.addEventListener("click",()=>{
    mainMenu.classList.add("clicked")
    setTimeout( ()=> {
        mainMenu.classList.remove("clicked")
    }, 500)
})
stepBtn.addEventListener("click",()=>{
    takeStep()
})

let greenCount = 0
let stepCount = 0
let lastBox = ""

let alreadyStepped = []

const firstCol = [0,15,30,45,60,75,90,105,120,135]
const moves = [-1, 1, -15, 15]


for ( let i = 0; i < 10*15; i++) {
    let getRandom = Math.floor( Math.random()*letters.length)
    gameGrid.innerHTML += `
    <div class="grid-box"><div class="letter-box">${letters[getRandom].toUpperCase()}</div></div>
    `
    let allBoxes = document.querySelectorAll(".grid-box")
    allBoxes.forEach( (x) => {
        x.addEventListener("click",()=>{
            if ( !x.classList.contains("gogreen") && greenCount < 26) {
                x.classList.add("gogreen")
                greenCount++
                x.classList.add("clicked")
                /*setTimeout( ()=> {
                    x.classList.remove("clicked")
                }, 500)*/
            } else if ( x.classList.contains("gogreen") ) {
                x.classList.remove("gogreen")
                greenCount--
                x.classList.remove("clicked")
            }
        })
    })
}

function setPattern(line) {
    for ( let i = 0; i < line.length; i++ ) {
        let thisBox = line[i]
        let currentBox = gameGrid.children[thisBox]
        currentBox.textContent = letters[i].toUpperCase()
    }
}

function takeStep() {
    if ( stepCount === 0 ) {
        let getRandom = Math.floor( Math.random()*firstCol.length )
        let start = gameGrid.children[firstCol[getRandom]]
        start.classList.add("gogreen")
        stepCount++
        lastBox = gameGrid.children[firstCol[getRandom]]
        alreadyStepped.push( firstCol[getRandom] )
        console.log( alreadyStepped )
    } 

}