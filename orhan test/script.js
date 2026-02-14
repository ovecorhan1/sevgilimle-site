// =========================================
// INTERIOR STUDIO - PREMIUM ANIMATIONS
// Modern, Luxury Interior Design Website
// Vanilla JavaScript
// =========================================

// =========================================
// DOM ELEMENTS
// =========================================
const DOM = {
    // Navigation
    navbar: document.querySelector('.navbar'),
    mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
    mobileMenu: document.querySelector('.mobile-menu'),
    
    // Theme
    themeToggle: document.querySelector('.theme-toggle'),
    
    // Cursor
    cursorDot: document.querySelector('.cursor-dot'),
    cursorOutline: document.querySelector('.cursor-outline'),
    
    // Loader
    loader: document.querySelector('.loader-wrapper'),
    
    // Progress Bar
    progressBar: document.querySelector('.progress-bar'),
    
    // Modal
    modal: document.getElementById('projectModal'),
    modalBody: document.querySelector('.modal-body'),
    modalClose: document.querySelector('.modal-close'),
    
    // Projects Grid
    projectsGrid: document.getElementById('projectsGrid'),
    
    // Filter Buttons
    filterBtns: document.querySelectorAll('.filter-btn')
};

// =========================================
// LOADING ANIMATION
// =========================================
window.addEventListener('load', () => {
    // Hide loader after page load
    setTimeout(() => {
        if (DOM.loader) {
            DOM.loader.classList.add('hidden');
        }
    }, 2000);
});

// =========================================
// CUSTOM CURSOR
// =========================================
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        if (DOM.cursorDot && DOM.cursorOutline) {
            DOM.cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            DOM.cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
    });

    // Hover effect for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card, .filter-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (DOM.cursorDot && DOM.cursorOutline) {
                DOM.cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                DOM.cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                DOM.cursorOutline.style.borderWidth = '1px';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (DOM.cursorDot && DOM.cursorOutline) {
                DOM.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                DOM.cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                DOM.cursorOutline.style.borderWidth = '2px';
            }
        });
    });
}

// =========================================
// SCROLL EFFECTS
// =========================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        DOM.navbar?.classList.add('scrolled');
    } else {
        DOM.navbar?.classList.remove('scrolled');
    }
    
    // Progress bar
    updateProgressBar();
    
    // Scroll animations
    animateOnScroll();
});

// Progress bar
function updateProgressBar() {
    if (!DOM.progressBar) return;
    
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    DOM.progressBar.style.width = scrolled + '%';
}

// =========================================
// SCROLL ANIMATIONS (Fade-in, Slide-up)
// =========================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-fade-up');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initial check for elements in view
setTimeout(animateOnScroll, 100);
window.addEventListener('load', animateOnScroll);

// =========================================
// MOBILE MENU
// =========================================
if (DOM.mobileMenuBtn) {
    DOM.mobileMenuBtn.addEventListener('click', () => {
        DOM.mobileMenuBtn.classList.toggle('active');
        DOM.mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = DOM.mobileMenuBtn.querySelectorAll('span');
        if (DOM.mobileMenuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        DOM.mobileMenu.classList.remove('active');
        DOM.mobileMenuBtn.classList.remove('active');
        
        const spans = DOM.mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// =========================================
// DARK/LIGHT MODE TOGGLE - DÜZELTİLMİŞ VERSİYON
// =========================================

// Tema başlatma fonksiyonu
function initializeTheme() {
    // LocalStorage'da kayıtlı tema var mı kontrol et
    const savedTheme = localStorage.getItem('theme');
    
    // Varsayılan tema light
    let theme = 'light';
    
    // Eğer kayıtlı tema varsa onu kullan
    if (savedTheme) {
        theme = savedTheme;
    } else {
        // Kullanıcının sistem tercihini kontrol et
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }
    
    // Temayı uygula
    document.documentElement.setAttribute('data-theme', theme);
    
    // Toggle butonunun görünümünü güncelle
    updateThemeToggleIcon(theme);
}

// Tema toggle ikonunu güncelle
function updateThemeToggleIcon(theme) {
    if (DOM.themeToggle) {
        const moonIcon = DOM.themeToggle.querySelector('.fa-moon');
        const sunIcon = DOM.themeToggle.querySelector('.fa-sun');
        
        if (moonIcon && sunIcon) {
            if (theme === 'dark') {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        }
    }
}

// Temayı değiştir fonksiyonu
function toggleTheme() {
    // Mevcut temayı al
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Yeni temayı belirle
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Temayı uygula
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // LocalStorage'a kaydet
    localStorage.setItem('theme', newTheme);
    
    // Toggle butonunun görünümünü güncelle
    updateThemeToggleIcon(newTheme);
    
    // Animate theme toggle
    if (DOM.themeToggle) {
        DOM.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            DOM.themeToggle.style.transform = 'none';
        }, 300);
    }
    
    console.log('Tema değiştirildi:', newTheme); // Debug için
}

// Theme toggle event listener - DÜZELTİLMİŞ
if (DOM.themeToggle) {
    // Mevcut event listener'ları temizle
    DOM.themeToggle.removeEventListener('click', toggleTheme);
    // Yeni event listener ekle
    DOM.themeToggle.addEventListener('click', toggleTheme);
}

// Sayfa yüklendiğinde temayı başlat
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
});

// Sistem teması değiştiğinde kontrol et (opsiyonel)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Eğer localStorage'da kayıtlı tema yoksa sistem temasını uygula
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeToggleIcon(newTheme);
    }
});

// =========================================
// COUNTER ANIMATION
// =========================================
function animateCounter() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 50; // Smooth increment
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounter, 30);
        } else {
            counter.innerText = target;
        }
    });
}

// Start counter when in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.counter-container').forEach(container => {
    observer.observe(container);
});

// =========================================
// PROJECT MODAL
// =========================================
const projectDetails = {
    1: {
        title: 'Modern Villa',
        location: 'İstanbul, Türkiye',
        category: 'residential',
        description: 'Boğaz manzaralı bu modern villa projesinde minimalist çizgiler ve doğal malzemeler ön planda. Açık plan yaşam alanı, özel tasarım mobilyalar ve akıllı ev sistemleri ile donatılmıştır.',
        image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        area: '450 m²',
        year: '2023',
        services: ['Konsept Tasarım', 'Mobilya Tasarımı', 'Aydınlatma', 'Proje Yönetimi']
    },
    2: {
        title: 'Loft Ofis',
        location: 'Ankara, Türkiye',
        category: 'office',
        description: 'Endüstriyel loft tarzında tasarlanan bu ofis, yaratıcı ekipler için ilham verici bir çalışma ortamı sunuyor. Açık tavan, beton görünümlü duvarlar ve sıcak ahşap detaylar.',
        image: 'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        area: '300 m²',
        year: '2023',
        services: ['Ofis Tasarımı', 'Mobilya', 'Aydınlatma', 'Aksesuar']
    },
    3: {
        title: 'Restoran',
        location: 'İzmir, Türkiye',
        category: 'hospitality',
        description: 'Akdeniz mutfağı temalı bu restoran, sıcak ve davetkar atmosferiyle misafirlerine unutulmaz bir deneyim sunuyor. Doğal taş, ahşap ve bitki ögeleri.',
        image: 'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        area: '250 m²',
        year: '2023',
        services: ['Konsept', 'İç Mekan', 'Mobilya', 'Dekorasyon']
    },
    4: {
        title: 'Butik Otel',
        location: 'Bodrum, Türkiye',
        category: 'hospitality',
        description: 'Ege\'nin huzurunu yansıtan butik otel tasarımı. Yerel taşlar, el dokuması tekstiller ve modern konforun buluştuğu özel bir proje.',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        area: '800 m²',
        year: '2022',
        services: ['Otel Tasarımı', 'Peyzaj', 'Mobilya', 'Aydınlatma']
    },
    5: {
        title: 'Penthouse Daire',
        location: 'İstanbul, Türkiye',
        category: 'residential',
        description: 'Şehrin kalbinde lüks bir yaşam alanı. Panoramik manzara, özel tasarım mutfak ve akıllı ev teknolojileri.',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        area: '200 m²',
        year: '2023',
        services: ['İç Mekan', 'Mobilya', 'Aydınlatma', 'Tekstil']
    },
    6: {
        title: 'Kurumsal Ofis',
        location: 'Ankara, Türkiye',
        category: 'office',
        description: 'Modern ve fonksiyonel ofis tasarımı. Toplantı odaları, ortak alanlar ve yönetici ofisleri.',
        image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        area: '600 m²',
        year: '2023',
        services: ['Ofis Tasarımı', 'Mobilya', 'Aydınlatma', 'Aksesuar']
    }
};

function openProjectModal(projectId) {
    if (!DOM.modal || !DOM.modalBody) return;
    
    const project = projectDetails[projectId];
    if (!project) return;
    
    const modalContent = `
        <div class="project-detail">
            <div class="project-detail-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-detail-content">
                <h2>${project.title}</h2>
                <p class="project-location"><i class="fas fa-map-marker-alt"></i> ${project.location}</p>
                
                <div class="project-specs">
                    <div class="spec-item">
                        <span class="spec-label">Alan</span>
                        <span class="spec-value">${project.area}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Yıl</span>
                        <span class="spec-value">${project.year}</span>
                    </div>
                </div>
                
                <p class="project-description">${project.description}</p>
                
                <div class="project-services">
                    <h3>Hizmetlerimiz</h3>
                    <ul>
                        ${project.services.map(service => `<li>${service}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    DOM.modalBody.innerHTML = modalContent;
    DOM.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (DOM.modal) {
        DOM.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Modal event listeners
if (DOM.modalClose) {
    DOM.modalClose.addEventListener('click', closeProjectModal);
}

window.addEventListener('click', (e) => {
    if (e.target === DOM.modal) {
        closeProjectModal();
    }
});

// =========================================
// PROJECTS FILTER (Projects Page)
// =========================================
const allProjects = [
    {
        id: 1,
        title: 'Modern Villa',
        location: 'İstanbul',
        category: 'residential',
        image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 2,
        title: 'Loft Ofis',
        location: 'Ankara',
        category: 'office',
        image: 'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 3,
        title: 'Restoran',
        location: 'İzmir',
        category: 'hospitality',
        image: 'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 4,
        title: 'Butik Otel',
        location: 'Bodrum',
        category: 'hospitality',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 5,
        title: 'Penthouse',
        location: 'İstanbul',
        category: 'residential',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: 6,
        title: 'Kurumsal Ofis',
        location: 'Ankara',
        category: 'office',
        image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
];

function filterProjects(category) {
    if (!DOM.projectsGrid) return;
    
    const filteredProjects = category === 'all' 
        ? allProjects 
        : allProjects.filter(project => project.category === category);
    
    displayProjects(filteredProjects);
}

function displayProjects(projects) {
    if (!DOM.projectsGrid) return;
    
    DOM.projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card animate-fade-up" data-project="${project.id}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.location}</p>
                        <button class="btn-view-project" onclick="openProjectModal(${project.id})">
                            Detayları Gör
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Trigger animations for new elements
    setTimeout(animateOnScroll, 100);
}

// Filter button event listeners
if (DOM.filterBtns.length > 0) {
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            DOM.filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });
}

// Initialize projects grid if on projects page
if (DOM.projectsGrid) {
    displayProjects(allProjects);
}

// =========================================
// SMOOTH SCROLLING
// =========================================
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

// =========================================
// PARALLAX EFFECT
// =========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    parallaxElements.forEach(element => {
        if (element) {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// =========================================
// LAZY LOADING FOR IMAGES
// =========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =========================================
// PAGE TRANSITIONS
// =========================================
document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only apply transition to internal links
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            e.preventDefault();
            
            // Show loader
            if (DOM.loader) {
                DOM.loader.classList.remove('hidden');
            }
            
            // Navigate after short delay
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});

// =========================================
// INITIALIZATION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    updateProgressBar();
    initializeTheme(); // Tema başlatma burada da çağrılıyor
});

// Make functions global for onclick handlers
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.filterProjects = filterProjects;
window.toggleTheme = toggleTheme; // Toggle fonksiyonunu global yap

// =========================================
// PERFORMANCE OPTIMIZATIONS
// =========================================

// Debounce scroll events
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    animateOnScroll();
    updateProgressBar();
}), { passive: true });

// Preload critical images
window.addEventListener('load', () => {
    const criticalImages = [
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});