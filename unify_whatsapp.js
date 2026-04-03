const fs = require('fs');

const files = ['index.html', 'yoga-details.html', 'instructor.html', 'faq.html'];

const unifiedStyle = `
        .whatsapp-glow {
            box-shadow: 0 0 15px rgba(44, 95, 79, 0.4), 0 0 5px rgba(239, 189, 138, 0.3);
            border: 1px solid rgba(239, 189, 138, 0.4);
        }`;

const unifiedButton = `
<!-- Floating WhatsApp Action Button -->
<div class="fixed bottom-8 right-8 z-[110]">
    <a class="w-16 h-16 rounded-full bg-[#2C5F4F] text-white whatsapp-glow flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl" href="https://wa.me/917975307028" target="_blank">
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.273.607-1.446.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.088.275.073.376-.044.101-.117.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179l-1.41 5.153 5.29-1.392C8.75 21.647 10.312 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.477 0-2.852-.362-4.057-1l-.29-.166-3.007.792.805-2.943-.182-.29c-.702-1.115-1.109-2.433-1.109-3.843 0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"></path>
        </svg>
    </a>
</div>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // 1. Ensure style is present
    if (!content.includes('.whatsapp-glow')) {
        content = content.replace('</style>', unifiedStyle + '\n    </style>');
    }
    
    // 2. Unify the button
    // This regex looks for common floating button patterns we've seen (fixed bottom-8 right-8 a/div tags)
    const floatRegex = /<!-- (Floating WhatsApp|WhatsApp Action) Button -->[\s\S]*?(<\/div>|<\/a>)\s*(?=<script|<\/body>)/;
    const directLinkRegex = /<a [^>]*fixed bottom-8 right-8[^>]*>[\s\S]*?<\/a>/;

    if (floatRegex.test(content)) {
        content = content.replace(floatRegex, unifiedButton);
    } else if (directLinkRegex.test(content)) {
        content = content.replace(directLinkRegex, unifiedButton);
    }
    
    fs.writeFileSync(file, content);
});

console.log('WhatsApp button unified across all pages.');
