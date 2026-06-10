const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walk(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
}

const files = walk(path.join(__dirname, 'src'));

let altFixes = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Add empty alt to <img> missing alt attribute
  content = content.replace(/<img([^>]+)>/g, (match, attrs) => {
    if (!attrs.includes('alt=')) {
      altFixes++;
      return `<img${attrs} alt="wysele-image">`;
    }
    return match;
  });

  // Add empty alt to <motion.img> missing alt attribute
  content = content.replace(/<motion\.img([^>]+)>/g, (match, attrs) => {
    if (!attrs.includes('alt=')) {
      altFixes++;
      return `<motion.img${attrs} alt="wysele-animated-image">`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed alt tags in ${file}`);
  }
});

console.log(`Done! Fixed ${altFixes} image tags missing alt attributes.`);
