// ===== TEK PARÇA JAVASCRIPT - jpg.jpeg UZANTILARI İÇİN =====
(function() {
    'use strict';

    // ===== 1. AŞK SÖZLERİ =====
    const loveQuotes = [
        "Sen benim en güzel tesadüfümsün.",
        "Zaman seninle anlam kazandı.",
        "Kalbim senin adını ezberledi.",
        "Bir ömür sen diye atan bir kalbim var.",
        "Gülüşün dünyamın en güzel manzarası.",
        "Gözlerin gökyüzünden bir parça.",
        "Sen varken her şey çok güzel.",
        "Sana her baktığımda ilk defa görüyormuşum gibi.",
        "Ellerin elimde, huzur içimde.",
        "Aşk seninle gerçek.",
        "Sen düşlerimin en tatlısı.",
        "Nefesimsin, canımsın.",
        "Yanımda ol yeter.",
        "Seninle sonsuzluk bile az.",
        "Kalbim hep seni seçti.",
        "Ruhumun eşisin.",
        "Gülüşün ilaç bana.",
        "Her şey seninle anlamlı.",
        "Sen benim geleceğimsin.",
        "Bir ömür boyu sen.",
        "Birlikte yaşlanmak istediğim tek insan.",
        "Sana âşık olmak en büyük şansım.",
        "Kalbim senin ritminle atıyor.",
        "Seninle her gün ayrı bir mucize.",
        "Gözlerindeki ışıltı ömrüme ömür katar.",
        "Yanakların pembesi umudum.",
        "Tenin tenime değdiğinde zaman durur.",
        "En sevdiğim yer, yanın.",
        "Hayat seninle bayram.",
        "Sonsuzluğu seninle yaşamak isterim.",
        "Sen benim dünyamsın.",
        "Aşkın en güzeli seninle."
    ];

    // ===== 2. FOTOĞRAFLAR =====
    const photos = [];
    const totalPhotos = 15;
    
    // ===== FOTOĞRAF AÇIKLAMALARI - BURAYI DEĞİŞTİR =====
    // İstediğin yazıları buraya yaz, hemen değişecek!
    const photoDescriptions = [
        "❤️ Güzel Kızım ❤️",
        "❤️ Sevgilim ❤️",
        "❤️ Bebeğim ❤️",
        "❤️ Ömrüm ❤️",
        "❤️ Hayatımın Anlamı ❤️",
        "❤️ Balım ❤️",
        "❤️ Fıstığım ❤️",
        "❤️ Minik Bebişim ❤️",
        "❤️ Üstadım ❤️",
        "❤️ Prensesim ❤️",
        "❤️ Kraliçem ❤️",
        "❤️ Aşkım ❤️",
        "❤️ Yıldızım ❤️",
        "❤️ Yaşam Kaynağım ❤️",
        "❤️ İyikim ❤️"
    ];
    
    for (let i = 1; i <= totalPhotos; i++) {
        photos.push({
            id: i,
            caption: `Foto${i}`,
            src: `${i}.jpg.jpeg`,
            text: photoDescriptions[i-1] || `Fotoğraf ${i}`
        });
    }

    // ===== 3. SAYAÇ =====
    const startDate = new Date(2025, 1, 3, 0, 0, 0);
    
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        if (diff < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    updateCounter();
    setInterval(updateCounter, 1000);

    // ===== 4. AŞK SÖZLERİ DÖNGÜSÜ =====
    let quoteIndex = 0;
    const wordDisplay = document.getElementById('wordDisplay');
    const currentWordSpan = document.getElementById('currentWord');
    const totalWordsSpan = document.getElementById('totalWords');
    
    totalWordsSpan.textContent = loveQuotes.length;
    
    function showNextQuote() {
        wordDisplay.style.opacity = '0';
        wordDisplay.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            wordDisplay.textContent = loveQuotes[quoteIndex];
            currentWordSpan.textContent = quoteIndex + 1;
            
            wordDisplay.style.opacity = '1';
            wordDisplay.style.transform = 'scale(1)';
            
            quoteIndex = (quoteIndex + 1) % loveQuotes.length;
        }, 300);
    }
    
    showNextQuote();
    setInterval(showNextQuote, 4000);

    // ===== 5. GALERİYİ OLUŞTUR =====
    const galleryGrid = document.getElementById('galleryGrid');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    
    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.1}s`;
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        
        img.onerror = function() {
            console.log(`Fotoğraf ${photo.id} yüklenemedi, yerine renkli kutu gösteriliyor`);
            this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23ffb3c6' /%3E%3Ctext x='50%25' y='45%25' font-size='80' fill='%23b83b6b' text-anchor='middle' dy='.3em'%3E📸%3C/text%3E%3Ctext x='50%25' y='60%25' font-size='24' fill='%239e4a6b' text-anchor='middle'%3E${photo.text}%3C/text%3E%3C/svg%3E`;
        };
        
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = photo.text;  // BURASI ÖNEMLİ - photo.text gösteriliyor!
        
        item.appendChild(img);
        item.appendChild(caption);
        
        item.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImage.src = img.src;
            modalCaption.textContent = photo.text;
        });
        
        galleryGrid.appendChild(item);
    });
    
    // Modal kapatma
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    // ===== 6. MÜZİK KONTROLÜ =====
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    const musicText = document.getElementById('musicText');
    
    audio.volume = 0.2;
    let isPlaying = false;
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicText.textContent = 'Müziği Başlat';
        } else {
            audio.play().catch(e => console.log('Playback failed:', e));
            musicText.textContent = 'Duraklat';
        }
        isPlaying = !isPlaying;
    });

    // ===== 7. SCROLL ANİMASYONLARI =====
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100 && rect.bottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(checkScroll);
    });
    
    checkScroll();

    // ===== 8. SAYFA YÜKLENİNCE =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        checkScroll();
        console.log('♥ Site yüklendi ♥');
        console.log('📸 Fotoğraf açıklamaları güncellendi!');
    });

})();