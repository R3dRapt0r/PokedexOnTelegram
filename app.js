const Telegraf = require('telegraf');
const axios = require('axios').default;
const token = '1115776649:AAHFt2ihfQHb4atXQ57Tov4Q-RF6rqzIz8Q';
const bot = new Telegraf(token);
const mysql = require('mysql');

cnn = mysql.createConnection({
    name: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "pokemon"
});

// PER DATABASE
let tipo = "";
let nome = "";
let atk = 0;
let  def = 0;
let speed = 0;

// PER CONTROLLARE E MOSTRARE I TIPI
contatipi = 0;
x = "";
y = "";
pokemon = "";

bot.start( () => ctx.reply("Scrivi /comando + nomepokemon"));

bot.command('pokemon', (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");
    console.log(message);

    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1])
        .then( (response) => {

        types = response.data.types;
        abilities = response.data.abilities;
    
        ContaTipi(types);
        ControllaAbilità(abilities);

        setTimeout(() => GetImages(response), 500);
        ctx.reply("number: " + response.data.order);
        ctx.reply(response.data.weight + " kg");
        ctx.reply("Type: " + x);
        ctx.reply(y);
    });

    function GetImages(response){
        ctx.replyWithPhoto(response.data.sprites.front_default);
        ctx.replyWithPhoto(response.data.sprites.front_shiny);
    }
});

function ControllaAbilità(abilities){
    for(i in abilities){
        if(abilities[i].is_hidden == true){
            y += " Nascosta: " + abilities[i].ability.name + "\n";
        }
        else if(abilities[i].is_hidden == false){
            y += "Abilità: " + abilities[i].ability.name + " ";
        }
    }
}

function ContaTipi(types){
    for(i in types){
        if(contatipi == 1){
            x += "/" + types[i].type.name;
        }
        else if(contatipi == 0){
            x = types[i].type.name;
        }
        contatipi++;
    }
}

//MOSSE
bot.command('moves', (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");
    console.log(message);
    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1])
        .then( (response) => {
            moves = response.data.moves;
            ControllaMosse(moves);
        });

        mossa = "";
        
        function ControllaMosse(moves){
            for(i in moves){
                mossa += moves[i].move.name + "\n";
                dettaglimossa = moves[i].version_group_details;
                console.log(dettaglimossa);
                for(e in dettaglimossa){
                    mossa += "Lv: " + dettaglimossa[e].level_learned_at + "\n";
                    mossa += "Modo: " + dettaglimossa[e].move_learn_method.name+ + "\n";
                    mossa += "\n" + "Gioco: " + dettaglimossa[e].version_group.name + "\n";
                }

                ctx.reply(mossa);
                mossa = "";
            }
        }
});

//STATS
bot.command('basestats', (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");
    console.log(message);
    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1])
        .then( (response) => {
            stats = response.data.stats;
            ControllaStats(stats);
        });
        
    statistiche = "";

    function ControllaStats(stats){
        for(i in stats){
            statistiche = stats[i].stat.name + "\n" + stats[i].base_stat + "\n";
            ctx.reply(statistiche);
        }
    }
});

//  RECUPERO POKEMON DAL BOX
bot.command('box', (ctx) => {
            let queryString = "Select * from box"

            cnn.query(queryString, (error,results) => {
                if(error)
                    throw error;
                console.log(results);
                ctx.reply(results);
            });
});

//  SALVO POKEMON NEL BOX
bot.command('save', (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");
    console.log(message);
    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1])
        .then( (response) => {
            type = response.data.type;
            for(i in type){
                tipo += type.name + " ";
            }

            nome = response.data.name;

            stat = response.data.stats;
            atk = stat[4].base_stat;
            def = stat[3].base_stat;
            speed = stat[0].base_stat;

            let queryString = "Insert into box (Nome, Tipo, Atk, Def, Speed)" +
            "Values (?, ?, ?, ?, ?)"

            cnn.query(queryString, [nome, tipo, atk, def, speed], (error, results) => {
                if(error)
                    throw error;
                console.log("yes");
            })
        });
});

bot.launch();

/*
module.export metto le funzioni in un file a parte e le richiamo (codice meno skifoso :S)
check time (non rispondere a msg vecchi)
sito + se ce tempo auth
*/