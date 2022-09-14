const editor = document.getElementById("editor")
let defaultFontSize = 20

const increaseBtn = document.getElementById("increaseBtn")
const decreaseBtn = document.getElementById("decreaseBtn")
const saveBtn = document.getElementById("saveBtn")

const increaseText = () => {
    editor.style.fontSize = `${++defaultFontSize}px`
}

const decreaseText = () => {
    editor.style.fontSize = `${--defaultFontSize}px`
}

const saveText = () => {
    let text = editor.value
    // console.log(text);
    window.electronAPI.saveText(text)
}

// Handle message from Main process
window.electronAPI.savedText((event, results) => {
    if (results == 'success') {
        console.log('Note saved successfully');
    } else {
        console.log('Error saving text');
    }
})

increaseBtn.addEventListener("click", increaseText)
decreaseBtn.addEventListener("click", decreaseText)
saveBtn.addEventListener("click", saveText)