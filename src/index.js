//Framework para crear un srvidor facilmente
const express = require('express')

//Plugin para leer archivos


const fs = require('fs')

//Inciamos el servidor web desde el método express()
const app = express()

//Middlewares

app.use(express.json())
//rutas
app.get('/producto/:nombre?', (req, res) => {
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    let response = []
//si el parametro nombre existe
if(req.params.nombre){
    productos.map((value) => {
        if(req.params.nombre == value.nombre){
            //Aqui se encontró una coincidencia
            response.push(value)
        }
    })
}else{
    response = productos
}

    res.json(response)
})

app.post('/producto', (req, res) => {
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    productos.push(req.body)
    
    fs.writeFileSync('src/db/productos.json', JSON.stringify(productos))

    res.json(productos)
})


app.delete('/producto/:nombre', (req, res) => {
    //res.send('Respuesta desde DELETE')
    let nombrea = req.params.nombre
    let productosa = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    let index

    productosa.map((value, i) =>{
        if(value.nombrea == nombrea){
            index = i
        }
    })
    productosa.splice(index,1)
    fs.writeFileSync('src/db/productos.json', JSON.stringify(productosa))

    res.json(productosa)
    
})

//put para actualizar un recurso
app.put('/producto/:nombre', (req, res) => {
    //res.send('Respuesta desde PUT')
    let nombrea = req.params.nombre
    let productosa = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    let index

    productosa.map((value, i) =>{
        if(value.nombrea == nombrea){
            index = i
        }
    })

    productosa[index] = req.body
    fs.writeFileSync('src/db/productos.json', JSON.stringify(productosa))
    res.json(req.body)
})
//Método que permite al srvidor web escuchar en un puerto específico

app.get('/usuario', (req, res)=>{
    res.send("Desde GET usuario")
})

app.listen(3000), () => {
    console.log('El servidor esta ejecutandose en http://localhost:3000')
}
