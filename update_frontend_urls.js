const fs = require('fs');
const path = require('path');

const PRODUCTION_BACKEND_URL = "https://vehicle-rental-management-cotn.onrender.com";
const frontendDir = path.join(__dirname, 'frontend');

if (!fs.existsSync(frontendDir)) {
    console.error(`Directory ${frontendDir} not found.`);
    process.exit(1);
}

const files = fs.readdirSync(frontendDir);

files.forEach(filename => {
    if (filename.endsWith('.html')) {
        const filepath = path.join(frontendDir, filename);
        let content = fs.readFileSync(filepath, 'utf8');

        const newLogic = `const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5000' : '${PRODUCTION_BACKEND_URL}'`;
        
        // Use a more flexible regex to catch various patterns
        const newContent = content.replace(/const API_BASE\s*=\s*window\.location\.hostname.*?;/gs, newLogic + ';');

        if (newContent !== content) {
            fs.writeFileSync(filepath, newContent, 'utf8');
            console.log(`Updated ${filename}`);
        } else {
            console.log(`Skipped ${filename} (pattern not found)`);
        }
    }
});

console.log('All frontend files updated.');
