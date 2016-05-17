const Metric = require.main.require('./app/models/metric');

function buildMetricModelFromJsonNodeCell (cell) {
    let coverageValueMetric = cell.v[0];
    let linesOfCodeValueMetric = cell.v[1];

    let metric = new Metric(coverageValueMetric, linesOfCodeValueMetric);
    return metric;
}

module.exports.buildMetricsFromJson = function (json) {
    let metrics = [];
    for (let cell of json.cells) {
        let metric = buildMetricModelFromJsonNodeCell(cell);
        metrics.push(metric);
    }
    return metrics;
}