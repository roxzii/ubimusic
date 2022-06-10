#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
var url = require('url');
const https = require('https');
var privateKey = fs.readFileSync(__dirname + '/certs/selfsigned.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/certs/selfsigned.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/users');
const { script } = require('vm');
const { time } = require('console');

app.use(express.static(path.join(__dirname, 'public')));

//Body-Parser:
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//************************ */

//sequelize / express / body-parser / path / mysql2 / http / https / fs / file-url

//Routes:

//User Create:
app.post('/', function (req, res) {
    User.findAll({ //Search for all users in the database
        where: {
            nome: req.body.username,
        }
    }).then(function (user) { //If the user is found, go to an erro page
        if (user.length > 0) {
            console.log("User already exists");
            res.redirect('/contaErro');
        } else {
            console.log("User created successfully");
            User.create({
                nome: req.body.username,
                senha: req.body.password
            })
            res.sendFile("./views/index.html", { root: __dirname });
        }
    })
})

//Home Page:
app.get('/', function (req, res) {
    res.sendFile("./views/login.html", { root: __dirname });
});

//Register Page:
app.get('/conta', function (req, res) {
    res.sendFile("./views/register.html", { root: __dirname });
})

//Register Error Page:
app.get('/contaErro', function (req, res) {
    res.sendFile("./views/registerErro.html", { root: __dirname });
})

//Login Page:
app.get('/login', function (req, res) {
    res.sendFile("./views/login.html", { root: __dirname })
})

//Music Player:
app.post('/player', function (req, res) {
    User.findAll().then((function (users) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].nome == req.body.username && users[i].senha == req.body.password) {
                console.log("Usuario logado com sucesso!");
                res.clearCookie('videoTittle')
                res.clearCookie('videoImg')
                res.sendFile("./views/player.html", { root: __dirname })
                return true;
            }
        }
        console.log("Usuario não encontrado!");
        res.sendFile("./views/login.html", { root: __dirname })
        return false;
    }))
})

app.post('/player/play', function (req, res) {
    let url = 'https://www.youtube.com/watch?v=' + req.body.videoid
    const ytdl = require('ytdl-core');

    const Output = path.resolve('/home/pi/ubimusic/public/music/' + req.body.videoTitle + '.webm');

    const video = ytdl(url, { quality: 'lowestaudio', format: 'webm' });
    console.log("ID do video -> " + req.body.videoid);
    console.log("Music Downloaded!");
    res.clearCookie('videoTittle')
    res.clearCookie('videoImg')
    res.cookie('videoTittle', req.body.videoTitle);
    res.cookie('videoImg', req.body.videoImg);
    video.pipe(fs.createWriteStream(Output)).on('finish', function () {
        res.sendFile("./views/player.html", { root: __dirname });
    });
})

app.post('/player/download', function (req, res) {
    console.log(decodeURIComponent(req.body.MusicTittle));
    var filePath = "/home/pi/ubimusic/public/music/" + decodeURIComponent(req.body.MusicTittle) +".webm"; //caminho do arquivo completo
    var fileName = decodeURIComponent(req.body.MusicTittle) + ".webm"; // O nome padrão que o browser vai usar pra fazer download

    res.download(filePath, fileName);
})

app.get('/player/search', function (req, res) {
    var name = req.body.music;
    res.sendFile(__dirname + "/views/list.html", name);
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8081, function () {
    console.log('Server listening on port 8081');
})
httpsServer.listen(8443, function () {
    console.log('Server listening on port 8443');
})
