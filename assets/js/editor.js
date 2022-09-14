const editor = document.getElementById("editor")
let defaultFontSize = 20

const increaseBtn = document.getElementById("increaseBtn")
const decreaseBtn = document.getElementById("decreaseBtn")

const increaseText = () => {
    editor.style.fontSize = `${++defaultFontSize}px`
}

const decreaseText = () => {
    editor.style.fontSize = `${--defaultFontSize}px`
}

increaseBtn.addEventListener("click", increaseText)
decreaseBtn.addEventListener("click", decreaseText)