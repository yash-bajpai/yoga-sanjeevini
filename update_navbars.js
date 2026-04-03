const fs = require('fs');

// Per-page config: which link is "active" (underlined)
const pages = [
  {
    file: 'yoga-details.html',
    activeHref: 'yoga-details.html',
  },
  {
    file: 'instructor.html',
    activeHref: 'instructor.html',
  },
  {
    file: 'faq.html',
    activeHref: 'faq.html',
  },
];

const buildNav = (activeHref) => {
  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'yoga-details.html', label: 'Classical Hatha Yoga' },
    { href: 'instructor.html', label: 'About Instructor' },
    { href: 'faq.html', label: 'Benefits' },
    { href: 'faq.html', label: 'FAQ' },
  ];

  const linkHtml = links.map(link => {
    const isActive = link.href === activeHref;
    const base = 'font-label text-xs uppercase tracking-widest nav-link';
    const activeClass = isActive
      ? 'text-white/90 border-b-2 border-white/50 pb-1'
      : 'text-white/75 font-medium hover:text-white transition-colors duration-300';
    return `<a class="${base} ${activeClass}" href="${link.href}">${link.label}</a>`;
  }).join('\n');

  return `<!-- Top Navigation Bar -->
<nav id="main-nav" class="docked full-width w-full top-0 fixed h-[80px] z-50 transition-all duration-500 ease-in-out bg-black/30 backdrop-blur-md">
<div class="flex justify-between items-center w-full px-4 md:px-12 max-w-screen-2xl mx-auto h-full">
<div class="text-2xl font-serif text-white tracking-tight font-headline nav-brand">Yoga Sanjeevini</div>
<div class="hidden md:flex items-center space-x-10">
${linkHtml}
</div>
<div class="hidden md:block"><button class="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-label text-xs uppercase tracking-widest hover:bg-white hover:text-emerald-900 transition-all duration-300 shadow-sm nav-cta">
                Start Your Journey
            </button></div>
<button id="mobile-menu-open" class="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300" aria-label="Open menu">
                <span class="material-symbols-outlined text-2xl">menu</span>
            </button>
            </nav>`;
};

const navScript = `<script>
    document.addEventListener("DOMContentLoaded", () => {
        const nav = document.getElementById("main-nav");
        if (!nav) return;

        const brand = nav.querySelector(".nav-brand");
        const links = nav.querySelectorAll(".nav-link");
        const cta = nav.querySelector(".nav-cta");

        let isScrolled = false;

        const setScrolledState = () => {
            if (isScrolled) return;
            isScrolled = true;
            nav.classList.remove("bg-black/30", "backdrop-blur-md");
            nav.classList.add("bg-white/80", "backdrop-blur-xl", "shadow-sm", "border-b", "border-stone-100");

            if (brand) { brand.classList.remove("text-white"); brand.classList.add("text-emerald-900"); }
            links.forEach((link, i) => {
                link.classList.remove("text-white/90", "text-white/75", "border-white/50", "hover:text-white");
                if (link.classList.contains("border-b-2")) {
                    link.classList.add("text-emerald-900", "border-yellow-700/50");
                    link.classList.remove("border-white/50");
                } else {
                    link.classList.add("text-stone-600", "hover:text-emerald-700");
                }
            });
            if (cta) {
                cta.classList.remove("bg-white/20", "border-white/30", "text-white", "hover:text-emerald-900");
                cta.classList.add("bg-primary", "text-white", "border-transparent");
            }
        };

        const setTopState = () => {
            if (!isScrolled) return;
            isScrolled = false;
            nav.classList.add("bg-black/30", "backdrop-blur-md");
            nav.classList.remove("bg-white/80", "backdrop-blur-xl", "shadow-sm", "border-b", "border-stone-100");

            if (brand) { brand.classList.add("text-white"); brand.classList.remove("text-emerald-900"); }
            links.forEach((link, i) => {
                link.classList.remove("text-emerald-900", "text-stone-600", "border-yellow-700/50", "hover:text-emerald-700");
                if (link.classList.contains("border-b-2")) {
                    link.classList.add("text-white/90", "border-white/50");
                } else {
                    link.classList.add("text-white/75", "hover:text-white");
                }
            });
            if (cta) {
                cta.classList.add("bg-white/20", "border-white/30", "text-white", "hover:text-emerald-900");
                cta.classList.remove("bg-primary", "border-transparent");
            }
        };

        window.addEventListener("scroll", () => {
            if (window.scrollY > 60) {
                setScrolledState();
            } else {
                setTopState();
            }
        });
    });
</script>`;

// Regex to match old top nav element (not the mobile drawer nav)
const OLD_NAV_REGEX = /<!-- (?:TopNavBar|Top Navigation Bar) -->\s*<nav[\s\S]*?<\/nav>/;
// Regex to match the old nav activation script block
const OLD_NAV_SCRIPT_REGEX = /<script>\s*document\.addEventListener\("DOMContentLoaded",\s*\(\)\s*=>\s*\{\s*const nav = document\.querySelector\("nav"\);[\s\S]*?\}\);\s*<\/script>/;

pages.forEach(({ file, activeHref }) => {
  let content = fs.readFileSync(file, 'utf-8');

  // Replace old nav HTML
  if (OLD_NAV_REGEX.test(content)) {
    content = content.replace(OLD_NAV_REGEX, buildNav(activeHref));
    console.log('[nav html]  replaced in ' + file);
  } else {
    console.warn('[nav html]  NOT FOUND in ' + file + ' - manual check needed');
  }

  // Replace old nav script
  if (OLD_NAV_SCRIPT_REGEX.test(content)) {
    content = content.replace(OLD_NAV_SCRIPT_REGEX, navScript);
    console.log('[nav script] replaced in ' + file);
  } else {
    console.warn('[nav script] NOT FOUND in ' + file + ' - may already be updated or needs manual check');
  }

  fs.writeFileSync(file, content);
});

console.log('\nDone! All navbars updated.');
