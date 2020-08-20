"use strict";
const express = require('express');
const cart = express.Router();
const pool = require('./connection');

function getTable(filters) {
    let myFilters = {...filters};
    let query = "select * from shopping_cart";
    let where = [];
    let params = [];
    if (myFilters.id) {
        params.push(myFilters.id);
        where.push(`id = $${params.length}::integer`);
    }
    if (where.length) {
        query += ' WHERE ' + where.join(' AND ');
    }
    return pool.query(query,params)
};

cart.get("/", (req,res)=>{
    let filter = {};
    filter.maxPrice = req.query.maxPrice;
    filter.prefix = req.query.prefix;
    filter.pageSize = req.query.pageSize;
    getTable(filter).then(result=>{
        res.status(200);
        res.json(result.rows);
    }).catch(error=>{
        console.log(error);
        res.sendStatus(500);
    });
});
cart.get("/:id", (req,res)=>{
    getTable({id: req.params.id}).then(result=>{
        let data = result.rows[0];
        console.log(data)
        if (data !== undefined) {
            res.status(200);
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    });
})
cart.post("/", (req,res)=>{});
cart.delete("/:id", (req,res)=>{});
cart.put("/:id", (req,res)=>{});

module.exports = cart;