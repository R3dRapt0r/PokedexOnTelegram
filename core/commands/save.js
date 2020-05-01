const axios = require('axios').default;
const mysql = require('mysql');

contatipi = 0;
x = "";
let nome = "";
let atk = 0;
let def = 0;
let speed = 0;

cnn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: 5604,
    database: "botTax"
});   

/*
cnn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "pokemon"
});
*/   

module.exports = (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");
    console.log(message);
    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1])
        .then( (response) => {
            types = response.data.types;

            ContaTipi(types);

            nome = response.data.name;
            stat = response.data.stats;
            atk = stat[4].base_stat;
            def = stat[3].base_stat;
            speed = stat[0].base_stat;

            let queryString = "Insert into box (Nome, Tipo, Atk, Def, Speed)" +
            "Values (?, ?, ?, ?, ?)"

            cnn.query(queryString, [nome, x, atk, def, speed], (error, results) => {
                if(error)
                    throw error;
                console.log("yes");
            })
        });

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
}

