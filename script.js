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

// Efecto sutil de cursor personalizado
const canvas = document.getElementById('cursorCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const trails = [];
    const maxTrails = 8;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Suavizar movimiento del cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        // Agregar posición al trail
        trails.push({ x: cursorX, y: cursorY });
        if (trails.length > maxTrails) {
            trails.shift();
        }

        // Dibujar trail
        trails.forEach((point, index) => {
            const size = ((index + 1) / maxTrails) * 8;
            const opacity = ((index + 1) / maxTrails) * 0.5;
            
            ctx.globalAlpha = opacity;
            ctx.shadowBlur = 15;
            ctx.shadowColor = index % 2 === 0 ? '#8B5CF6' : '#06B6D4';
            
            // Gradiente para el círculo
            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size);
            gradient.addColorStop(0, index % 2 === 0 ? '#8B5CF6' : '#06B6D4');
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Animaciones de scroll reveal
const revealElements = document.querySelectorAll('.project-card, .glass-card, .education-card, .skill-items li');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal', 'active');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Efecto tilt 3D en project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Smooth scroll con offset para navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typewriter Effect
const text = 'Desarrollador Full Stack apasionado por la IA';
let charIndex = 0;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    if (charIndex < text.length) {
        typewriterElement.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Iniciar typewriter
setTimeout(typeWriter, 500);
