// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// Menu Mobile - Variables
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

// S'assurer que le bouton hamburger est visible et fonctionnel
if (navToggle) {
    navToggle.style.display = 'flex';
    navToggle.style.visibility = 'visible';
    navToggle.style.opacity = '1';
    navToggle.style.pointerEvents = 'auto';
    navToggle.style.cursor = 'pointer';
}

// Fonction pour ouvrir le menu
function openMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
        // S'assurer que tous les autres éléments sont en dessous
        const allSections = document.querySelectorAll('section, .hero, .hero-content, .hero-background, .services, .about, .contact, .testimonials, .why-choose-us, .trust-section, .footer, .container, .section-header');
        allSections.forEach(el => {
            if (el && !el.closest('.mobile-menu')) {
                el.style.zIndex = '0';
                el.style.position = 'relative';
            }
        });
        
        // S'assurer que le navbar est en dessous du menu
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.zIndex = '1000';
        }
        
        // Forcer la visibilité de tous les éléments du menu
        const menuElements = mobileMenu.querySelectorAll('*');
        menuElements.forEach(el => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        
        document.body.style.overflow = 'hidden';
        mobileMenuOverlay.classList.add('active');
        mobileMenu.classList.add('active');
        
        // Animer le bouton hamburger
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            if (spans && spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        }
    }
}

// Fonction pour fermer le menu
function closeMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }, 400);
        
        // Réinitialiser le bouton hamburger
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            if (spans && spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }
}

// Ouvrir le menu au clic sur le toggle
if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Vérifier si le menu est déjà ouvert
        const isMenuOpen = mobileMenu && mobileMenu.classList.contains('active');
        
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // S'assurer que le bouton est cliquable
    navToggle.style.pointerEvents = 'auto';
    navToggle.style.cursor = 'pointer';
}

// Fermer le menu au clic sur l'overlay
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
}

// Fermer le menu au clic sur l'overlay
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
}

// Fermer le menu au clic sur un lien
if (mobileMenuLinks) {
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                closeMobileMenu();
            }, 300);
        });
    });
}

// Fermer le menu avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Contact Info Obfuscation
function encodeBase64(str) {
    try {
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        return str;
    }
}

function decodeBase64(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        return str;
    }
}

// Encoded contact info
const encodedPhone = 'KzIyNTA1OTU2MTg5NjQ=';
const encodedEmail = 'bmV3dGl2MDVAZ21haWwuY29t';

// Call button handler
function initiateCall(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const phone = decodeBase64(encodedPhone);
    window.location.href = `tel:${phone}`;
    
    // Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', {
            'event_category': 'Contact',
            'event_label': 'Phone Call'
        });
    }
}

// Email button handler
function initiateEmail(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const email = decodeBase64(encodedEmail);
    window.location.href = `mailto:${email}?subject=Contact depuis IVOIRE.AI`;
    
    // Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'email_click', {
            'event_category': 'Contact',
            'event_label': 'Email Contact'
        });
    }
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    const callButtons = document.querySelectorAll('[onclick*="initiateCall"]');
    callButtons.forEach(btn => {
        btn.addEventListener('click', initiateCall);
    });
    
    const emailButtons = document.querySelectorAll('[onclick*="initiateEmail"]');
    emailButtons.forEach(btn => {
        btn.addEventListener('click', initiateEmail);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .why-item, .info-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // FORCER L'AFFICHAGE DU NAVBAR
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.zIndex = '1000';
        navbar.style.width = '100%';
    }
    
    // FORCER L'AFFICHAGE DU CONTAINER
    const navContainer = document.querySelector('.navbar .container');
    if (navContainer) {
        navContainer.style.display = 'flex';
        navContainer.style.visibility = 'visible';
        navContainer.style.opacity = '1';
    }
    
    // FORCER L'AFFICHAGE DU LOGO
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.style.display = 'flex';
        navBrand.style.visibility = 'visible';
        navBrand.style.opacity = '1';
    }
    
    // S'assurer que le bouton hamburger est visible UNIQUEMENT sur mobile
    function updateNavToggleVisibility() {
        if (navToggle) {
            if (window.innerWidth <= 968) {
                // Mobile : afficher le bouton
                navToggle.style.display = 'flex';
                navToggle.style.visibility = 'visible';
                navToggle.style.opacity = '1';
                navToggle.style.pointerEvents = 'auto';
            } else {
                // Desktop : cacher le bouton
                navToggle.style.display = 'none';
                navToggle.style.visibility = 'hidden';
                navToggle.style.opacity = '0';
                navToggle.style.pointerEvents = 'none';
            }
        }
    }
    
    // Initialiser la visibilité
    updateNavToggleVisibility();
    
    // Écouter les changements de taille de fenêtre
    window.addEventListener('resize', () => {
        // Toujours s'assurer que le navbar est visible
        if (navbar) {
            navbar.style.display = 'block';
            navbar.style.visibility = 'visible';
            navbar.style.opacity = '1';
        }
        
        // Mettre à jour la visibilité du bouton hamburger
        updateNavToggleVisibility();
    });
    
});
