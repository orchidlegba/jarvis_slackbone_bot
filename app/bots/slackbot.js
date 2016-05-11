var Botkit = require('botkit');
var builder = require('botbuilder');
var dialogHandlers = require.main.require("./app/dialog_handlers/sonar_dialog");

module.exports.runBot = function () {
  let controller = Botkit.slackbot();
  let bot = controller.spawn({
    token: process.env.SLACK_API_TOKEN
  });

  let slackBot = new builder.SlackBot(controller, bot);
  slackBot.add('/', dialogHandlers);
  slackBot.listenForMentions();

  bot.startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error('Could not connect to Slack');
    }
  });
}