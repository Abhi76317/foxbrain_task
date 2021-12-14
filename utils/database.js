require("dotenv").config({path: "./.env"});
const mysql = require("mysql");

exports.database = mysql.createConnection({
    host: "localhost",
    user: process.env.USERID,
    password: "",
    database: "foxBrain",
    multipleStatements: true
});