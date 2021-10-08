// const express = require("express");
// const app = express();

const app = require("./index");

const connect = require("./configs/db");




app.listen(3000, async (req, res) => {
    await connect();

    console.log("Listening port in 3000");
})