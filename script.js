const body = document.querySelector("body")
const piano = document.querySelector(".piano")
const notesButton = document.querySelector(".btn-notes")
const lettersButton = document.querySelector(".btn-letters")
const fullScreenButton = document.querySelector(".fullscreen")
let leftClickDown = false

function playNote(key) {
    key.classList.add("played")
    const note = key.dataset.note
    const noteSound = document.querySelector(
        `audio[src='assets/audio/${note}.mp3']`
    )
    noteSound.currentTime = 0
    noteSound.play()
}

piano.addEventListener("mousedown", (event) => {
    leftClickDown = true
    playNote(event.target)
})

body.addEventListener("mouseup", (event) => {
    leftClickDown = false
    event.target.classList.remove("played")
})

piano.addEventListener("mouseout", (event) => {
    event.target.classList.remove("played")
})

piano.addEventListener("mouseover", (event) => {
    if (leftClickDown) {
        playNote(event.target)
    }
})

window.addEventListener("keydown", (event) => {
    const target = getKeyByCode(event)
    playNote(target)
})

window.addEventListener("keyup", (event) => {
    const target = getKeyByCode(event)
    target.classList.remove("played")
})

function getKeyByCode(event) {
    const keyLetter = event.code.slice(-1)
    return document.querySelector(`[data-letter=${keyLetter}]`)
}

notesButton.addEventListener("click", () => {
    piano.classList.remove("with-letters")
    piano.classList.add("with-notes")
    lettersButton.classList.remove("btn-active")
    notesButton.classList.add("btn-active")
})

lettersButton.addEventListener("click", () => {
    piano.classList.remove("with-notes")
    piano.classList.add("with-letters")
    notesButton.classList.remove("btn-active")
    lettersButton.classList.add("btn-active")
})

fullScreenButton.addEventListener("click", () => {
    const inFullScreen = document.fullscreenElement !== null
    inFullScreen
        ? document.exitFullscreen()
        : document.querySelector("body").requestFullscreen()
})
