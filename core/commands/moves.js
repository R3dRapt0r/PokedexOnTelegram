const axios = require('axios').default;

module.exports = (ctx) => {
    message = ctx.message;
    tosplit = message.text;
    splitted = tosplit.split(" ");

    axios.get('https://pokeapi.co/api/v2/pokemon/' + splitted[1].toString().toLowerCase())
        .then((response) => {
            moves = response.data.moves;
            ControllaMosse(moves)
        });

    mossa = "";

    function ControllaMosse(moves) {

        let mex = "";
        for (i in moves) {
            mossa += moves[i].move.name + "\n";
            dettaglimossa = moves[i].version_group_details;

            for (e in dettaglimossa) {
                mossa += "Lv: " + dettaglimossa[e].level_learned_at + "\n";
                mossa += "Modo: " + dettaglimossa[e].move_learn_method.name + +"\n";
                mossa += "\n" + "Gioco: " + dettaglimossa[e].version_group.name + "\n";
            }

            mex += mossa;
            mossa = "";
        }

        //Regex per splittare la stringa in sottostringhe da 4000 caratteri max (Il massimo di 1 messaggio telegram)
        let parts = mex.match(/[\s\S]{1,4000}/g) || [];

        parts.forEach((line) => ctx.reply(line));
    }
}