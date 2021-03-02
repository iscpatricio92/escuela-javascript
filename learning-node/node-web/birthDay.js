const http = require('http')
const moment = require('moment')
const server = http.createServer();

server.on('request', (req, res) => {
    if (req.method === 'POST' && req.url == '/birth') {
        let body = []

        req.on('data', chunk => {
            body.push(chunk)
        }).on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            body = Buffer.concat(body).toString()
            if (!moment(body, 'DD-MM-YYYY').isValid()) {
                res.end('No es un formato válido, formato esperado Día-Mes-Anio')
            } else {
                console.log("body",body);
                console.log(moment(body,'DD-MM-YYYY').day().toString());
                console.log(moment(body,'DD-MM-YYYY').month().toString());
                console.log(moment(body,'DD-MM-YYYY').year().toString());
                let weekDayName = moment(body).format('dddd')
                res.end('Tu día de nacimiento es: ' + weekDayName)
            }

        })


    } else {
        res.statusCode = 404
        res.end()
    }
})

server.listen(8001)

console.info('Servidor http://localhost:8001');