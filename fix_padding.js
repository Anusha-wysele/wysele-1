const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

function traverseAndFix(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseAndFix(fullPath);
        } else if (file.endsWith('Hero.jsx') || file.endsWith('hero.jsx') || file.endsWith('Home.jsx') || file.endsWith('home.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Many hero components have `pt-16`, `pt-20`, `py-12` in their inner content containers.
            // We want to replace `pt-16` with `pt-32` if it's not lg:pt-16
            // Replace `pt-20` with `pt-32`
            
            // Regex to find `pt-16` that is not preceded by `md:` or `lg:` or `xl:`
            // Actually, just safely replacing `pt-16 ` or `"pt-16 ` with `pt-32 `
            const replacements = [
                { regex: /(?<!lg:|md:|xl:|sm:)pt-16/g, replacement: 'pt-32 md:pt-16' },
                { regex: /(?<!lg:|md:|xl:|sm:)pt-20/g, replacement: 'pt-32 md:pt-20' },
                { regex: /(?<!lg:|md:|xl:|sm:)py-12/g, replacement: 'pt-32 pb-12 md:py-12' },
                { regex: /pt-\[68px\]/g, replacement: 'pt-[140px]' }
            ];

            // Wait, if I replace `pt-[68px]` with `pt-[140px]`, it will change the Hero's main container padding.
            // The Hero's main container usually has `pt-[68px]` to offset the Navbar.
            // If we change it to `pt-[140px]`, the entire Hero content shifts down by 72px!
            // This is EXACTLY what we want! Because the Breadcrumb is at `top-[110px]` and is 30px tall, so it ends at 140px.
            // If the Hero container itself has `pt-[140px] lg:pt-0` instead of `pt-[68px] lg:pt-0`, 
            // then ALL content inside the Hero will start at 140px, safely below the Breadcrumb!
            // This is the cleanest fix.
            
            // Let's replace `pt-[68px] lg:pt-0` with `pt-[140px] lg:pt-0`.
            if (content.includes('pt-[68px]')) {
                content = content.replace(/pt-\[68px\]/g, 'pt-[140px]');
                modified = true;
            }
            
            // Also some heroes might just use `pt-20` or `pt-16` without `pt-[68px]`.
            if (content.includes('pt-20') && !content.includes('md:pt-20') && !content.includes('lg:pt-20')) {
                content = content.replace(/(?<!lg:|md:|xl:|sm:)pt-20/g, 'pt-[140px] md:pt-20');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated padding in ${file}`);
            }
        }
    }
}

traverseAndFix(directoryPath);
console.log('Finished updating padding.');
