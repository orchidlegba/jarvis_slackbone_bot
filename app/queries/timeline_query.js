module.exports.sonarApiTimelineQuery = function () {
    let host = process.env.SONAR_API_HOST;
    let resourceKey = process.env.SONAR_API_RESOURCE_KEY;
    let apiTimelineQuery = `/api/timemachine?resource=${resourceKey}&metrics=coverage,ncloc&fromDateTime=2012-01-01T00:00:00+0100`;
    let hostWithQuery = `${host}${apiTimelineQuery}`;
    return hostWithQuery;
}