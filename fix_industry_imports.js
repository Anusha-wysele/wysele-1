const fs = require('fs');
const path = require('path');

const industriesDir = path.join(__dirname, 'src', 'pages', 'Industries');

const files = fs.readdirSync(industriesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(industriesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace ../../../assets/ with ../../assets/
    if (content.includes('../../../assets/wysele-industries')) {
      content = content.replace(/\.\.\/\.\.\/\.\.\/assets\//g, '../../assets/');
      fs.writeFileSync(filePath, content);
      console.log(`Fixed import path in ${file}`);
    }
  }
});
