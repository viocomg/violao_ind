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
});
