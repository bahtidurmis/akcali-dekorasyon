// AOS Animasyon Kütüphanesini Başlat
AOS.init({
    duration: 800,
    easing: 'ease-in-out'
});

// Scroll Spy için Intersection Observer
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Fiyat Hesaplama Formu
const fiyatHesaplamaForm = document.getElementById('fiyatHesaplamaForm');
const fiyatSonuc = document.getElementById('fiyatSonuc');
const hesaplananFiyat = document.getElementById('hesaplananFiyat');
const whatsappLink = document.getElementById('whatsappLink');

// Hizmet Kategorileri
const hizmetler = {
    'duvar-citasi': {
        ad: 'Duvar Çıtası',
        birimFiyat: 150 // metrekare başına TL
    },
    'lambri': {
        ad: 'Lambri',
        birimFiyat: 200
    },
    'tv-unitesi': {
        ad: 'TV Ünitesi',
        birimFiyat: 250
    },
    'is-yeri': {
        ad: 'İş Yeri Dekorasyonu',
        birimFiyat: 300
    }
};

// Hizmet kategorilerini select'e ekle
const hizmetKategoriSelect = document.getElementById('hizmetKategori');
for (const [key, value] of Object.entries(hizmetler)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = value.ad;
    hizmetKategoriSelect.appendChild(option);
}

fiyatHesaplamaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const kategori = hizmetKategoriSelect.value;
    const en = parseFloat(document.getElementById('en').value);
    const boy = parseFloat(document.getElementById('boy').value);
    
    if (kategori && !isNaN(en) && !isNaN(boy)) {
        const alan = (en * boy) / 10000; // cm²'den m²'ye çevir
        const birimFiyat = hizmetler[kategori].birimFiyat;
        const toplamFiyat = Math.round(alan * birimFiyat);
        
        // Sonucu göster
        hesaplananFiyat.textContent = toplamFiyat.toLocaleString();
        fiyatSonuc.classList.remove('d-none');
        
        // WhatsApp mesajını hazırla
        const mesajSatirlar = [
            "Merhaba, " + hizmetler[kategori].ad + " hizmeti icin fiyat hesaplamasi yaptim:",
            "En: " + en + " cm",
            "Boy: " + boy + " cm",
            "Toplam Alan: " + alan.toFixed(2) + " m2",
            "Hesaplanan Fiyat: " + toplamFiyat.toLocaleString() + " TL + İşçilik",
            "Detayli bilgi almak istiyorum."
        ];
        
        const mesaj = encodeURIComponent(mesajSatirlar.join("\n"));
        
        // WhatsApp linkini güncelle
        const whatsappUrl = "https://api.whatsapp.com/send?phone=905447656569&text=" + mesaj;
        whatsappLink.href = whatsappUrl;
    }
});

// Mobil menü için smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Mobil menüyü kapat
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
}); 