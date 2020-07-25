const path = require('path');
const __basedir = path.join(__dirname, '..');
const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'instamit',
    'sonar.projectName': 'raw-node-boilerplate',
    'sonar.sources': '.',
    'sonar.inclusions': 'controllers/**, modules/**, index.js',
    'sonar.exclusions': 'configs/**, coverage/**, logs/**, node_modules/**, public/**, test/**, views/**, log/**, vscode/**, stryker-tmp/**, sonarlint/**, scannerwork/**',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.issuesReport.console.enable': 'true',
    'sonar.language': 'js',
    'sonar.dynamicAnalysis': 'reuseReports',
    'sonar.javascript.coveragePlugin': 'lcov',
    'sonar.test.ExecutionReportPaths': 'coverage/clover.xml',
  },
}, () => {});
