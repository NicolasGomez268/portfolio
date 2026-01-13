// Smooth scrolling for navigation
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Add fade-in-up animation to elements when they become visible
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Inicialización de GSAP - Comentado para evitar errores
/*
gsap.registerPlugin(ScrollTrigger);

// Animaciones al cargar la página
gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

// Animaciones al hacer scroll
gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
});
*/

// Efecto parallax en las formas decorativas
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach(shape => {
        const speed = shape.classList.contains('shape-1') ? 20 : 40;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
const navbarHeight = navbar ? navbar.offsetHeight : 0;

// Efecto de scroll en navbar
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determina la dirección del scroll
    if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
        // Scroll hacia abajo - ocultar navbar
        if (navbar) navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba - mostrar navbar
        if (navbar) navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Animación de los iconos de habilidades - Comentado para evitar errores
/*
const skillIcons = document.querySelectorAll('.skill-card i');
skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            rotate: 360,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
});
*/

// Función para copiar el email
function copyEmail() {
    const emailText = document.getElementById('emailText').textContent;
    navigator.clipboard.writeText(emailText)
        .then(() => {
            const alert = document.getElementById('copyAlert');
            alert.classList.add('show');
            setTimeout(() => {
                alert.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
            console.error('Error al copiar el email:', err);
        });
}

// Función para copiar el teléfono
function copyPhone() {
    const phoneText = document.getElementById('phoneText').textContent;
    navigator.clipboard.writeText(phoneText)
        .then(() => {
            const alert = document.getElementById('copyAlertPhone');
            alert.classList.add('show');
            setTimeout(() => {
                alert.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
            console.error('Error al copiar el teléfono:', err);
        });
}

// Animación de los elementos de la timeline al hacer scroll
const observerTimeline = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    observerTimeline.observe(item);
});

// Animaciones al hacer scroll (unificadas)
const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, { threshold: 0.1 });

// Observar elementos con animación
document.querySelectorAll('[data-aos], .animate-on-scroll, .timeline-item').forEach(element => {
    observerScroll.observe(element);
});
// Navegación suave unificada
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const navHeight = navbar.offsetHeight;
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - navHeight,
            behavior: 'smooth'
        });
    });
});

// Barra de progreso de scroll
window.addEventListener('scroll', function() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (scrollProgress) {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// Inicializar la barra al cargar
document.addEventListener('DOMContentLoaded', function() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (scrollProgress) {
        scrollProgress.style.width = '0%';
        console.log('Barra de progreso inicializada');
    }
});

// Efecto de ondas concéntricas siguiendo el cursor
const canvas = document.getElementById('cursorCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const waves = [];
    const colors = ['#8B5CF6', '#A78BFA', '#06B6D4', '#22D3EE'];

    class Wave {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 100;
            this.lineWidth = 3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 1;
        }

        update() {
            this.radius += 2;
            this.life -= 0.015;
            this.lineWidth = 3 * this.life;
        }

        draw() {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.globalAlpha = this.life;
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function handleWaves() {
        for (let i = 0; i < waves.length; i++) {
            waves[i].update();
            waves[i].draw();

            if (waves[i].life <= 0 || waves[i].radius >= waves[i].maxRadius) {
                waves.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleWaves();
        requestAnimationFrame(animate);
    }

    animate();

    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime > 100) {
            waves.push(new Wave(e.clientX, e.clientY));
            lastTime = now;
        }
    });

    document.addEventListener('click', (e) => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                waves.push(new Wave(e.clientX, e.clientY));
            }, i * 100);
        }
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
