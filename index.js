const user = '[{"id":1,"nombre":"Atsumi","apellido":"Amaya","email":"AtsumiAmaya@gmail.com"},' +
            '{"id":2,"nombre":"Carlos","apellido":"Lopez","email":"CarlosLopez@gmail.com"},' +
            '{"id":3,"nombre":"Joshep","apellido":"Cconislla","email":"JoshepCconislla@gmail.com"}]';

const prod = '[{"id":1, "nombre":"Pepsi 750ml", "stock":15, "precio":2.50},' +
            '{"id":2, "nombre":"Arroz Paisana 3kg", "stock":4, "precio":7.50},' +
            '{"id":3, "nombre":"Pickeos Snack 750mg", "stock":10, "precio":6.00}]';

var objP = JSON.parse(prod);
var objU = JSON.parse(user);

const express = require('express');
const app = express();

const ejs = require('ejs');
const { send } = require('express/lib/response');
const url = require('url'); 
const http = require('http')
const server = http.createServer(app)

app.use(express.static("public")); 

app.set('views', './views');
app.set('view engine', 'ejs');

var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'tienda_nube04'
});

app.get('/', (req, res) => {
    res.render('index');
    //res.sendFile(__dirname+'public/index1.html');
});

app.get('/clientes', (req, res) => {
    connection.query('SELECT * FROM clientes', function(err, rows, field) {
        if (err) throw err;
        res.render('clientes',{users: rows});
    })
});

app.get('/productos', (req, res) => {
    connection.query('SELECT * FROM productos', function(err, rows, field) {
        if (err) throw err;
        res.render('productos',{products: rows});
    })
});

app.listen(5000, () => {
    console.log('Servidor en Puerto 5000');
});