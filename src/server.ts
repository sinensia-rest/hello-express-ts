import type e = require("express");

const express = require('express');
const app : e.Application = express();
const port = 8000;

app.get('/', (req:e.Request,res:e.Response)=>{
    res.contentType('text/html')
    res.send(JSON.stringify(req.headers));
    // res.end("Ola ke ase");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});