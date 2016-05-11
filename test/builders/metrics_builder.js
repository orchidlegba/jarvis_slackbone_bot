const test = require('tape');
const metricsBuilder = require.main.require('./app/builders/metrics_builder');

test('metric fields are filled', function (tape) {
    //arrange
    const jsonData =
        [
            {
                cols: [
                    {
                        metric: "coverage"
                    },
                    {
                        metric: "ncloc"
                    }
                ],
                cells: [
                    {
                        d: "2016-03-17T07:29:46+0000",
                        v: [
                            14.8,
                            112500
                        ]
                    }
                ]
            }
        ];

    //act
    let metrics = metricsBuilder.buildMetricsFromJson(jsonData[0]);
    console.log('size list of metrics -> ' + metrics.length);

    //assert
    tape.plan(2); // 1 cells * 2 assert
    tape.assert(metrics[0].getCoverage());
    tape.assert(metrics[0].getLinesOfCode());
});

