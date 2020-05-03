const axios = require('axios').default;

module.exports = (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");
    //console.log(message);
    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1])
        .then( (response) => {
            moves = response.data.moves;
            ControllaMosse(moves)
        });

        

    mossa = "";
        
    function ControllaMosse(moves){
        for(i in moves){
            mossa += moves[i].move.name + "\n";
            dettaglimossa = moves[i].version_group_details;
            //console.log(dettaglimossa);
            for(e in dettaglimossa){
                mossa += "Lv: " + dettaglimossa[e].level_learned_at + "\n";
                mossa += "Modo: " + dettaglimossa[e].move_learn_method.name+ + "\n";
                mossa += "\n" + "Gioco: " + dettaglimossa[e].version_group.name + "\n";
            }

            ctx.reply(mossa);
            mossa = "";
        }
    }
}
    