import type e = require("express");
import types = require("sequelize");

const express = require('express');
const { Sequelize } = require('sequelize');

const app: e.Application = express();
const port = 8000;

// install JSON middleware
app.use(express.json())

// instantiate ORM
const sequelize = new Sequelize('sqlite:rest.db');
// create Customer model by extending base class
class Customer extends types.Model { }
// Customer model definition
Customer.init({
  id: {
    type: types.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: types.DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Customer',
});
// create or update database
Customer.sync()

// define routes

app.get('/', (req: e.Request, res: e.Response) => {
  res.contentType('text/html')
  res.send(JSON.stringify(req.headers));
});

app.get('/customer', async (_req: e.Request, res: e.Response) => {
  res.type('json');
  res.send(await Customer.findAll());
  // or single-line res.json(await Customer.findAll());
});

app.get('/customer/:id', async (req: e.Request, res: e.Response) => {
  const id = req.params.id;
  const ret = await Customer.findByPk(id);
  if(ret==null) {
    // send an error status code
    res.sendStatus(404);
 } else {
    res.json(ret);
  }
});

app.post('/customer', async (req: e.Request, res: e.Response) => {
  const ret = await Customer.create({ name: req.body.name });
  res.status(201);
  res.json(ret);
});

app.put('/customer/:id', async (req: e.Request, res: e.Response) => {
  const id = req.params.id;
  const ret = await Customer.update({
    name: req.body.name
  }, {
    where: { id: id }
  });
  if(ret[0]) {
    res.json({success:true});
  } else {
    // Send a more elaborate error response
    res.status(404).json({success:false,code:404,error:"Not found"})
   }
});

app.delete('/customer/:id', async (req: e.Request, res: e.Response) => {
  const id = req.params.id;
  const ret = await Customer.destroy({
    where: { id: id }
  });
  if(ret) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// start application
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});