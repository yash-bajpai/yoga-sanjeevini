const fs = require('fs');
const path = require('path');

const files = ['index.html', 'yoga-details.html', 'instructor.html', 'faq.html'];

const scriptInjection = `
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const nav = document.querySelector("nav");
        if (!nav) return;
        
        let isActive = false;
        
        const activateNav = () => {
            if (isActive) return;
            isActive = true;
            nav.classList.remove("bg-transparent");
            nav.classList.add("bg-white/70", "dark:bg-emerald-950/70", "backdrop-blur-xl");
        };

        window.addEventListener("mousemove", activateNav, {once: true});
        window.addEventListener("scroll", () => {
            if (window.scrollY > 10) activateNav();
        });
        
        if (window.scrollY > 10) {
            activateNav();
        }
    });
</script>
</body>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');

    // Make the nav initially transparent
    // Find the nav element and replace the background classes
    content = content.replace(
        /(<nav [^>]*class="[^"]*)(bg-white\/70|dark:bg-emerald-950\/70|backdrop-blur-xl)([^"]*")/g,
        (match, p1, p2, p3) => {
            // Remove those classes and add bg-transparent if not already there
            let newClasses = match.replace(/bg-white\/70/g, '')
                                .replace(/dark:bg-emerald-950\/70/g, '')
                                .replace(/backdrop-blur-xl/g, '');
                                
            if (!newClasses.includes('bg-transparent')) {
                // insert it before the closing quote
                newClasses = newClasses.replace(/"$/g, ' bg-transparent"');
            }
            return newClasses;
        }
    );
    
    // Some lines might still have them if the previous replace did not catch all 3. 
    // To be safer, we can just do a replace on the `<nav ` line.
    // Actually, better yet, just replace them all within the nav tag
    content = content.replace(/(<nav[^>]+>)/ig, (match) => {
         let res = match.replace(/bg-white\/70/g, '')
             .replace(/dark:bg-emerald-950\/70/g, '')
             .replace(/backdrop-blur-xl/g, '');
         if (!res.includes('bg-transparent')) {
             res = res.replace(/(class="[^"]*)"/, '$1 bg-transparent"');
         }
         return res;
    });

    // Remove the script if it was added before to prevent duplicates
    content = content.replace(/<script>\s*document\.addEventListener\("DOMContentLoaded", \(\) => \{\s*const nav = document\.querySelector\("nav"\);[\s\S]*?<\/script>\s*<\/body>/, '</body>');

    // Add script before </body>
    content = content.replace(/<\/body>/, scriptInjection);

    fs.writeFileSync(file, content);
});

console.log('Navbars updated!');
