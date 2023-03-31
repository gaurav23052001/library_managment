const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('./config/db');

const swaggerJsDocs = YAML.load('./api.yaml');
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use(require("./router/book"));
app.use(require("./router/user"));
app.use(require("./router/admin"));




module.exports = app