const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  path.join(__dirname, '../src/pages/SalesforceServices'),
  path.join(__dirname, '../src/pages/AiMlservices'),
  path.join(__dirname, '../src/pages/Cybersecurity'),
  path.join(__dirname, '../src/pages/WebDevelopment'),
  path.join(__dirname, '../src/pages/AppDevelopment'),
  path.join(__dirname, '../src/pages/IotServices')
];

const LINK_MAP = {
  'SAP Consulting': '/services/sap-consulting',
  'Salesforce': '/services/salesforce',
  'Cybersecurity': '/services/cybersecurityhome',
  'AI/ML': '/services/aiml-services',
  'IT Infrastructure': '/services/itinfrastructure',
  'Web Development': '/services/web-development',
  'App Development': '/services/app-development',
  'IoT': '/services/iot-services',
  'SAP Signavio': '/services/sap-signavio',
  'SAP Datasphere': '/services/sap-datasphere',
  'RISE with SAP': '/services/rise-with-sap',
  'SAP BTP': '/services/sap-btp',
  'SAP Integration': '/services/sap-integration',
  'SAP S/4HANA': '/services/sap-s4hana',
  'SAP GenAI': '/services/sap-genai',
  'SAP Master Data': '/services/sap-masterdata',
  'SAP OpenText': '/services/sap-opentext'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let modified = false;

  // We only replace inside JSX text nodes, roughly matching > text < 
  // We use a regex that looks for > followed by anything except < and > and then <
  content = content.replace(/>([^<>{}]*)</g, (match, text) => {
    let newText = text;
    for (const [keyword, url] of Object.entries(LINK_MAP)) {
      // Create a regex to match the keyword as a whole word
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      if (regex.test(newText) && !newText.includes('<Link')) {
        newText = newText.replace(regex, `<Link to="${url}" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">$1</Link>`);
      }
    }
    if (newText !== text) {
      modified = true;
      return `>${newText}<`;
    }
    return match;
  });

  if (modified) {
    // Check if Link is imported
    if (!content.includes('import { Link } from')) {
      // Find the last import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, endOfLastImport + 1) + `import { Link } from 'react-router-dom';\n` + content.slice(endOfLastImport + 1);
      } else {
        content = `import { Link } from 'react-router-dom';\n` + content;
      }
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

for (const dir of TARGET_DIRS) {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  }
}
console.log("Done.");
