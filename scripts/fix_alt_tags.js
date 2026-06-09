const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  path.join(__dirname, '../src/pages'),
  path.join(__dirname, '../src/components')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Match the broken alt tags
  content = content.replace(/alt="<Link[\s\S]*?<\/Link>[^"]*"/g, (match) => {
    // Strip out <Link...> and </Link>
    let clean = match.replace(/<Link[^>]*>/g, '').replace(/<\/Link>/g, '');
    return clean;
  });

  // Also catch single-quoted alt attributes if any exist
  content = content.replace(/alt='<Link[\s\S]*?<\/Link>[^']*'/g, (match) => {
    let clean = match.replace(/<Link[^>]*>/g, '').replace(/<\/Link>/g, '');
    return clean;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

for (const dir of TARGET_DIRS) {
  walkDir(dir);
}
console.log("Done fixing alt tags.");
