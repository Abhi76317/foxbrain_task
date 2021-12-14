require("dotenv").config({path: "./.env"});
const express = require("express");
const {database} = require("./utils/database")
const app = new express();
const categoryRoute = require("./routes/category")
const productRoute = require("./routes/product")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/categoryroute", categoryRoute)
app.use("/productroute", productRoute)

app.use((error, req, res, next) => {
    console.log("error find ",error)
    if(error.code === "EBADCSRFTOKEN"){
        error.statusCode = 403;
        error.message = "Access Denied "
    }

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
})

app.listen(process.env.PORT || 5000, ()=> {
    database.connect((err)=> {
        if(err) throw err;
        console.log("server started")
    })
})