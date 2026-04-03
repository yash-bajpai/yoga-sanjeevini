const fs = require('fs');
const path = require('path');

const files = ['index.html', 'yoga-details.html', 'instructor.html', 'faq.html'];

const modalHTML = `
<!-- Global Registration Modal -->
<div id="registration-modal" class="fixed inset-0 z-[200] flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
    <div id="modal-backdrop" class="absolute inset-0 bg-stone-900/60 backdrop-blur-md cursor-pointer"></div>
    <div id="modal-content" class="bg-surface-container-lowest w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative z-10 scale-95 transition-transform duration-500 cubic-bezier(0.2,0,0,1)">
        <button id="close-modal" class="absolute top-6 right-6 w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors z-20">
            <span class="material-symbols-outlined text-xl">close</span>
        </button>
        
        <div class="px-10 pt-10 pb-6 bg-[#352F26] text-center relative overflow-hidden">
            <h3 class="relative z-10 font-headline text-3xl md:text-4xl text-[#F9F7F4] mb-2">Begin Your Journey</h3>
            <p class="relative z-10 text-[#E0DBD2] text-sm">Please fill out the form below to register.</p>
        </div>
        
        <form id="global-registration-form" class="p-10 space-y-5 bg-white">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1">
                    <label class="font-label text-xs uppercase tracking-widest text-stone-500 font-bold ml-1">Full Name</label>
                    <input type="text" id="reg-name" placeholder="E.g. Aditi Sharma" class="w-full bg-[#f3efe9] text-stone-700 placeholder-stone-400 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium" />
                </div>
                <div class="space-y-1">
                    <label class="font-label text-xs uppercase tracking-widest text-stone-500 font-bold ml-1">Email Address</label>
                    <input type="email" id="reg-email" placeholder="example@mail.com" class="w-full bg-[#f3efe9] text-stone-700 placeholder-stone-400 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium" />
                </div>
            </div>
            
            <div class="space-y-1">
                <label class="font-label text-xs uppercase tracking-widest text-stone-500 font-bold ml-1">Phone Number</label>
                <input type="tel" id="reg-phone" placeholder="+91 XXXXX XXXXX" class="w-full bg-[#f3efe9] text-stone-700 placeholder-stone-400 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1">
                    <label class="font-label text-xs uppercase tracking-widest text-stone-500 font-bold ml-1">Primary Interest</label>
                    <div class="relative">
                        <select id="reg-interest" class="w-full bg-[#f3efe9] text-stone-700 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium appearance-none cursor-pointer">
                            <option value="" disabled selected hidden>Select Area</option>
                            <option value="Physical Vitality">Physical Vitality</option>
                            <option value="Mental Clarity">Mental Clarity</option>
                            <option value="Spiritual Growth">Spiritual Growth</option>
                            <option value="Other">Other</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                            <span class="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="font-label text-xs uppercase tracking-widest text-stone-500 font-bold ml-1">Mode of Joining</label>
                    <div class="relative">
                        <select id="reg-mode" class="w-full bg-[#f3efe9] text-stone-700 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium appearance-none cursor-pointer">
                            <option value="" disabled selected hidden>Select Mode</option>
                            <option value="Offline Studio">Offline (Bangalore Studio)</option>
                            <option value="Online">Online Interactive</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                            <span class="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pt-4">
                <button type="submit" class="w-full bg-[#59695d] text-white px-8 py-4 rounded-full font-label text-sm tracking-widest font-bold hover:bg-[#48564b] transition-all duration-300 shadow-md flex items-center justify-center gap-2">
                    <span>Complete Registration</span>
                    <span class="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const modal = document.getElementById("registration-modal");
        const backdrop = document.getElementById("modal-backdrop");
        const content = document.getElementById("modal-content");
        const closeBtn = document.getElementById("close-modal");
        
        // Form Fields
        const fName = document.getElementById("reg-name");
        const fEmail = document.getElementById("reg-email");
        const fInterest = document.getElementById("reg-interest");

        const openModal = () => {
            modal.classList.remove("opacity-0", "pointer-events-none");
            content.classList.remove("scale-95");
            content.classList.add("scale-100");
        };

        const closeModal = () => {
            modal.classList.add("opacity-0", "pointer-events-none");
            content.classList.remove("scale-100");
            content.classList.add("scale-95");
        };

        backdrop.addEventListener("click", closeModal);
        closeBtn.addEventListener("click", closeModal);

        // Global Event Delegation for Triggers
        document.addEventListener("click", (e) => {
            // Traverse up to find if a button was clicked
            let target = e.target.closest("button") || e.target.closest("a");
            if (!target) return;

            const text = target.textContent.trim().toLowerCase();
            
            // Check for generalized triggers
            const triggerKeywords = ["start your journey", "register now", "join today"];
            const isTrigger = triggerKeywords.some(kw => text.includes(kw));

            // Check for specific Submit Inquiry from Begin Your Breath
            const isSubmitInquiry = text.includes("submit inquiry");

            if (isTrigger || isSubmitInquiry) {
                e.preventDefault();

                if (isSubmitInquiry) {
                    // Try to extract values from the form it belongs to
                    const form = target.closest("form");
                    if (form) {
                        const nameInput = form.querySelector('input[type="text"]');
                        const emailInput = form.querySelector('input[type="email"]');
                        const interestInput = form.querySelector('input[name="interest"]');

                        if (nameInput) fName.value = nameInput.value;
                        if (emailInput) fEmail.value = emailInput.value;
                        if (interestInput && interestInput.value) {
                            // Find the matching option or default to empty
                            const opts = Array.from(fInterest.options);
                            const match = opts.find(o => o.value === interestInput.value);
                            if (match) fInterest.value = match.value;
                        }
                    }
                } else {
                    // Clear fields if opened generally
                    document.getElementById("global-registration-form").reset();
                }

                openModal();
            }
        });
        
        // Prevent actual submission for demo
        document.getElementById("global-registration-form").addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Registration Submitted Successfully!");
            closeModal();
            e.target.reset();
        });
    });
</script>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Quick safeguard if already injected
    if (!content.includes('id="registration-modal"')) {
        content = content.replace('</body>', `${modalHTML}\n</body>`);
        fs.writeFileSync(file, content);
    }
});

console.log('Global Registration Modal injected globally.');
