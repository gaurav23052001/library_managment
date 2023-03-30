const express = require('express');
const app = express();
require('./config/db');

app.use(express.json());

app.use(require("./router/book"));
app.use(require("./router/user"));
app.use(require("./router/admin"));




module.exports = app