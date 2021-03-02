const express = require('express')
const app = express()

const { config } = require('./config/index')
const moviesApi = require('./routes/movies')

moviesApi(app)
/*
app.get('/json', (req, res) => {
    res.json({ 'Hello': 'World' })
})

Valida si el año es bisiesto 
app.get('/bisiesto/:year', (req, res) => {
    let anio = req.params.year;
    console.log(anio)
    if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0)
        res.send(`El año ${anio} es bisiesto.`)
    else
        res.send(`El año ${anio} NO es bisiesto.`)
})
*/
app.listen(config.port, () => {
    console.log(`Listening: http://localhost:${config.port}`);
})