var express = require("express");
var ejs = require("ejs");
var request = require("request");
var cheerio = require("cheerio");
var path = require("path")
var app = express();
var fs = require('fs')
var dados = [];
var i = 0;

const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/static')));

//web crawling aqui

request("https://www.imdb.com/chart/moviemeter", function (err, res, html) {
    if (err) console.log("Erro" + err);

    var $ = cheerio.load(html);
    $('.lister-list tr').each(function () {
        var filmTitulo = $(this).find(".titleColumn a").text();
        var filmNota = $(this).find(".ratingColumn strong").text();
        var filmAno = $(this).find(".titleColumn span").first().text();
        var filmImg = $(this).find(".posterColumn img").attr('src')
        var identificador;
        dados.push({
            titulo: filmTitulo,
            img: filmImg,
            nota: filmNota,
            ano: filmAno,
            id: i,
        })
        i++;
    })


})
createFile = () => {
    fs.writeFile("/home/ricardo/Device/Json/popularFilms.json", JSON.stringify(dados), { encoding: 'utf-8', flag: 'a' },
        (err) => {
            if (err) {
                console.log(err)
            }
        })
}

//web crawling aqui
app.get("/", (req, res) => {
    
    res.render('index', { dados: dados })
})

app.get("/api", (req, res) => {
    dados = JSON.stringify(dados)
    res.send(dados);
})

app.get('/sobre', (req, res) => {
    res.render('sobre')
})

app.listen(port)