const browser = process.env.BROWSER || "chromium";
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

module.exports = {
    default: {
        paths: ['tests/feature/*.feature','tests/api/feature/*.feature'],
        require: ['tests/support/world.ts', 'tests/steps/**/*.ts', 'tests/api/support/**/*.ts',
  'tests/api/steps/**/*.ts'],
        requireModule: ['tsx'],
      format: [
    'pretty',
    'summary',
    `json:reports/json/cucumber_report.${browser}.${timestamp}.json`
],
        formatOptions: {
            snipperInterface: 'async-await'
        }
    }
};