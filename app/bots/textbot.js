const builder = require('botbuilder');
const dialogHandlers = require.main.require("./app/dialog_handlers/sonar_dialog");

module.exports.runBot = function () {
    let textBot = new builder.TextBot();
    textBot.add('/', dialogHandlers);
    textBot.listenStdin();
}



