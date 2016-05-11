// require('log-timestamp');
const argv = require('optimist')
    .usage('Usage: $0 --textbot or --slackbot')
    .default('slackbot', true)
    .describe('textbot', 'start a local bot on the command line')
    .describe('slackbot', 'start a bot which integrates with Slack')
    .argv;

const textBot = require("./app/bots/textbot");
const slackBot = require("./app/bots/slackbot");

if (process.env.SONAR_API_HOST === undefined || process.env.SONAR_API_RESOURCE_KEY === undefined) {
    throw new Error("host or resourceKey cannot be empty");
} else if (argv.textbot) {
    console.log("# starting textbot ... \n");
    textBot.runBot();
} else if (argv.slackbot) {
    if (process.env.SLACK_API_TOKEN === undefined) {
         throw new Error("slack api token cannot be empty");
    } else {
        console.log("# starting slackbot ... \n");
        slackBot.runBot();
    }
} else {
    console.log("# no bot started");
}