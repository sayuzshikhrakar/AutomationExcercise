const fs = require('fs-extra');
const path = require('path');

async function generateReport() {
    const report = await import('multiple-cucumber-html-reporter');

    const browser = process.env.BROWSER || 'chromium';
    const reportsDir = path.join(__dirname, '../../reports');
    const reportPath = path.join(reportsDir, `html-report`);

    fs.ensureDirSync(reportsDir);
    fs.ensureDirSync(reportPath);

    report.generate({
        jsonDir: reportsDir,
        reportPath: reportPath,
        openReportInBrowser: true,
        displayDuration: true,
        metadata: {
            browser: {
                name: browser,
                version: 'latest'
            },
            device: 'Local Test Machine',
            platform: {
                name: process.platform === 'darwin' ? 'osx' : process.platform === 'win32' ? 'windows' : 'ubuntu'
            },
            customDate: {
                title: 'Run Information',
                data: [
                    { label: 'Project', value: 'Automation Exercise Web Suite' },
                    { label: 'Browser', value: browser.toUpperCase() },
                    { label: 'Execution Date', value: new Date().toLocaleString() }
                ]
            }
        }
    });
}

generateReport().catch(console.error);