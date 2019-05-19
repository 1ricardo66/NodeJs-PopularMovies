var express = require("express");
var ejs = require("ejs");
var request = require("request");
var cheerio = require("cheerio");
var path = require("path")
var app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/static')));

app.get("/", (req, res) => {
    res.render('index')
})

app.listen(port)