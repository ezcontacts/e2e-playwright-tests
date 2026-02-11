import fs from "fs";
import path from "path";

const REPORTS_DIR = "reports";
const XRAY_DIR = "xray";
const REPORT_FILE_NAME = "xray-report.json";


if (!fs.existsSync(XRAY_DIR)) {
  fs.mkdirSync(XRAY_DIR, { recursive: true });
}

function loadReport(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function collectResults(report, platform) {
  const results = [];

  function walkSuites(suites = []) {
    for (const suite of suites) {
      if (suite.specs) {
        for (const spec of suite.specs) {
          for (const test of spec.tests || []) {
            const result = test.results?.[0];

            const status =
              result?.status === "passed"
                ? "PASS"
                : result?.status === "skipped"
                ? "SKIP"
                : "FAIL";

            results.push({
              testName: spec.title,
              platform,
              status,
              error: result?.error?.message || null
            });
          }
        }
      }

      if (suite.suites) {
        walkSuites(suite.suites);
      }
    }
  }

  walkSuites(report.suites);
  return results;
}

const projectFolders = fs
  .readdirSync(REPORTS_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

if (!projectFolders.length) {
  console.error("Folder not found in reports/");
  process.exit(1);
}

let allResults = [];

for (const project of projectFolders) {
  const reportPath = path.join(REPORTS_DIR, project, "report.json");

  if (!fs.existsSync(reportPath)) {
    console.warn(`Report not fount: ${reportPath}`);
    continue;
  }

  const report = loadReport(reportPath);
  allResults = allResults.concat(collectResults(report, project));
}

const grouped = new Map();

for (const r of allResults) {
  if (!grouped.has(r.testName)) grouped.set(r.testName, []);
  grouped.get(r.testName).push(r);
}

const tests = [];

for (const [testName, executions] of grouped.entries()) {
  const hasFail = executions.some(e => e.status === "FAIL");
  const finalStatus = hasFail ? "FAIL" : "PASS";

  const commentLines = executions.map(e => {
    return `• ${e.platform}: ${e.status}${e.error ? `\n  ${e.error}` : ""}`;
  });

  tests.push({
    summary: testName,
    status: finalStatus,
    comment: commentLines.join("\n")
  });
}

const xrayReportPath = path.join(XRAY_DIR, REPORT_FILE_NAME);

const xrayReport = {
  info: {
    summary: "Playwright BDD aggregated execution",
    description: "Each test is PASS only if it passed on all environments"
  },
  tests
};

fs.writeFileSync(xrayReportPath, JSON.stringify(xrayReport, null, 2));

console.log(`${xrayReportPath} created (tests: ${tests.length})`);
console.log(`Projects merged: ${projectFolders.join(", ")}`);
