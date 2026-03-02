document.addEventListener('DOMContentLoaded', () => {

    // 1. Setup Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // trigger initial ones immediately
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // 2. Simple Floating Particles in Hero section
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('particles');
    
    if (container) {
        container.appendChild(canvas);
        
        let width, height;
        const particles = [];

        function resize() {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resize);
        resize();

        // Create particles
        for(let i=0; i<40; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.4 + 0.1
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(156, 163, 175, ${p.opacity})`;
                ctx.fill();

                // update pos
                p.x += p.speedX;
                p.y += p.speedY;

                // wrap
                if(p.x < 0) p.x = width;
                if(p.x > width) p.x = 0;
                if(p.y < 0) p.y = height;
                if(p.y > height) p.y = 0;
            });

            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // 3. Form submission handling (Prevent default to behave like landing page)
    const form = document.getElementById('apply-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing...';
            btn.style.opacity = '0.8';
            
            // Simulate network req
            setTimeout(() => {
                btn.textContent = 'Application Registered!';
                btn.style.background = '#10B981'; // Success green
                btn.style.color = 'white';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    form.reset();
                }, 3000);
            }, 1000);
        });
    }

    // 4. Copy to Clipboard
    const copyBtn = document.getElementById('copyCodeBtn');
    const codeInput = document.getElementById('scholarshipCode');
    
    if(copyBtn && codeInput) {
        copyBtn.addEventListener('click', () => {
            codeInput.select();
            codeInput.setSelectionRange(0, 99999); // For mobile devices
            
            try {
                navigator.clipboard.writeText(codeInput.value).then(() => {
                    const origText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.background = '#10B981';
                    copyBtn.style.color = 'white';
                    
                    setTimeout(() => {
                        copyBtn.textContent = origText;
                        copyBtn.style.background = '';
                        copyBtn.style.color = '';
                    }, 2000);
                });
            } catch (err) {
                console.error('Failed to copy', err);
            }
        });
    }
});
