const Telegraf = require('telegraf');
const token = '1115776649:AAHFt2ihfQHb4atXQ57Tov4Q-RF6rqzIz8Q';
const bot = new Telegraf(token);
const command = require('./core/command.js');

bot.start( () => ctx.reply("Scrivi /comando + nomepokemon"));

bot.command('pokemon', command.pokemon);

bot.command('moves', command.moves);

bot.command('basestats', command.basestats);

bot.command('box', command.box);

bot.command('save', command.save);

bot.command('help', command.help);

bot.launch();