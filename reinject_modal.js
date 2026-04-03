const fs = require('fs');

const files = ['index.html', 'yoga-details.html', 'instructor.html', 'faq.html'];

const newModalHTML = `<!-- Global Registration Modal -->
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
                <!-- Interest Dropdown -->
                <div class="space-y-1">
                    <label class="font-label text-xs uppercase tracking-widest text-stone-500 font-bold ml-1">Primary Interest</label>
                    <div class="relative custom-select" id="reg-dropdown-interest">
                        <button type="button" class="w-full bg-[#f3efe9] text-stone-700 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium flex justify-between items-center cursor-pointer" id="reg-toggle-interest">
                            <span id="reg-text-interest" class="text-stone-400">Select Area</span>
                            <span class="material-symbols-outlined text-lg transition-transform duration-300" id="reg-icon-interest">expand_more</span>
                        </button>
                        <div class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden hidden border border-stone-100 transition-all duration-200 opacity-0 scale-95 origin-top" id="reg-menu-interest">
                            <div class="py-1 max-h-48 overflow-y-auto">
                                <div class="px-4 py-3 hover:bg-[#f3efe9] cursor-pointer text-sm font-medium text-stone-700 transition-colors dropdown-item-int" data-value="Physical Vitality">Physical Vitality</div>
                                <div class="px-4 py-3 hover:bg-[#f3efe9] cursor-pointer text-sm font-medium text-stone-700 transition-colors dropdown-item-int" data-value="Mental Clarity">Mental Clarity</div>
                                <div class="px-4 py-3 hover:bg-[#f3efe9] cursor-pointer text-sm font-medium text-stone-700 transition-colors dropdown-item-int" data-value="Spiritual Growth">Spiritual Growth</div>
                                <div class="px-4 py-3 hover:bg-[#f3efe9] cursor-pointer text-sm font-medium text-stone-700 transition-colors dropdown-item-int" data-value="Other">Other</div>
                            </div>
                        </div>
                        <input type="hidden" name="interest" id="reg-input-interest" value="">
                    </div>
                </div>

                <!-- Mode Dropdown -->
                <div class="space-y-1">
                    <label class="font-label text-xs uppercase tracking-widest text-stone-500 font-bold ml-1">Mode of Joining</label>
                    <div class="relative custom-select" id="reg-dropdown-mode">
                        <button type="button" class="w-full bg-[#f3efe9] text-stone-700 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#5c6e61] text-sm font-medium flex justify-between items-center cursor-pointer" id="reg-toggle-mode">
                            <span id="reg-text-mode" class="text-stone-400">Select Mode</span>
                            <span class="material-symbols-outlined text-lg transition-transform duration-300" id="reg-icon-mode">expand_more</span>
                        </button>
                        <div class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden hidden border border-stone-100 transition-all duration-200 opacity-0 scale-95 origin-top" id="reg-menu-mode">
                            <div class="py-1">
                                <div class="px-4 py-3 hover:bg-[#f3efe9] cursor-pointer text-sm font-medium text-stone-700 transition-colors dropdown-item-mod" data-value="Offline Studio">Offline (Bangalore Studio)</div>
                                <div class="px-4 py-3 hover:bg-[#f3efe9] cursor-pointer text-sm font-medium text-stone-700 transition-colors dropdown-item-mod" data-value="Online">Online Interactive</div>
                            </div>
                        </div>
                        <input type="hidden" name="mode" id="reg-input-mode" value="">
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
        const fInterestInput = document.getElementById("reg-input-interest");
        const fInterestText = document.getElementById("reg-text-interest");

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

        const setupCustomDropdown = (dropdownId, toggleId, menuId, iconId, textId, inputId, itemClass) => {
            const dropdown = document.getElementById(dropdownId);
            const toggle = document.getElementById(toggleId);
            const menu = document.getElementById(menuId);
            const icon = document.getElementById(iconId);
            const text = document.getElementById(textId);
            const input = document.getElementById(inputId);
            const items = document.querySelectorAll("." + itemClass);

            const toggleMenu = () => {
                const isHidden = menu.classList.contains("hidden");
                // Close all other specific dropdowns in modal
                document.querySelectorAll(".custom-select .absolute.z-50").forEach(m => {
                   if(m !== menu) {
                       m.classList.add("hidden", "opacity-0", "scale-95");
                       m.classList.remove("opacity-100", "scale-100");
                       const adjacentIcon = m.parentElement.querySelector(".material-symbols-outlined");
                       if(adjacentIcon) adjacentIcon.style.transform = "rotate(0deg)";
                   }
                });

                if (isHidden) {
                    menu.classList.remove("hidden");
                    setTimeout(() => {
                        menu.classList.remove("opacity-0", "scale-95");
                        menu.classList.add("opacity-100", "scale-100");
                    }, 10);
                    icon.style.transform = "rotate(180deg)";
                } else {
                    menu.classList.add("opacity-0", "scale-95");
                    menu.classList.remove("opacity-100", "scale-100");
                    icon.style.transform = "rotate(0deg)";
                    setTimeout(() => {
                        menu.classList.add("hidden");
                    }, 200);
                }
            };

            toggle.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleMenu();
            });

            items.forEach(item => {
                item.addEventListener("click", (e) => {
                    const value = item.getAttribute("data-value");
                    text.textContent = item.textContent; // Show the nice text label
                    text.classList.remove("text-stone-400");
                    text.classList.add("text-stone-800");
                    input.value = value;
                    
                    items.forEach(i => i.classList.remove("bg-stone-50", "border-l-4", "border-[#5c6e61]", "pl-3"));
                    item.classList.add("bg-stone-50", "border-l-4", "border-[#5c6e61]", "pl-3");
                    toggleMenu();
                });
            });

            document.addEventListener("click", (e) => {
                if (!dropdown.contains(e.target) && !menu.classList.contains("hidden")) {
                    toggleMenu();
                }
            });
        };

        // Initialize Custom Dropdowns
        setupCustomDropdown("reg-dropdown-interest", "reg-toggle-interest", "reg-menu-interest", "reg-icon-interest", "reg-text-interest", "reg-input-interest", "dropdown-item-int");
        setupCustomDropdown("reg-dropdown-mode", "reg-toggle-mode", "reg-menu-mode", "reg-icon-mode", "reg-text-mode", "reg-input-mode", "dropdown-item-mod");

        // Global Event Delegation for Triggers
        document.addEventListener("click", (e) => {
            let target = e.target.closest("button") || e.target.closest("a");
            if (!target) return;

            // Exceptions for custom dropdowns (prevent intercepting their toggle buttons as modal triggers)
            if (target.id === "reg-toggle-interest" || target.id === "reg-toggle-mode" || target.id === "dropdown-toggle") return;

            const textBtnContent = target.textContent.trim().toLowerCase();
            const triggerKeywords = ["start your journey", "register now", "join today"];
            const isTrigger = triggerKeywords.some(kw => textBtnContent.includes(kw));

            // In intercept-mode we check specifically if they clicked the exact sumbit inquiry button 
            // inside the BEGIN YOUR BREATH block
            const isSubmitInquiry = textBtnContent.includes("submit inquiry");

            if (isTrigger || isSubmitInquiry) {
                e.preventDefault();

                if (isSubmitInquiry) {
                    const form = target.closest("form");
                    if (form) {
                        const nameInput = form.querySelector('input[type="text"]');
                        const emailInput = form.querySelector('input[type="email"]');
                        const interestInput = form.querySelector('input[name="interest"]');

                        if (nameInput) fName.value = nameInput.value;
                        if (emailInput) fEmail.value = emailInput.value;
                        if (interestInput && interestInput.value) {
                            fInterestInput.value = interestInput.value;
                            fInterestText.textContent = interestInput.value;
                            fInterestText.classList.remove("text-stone-400");
                            fInterestText.classList.add("text-stone-800");
                        }
                    }
                } else {
                    document.getElementById("global-registration-form").reset();
                    // Reset dropdown UI
                    fInterestText.textContent = "Select Area";
                    fInterestText.classList.add("text-stone-400");
                    fInterestText.classList.remove("text-stone-800");
                    document.getElementById("reg-text-mode").textContent = "Select Mode";
                    document.getElementById("reg-text-mode").classList.add("text-stone-400");
                    document.getElementById("reg-text-mode").classList.remove("text-stone-800");
                    
                    document.querySelectorAll(".dropdown-item-int, .dropdown-item-mod").forEach(i => {
                         i.classList.remove("bg-stone-50", "border-l-4", "border-[#5c6e61]", "pl-3");
                    });
                }

                openModal();
            }
        });
        
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
    
    // The previous injected script always looks exactly like this bounding box:
    const regex = /<!-- Global Registration Modal -->[\s\S]*<\/script>\s*(<\/body>)/;
    
    if(regex.test(content)) {
        content = content.replace(regex, newModalHTML + '\n$1');
        fs.writeFileSync(file, content);
        console.log('Updated modal in ' + file);
    } else {
        console.error('Could not find existing modal in ' + file);
    }
});
