const { Client } = require("pg");

const client = new Client({ 
    user : process.env.USER,
    host : process.env.HOST,
    database : process.env.DB,
    password : process.env.PASS,
    port : process.env.PORT
 })

module.exports = client;