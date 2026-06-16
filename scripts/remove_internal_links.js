const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const pagesDir = path.join(srcDir, 'pages');

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

// Regex to match nested Links like <Link to=...><Link to=...>Text</Link></Link>
const nestedLinkRegex = /<Link\s+to="[^"]+"[^>]*>\s*<Link\s+to="[^"]+"[^>]*>([\s\S]*?)<\/Link>\s*<\/Link>/g;

// Regex to match single Links pointing to /services/ or other internal paths
const serviceLinkRegex = /<Link\s+to="\/services\/[^"]+"[^>]*>([\s\S]*?)<\/Link>/g;
const genericInternalLinkRegex = /<Link\s+to="\/services[^"]*"[^>]*>([\s\S]*?)<\/Link>/g;

walk(pagesDir, (filePath) => {
  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;

  // Skip admin pages
  const relative = path.relative(pagesDir, filePath);
  if (relative.startsWith('Admin') || relative.startsWith('admin')) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Apply replacement for nested links first
  content = content.replace(nestedLinkRegex, '$1');
  
  // Apply replacement for single links
  content = content.replace(serviceLinkRegex, '$1');
  content = content.replace(genericInternalLinkRegex, '$1');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: pages/${relative}`);
  }
});

console.log('Link removal script completed successfully!');
