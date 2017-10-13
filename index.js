const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const ctrl = require('./db/products_controller.js')

const app = express();

app.use(bodyParser.json());
app.use(cors());
console.log(process.env.CONNECTION_STRING);
massive( process.env.CONNECTION_STRING).then( dbInstance => app.set('db', dbInstance));

app.post('/api/product/', ctrl.create);
app.get('/api/product/:id', ctrl.getOne);
app.get('/api/products', ctrl.getAll);
app.put( '/api/product/:id', ctrl.update );
app.delete('/api/product/:id', ctrl.delete);



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}`));