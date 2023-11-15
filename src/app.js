const express = require('express');
const path = require ('path');
const morgan = require ('morgan');
const mysql = require ('mysql');
const myConnection = require('express-myconnection');
const app = express();

const customerRoutes=require('./routes/riego');

app.set('port', process.env.PORT||3000)
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'riego'
}, 'single'));

app.use('/', customerRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=>{
    console.log('Server on port');
});