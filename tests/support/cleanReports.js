const fs = require('fs-extra');
const path = require('path');

const reportsDir = path.join(__dirname, '../../reports');
const jsonDir = path.join(reportsDir, 'json');
const htmlReportDir = path.join(reportsDir, 'html-report');
const tracesDir = path.join(reportsDir, 'traces');
const screenshotsDir = path.join (reportsDir, 'screenshots');

// Clear older reports before a fresh test run
if (fs.existsSync(reportsDir)) {
    // Empty json directory and html-report directory
    fs.emptyDirSync(jsonDir);
    fs.emptyDirSync(htmlReportDir);
    fs.emptyDirSync(tracesDir);
    fs.emptyDirSync(screenshotsDir);
    
    // Also remove any leftover legacy JSON files directly inside reports/
    const files = fs.readdirSync(reportsDir);
    for (const file of files) {
        if (file.endsWith('.json')) {
            fs.removeSync(path.join(reportsDir, file));
        }
    }
}
console.log('✓ Cleaned up old reports.');
