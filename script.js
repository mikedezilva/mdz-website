document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis Smooth Scroll
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false
        });
    }

    function raf(time) {
        if (lenis) lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Slide-out Menu Logic
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('.main-nav a');

    // Open menu
    openMenuBtn.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        if (lenis) lenis.stop(); // Pause smooth scrolling while menu is open
    });

    // Close menu
    closeMenuBtn.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        if (lenis) lenis.start(); // Resume smooth scrolling
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            if (lenis) lenis.start();
        });
    });

    // Smooth Scrolling for anchor links via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && lenis) {
                lenis.scrollTo(targetElement);
            } else if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-in-scroll');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Software Section AI Music Generator Logic
    const durationPills = document.querySelectorAll('.duration-pill');
    durationPills.forEach(pill => {
        pill.addEventListener('click', () => {
            durationPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // ===================================
    // Unified Audio Player Console Engine
    // ===================================

    // Global playback states to ensure only one player can be active at a time
    let activeGlobalAudio = null;
    let activeGlobalPlayer = null;

    class PlaylistPlayer {
        constructor(config) {
            this.tracks = config.tracks || [];
            this.currentIndex = 0;
            this.isPlaying = false;
            this.audio = null;

            // DOM Elements
            this.titleEl = document.getElementById(config.ids.title);
            this.badgeEl = document.getElementById(config.ids.badge);
            this.counterEl = document.getElementById(config.ids.counter);
            this.playBtn = document.getElementById(config.ids.play);
            this.prevBtn = document.getElementById(config.ids.prev);
            this.nextBtn = document.getElementById(config.ids.next);
            this.progressWrapper = document.getElementById(config.ids.progressWrapper);
            this.progressFill = document.getElementById(config.ids.progressFill);
            this.timeCurrent = document.getElementById(config.ids.timeCurrent);
            this.timeDuration = document.getElementById(config.ids.timeDuration);
            this.actionBtn = document.getElementById(config.ids.actionBtn); // optional (e.g. BUY RIGHTS)
            
            // Custom hooks
            this.onTrackChange = config.onTrackChange || null;

            if (!this.playBtn) return; // Console is not present on this page
            this.init();
        }

        init() {
            this.playBtn.addEventListener('click', () => this.togglePlay());
            this.prevBtn.addEventListener('click', () => this.prevTrack());
            this.nextBtn.addEventListener('click', () => this.nextTrack());

            if (this.progressWrapper) {
                this.progressWrapper.addEventListener('click', (e) => this.seek(e));
            }

            this.loadTrack(0, false); // Load first track, don't autoplay
        }

        loadTrack(index, autoplay = true) {
            if (this.tracks.length === 0) return;

            if (index < 0) index = this.tracks.length - 1;
            if (index >= this.tracks.length) index = 0;
            this.currentIndex = index;

            const track = this.tracks[this.currentIndex];

            if (this.titleEl) this.titleEl.textContent = track.title;
            if (this.badgeEl) {
                this.badgeEl.textContent = track.rights || track.genre || '';
            }
            if (this.counterEl) {
                this.counterEl.textContent = `Track ${this.currentIndex + 1} of ${this.tracks.length}`;
            }

            if (this.progressFill) this.progressFill.style.width = '0%';
            if (this.timeCurrent) this.timeCurrent.textContent = '0:00';
            if (this.timeDuration) this.timeDuration.textContent = track.duration || '0:00';

            if (this.onTrackChange) this.onTrackChange(track, this.currentIndex);

            this.setupAudio(track.file, autoplay);
        }

        setupAudio(src, autoplay) {
            this.stopPlayback();

            this.audio = new Audio(src);

            this.audio.addEventListener('timeupdate', () => {
                const cur = this.audio.currentTime;
                const dur = this.audio.duration || 0;

                if (this.timeCurrent) this.timeCurrent.textContent = this.formatTime(cur);
                if (dur && this.timeDuration) this.timeDuration.textContent = this.formatTime(dur);

                if (dur && this.progressFill) {
                    const pct = (cur / dur) * 100;
                    this.progressFill.style.width = `${pct}%`;
                }
            });

            this.audio.addEventListener('ended', () => {
                this.nextTrack();
            });

            if (autoplay) {
                this.play();
            }
        }

        togglePlay() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        }

        play() {
            if (!this.audio) return;

            if (activeGlobalPlayer && activeGlobalPlayer !== this) {
                activeGlobalPlayer.pause();
            }

            activeGlobalAudio = this.audio;
            activeGlobalPlayer = this;

            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.updatePlayBtnIcon(true);
                })
                .catch(err => console.log("Audio playback prevented:", err));
        }

        pause() {
            if (!this.audio) return;
            this.audio.pause();
            this.isPlaying = false;
            this.updatePlayBtnIcon(false);
        }

        stopPlayback() {
            if (this.audio) {
                this.audio.pause();
                this.audio = null;
            }
            this.isPlaying = false;
            this.updatePlayBtnIcon(false);
        }

        nextTrack() {
            this.loadTrack(this.currentIndex + 1, true);
        }

        prevTrack() {
            this.loadTrack(this.currentIndex - 1, true);
        }

        seek(e) {
            if (!this.audio) return;
            const rect = this.progressWrapper.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            const dur = this.audio.duration || 0;
            if (dur) {
                this.audio.currentTime = dur * pct;
            }
        }

        updatePlayBtnIcon(playing) {
            if (!this.playBtn) return;
            const icon = this.playBtn.querySelector('i');
            if (icon) {
                icon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
            }
        }

        formatTime(sec) {
            if (isNaN(sec)) return "0:00";
            const mins = Math.floor(sec / 60);
            const secs = Math.floor(sec % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    }

    // 1. Instantiate Rights Marketplace Player
    let rightsPlayer = null;
    if (document.getElementById('rights-player-console') && typeof CATALOGUE_DATA !== 'undefined') {
        rightsPlayer = new PlaylistPlayer({
            tracks: CATALOGUE_DATA.singlesCollabs,
            ids: {
                title: 'rights-track-title',
                badge: 'rights-track-badge',
                counter: 'rights-track-counter',
                play: 'rights-play-btn',
                prev: 'rights-prev-btn',
                next: 'rights-next-btn',
                progressWrapper: 'rights-progress-wrapper',
                progressFill: 'rights-progress-fill',
                timeCurrent: 'rights-time-current',
                timeDuration: 'rights-time-duration',
                actionBtn: 'rights-action-btn'
            }
        });
    }

    // 2. Instantiate Licensing Library Player
    let licensingPlayer = null;
    if (document.getElementById('licensing-player-console') && typeof CATALOGUE_DATA !== 'undefined') {
        const combinedLicensingTracks = [
            ...CATALOGUE_DATA.licensing.handcrafted,
            ...CATALOGUE_DATA.licensing.lyria,
            ...CATALOGUE_DATA.licensing.yelo
        ].map((track, idx) => ({
            ...track,
            title: `Track ${String(idx + 1).padStart(3, '0')}`
        }));

        licensingPlayer = new PlaylistPlayer({
            tracks: combinedLicensingTracks,
            ids: {
                title: 'licensing-track-title',
                badge: 'licensing-track-badge',
                counter: 'licensing-track-counter',
                play: 'licensing-play-btn',
                prev: 'licensing-prev-btn',
                next: 'licensing-next-btn',
                progressWrapper: 'licensing-progress-wrapper',
                progressFill: 'licensing-progress-fill',
                timeCurrent: 'licensing-time-current',
                timeDuration: 'licensing-time-duration'
            }
        });
    }

    // 3. Instantiate Productions Player
    let productionsPlayer = null;
    if (document.getElementById('productions-player-console') && typeof CATALOGUE_DATA !== 'undefined') {
        productionsPlayer = new PlaylistPlayer({
            tracks: CATALOGUE_DATA.portfolio,
            ids: {
                title: 'productions-track-title',
                counter: 'productions-track-counter',
                play: 'productions-play-btn',
                prev: 'productions-prev-btn',
                next: 'productions-next-btn',
                progressWrapper: 'productions-progress-wrapper',
                progressFill: 'productions-progress-fill',
                timeCurrent: 'productions-time-current',
                timeDuration: 'productions-time-duration'
            }
        });
    }

    // Deal Terms Drawer Logic (Delegated to support dynamic console actions)
    const dealDrawer = document.getElementById('deal-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer');

    if (dealDrawer && closeDrawerBtn) {
        const drawerTrackTitle = document.getElementById('drawer-track-title');
        const drawerTrackBadge = document.getElementById('drawer-track-badge');
        const drawerTrackPrice = document.getElementById('drawer-track-price');
        const drawerTrackShare = document.getElementById('drawer-track-share');
        const drawerTrackDesc = document.getElementById('drawer-track-desc');

        const viewTerms = document.getElementById('drawer-view-terms');
        const viewOffer = document.getElementById('drawer-view-offer');
        const viewSuccess = document.getElementById('drawer-view-success');

        const offerTrackTitle = document.getElementById('offer-track-title');
        const offerTrackBadge = document.getElementById('offer-track-badge');
        const offerAmountInput = document.getElementById('offer-amount');
        const offerEmailInput = document.getElementById('offer-email');
        const offerNotesInput = document.getElementById('offer-notes');
        const makeOfferForm = document.getElementById('make-offer-form');

        const btnMakeOffer = document.getElementById('btn-make-offer');
        const btnBackToTerms = document.getElementById('btn-back-to-terms');
        const btnSecureAcquisition = document.getElementById('btn-secure-acquisition');
        const successCloseBtn = document.getElementById('success-close-btn');

        const successTitle = document.getElementById('success-title');
        const successMessage = document.getElementById('success-message');

        function resetDrawer() {
            viewTerms.style.display = 'flex';
            viewOffer.style.display = 'none';
            viewSuccess.style.display = 'none';
            if (makeOfferForm) makeOfferForm.reset();
        }

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-deal-btn');
            if (!btn) return;

            resetDrawer();

            if (btn.id === 'rights-action-btn' && rightsPlayer) {
                const currentTrack = rightsPlayer.tracks[rightsPlayer.currentIndex];
                drawerTrackTitle.textContent = currentTrack.title;
                drawerTrackBadge.textContent = currentTrack.rights || 'PUBLISHING RIGHTS';
                drawerTrackPrice.textContent = currentTrack.price || '$2,500';
                drawerTrackShare.textContent = currentTrack.share || '25%';
                drawerTrackDesc.textContent = currentTrack.description || '';
            } else {
                const item = btn.closest('.right-item');
                if (item) {
                    drawerTrackTitle.textContent = item.querySelector('.track-info h3').textContent;
                    drawerTrackBadge.textContent = item.getAttribute('data-rights') || 'PUBLISHING RIGHTS';
                    drawerTrackPrice.textContent = item.getAttribute('data-price') || '$2,500';
                    drawerTrackShare.textContent = item.getAttribute('data-share') || '25%';
                    drawerTrackDesc.textContent = item.getAttribute('data-description') || '';
                }
            }

            dealDrawer.classList.add('active');
            document.body.classList.add('modal-open');
            if (typeof lenis !== 'undefined' && lenis) lenis.stop();
        });

        // Switch to Offer form
        if (btnMakeOffer) {
            btnMakeOffer.addEventListener('click', () => {
                offerTrackTitle.textContent = drawerTrackTitle.textContent;
                offerTrackBadge.textContent = drawerTrackBadge.textContent;
                offerAmountInput.placeholder = drawerTrackPrice.textContent;
                offerAmountInput.value = '';
                
                viewTerms.style.display = 'none';
                viewOffer.style.display = 'flex';
            });
        }

        // Back to terms view
        if (btnBackToTerms) {
            btnBackToTerms.addEventListener('click', () => {
                viewOffer.style.display = 'none';
                viewTerms.style.display = 'flex';
            });
        }

        // Direct secure acquisition success flow
        if (btnSecureAcquisition) {
            btnSecureAcquisition.addEventListener('click', () => {
                successTitle.textContent = 'ACQUISITION INITIATED';
                successMessage.innerHTML = `Acquisition workflow for <strong>${drawerTrackTitle.textContent}</strong> has been initiated. A direct secure blockchain invoice is ready. Please check your connected wallet or authorization screen.`;
                
                viewTerms.style.display = 'none';
                viewSuccess.style.display = 'flex';
            });
        }

        // Form submission handling
        if (makeOfferForm) {
            makeOfferForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const offerVal = offerAmountInput.value || offerAmountInput.placeholder;
                const emailVal = offerEmailInput.value;

                successTitle.textContent = 'OFFER LOGGED';
                successMessage.innerHTML = `Your offer of <strong>${offerVal}</strong> for <strong>${offerTrackTitle.textContent}</strong> has been submitted. We will review the proposal and contact you at <strong>${emailVal}</strong> within 48 hours.`;

                viewOffer.style.display = 'none';
                viewSuccess.style.display = 'flex';
            });
        }

        if (successCloseBtn) {
            successCloseBtn.addEventListener('click', closeDrawer);
        }

        function closeDrawer() {
            dealDrawer.classList.remove('active');
            if (typeof lenis !== 'undefined') lenis.start();
        }

        closeDrawerBtn.addEventListener('click', closeDrawer);

        window.addEventListener('click', (e) => {
            if (e.target === dealDrawer) {
                closeDrawer();
            }
        });
    }
});

/* Yelo Studio Popup Logic */
document.addEventListener('DOMContentLoaded', () => {
    const popupModal = document.getElementById('yelo-popup-modal');
    const minimizedBtn = document.getElementById('yelo-minimized-btn');
    const closeBtn = document.getElementById('yelo-close-btn');
    const laterBtn = document.getElementById('yelo-later-btn');
    const applyBtn = document.getElementById('yelo-apply-btn');

    if (!popupModal || !minimizedBtn) return;

    const popupState = sessionStorage.getItem('yeloPopupState');

    function minimizePopup() {
        popupModal.classList.remove('show');
        setTimeout(() => {
            minimizedBtn.classList.remove('hidden');
        }, 300);
        sessionStorage.setItem('yeloPopupState', 'minimized');
    }

    function maximizePopup() {
        minimizedBtn.classList.add('hidden');
        setTimeout(() => {
            popupModal.classList.add('show');
        }, 100);
    }

    if (popupState === 'minimized') {
        minimizedBtn.classList.remove('hidden');
    } else {
        popupModal.classList.add('show');
    }

    if (closeBtn) closeBtn.addEventListener('click', minimizePopup);
    if (laterBtn) laterBtn.addEventListener('click', minimizePopup);
    if (applyBtn) applyBtn.addEventListener('click', minimizePopup);
    if (minimizedBtn) minimizedBtn.addEventListener('click', maximizePopup);
});

