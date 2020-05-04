const mysql = require('mysql');

cnn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
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
        }
        ctx.reply(resp);
        console.log(resp);
    });
}