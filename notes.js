const fs = require('fs')
const chalk = require('chalk')



const addNotes = (title,body) => {
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen.bold('Note added Successfully!!'))

    } else{
        console.log(chalk.bgRed.bold('Note title taken'))
    }

    
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json',data)
}

const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const data = dataBuffer.toString()
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => (note.title !== title))

    if(newNotes.length === notes.length){
        console.log(chalk.bgRed.bold('Note not found'))
    }else{
        saveNotes(newNotes)
        console.log(chalk.bgGreen.bold('Note Removed!!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgBlue.bold.red("All Notes!!!"))
    notes.forEach((note) => console.log(note.title))
}


const readNote = (title) => {
    const notes = loadNotes()
    const readNote = notes.find((note) => note.title === title)

    if(readNote){
        console.log(chalk.blue.bold(title))
        console.log(readNote.body)
    }else{
        console.log(chalk.bgRed.bold("Note not found!!!"))
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}