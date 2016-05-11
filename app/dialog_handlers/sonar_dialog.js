const builder = require('botbuilder');
const timelineQuery = require.main.require('./app/queries/timeline_query');
const promiseRequest =  require.main.require('./app/requests/promise_request');
const metricsBuilder = require.main.require('./app/builders/metrics_builder');

module.exports = new builder.CommandDialog()
    .matches('^(hello|hi|howdy|help)', builder.DialogAction.send("Nice to meet you"))
    .matches('^(explain trend)', explainTrend)
    .matches('^(show measures)', showTrend)
    ;

function explainTrend(session, args) {
    promiseRequest.getHttpContent(timelineQuery.sonarApiTimelineQuery())
        .then((jsonText) => {
            let json = JSON.parse(jsonText)[0];
            let metrics = metricsBuilder.buildMetricsFromJson(json);

            let firstCoverageMetric = metrics.slice(-1)[0].getCoverage();
            let lastCoverageMetric = metrics.slice(-1).pop().getCoverage();

            if (lastCoverageMetric > firstCoverageMetric) {
                session.send("Code Coverage has increased");
            } else if (lastCoverageMetric === firstCoverageMetric) {
                session.send("Code Coverage has stayed the same");
            } else {
                session.send("Code Coverage has decreased");
            }
        })
        .catch((err) => console.error(err))
}

function showTrend(session, args) {
    promiseRequest.getHttpContent(timelineQuery.sonarApiTimelineQuery())
        .then((jsonText) => {
            let json = JSON.parse(jsonText)[0];
            let metrics = metricsBuilder.buildMetricsFromJson(json);

            let coverages = [];
            let linesOfCodes = [];
            for (let metric of metrics) {
                coverages.push(metric.getCoverage());
                linesOfCodes.push(metric.getLinesOfCode());
            }
            session.send(`Code Coverage measures -> (${coverages.join(',')})`);
            session.send(`Lines of Code measures -> (${linesOfCodes.join(',')})`);
        })
        .catch((err) => console.error(err))
}    