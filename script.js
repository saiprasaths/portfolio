document.addEventListener('DOMContentLoaded', () => {

    // Global configuration
    const CONFIG = {
        availabilityText: 'Open to Full-Time Roles',
        typingRoles: ['AI & ML Engineer', 'Python Backend Developer', 'GenAI & RAG Specialist'],
        exploringTopics: [
            'Multi-Agent Systems',
            'LLM Fine-tuning',
            'MLOps Pipelines',
            'Edge AI Deployment',
            'Vector Databases',
            'Agentic AI',
            'BigQuery Analytics'
        ]
    };

    // ==========================================================================
    // 1. Page Preloader
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');
    
    // Simulate loading progress
    if (preloaderBar) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                // Complete load
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    document.body.classList.add('loaded');
                }, 200);
            } else {
                width += 10;
                preloaderBar.style.width = width + '%';
            }
        }, 80);
    } else {
        document.body.classList.add('loaded');
    }

    // ==========================================================================
    // 2. Theme Management with Circular Transition
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const transitionOverlay = document.getElementById('themeTransitionOverlay');
    const themeColorMeta = document.getElementById('theme-color-meta');
    
    // Initialize theme from localStorage or system preferences
    const getSavedTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    let currentTheme = getSavedTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeColorMeta(currentTheme);

    function updateThemeColorMeta(theme) {
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', theme === 'dark' ? '#1C1A17' : '#FDFBF7');
        }
    }

    let isTransitioning = false;

    themeToggleBtn.addEventListener('click', (e) => {
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        currentTheme = nextTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeColorMeta(currentTheme);
    });

    // ==========================================================================
    // 3. Dynamic Greeting & Status Badge
    // ==========================================================================
        const statusBadge = document.getElementById('statusBadge');

    if (statusBadge) {
        const badgeText = statusBadge.querySelector('.status-text');
        if (badgeText) {
            badgeText.textContent = CONFIG.availabilityText;
        }
    }

    // ==========================================================================
    // 4. Role Typing Carousel
    // ==========================================================================
    const heroRole = document.getElementById('heroRole');
    
    if (heroRole) {
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingTimer = null;

        const typeEffect = () => {
            const currentRole = CONFIG.typingRoles[roleIdx];
            
            if (isDeleting) {
                // Delete characters
                heroRole.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
            } else {
                // Type characters
                heroRole.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
            }

            let typingSpeed = isDeleting ? 40 : 70;

            if (!isDeleting && charIdx === currentRole.length) {
                // Pause at complete string
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % CONFIG.typingRoles.length;
                typingSpeed = 300;
            }

            typingTimer = setTimeout(typeEffect, typingSpeed);
        };

        typeEffect();
    }

    // ==========================================================================
    // 5. Reading Progress Bar
    // ==========================================================================
    const progressBar = document.getElementById('progressBar');
    
    if (progressBar) {
        let ticking = false;
        const updateProgressBar = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (window.scrollY / docHeight) : 0;
            progressBar.style.transform = `scaleX(${scrolled})`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgressBar);
                ticking = true;
            }
        });
    }

    // ==========================================================================
    // 6. Sticky Header
    // ==========================================================================
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ==========================================================================
    // 7. Mobile Navigation Trigger
    // ==========================================================================
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileNavToggle && navMenu) {
        const toggleMenu = () => {
            const isOpen = document.body.classList.toggle('nav-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        };

        mobileNavToggle.addEventListener('click', toggleMenu);

        // Close on nav link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on click outside menu
        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('nav-open') && 
                !navMenu.contains(e.target) && 
                !mobileNavToggle.contains(e.target)) {
                document.body.classList.remove('nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
                document.body.classList.remove('nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.focus();
            }
        });
    }

    // ==========================================================================
    // 8. Scroll Reveal (IntersectionObserver)
    // ==========================================================================
    const animateElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window && animateElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        animateElements.forEach(el => el.classList.add('revealed'));
    }

    // ==========================================================================
    // 9. Active Section Tracking (Header & Dot Nav Highlight)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const dotLinks = document.querySelectorAll('.dot');
    
    if ('IntersectionObserver' in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    
                    // Update Header Links
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
                    });
                    
                    // Update Dot Nav
                    dotLinks.forEach(dot => {
                        dot.classList.toggle('active', dot.getAttribute('href') === `#${activeId}`);
                    });
                }
            });
        }, {
            threshold: 0.3
        });

        sections.forEach(sec => sectionObserver.observe(sec));
    }

    // ==========================================================================
    // 10. Animated Stat Counters
    // ==========================================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        
        const countUp = (element) => {
            const target = parseInt(element.getAttribute('data-target'), 10);
            const prefix = element.getAttribute('data-prefix') || '';
            const suffix = element.getAttribute('data-suffix') || '';
            const duration = 1500; // ms
            const start = 0;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                const currentVal = Math.floor(start + easedProgress * (target - start));
                
                element.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                }
            };

            requestAnimationFrame(updateCount);
        };

        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(num => statObserver.observe(num));
    } else {
        // Fallback
        statNumbers.forEach(num => {
            const target = num.getAttribute('data-target');
            const prefix = num.getAttribute('data-prefix') || '';
            const suffix = num.getAttribute('data-suffix') || '';
            num.textContent = `${prefix}${target}${suffix}`;
        });
    }

    // ==========================================================================
    // 11. Exploring Ticker Dynamic Content
    // ==========================================================================
    const tickerTrack = document.getElementById('tickerTrack');
    
    if (tickerTrack) {
        // Build items list
        let tickerHtml = '';
        // Duplicate items array once to enable seamless infinite scroll loop
        const loopItems = [...CONFIG.exploringTopics, ...CONFIG.exploringTopics];
        
        loopItems.forEach((topic) => {
            tickerHtml += `
                <div class="ticker-item">
                    <span>${topic}</span>
                    <span class="ticker-separator" aria-hidden="true">/</span>
                </div>
            `;
        });
        
        tickerTrack.innerHTML = tickerHtml;
    }

    // ==========================================================================
    // 12. Skill Category Filter
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('dimmed');
                } else {
                    card.classList.add('dimmed');
                }
            });
        });
    });

    // ==========================================================================
    // 13. Card Mouse-Follow Glow Effect
    // ==========================================================================
    const glowCards = document.querySelectorAll('.skill-category-card, .project-card');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--glow-x', `-999px`);
            card.style.setProperty('--glow-y', `-999px`);
        });
    });

    // ==========================================================================
    // 14. Hero Blobs Parallax Effect
    // ==========================================================================
    const hero = document.getElementById('hero');
    const blob1 = document.getElementById('blob1');
    const blob2 = document.getElementById('blob2');
    const blob3 = document.getElementById('blob3');
    
    if (hero && blob1 && blob2 && blob3) {
        let isMoving = false;
        
        hero.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return; // disable on mobile/tablet
            
            if (!isMoving) {
                window.requestAnimationFrame(() => {
                    const rect = hero.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left - rect.width / 2;
                    const mouseY = e.clientY - rect.top - rect.height / 2;
                    
                    // Shift values scaling down for subtle movement
                    blob1.style.transform = `translate(${mouseX * 0.04}px, ${mouseY * 0.04}px)`;
                    blob2.style.transform = `translate(${mouseX * -0.03}px, ${mouseY * -0.03}px)`;
                    blob3.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * -0.02}px)`;
                    
                    isMoving = false;
                });
                isMoving = true;
            }
        });

        hero.addEventListener('mouseleave', () => {
            blob1.style.transform = 'translate(0, 0)';
            blob2.style.transform = 'translate(0, 0)';
            blob3.style.transform = 'translate(0, 0)';
        });
    }

    // ==========================================================================
    // 15. Scroll-To-Top Button
    // ==========================================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 16. Contact Form Submission (Web3Forms API integration)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Frontend Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.className = 'form-status error';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.className = 'form-status error';
                return;
            }

            // Disable button, show loading
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.querySelector('span').textContent = 'Sending...';
            }

            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status';

            const formData = new FormData(contactForm);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status === 200) {
                    formStatus.textContent = 'Message sent successfully! I will reach out to you shortly.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    console.log(response);
                    formStatus.textContent = json.message || 'Something went wrong. Please try again.';
                    formStatus.className = 'form-status error';
                }
            })
            .catch(error => {
                console.log(error);
                formStatus.textContent = 'Failed to submit form. Please check your network connection.';
                formStatus.className = 'form-status error';
            })
            .then(() => {
                // Restore button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.querySelector('span').textContent = 'Send Message';
                }
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            });
        });
    }

    // ==========================================================================
    // 17. Mobile Experience Highlights Toggler (UX Length Reduction)
    // ==========================================================================
    const initMobileHighlights = () => {
        const isMobile = window.innerWidth < 768;
        const cards = document.querySelectorAll('.timeline-card');
        
        cards.forEach(card => {
            const highlightsList = card.querySelector('.timeline-highlights');
            if (!highlightsList) return;
            
            const listItems = highlightsList.querySelectorAll('li');
            if (listItems.length <= 3) return;
            
            let toggleBtn = card.querySelector('.toggle-highlights-btn');
            
            if (isMobile) {
                // If button doesn't exist, create it
                if (!toggleBtn) {
                    const remainingCount = listItems.length - 3;
                    toggleBtn = document.createElement('button');
                    toggleBtn.className = 'toggle-highlights-btn';
                    toggleBtn.innerHTML = `Show More Details (+${remainingCount})`;
                    
                    // Button styling
                    toggleBtn.style.background = 'none';
                    toggleBtn.style.border = 'none';
                    toggleBtn.style.color = 'var(--color-primary)';
                    toggleBtn.style.fontWeight = '600';
                    toggleBtn.style.fontSize = '0.85rem';
                    toggleBtn.style.cursor = 'pointer';
                    toggleBtn.style.padding = '8px 0 0 0';
                    toggleBtn.style.display = 'inline-flex';
                    toggleBtn.style.alignItems = 'center';
                    toggleBtn.style.gap = '4px';
                    toggleBtn.style.transition = 'color 0.3s ease';
                    
                    highlightsList.parentNode.insertBefore(toggleBtn, highlightsList.nextSibling);
                    
                    let isExpanded = false;
                    toggleBtn.addEventListener('click', () => {
                        isExpanded = !isExpanded;
                        for (let i = 3; i < listItems.length; i++) {
                            listItems[i].style.display = isExpanded ? 'list-item' : 'none';
                        }
                        toggleBtn.innerHTML = isExpanded 
                            ? 'Show Less' 
                            : `Show More Details (+${remainingCount})`;
                    });
                }
                
                // Set initial collapsed state (unless it was already expanded)
                if (toggleBtn.innerHTML.includes('Show More')) {
                    for (let i = 3; i < listItems.length; i++) {
                        listItems[i].style.display = 'none';
                    }
                }
            } else {
                // Reset to desktop view
                if (toggleBtn) {
                    toggleBtn.remove();
                }
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].style.display = '';
                }
            }
        });
    };
    
    // Run on load and resize
    initMobileHighlights();
    window.addEventListener('resize', initMobileHighlights);
});
