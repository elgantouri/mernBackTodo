const express = require('express')
const cors = require('cors')

const taskRouter = require('./routes/TaskRoutes.js')


const app = express()
app.use(cors())
app.use(express.json())

//create conexion with mongodb 
const mongoose = require('mongoose')
// const dbName = "TodoList"
// mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)


mongoose.connection.on('connected', () => {
    console.log('Connexion à MongoDB réussie');
});

const PORT = 3001;

app.get("/", (req, res) => {
    res.send('Amin zeroual')
})

app.listen(PORT, () => {
    console.log('Le serveur a ètè dimarrer!');
})

app.use('/tasks',taskRouter)