const fs = require('fs');
const path = require('path');

const industriesDir = path.join(__dirname, 'src', 'pages', 'Industries');

const fileMapping = {
  'IndustriesAerospace.jsx': { varName: 'AEROSPACE_IMAGE', newImage: 'wysele-industriesaerospace.webp' },
  'IndustriesAgribusiness.jsx': { varName: 'AGRIBUSINESS_IMAGE', newImage: 'wysele-industriesagribusinesses.webp' },
  'IndustriesAutomotive.jsx': { varName: 'AUTOMOTIVE_IMAGE', newImage: 'wysele-industriesautomotives.webp' },
  'IndustriesBanking.jsx': { varName: 'BANKING_IMAGE', newImage: 'wysele-industriesbanking.webp' },
  'IndustriesLogistics.jsx': { varName: 'LOGISTICS_IMAGE', newImage: 'wysele-industrieslogistics.webp' },
  'IndustriesManufacturing.jsx': { varName: 'MANUFACTURING_IMAGE', newImage: 'wysele-industriesmanufacturing.webp' },
  'IndustriesMining.jsx': { varName: 'MINING_IMAGE', newImage: 'wysele-industriesmining.webp' },
  'IndustriesPharmaceutical.jsx': { varName: 'PHARMA_IMAGE', newImage: 'wysele-industriespharma.webp' },
  'IndustriesRetail.jsx': { varName: 'RETAIL_IMAGE', newImage: 'wysele-industriesretail.webp' },
  'IndusstriesTextiles.jsx': { varName: 'TEXTILES_IMAGE', newImage: 'wysele-industriestextile.webp' },
  'Industriesutilities.jsx': { varName: 'UTILITIES_IMAGE', newImage: 'wysele-industriesutilities.webp' }
};

Object.keys(fileMapping).forEach(fileName => {
  const filePath = path.join(industriesDir, fileName);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const { varName, newImage } = fileMapping[fileName];
    
    // Find the current import line
    // e.g. import AEROSPACE_IMAGE from "../../../assets/wysele-AerospaceDefense.webp";
    const regex = new RegExp(`import\\s+${varName}\\s+from\\s+["'][^"']+["'];?`);
    const match = content.match(regex);
    
    if (match) {
      // Replace with new image
      content = content.replace(regex, `import ${varName} from "../../../assets/${newImage}";`);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${fileName} with ${newImage}`);
    } else {
      console.log(`Could not find import for ${varName} in ${fileName}`);
    }
  }
});
