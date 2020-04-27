const mysql = require('mysql');

cnn = mysql.createConnection({
    host: "maffocompany.it",
    user: "root",
    password: "u0fcac4t",
    port: 5604,
    database: "botTax"
});   

module.exports = (ctx) => { 
    
    let queryString = "Select * from box";

    cnn.query(queryString, (error,results) => {
        if(error)
            throw error;
        let resp = "";
        for(i in results)
        {
            resp +="Name: " + results[i].Nome + "\n";
            resp +="Type: " + results[i].Tipo + "\n";
            resp +="baseAtk: " + results[i].Atk + "\n";
            resp +="baseDef " + results[i].Def + "\n";
            resp +="baseSpeed: " + results[i].Speed;

            //aggiungere gestione immagine
        }
        ctx.reply(resp);
        console.log(resp);
    });
}