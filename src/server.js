
require('dotenv').config()
const express = require('express');

const app = express();
const router = require('./routes')


app.use(router);
app.use(express.json());
app.listen(process.env.PORT || 3333, console.log('Server runing on port: 3333'))