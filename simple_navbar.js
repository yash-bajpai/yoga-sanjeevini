const fs = require('fs');

const pages = [
  { file: 'yoga-details.html', activeHref: 'yoga-details.html' },
  { file: 'instructor.html',   activeHref: 'instructor.html' },
  { file: 'faq.html',          activeHref: 'faq.html' },
];

const navLinks = [
  { href: 'index.html',        label: 'Home' },
  { href: 'yoga-details.html', label: 'Classical Hatha Yoga' },
  { href: 'instructor.html',   label: 'About Instructor' },
  { href: 'faq.html',          label: 'Benefits & FAQ' },
];

const buildSimpleNav = (activeHref) => {
  const linkHtml = navLinks.map(link => {
    const isActive = link.href === activeHref;
    const cls = isActive
      ? 'text-emerald-700 border-b-2 border-emerald-600 pb-0.5 font-label text-[13px] font-semibold uppercase tracking-[0.15em]'
      : 'text-stone-500 font-label text-[13px] font-semibold uppercase tracking-[0.15em] hover:text-emerald-700 transition-colors duration-200';
    return `<a class="${cls}" href="${link.href}">${link.label}</a>`;
  }).join('\n');

  return `<!-- Top Navigation Bar -->
<nav class="w-full top-0 fixed h-[72px] z-50 bg-white border-b border-stone-100">
<div class="flex justify-between items-center w-full px-6 md:px-12 max-w-screen-2xl mx-auto h-full">
  <div class="text-[22px] font-serif text-emerald-900 tracking-tight font-headline">Yoga Sanjeevini</div>
  <div class="hidden md:flex items-center space-x-8">
${linkHtml}
  </div>
  <div class="hidden md:block">
    <button class="bg-[#1a3d30] text-white px-7 py-3 rounded-full font-label text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-emerald-900 transition-colors duration-200">
      Start Your Journey
    </button>
  </div>
  <button id="mobile-menu-open" class="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-emerald-900/10 text-emerald-900 border border-emerald-900/20 hover:bg-emerald-900/20 transition-all duration-200" aria-label="Open menu">
    <span class="material-symbols-outlined text-2xl">menu</span>
  </button>
</div>
</nav>`;
};

// Match both old glassmorphism nav (main-nav) and current simple sticky nav
const OLD_NAV_REGEX = /<!-- Top Navigation Bar -->\s*<nav[\s\S]*?<\/nav>/;

// Match the scroll-reactive nav script (references main-nav and setScrolledState)
const OLD_NAV_SCRIPT_REGEX = /<script>\s*document\.addEventListener\("DOMContentLoaded",[\s\S]*?setScrolledState[\s\S]*?<\/script>/;

pages.forEach(({ file, activeHref }) => {
  let content = fs.readFileSync(file, 'utf-8');

  if (OLD_NAV_REGEX.test(content)) {
    content = content.replace(OLD_NAV_REGEX, buildSimpleNav(activeHref));
    console.log('[nav html]   replaced in ' + file);
  } else {
    console.warn('[nav html]   NOT FOUND in ' + file);
  }

  if (OLD_NAV_SCRIPT_REGEX.test(content)) {
    content = content.replace(OLD_NAV_SCRIPT_REGEX, '');
    console.log('[nav script] removed  in ' + file);
  } else {
    console.warn('[nav script] NOT FOUND in ' + file);
  }

  fs.writeFileSync(file, content);
});

console.log('\nDone.');
