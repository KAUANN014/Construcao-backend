var express = require('express');
var path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

var apidocsRouter = require('./routes/apidocsRouter');
var usuariosRouter = require('./routes/usuarioRouter');

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;
const db   = process.env.MONGODB_DATABASE;

const connectionString = `mongodb+srv://${user}:${pass}@${host}/${db}`;

mongoose.connect(connectionString)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));

var app = express();

app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);


module.exports = app;
