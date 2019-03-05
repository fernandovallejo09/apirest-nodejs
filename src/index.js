//Framework para crear un srvidor facilmente
const express = require('express')

//Plugin para leer archivos


const fs = require('fs')

//Inciamos el servidor web desde el método express()
const app = express()

//Middlewares

app.use(express.json())

app.get('/', (req, res) => {
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    res.json(productos)
})

app.post('/', (req, res) => {
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    productos.push(req.body)
    
    res.json(productos)
})

app.delete('/', (req, res) => {
    res.send('Respuesta desde DELETE')
})

app.put('/', (erq, res) => {
    res.send('Respuesta desde PUT')
})
//Método que permite al srvidor web escuchar en un puerto específico
app.listen(3000), () => {
    console.log('El servidor esta ejecutandose en http://localhost:3000')
}

