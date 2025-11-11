var express = require('express');
var path = require('path');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');
var yaml = require('yamljs');

var swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
