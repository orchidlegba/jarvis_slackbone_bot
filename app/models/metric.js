module.exports = class Metric {
    constructor(coverage, linesOfCode) {
        this.coverage = coverage;
        this.linesOfCode = linesOfCode;
    }

    getCoverage() {
        return this.coverage;
    }

    getLinesOfCode() {
        return this.linesOfCode;
    }
}