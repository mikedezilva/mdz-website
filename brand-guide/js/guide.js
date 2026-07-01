/* ================================================================
   MIKE DE ZILVA — BRAND GUIDE
   Core JavaScript — Sidebar, Interactions, Copy, Lightbox
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== SIDEBAR NAVIGATION =====
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        if (sidebarToggle) sidebarToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        if (sidebarToggle) sidebarToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });


    // ===== CLICK TO COPY =====
    const copyFeedback = document.createElement('div');
    copyFeedback.className = 'copy-feedback';
    copyFeedback.textContent = 'Copied to clipboard!';
    document.body.appendChild(copyFeedback);

    let copyTimeout;

    function showCopyFeedback(text) {
        copyFeedback.textContent = `Copied: ${text}`;
        copyFeedback.classList.add('show');
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
    }

    // Color swatches — click to copy hex
    document.querySelectorAll('.color-swatch[data-color]').forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            navigator.clipboard.writeText(color).then(() => {
                showCopyFeedback(color);
            });
        });
    });

    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = btn.getAttribute('data-copy');
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = btn.innerHTML;
                    btn.classList.add('copied');
                    btn.innerHTML = '✓ Copied';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = originalText;
                    }, 2000);
                });
            }
        });
    });

    // Bio blocks — copy full text
    document.querySelectorAll('.bio-block .copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const block = btn.closest('.bio-block');
            const bioText = block.querySelector('p').textContent;
            navigator.clipboard.writeText(bioText).then(() => {
                showCopyFeedback('Bio text');
            });
        });
    });


    // ===== LIGHTBOX =====
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img src="" alt="Lightbox preview">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item img, .logo-card-preview img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeSidebar();
        }
    });


    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        scrollObserver.observe(section);
    });

    // Don't hide the first section / page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.classList.add('fade-in-up');
    }
    const guideHero = document.querySelector('.guide-hero');
    if (guideHero) {
        guideHero.classList.add('fade-in-up');
    }


    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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


    // ===== COLOR SWATCH HOVER EFFECT =====
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('mouseenter', () => {
            swatch.style.transform = 'translateY(-4px)';
        });
        swatch.addEventListener('mouseleave', () => {
            swatch.style.transform = '';
        });
    });

});
