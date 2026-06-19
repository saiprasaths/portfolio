/**
 * Sai Prasath S - Portfolio Website Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initResumeModal();
    initProjectModals();
    initCardGlowEffects();
    initContactForm();
    initScrollSpy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', initialTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* ==========================================================================
   2. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileNav() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileNavToggle.addEventListener('click', () => {
        const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });
}

/* ==========================================================================
   3. Resume Viewer Modal
   ========================================================================== */
function initResumeModal() {
    const viewResumeBtn  = document.getElementById('viewResumeBtn');
    const resumeModal    = document.getElementById('resumeModal');
    const resumeCloseBtn = document.getElementById('resumeCloseBtn');
    const resumeIframe   = document.getElementById('resumeIframe');

    if (!viewResumeBtn || !resumeModal) return;

    // Open modal — lazily set iframe src only when first opened
    viewResumeBtn.addEventListener('click', () => {
        if (!resumeIframe.getAttribute('src')) {
            resumeIframe.setAttribute('src', 'assets/resume.pdf');
        }
        resumeModal.showModal();
    });

    // Close button
    resumeCloseBtn.addEventListener('click', () => {
        resumeModal.close();
    });

    // Close on backdrop click (outside the dialog box)
    resumeModal.addEventListener('click', (e) => {
        const rect = resumeModal.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top  ||
            e.clientY > rect.bottom
        ) {
            resumeModal.close();
        }
    });
}

/* ==========================================================================
   4. Interactive Projects Modal (Simple & Detailed Views)
   ========================================================================== */
const projectDetailsData = {
    mhm: {
        title: "Mental Health Monitor (MHM) – Multi-Agent LLM",
        tag: "AI & Multi-Agent System",
        techs: ["Python", "Flask", "DistilBERT", "LLMs", "pgvector", "NLP", "Vector Embeddings", "Chart.js"],
        sections: [
            {
                heading: "Project Overview",
                content: "Designed and implemented a multi-agent LLM-driven mental health monitoring system with context-aware conversational AI for continuous user interactions."
            },
            {
                heading: "Key Accomplishments & Architecture",
                list: [
                    "Engineered a Long-Context Cognitive Mapping memory layer using pgvector and vector embeddings to retain longitudinal user context, achieving approximately 82% Top-K retrieval accuracy.",
                    "Built a DistilBERT + LLM hybrid pipeline for 4-class sentiment classification, achieving approximately 88% emotion detection accuracy.",
                    "Developed a MIND-SAFE crisis detection framework to override unsafe LLM responses and trigger real-time human intervention alert workflows.",
                    "Implemented a real-time analytics dashboard to monitor user sentiment trends, crisis indicators, conversation insights, and system performance metrics.",
                    "Optimized performance through parallel Flask-based multi-agent orchestration, reducing latency by approximately 30% and achieving sub-2-second response time with approximately 95% reliability."
                ]
            },
            {
                heading: "Privacy & Security",
                content: "Integrated role-based access control (RBAC) to protect sensitive user data, enforce privacy-aware access permissions, and support secure human-in-the-loop intervention."
            }
        ]
    },
    ecg: {
        title: "Real-time ECG Analysis and Classification using Neural Networks",
        tag: "IoT & Deep Learning",
        techs: ["Python", "Neural Networks", "IoT Devices", "Signal Processing", "MATLAB", "Hardware Integration"],
        sections: [
            {
                heading: "Project Overview",
                content: "Developed a portable hardware setup for real-time ECG signal acquisition and pre-processing powered by smartphones or laptops."
            },
            {
                heading: "Technical Implementation",
                list: [
                    "Implemented IoT protocols for data transmission from hardware sensors to a dedicated analysis system.",
                    "Designed a pre-trained convolutional neural network (CNN) for ECG diagnosis, classification of arrhythmia, and health indicator reporting.",
                    "Configured return channels so that diagnosis results and graphs are instantly sent back to smart devices for accessible patient monitoring.",
                    "Published research details in IEEE i-PACT 2023 | DOI: 10.1109/i-PACT58649.2023.10434526."
                ]
            }
        ]
    },
    energy: {
        title: "Energy Meter Reading Using Image Processing",
        tag: "Computer Vision & OCR",
        techs: ["Azure Computer Vision", "Google Firebase", "HTML5", "CSS3", "JavaScript"],
        sections: [
            {
                heading: "Project Overview",
                content: "A web-based portal designed to capture, extract, and record values from electricity/energy meters through image processing and cloud storage."
            },
            {
                heading: "Key Features",
                list: [
                    "Built a web-based energy meter reading system that extracts accurate readings from uploaded meter images using Azure Computer Vision OCR.",
                    "Developed a clean interface for image upload, reading validation, and instant feedback verification.",
                    "Integrated Google Firebase for secure user authentication, database management, and persistent log storage of extracted readings."
                ]
            }
        ]
    },
    robot: {
        title: "Assisted Emergency Robot for Fire Brigade",
        tag: "Robotics & Embedded Systems",
        techs: ["Arduino", "Gas/Flame Sensors", "Bluetooth", "Embedded Systems", "Mobile App Integration"],
        sections: [
            {
                heading: "Project Overview",
                content: "Developed a Bluetooth-controlled emergency response robot equipped with environmental sensors to monitor dangerous areas and support fire response teams."
            },
            {
                heading: "System Capabilities",
                list: [
                    "Equipped the robot with sensors to monitor CO2, nitrogen, temperature, humidity, flame, and smoke levels.",
                    "Built a real-time monitoring interface to display sensor readings and trigger instant alerts for flame and smoke detection.",
                    "Designed the system to assist fire brigade teams in remote inspection and telemetry of hazardous, tight, or smoke-filled environments."
                ]
            }
        ]
    },
    emotion: {
        title: "CNN for Emotion Classification in Text",
        tag: "Natural Language Processing",
        techs: ["Python", "NLTK", "Keras", "Scikit-learn", "Pandas", "Matplotlib"],
        sections: [
            {
                heading: "Project Overview",
                content: "Built an NLP pipeline implementing Deep Learning to recognize and categorize various emotion classes from text datasets."
            },
            {
                heading: "Workflow & Optimization",
                list: [
                    "Created an end-to-end ML workflow including text preprocessing, tokenization, stop-word removal, and TF-IDF feature extraction.",
                    "Trained and optimized a CNN architecture using Keras, tuning hyperparameters to improve classification accuracy.",
                    "Used Scikit-learn for model evaluation, generating confusion matrices, and tracking accuracy/f1-scores across multiple emotion classes."
                ]
            }
        ]
    }
};

function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBody = document.getElementById('modalBody');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const project = projectDetailsData[projectId];
            
            if (project) {
                // Populate Modal Content
                let modalHTML = `
                    <span class="modal-tag">${project.tag}</span>
                    <h2>${project.title}</h2>
                    <div class="modal-techs">
                        ${project.techs.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                `;
                
                project.sections.forEach(sec => {
                    modalHTML += `
                        <div class="modal-section">
                            <h3>${sec.heading}</h3>
                    `;
                    
                    if (sec.content) {
                        modalHTML += `<p>${sec.content}</p>`;
                    }
                    
                    if (sec.list) {
                        modalHTML += `
                            <ul>
                                ${sec.list.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        `;
                    }
                    
                    modalHTML += `</div>`;
                });
                
                modalBody.innerHTML = modalHTML;
                projectModal.showModal();
            }
        });
    });
    
    // Close modal action
    modalCloseBtn.addEventListener('click', () => {
        projectModal.close();
    });
    
    // Close modal if clicked backdrop
    projectModal.addEventListener('click', (e) => {
        const dialogDimensions = projectModal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            projectModal.close();
        }
    });
}

/* ==========================================================================
   4. Glow Card Hover Effect
   ========================================================================== */
function initCardGlowEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

/* ==========================================================================
   5. Contact Form Submission
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Name for the success message
            const name = document.getElementById('name').value.trim();
            
            formStatus.className = 'form-status';
            formStatus.textContent = 'Sending message...';
            
            const formData = new FormData(contactForm);
            
            // Set dynamic subject line based on user name
            formData.set('subject', `${name} sent a message from Portfolio Website`);
            
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                const result = await response.json();
                if (response.status === 200) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                    contactForm.reset();
                } else {
                    console.log(response);
                    formStatus.className = 'form-status error';
                    formStatus.textContent = result.message || 'Something went wrong. Please try again later.';
                }
            })
            .catch(error => {
                console.log(error);
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Network error. Please check your connection and try again.';
            });
        });
    }
}

/* ==========================================================================
   6. ScrollSpy for Navigation Highlight
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Show/hide scroll-to-top button
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }
    }, { passive: true });
    
    // Scroll to top on button click
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
