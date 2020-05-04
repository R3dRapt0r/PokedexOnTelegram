const Telegraf = require('telegraf');
const token = process.env.token;
const bot = new Telegraf(token);
const command = require('./core/command.js');
const express = require('express');
const app = express();
const mysql = require('mysql');

let pkmn = 0
let move = 0
let base = 0
let box = 0
let save = 0
let help = 0

cnn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: 5604,
    database: "botTax"
});

let queryString = "Select * from graph"

cnn.query(queryString, (error, results) => {
    if (error)
        throw error;
    let resp = "";
    for (i in results) {
        pkmn += results[i].pkmn;
        move += results[i].move;
        base += results[i].base;
        box += results[i].box;
        save += results[i].save;
        help += results[i].help;
    }
});

bot.start(() => ctx.reply("Scrivi /comando + nomepokemon"));

app.set("view engine", "ejs");

app.get("/object", (req, res) => {
    res.send([pkmn, move, base, box, save, help]);
});

bot.command('pokemon', (ctx) => {
    command.pokemon(ctx);
    pkmn++;

    queryString = "UPDATE graph SET pkmn = ?"
    cnn.query(queryString, [pkmn], (error, results) => {
        if (error)
            throw error;
    });
});

bot.command('moves', (ctx) => {
    command.moves(ctx);
    move++;

    queryString = "UPDATE graph SET move = ?"
    cnn.query(queryString, [move], (error, results) => {
        if (error)
            throw error;
    });
});

bot.command('basestats', (ctx) => {
    command.basestats(ctx);
    base++;

    queryString = "UPDATE graph SET base = ?"
    cnn.query(queryString, [base], (error, results) => {
        if (error)
            throw error;
    });
});

bot.command('box', (ctx) => {
    command.box(ctx);
    box++;

    queryString = "UPDATE graph SET box = ?"
    cnn.query(queryString, [box], (error, results) => {
        if (error)
            throw error;
    });
});

bot.command('save', (ctx) => {
    command.save(ctx);
    save++;

    queryString = "UPDATE graph SET save = ?"
    cnn.query(queryString, [save], (error, results) => {
        if (error)
            throw error;
    });
});

bot.command('help', (ctx) => {
    command.help(ctx);
    help++;

    queryString = "UPDATE graph SET help = ?"
    cnn.query(queryString, [help], (error, results) => {
        if (error)
            throw error;
    });
});

bot.launch();

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000);