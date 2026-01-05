// ===== Scroll-based Fade-in Animations =====

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Intersection Observer for fade-in elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Hide scroll indicator on scroll
    let hasScrolled = false;

    const handleScroll = () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease-out';
            }
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scroll for any anchor links (future-proofing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
