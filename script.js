/**
 * Videochamada Individual de Violão - Gabriel Almeida
 * Script Mobile-First com Animações Suaves
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Players de Vídeo dos Alunos (Ao tocar, inicia o vídeo local mantendo o aspect ratio)
    const videoEmbeds = document.querySelectorAll('.video-embed-wrap');
    videoEmbeds.forEach(wrap => {
        wrap.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-src');
            if (!videoSrc) return;

            this.innerHTML = `
                <video controls autoplay playsinline style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: #000;">
                    <source src="${videoSrc}" type="video/mp4">
                    Seu navegador não suporta este vídeo.
                </video>
            `;
        });
    });

    // 2. FAQ Accordion com suporte a clique e teclado
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const question = card.querySelector('.faq-q');
        if (!question) return;

        const toggle = () => {
            const isOpen = card.classList.contains('open');
            // Fecha os outros
            faqCards.forEach(c => c.classList.remove('open'));
            // Alterna o atual
            if (!isOpen) {
                card.classList.add('open');
            }
        };

        question.addEventListener('click', toggle);
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // 3. Barra Fixa no Rodapé (oculta quando o CTA final está visível, com slide CSS suave)
    const stickyBar = document.getElementById('stickyFooterBar');
    const finalCard = document.getElementById('finalCtaCard');

    if (stickyBar && finalCard) {
        const checkScroll = () => {
            const rect = finalCard.getBoundingClientRect();
            const isFinalVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);

            if (window.scrollY > 280 && !isFinalVisible) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    }

    // 4. Rastreamento Meta Pixel (Facebook Ads) - Evento "clicou_wpp"
    const wppButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], .btn-cta');
    wppButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof fbq === 'function') {
                fbq('trackCustom', 'clicou_wpp');
            }
        });
    });

    // 5. Carrossel 3D de Depoimentos dos Alunos (idêntico ao site de referência)
    const testimonials = [
        { name: "Daia", city: "Paraná", img: "images/daia.webp", text: "Comecei totalmente do zero e já estou tocando várias músicas." },
        { name: "Nazir", city: "Nova Serrana, Minas Gerais", img: "images/nazir.webp", text: "Me identifiquei muito com o professor Gabriel e agora estou tocando mais de quatro músicas." },
        { name: "Mariana Arcanja", city: "João Pessoa, PB", img: "images/mariana.webp", text: "Tinha meu violão há 30 anos e só agora com o professor Gabriel consegui realizar meu sonho. Já toco dezenas de músicas." },
        { name: "Nilza", city: "Mato Grosso", img: "images/nilza.webp", text: "Desde adolescente era meu sonho tocar. Em menos de um mês com o professor Gabriel já estou tocando minha primeira música. Estou super feliz." },
        { name: "Nadir", city: "Petrópolis, Rio de Janeiro", img: "images/nadir.webp", text: "Gabriel foi o melhor professor que eu já tive. Realmente me ajudou a entender. Já estou tocando dezenas de músicas." },
        { name: "Bia Reis", city: "Almenara, Minas Gerais", img: "images/bia.webp", text: "Meu grande sonho era tocar violão. Gabriel me fez entender de verdade, agora já toco mais de 20 músicas." },
        { name: "Elita", city: "Sinop, Mato Grosso", img: "images/elita.webp", text: "Em dois meses com o Gabriel aprendi a tocar músicas inteiras. Super recomendo." },
        { name: "Nina Miranda", city: "Araxá, Minas Gerais", img: "images/nina.webp", text: "Com poucas aulas estou aprendendo mais rápido coisas que tentei por anos, aprendi a tocar de verdade." },
        { name: "Denilson Nogueira", city: "Teresina, Piauí", img: "images/denilson.webp", text: "Minha maior dificuldade era a troca de acordes. Um mês depois eu consegui tocar minha primeira música." },
        { name: "Sidnei", city: "São Paulo", img: "images/sidnei.webp", text: "Estou superando a mim mesmo com o aprendizado de violão. Graças ao professor Gabriel já consigo tocar bastantes músicas. Gratidão." },
        { name: "Carlos", city: "Paraná", img: "images/carlos.webp", text: "Tinha muita dificuldade de acertar a altura da voz e o professor Gabriel está me ajudando, já estou muito feliz com o resultado." },
        { name: "Cleide", city: "Sergipe", img: "images/cleide.webp", text: "Comecei praticamente do zero e agora já estou tocando muitas músicas evangélicas." },
        { name: "Ivo", city: "Paraná", img: "images/ivo.webp", text: "Conheci o professor Gabriel no YouTube, é um professor muito paciente, já aprendi a tocar muitas músicas." },
        { name: "Amélia", city: "São Paulo", img: "images/amelia.webp", text: "Tenho 80 anos e estou aprendendo a tocar com o professor Gabriel, já estou tocando minha segunda música." }
    ];

    let currentSlide = 0;
    let slideInterval = null;

    function initCarousel() {
        const track = document.getElementById('carouselTrack');
        const dots = document.getElementById('carouselDots');
        if (!track || !dots) return;

        track.innerHTML = '';
        dots.innerHTML = '';

        testimonials.forEach((t, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `<img src="${t.img}" width="66" height="66" onerror="this.src='images/img.webp'" alt="${t.name}">`;
            item.addEventListener('click', () => {
                updateCarousel(index);
                resetAutoSlide();
            });
            track.appendChild(item);

            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => {
                updateCarousel(index);
                resetAutoSlide();
            });
            dots.appendChild(dot);
        });

        const wrapper = document.getElementById('carouselWrapper');
        if (wrapper) {
            let startX = 0;
            wrapper.addEventListener('touchstart', e => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            wrapper.addEventListener('touchend', e => {
                const endX = e.changedTouches[0].clientX;
                if (startX - endX > 35) {
                    updateCarousel(currentSlide + 1);
                    resetAutoSlide();
                } else if (startX - endX < -35) {
                    updateCarousel(currentSlide - 1);
                    resetAutoSlide();
                }
            }, { passive: true });
        }

        updateCarousel(0);
        startAutoSlide();
    }

    function updateCarousel(index) {
        if (index < 0) index = testimonials.length - 1;
        if (index >= testimonials.length) index = 0;
        currentSlide = index;

        const items = document.querySelectorAll('.carousel-item');
        const dots = document.querySelectorAll('.carousel-dot');

        items.forEach((item, i) => {
            item.className = 'carousel-item';
            if (i === currentSlide) {
                item.classList.add('active');
            } else if (i === currentSlide - 1 || (currentSlide === 0 && i === items.length - 1)) {
                item.classList.add('prev');
            } else if (i === currentSlide + 1 || (currentSlide === items.length - 1 && i === 0)) {
                item.classList.add('next');
            } else if (i < currentSlide) {
                item.classList.add('prev-hidden');
            } else {
                item.classList.add('next-hidden');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        const nameEl = document.getElementById('carouselName');
        const cityEl = document.getElementById('carouselCity');
        const textEl = document.getElementById('carouselText');
        if (nameEl && cityEl) {
            nameEl.textContent = testimonials[currentSlide].name;
            cityEl.textContent = testimonials[currentSlide].city;
            if (textEl && testimonials[currentSlide].text) {
                textEl.textContent = `"${testimonials[currentSlide].text}"`;
            }
        }
    }

    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            updateCarousel(currentSlide + 1);
        }, 3500);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    initCarousel();

    // 6. Lista Expandível de Outros Depoimentos em Vídeo
    const otherVideos = [
        { name: "Josineide", location: "Estado de São Paulo", src: "videos/josineide.mp4", poster: "images/josineide.webp" },
        { name: "Nina Miranda", location: "Araxá, Minas Gerais", src: "videos/nina.mp4", poster: "images/nina.webp" },
        { name: "Elita", location: "Sinop, Mato Grosso", src: "videos/elita.mp4", poster: "images/elita.webp" },
        { name: "Neuda", location: "Ceará", src: "videos/neuda.mp4", poster: "images/neuda.webp" },
        { name: "Mariana Arcanja", location: "João Pessoa, PB", src: "videos/mariana.mp4", poster: "images/mariana.webp" },
        { name: "Bia Reis", location: "Almenara, Minas Gerais", src: "videos/bia.mp4", poster: "images/bia.webp" },
        { name: "Paulo", location: "Espírito Santo", src: "videos/paulo.mp4", poster: "images/paulo.webp" },
        { name: "Daia", location: "Paraná", src: "videos/daia.mp4", poster: "images/daia.webp" },
        { name: "Nadir", location: "Petrópolis, Rio de Janeiro", src: "videos/nadir.mp4", poster: "images/nadir.webp" },
        { name: "Carlos", location: "Paraná", src: "videos/carlos.mp4", poster: "images/carlos.webp" },
        { name: "Nilza", location: "Mato Grosso", src: "videos/nilza.mp4", poster: "images/nilza.webp" },
        { name: "Ivo Ferreira", location: "Paraná", src: "videos/ivo.mp4", poster: "images/ivo.webp" },
        { name: "Cleide", location: "Sergipe", src: "videos/cleide.mp4", poster: "images/cleide.webp" },
        { name: "Antônia", location: "Ceará", src: "videos/antonia.mp4", poster: "images/antonia.webp" }
    ];

    let otherVideosRendered = false;
    const btnToggle = document.getElementById('btnToggleOtherVideos');
    const otherVideosList = document.getElementById('otherVideosList');
    const btnText = document.getElementById('btnMoreVideosText');

    function playOtherVideo(container, src) {
        container.innerHTML = `
            <video controls autoplay playsinline style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: #000;">
                <source src="${src}" type="video/mp4">
                Seu navegador não suporta este vídeo.
            </video>
        `;
    }

    if (btnToggle && otherVideosList) {
        btnToggle.addEventListener('click', () => {
            if (!otherVideosRendered) {
                otherVideosList.innerHTML = otherVideos.map(clip => `
                    <div class="other-video-card">
                        <div class="other-video-header">
                            <span class="other-video-name">${clip.name}</span>
                            <span class="other-video-city">${clip.location}</span>
                        </div>
                        <div class="other-video-wrap" data-src="${clip.src}">
                            <img src="${clip.poster}" alt="${clip.name}" class="other-video-poster" onerror="this.src='images/img.webp'">
                            <div class="play-overlay-button">
                                <div class="play-circle">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');

                otherVideosList.querySelectorAll('.other-video-wrap').forEach(wrap => {
                    wrap.addEventListener('click', function() {
                        const src = this.getAttribute('data-src');
                        if (src) {
                            playOtherVideo(this, src);
                        }
                    });
                });

                otherVideosRendered = true;
            }

            const isOpen = otherVideosList.style.display === 'flex';
            if (isOpen) {
                otherVideosList.style.display = 'none';
                btnToggle.classList.remove('open');
                if (btnText) btnText.textContent = 'Ver outros depoimentos em vídeo';
            } else {
                otherVideosList.style.display = 'flex';
                btnToggle.classList.add('open');
                if (btnText) btnText.textContent = 'Fechar outros depoimentos em vídeo';
                setTimeout(() => {
                    otherVideosList.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            }
        });
    }
});
