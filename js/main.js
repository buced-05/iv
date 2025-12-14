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
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function toggleMobileMenu(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    if (navMenu) {
        const isHidden = navMenu.classList.contains('hidden');
        
        // Marquer que le menu est en train de s'ouvrir
        if (isHidden) {
            isMenuOpening = true;
            navMenu.classList.remove('hidden');
            
            // Réinitialiser le flag après un court délai
            setTimeout(() => {
                isMenuOpening = false;
            }, 500);
        } else {
            navMenu.classList.add('hidden');
            isMenuOpening = false;
        }
        
        // Animate hamburger icon
        const spans = navToggle?.querySelectorAll('span');
        if (spans && spans.length >= 3) {
            if (!navMenu.classList.contains('hidden')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
    // Empêcher la propagation pour éviter que le clic déclenche le listener "click en dehors"
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Fermer le menu mobile quand on clique sur un lien
if (navMenu) {
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Empêcher la propagation pour éviter la fermeture immédiate
            e.stopPropagation();
            // Petit délai pour permettre la navigation
            setTimeout(() => {
                if (navMenu) {
                    navMenu.classList.add('hidden');
                    const spans = navToggle?.querySelectorAll('span');
                    if (spans && spans.length >= 3) {
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            }, 300);
        });
    });
}

// Fermer le menu si on clique en dehors (avec un petit délai pour éviter les conflits)
let menuCloseTimeout;
document.addEventListener('click', (e) => {
    // Ignorer si c'est le toggle lui-même
    if (navToggle && (navToggle.contains(e.target) || navToggle === e.target)) {
        return;
    }
    
    // Ignorer si c'est dans le menu
    if (navMenu && (navMenu.contains(e.target) || navMenu === e.target)) {
        return;
    }
    
    // Fermer le menu seulement s'il est ouvert
    if (navMenu && navToggle && !navMenu.classList.contains('hidden')) {
        // Délai plus long pour éviter les conflits
        clearTimeout(menuCloseTimeout);
        menuCloseTimeout = setTimeout(() => {
            if (navMenu && !navMenu.classList.contains('hidden')) {
                navMenu.classList.add('hidden');
                const spans = navToggle.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }, 200);
    }
}, true); // Utiliser capture phase pour mieux gérer les événements

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate stats counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate stats if in view
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .about-visual, .contact-info, .hero-stats');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (hero && scrolled < window.innerHeight) {
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px)`;
        });
    }
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.style.color = 'var(--text-secondary)';
            });
            if (navLink) {
                navLink.style.color = 'var(--text-primary)';
            }
        }
    });
});

// Contact functions - Masquage des informations sensibles
// Les informations sont encodées en base64 pour éviter le spam
function getPhoneNumber() {
    // Encodage base64 pour masquer le numéro
    const encoded = 'KzIyNTA1OTU2MTg5NjQ=';
    return atob(encoded);
}

function getEmailAddress() {
    // Encodage base64 pour masquer l'email
    const encoded = 'bmV3dGl2MDVAZ21haWwuY29t';
    return atob(encoded);
}

// Fonction pour initier un appel (uniquement sur clic utilisateur)
function initiateCall(event) {
    // Empêcher tout comportement par défaut
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    try {
        const phoneNumber = getPhoneNumber();
        
        // Envoyer un événement Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_click', {
                'event_category': 'contact',
                'event_label': 'Phone button clicked'
            });
        }
        
        // Ouvrir l'application d'appel - window.location.href fonctionne dans le contexte d'un onclick
        window.location.href = 'tel:' + phoneNumber;
    } catch (error) {
        console.error('Erreur lors de l\'appel:', error);
    }
}

// Fonction pour initier un email (uniquement sur clic utilisateur)
function initiateEmail(event) {
    // Empêcher tout comportement par défaut
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    try {
        const emailAddress = getEmailAddress();
        
        // Envoyer un événement Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'email_click', {
                'event_category': 'contact',
                'event_label': 'Email button clicked'
            });
        }
        
        // Ouvrir le client email - window.location.href fonctionne dans le contexte d'un onclick
        window.location.href = 'mailto:' + emailAddress + '?subject=Contact depuis IVOIRE.AI';
    } catch (error) {
        console.error('Erreur lors de l\'envoi d\'email:', error);
    }
}

