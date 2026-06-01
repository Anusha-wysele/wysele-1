const fs = require('fs');
const path = require('path');

const industriesDir = path.join(__dirname, 'src', 'pages', 'Industries');

const imageMapping = {
  'AEROSPACE_IMAGE': 'wysele-AerospaceDefense.webp',
  'AGRIBUSINESS_IMAGE': 'wysele-industires-agribusines.webp',
  'AUTOMOTIVE_IMAGE': 'wysele-industry-automotive-heavy-equipment.webp',
  'BANKING_IMAGE': 'Banking.webp',
  'LOGISTICS_IMAGE': 'wysele-industry-logistics.webp',
  'MANUFACTURING_IMAGE': 'wysele-industires-manufacturing.jpeg',
  'MINING_IMAGE': 'wysele-Industry-mining.webp',
  'PHARMA_IMAGE': 'wysele-industires-pharma.webp',
  'RETAIL_IMAGE': 'Retail.webp',
  'TEXTILES_IMAGE': 'wysele-industry-textile.webp',
  'UTILITIES_IMAGE': 'wysele-industires-utilities.webp'
};

const files = fs.readdirSync(industriesDir).filter(f => f.endsWith('.jsx') && !f.includes('Section') && !f.includes('Hero') && !f.includes('Nav') && !f.includes('Page'));

files.forEach(file => {
  const filePath = path.join(industriesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find which image variable is imported
  const regex = /import\s*\{\s*([A-Z_]+)\s*\}\s*from\s*"[^"]+";?/;
  const match = content.match(regex);
  if (match) {
    const varName = match[1];
    const imgFileName = imageMapping[varName];
    
    if (imgFileName) {
      // Replace the import
      content = content.replace(regex, `import ${varName} from "../../../assets/${imgFileName}";`);
      
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
