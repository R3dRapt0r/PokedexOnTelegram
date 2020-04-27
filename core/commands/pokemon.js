const axios = require('axios').default;

module.exports = (ctx) => {
    contatipi = 0;
    x = "";
    y = "";
    pokemon = "";

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
}