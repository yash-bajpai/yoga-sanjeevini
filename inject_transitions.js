const fs = require('fs');

const files = ['index.html', 'yoga-details.html', 'instructor.html', 'faq.html'];

const transitionStyle = `
        /* Smooth Page Transitions */
        body {
            animation: fadeIn 0.6s cubic-bezier(0.2, 0, 0, 1) forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .page-transition-out {
            animation: fadeOut 0.4s cubic-bezier(0.2, 0, 0, 1) forwards !important;
        }

        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-12px); }
        }`;

const transitionScript = `
<!-- Page Transition Handler -->
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const internalLinks = document.querySelectorAll("a[href]");
        internalLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                const targetUrl = link.href;
                const currentHost = window.location.host;
                const isInternal = targetUrl.includes(currentHost) || !targetUrl.startsWith('http');
                const isAnchor = targetUrl.includes('#') && targetUrl.split('#')[0] === window.location.href.split('#')[0];
                const isBlank = link.hasAttribute("target") && link.getAttribute("target") === "_blank";

                // Only intercept internal standard links (not new tabs, not anchor links on same page)
                if (isInternal && !isAnchor && !isBlank) {
                    e.preventDefault();
                    document.body.classList.add('page-transition-out');
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 350); // Matches the 0.4s fadeOut roughly
                }
            });
        });
    });
</script>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // 1. Inject Styles
    if (!content.includes('.page-transition-out')) {
        content = content.replace('</style>', transitionStyle + '\n    </style>');
    }
    
    // 2. Inject Script
    if (!content.includes('Page Transition Handler')) {
        content = content.replace('</body>', transitionScript + '\n</body>');
    }
    
    fs.writeFileSync(file, content);
    console.log('Transitions added down to ' + file);
});
