const browser = process.env.BROWSER || "chromium";
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

module.exports = {
    default: {
        paths: ['tests/feature/*.feature'],
        require: ['tests/support/world.ts', 'tests/steps/**/*.ts'],
        format: ['pretty', `json:test-results/report-${browser}-${timestamp}.json`],
        requireModule: ['tsx'],
        format: [
            'summary',
            'json:reports/cucumber_report.${browser}.${timestamp}.json'
        ],
        formatOptions: {
            snipperInterface: 'async-await'
        }
    }
};