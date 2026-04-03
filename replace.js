const fs = require('fs');
const path = require('path');

const files = ['index.html', 'yoga-details.html', 'instructor.html', 'faq.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');

    // Home
    content = content.replace(
        /<a([^>]*)>Home<\/a>/g, 
        '<a$1 href="index.html">Home</a>'
    );
    // Classical Hatha Yoga
    content = content.replace(
        /<a([^>]*)>Classical Hatha Yoga<\/a>/g, 
        '<a$1 href="yoga-details.html">Classical Hatha Yoga</a>'
    );
    // About Instructor
    content = content.replace(
        /<a([^>]*)>About Instructor<\/a>/g, 
        '<a$1 href="instructor.html">About Instructor</a>'
    );
    // Benefits
    content = content.replace(
        /<a([^>]*)>Benefits<\/a>/g, 
        '<a$1 href="faq.html">Benefits</a>'
    );
    // FAQ
    content = content.replace(
        /<a([^>]*)>FAQ<\/a>/g, 
        '<a$1 href="faq.html">FAQ</a>'
    );
    
    // Also cleanup any duplicates that had href="#" before the class
    content = content.replace(/href="#" ([^>]*) href="([^"]*)"/g, '$1 href="$2"');
    content = content.replace(/([A-Za-z0-9_]+="[^"]*") href="#" ([A-Za-z0-9_]+="[^"]*")/g, '$1 $2');
    // If it still has href="#" but we added a new href
    content = content.replace(/href="#"(.*?)href="([^"]*)"/g, '$1 href="$2"');
    content = content.replace(/href="([^"]*)"(.*?)href="#"/g, 'href="$1"$2');


    fs.writeFileSync(file, content);
});

console.log('Done replacing strings');
