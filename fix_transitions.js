const fs = require('fs');

const files = ['index.html', 'yoga-details.html', 'instructor.html', 'faq.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Removing transform animation context from body so position: fixed behaves normally relative to viewport.
    content = content.replace(/body \{\s*animation: fadeIn 0\.6s cubic-bezier\(0\.2, 0, 0, 1\) forwards;\s*\}/, 'body { animation: fadeIn 0.8s ease-out; }');
    
    content = content.replace(/@keyframes fadeIn \{\s*from \{ opacity: 0; transform: translateY\(12px\); \}\s*to \{ opacity: 1; transform: translateY\(0\); \}\s*\}/, '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }');
    
    // No forwards is needed since default opacity is 1 and we want it to revert to initial styling state context.
    content = content.replace(/\.page-transition-out \{\s*animation: fadeOut 0\.4s cubic-bezier\(0\.2, 0, 0, 1\) forwards !important;\s*\}/, '.page-transition-out { animation: fadeOut 0.4s ease-out forwards !important; }');
    
    content = content.replace(/@keyframes fadeOut \{\s*from \{ opacity: 1; transform: translateY\(0\); \}\s*to \{ opacity: 0; transform: translateY\(-12px\); \}\s*\}/, '@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }');

    fs.writeFileSync(file, content);
    console.log('Fixed transitions in ' + file);
});
