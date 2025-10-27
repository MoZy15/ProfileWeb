// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');


let currentLanguage = 'de';
        let lastScrollTop = 0;
        const fixedNav = document.getElementById('fixedNav');

        function toggleLanguage() {
            currentLanguage = currentLanguage === 'de' ? 'en' : 'de';
            updateLanguage();
        }

        function updateLanguage() {
            const elements = document.querySelectorAll('[data-de], [data-en]');
            
            elements.forEach(element => {
                if (currentLanguage === 'de' && element.hasAttribute('data-de')) {
                    element.textContent = element.getAttribute('data-de');
                } else if (currentLanguage === 'en' && element.hasAttribute('data-en')) {
                    element.textContent = element.getAttribute('data-en');
                }
            });
            
            // Update page title
            document.title = currentLanguage === 'de' 
                ? 'Mohamed Alazzazy - Testingenieur' 
                : 'Mohamed Alazzazy - Test Engineer';
            
            // Update button text
            const langBtn = document.querySelector('.lang-btn');
            langBtn.innerHTML = currentLanguage === 'de' 
                ? '<i class="fas fa-language"></i> EN' 
                : '<i class="fas fa-language"></i> DE';
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('.main-links a, .contact-btn').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update active link
                        document.querySelectorAll('.main-links a').forEach(link => {
                            link.classList.remove('active');
                        });
                        if (this.classList.contains('main-links')) {
                            this.classList.add('active');
                        }
                    }
                }
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.main-links a');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
            /*

            // Hide/show fixed nav on scroll
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                fixedNav.classList.add('hidden');
            } else {
                // Scrolling up
                fixedNav.classList.remove('hidden');
            }
            lastScrollTop = scrollTop;
            */
        });

        // Initialize language
        document.addEventListener('DOMContentLoaded', function() {
            updateLanguage();
        });
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.main-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
        
        // Update smooth scrolling offset for mobile
        document.querySelectorAll('.main-links a, .contact-btn').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 70, // Reduced offset for mobile
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        // Add this to your JavaScript - Mobile image handling
function checkMobileImage() {
    const profileImg = document.querySelector('.profile-photo');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && profileImg) {
        console.log('Mobile device detected');
        
        // Force image reload for mobile
        const originalSrc = profileImg.src;
        profileImg.src = '';
        profileImg.src = originalSrc;
        
        // Mobile-specific error handling
        profileImg.onerror = function() {
            console.log('Mobile: Image failed, using fallback');
            useInitialsFallback();
        };
        
        // Check if loaded after a delay
        setTimeout(() => {
            if (!profileImg.complete || profileImg.naturalHeight === 0) {
                console.log('Mobile: Image not loaded, using fallback');
                useInitialsFallback();
            }
        }, 1000);
    }
}

function useInitialsFallback() {
    const profileImageDiv = document.querySelector('.profile-image');
    if (profileImageDiv) {
        profileImageDiv.innerHTML = 'MA';
        profileImageDiv.style.display = 'flex';
        profileImageDiv.style.alignItems = 'center';
        profileImageDiv.style.justifyContent = 'center';
        profileImageDiv.style.color = 'var(--primary)';
        profileImageDiv.style.fontSize = '2.5rem';
        profileImageDiv.style.fontWeight = 'bold';
        profileImageDiv.style.backgroundColor = 'var(--light)';
    }
}

// Call this on page load
document.addEventListener('DOMContentLoaded', function() {
    checkMobileImage();
});