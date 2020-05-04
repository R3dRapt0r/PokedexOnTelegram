const axios = require('axios').default;

module.exports = (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");
    console.log(message);
    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1].toString().toLowerCase())
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
}
    