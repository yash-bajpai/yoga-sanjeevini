const fs = require('fs');

const file = 'index.html';
let content = fs.readFileSync(file, 'utf-8');

// The new HTML section to insert
const newHTML = `<!-- Begin Your Breath Inquiry Section -->
<section class="py-24 px-8 md:px-24 bg-surface" id="contact-form-section">
    <div class="max-w-screen-xl mx-auto">
        <div class="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(43,43,43,0.08)] flex flex-col md:flex-row">
            
            <!-- Left Side: Image and Overlay -->
            <div class="w-full md:w-1/2 relative bg-[#352F26] flex items-center justify-center p-12 min-h-[400px]">
                <img class="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC-CfbpXUcYKpXkrRFAGx8KZCeG8khcF-I4co9TXOJ9kHldKrUE0nOCs3kvRFd4Zz6qjypZCW5RengooffoQ1KEkk3QcxtO_15EVp59RmpQi5LVfssYfX72E_nGrmLZ4uMk5LVI3xFU7sjyEhhEvuQLfbdEzRpPlSziT_iCwfj9W-_2W-9PsyvlppJfwlauYKpKqZNEQHeX1Fu0KzPdSCM_0b2fbMpOeXyWvEtz1kRjGh6tiwoBnL03ylN2AQOPQukYieSuqAcveI" alt="Singing bowl and meditation vibes" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div class="relative z-10 text-center space-y-6 max-w-sm mt-auto mb-8">
                    <h2 class="font-headline text-4xl md:text-5xl text-[#F9F7F4]">Begin Your Breath</h2>
                    <p class="text-[#E0DBD2] leading-relaxed font-body">Send us a message and our wellness consultant will curate a path specifically for your needs.</p>
                </div>
            </div>

            <!-- Right Side: Form -->
            <div class="w-full md:w-1/2 p-10 lg:p-14 bg-white flex flex-col justify-center">
                <form action="#" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Full Name" class="w-full bg-[#f3efe9] text-stone-700 placeholder-stone-500 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium" />
                        <input type="email" placeholder="Email Address" class="w-full bg-[#f3efe9] text-stone-700 placeholder-stone-500 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium" />
                    </div>

                    <div class="relative">
                        <select class="w-full bg-[#f3efe9] text-stone-700 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium appearance-none cursor-pointer">
                            <option value="" disabled selected hidden>Interested in...</option>
                            <option value="Physical Vitality">Physical Vitality</option>
                            <option value="Mental Clarity">Mental Clarity</option>
                            <option value="Spiritual Growth">Spiritual Growth</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-stone-500">
                            <span class="material-symbols-outlined text-xl">expand_more</span>
                        </div>
                    </div>

                    <textarea placeholder="Tell us about your goals" rows="4" class="w-full bg-[#f3efe9] text-stone-700 placeholder-stone-500 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium resize-none"></textarea>

                    <div class="pt-2 flex flex-col sm:flex-row gap-4">
                        <button type="submit" class="w-full bg-[#59695d] text-white px-8 py-4 rounded-full font-label text-sm tracking-wide font-bold hover:bg-[#48564b] transition-all duration-300 shadow-md">
                            Submit Inquiry
                        </button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</section>
`;

// Extract from <section id="selection-section"> to the end of the sections before </main>
// There are two sections to remove: id="selection-section" and id="contact-form-section" 
// Using regex to match from the start of the first section to the </section> just before </main>
const sectionRegex = /(<!-- New "What are you looking for\?" Section -->[\s\S]*?)<\/main>/;

content = content.replace(sectionRegex, newHTML + '</main>');

// Remove the old script for the interactive form selection
const scriptRegex = /<script>\s*function selectOption[\s\S]*?<\/script>\s*/;
content = content.replace(scriptRegex, '');

fs.writeFileSync(file, content);
console.log('Form updated successfully.');
