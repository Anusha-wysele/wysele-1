const fs = require('fs');

const files = [
    'src/pages/WebDevelopment/WebDevelopmenthero.jsx',
    'src/pages/SapServices/SapServiceshero.jsx',
    'src/pages/SalesforceServices/salesforcehero.jsx',
    'src/pages/OurServices/SapVimbrim/SapVimhero.jsx',
    'src/pages/OurServices/SapTechnicalconsulting/SapTechnicalconsultinghero.jsx',
    'src/pages/OurServices/SapSignavio/SapSignavioHero.jsx',
    'src/pages/OurServices/SapS4hana/SapS4hero.jsx',
    'src/pages/OurServices/SapMasterdata/SapMasterhero.jsx',
    'src/pages/OurServices/SapOpentext/SapOpentexthero.jsx',
    'src/pages/OurServices/SapGenai/SapGenhero.jsx',
    'src/pages/OurServices/SapIntegration/SapIntegrationhero.jsx',
    'src/pages/OurServices/SapDatasphere/SapDatahero.jsx',
    'src/pages/OurServices/SapConsulting/SapHero.jsx',
    'src/pages/OurServices/RiseWithsap/RiseWithsaphero.jsx',
    'src/pages/OurServices/SapBtpapimanagement/SapBtpapihero.jsx',
    'src/pages/OurServices/MigrationServices/SapMigrationhero.jsx',
    'src/pages/OurServices/BtpServices/BtpHero.jsx',
    'src/pages/Iotservice/IotHero.jsx',
    'src/pages/ITinfrastructure/ItInfrastructureHero.jsx',
    'src/pages/Cybersecurity/Cybersecurityhero.jsx',
    'src/pages/AppDeveiopment/AppDevelopmenthero.jsx',
    'src/pages/AiMlservices/AiMlhero.jsx'
];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    
    let c = fs.readFileSync(f, 'utf8');
    let modified = false;
    
    // Add fetchpriority to the first <img or <motion.img that doesn't have it
    if (!c.includes('fetchpriority="high"')) {
        // Try replacing <img first
        if (c.includes('<img ')) {
            c = c.replace(/<img\s+/, '<img fetchpriority="high" ');
            modified = true;
        } else if (c.includes('<motion.img ')) {
            c = c.replace(/<motion\.img\s+/, '<motion.img fetchpriority="high" ');
            modified = true;
        } else if (c.includes('<img\n')) {
            c = c.replace(/<img\n/, '<img fetchpriority="high"\n');
            modified = true;
        } else if (c.includes('<motion.img\n')) {
            c = c.replace(/<motion\.img\n/, '<motion.img fetchpriority="high"\n');
            modified = true;
        }
    }
    
    // Remove the opacity: 0 from initial framer-motion states, replace with opacity: 1
    if (c.match(/initial=\{\{[^}]*opacity:\s*0/)) {
        c = c.replace(/(initial=\{\{[^}]*opacity:\s*)0/g, '$11');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(f, c);
        console.log('Updated:', f);
    }
});
