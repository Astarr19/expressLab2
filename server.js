"use strict";
const express = require("express");
const app = express();
const port = 3000;
let cart = require('./cart');

app.use(express.json());
app.use(express.static(__dirname + "/dist"));
app.use('/cart-items', cart);
app.get('*',(req,res)=>{
    res.json({message:'This ain\'t it boss'});
})

app.listen(port, ()=>{console.log(`server listening on port ${port}`)});