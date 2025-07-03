// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll suave para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header con efecto de scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Indicador de progreso de scroll
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator') || createScrollIndicator();
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
});

function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    return indicator;
}

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('value-item-mv')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

    // Observar elementos para animación
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.service-card, .team-card, .contact-item, .mv-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Inicializar palabras de valores con opacidad 0
        const valueItems = document.querySelectorAll('.value-item');
        valueItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });

        // Inicializar elementos de valores en la sección MV
        const valueItemsMv = document.querySelectorAll('.value-item-mv');
        valueItemsMv.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            observer.observe(item);
        });
    });

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        if (!data.nombre || !data.email || !data.servicio || !data.mensaje) {
            showNotification('Por favor, complete todos los campos requeridos.', 'error');
            return;
        }
        
        // Simular envío
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Gracias! Su consulta ha sido enviada. Nos pondremos en contacto pronto.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Contador de estadísticas (opcional)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;
    const hasPlus = originalText.includes('+');
    const hasPercent = originalText.includes('%');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            let finalValue = target;
            if (hasPlus) finalValue += '+';
            if (hasPercent) finalValue += '%';
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            let currentValue = Math.floor(start);
            if (hasPlus) currentValue += '+';
            if (hasPercent) currentValue += '%';
            element.textContent = currentValue;
        }
    }, 16);
}

// Efecto de parallax suave para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Validación de formulario en tiempo real
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remover clases de error previas
    field.classList.remove('error', 'success');
    
    // Validaciones específicas
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingrese un email válido';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Ingrese un teléfono válido';
        }
    }
    
    // Aplicar clases y mensajes
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    } else if (value) {
        field.classList.add('success');
        removeFieldError(field);
    }
}

function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Efecto de hover para las tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading para imágenes (si se agregaran en el futuro)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Función para actualizar el mapa con la ubicación real
function updateMapLocation() {
    // Coordenadas exactas de ARO Abogados Consultores, Avenida México 130, Santo Domingo
    const latitude = 18.4677964;
    const longitude = -69.9218462;
    
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        // URL del mapa de Google Maps para ARO Abogados Consultores
        const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1234567890123!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89d986c706b5%3A0xb4153221f94b1a17!2sARO%20Abogados%20Consultores!5e0!3m2!1ses!2sdo!4v1234567890123`;
        mapIframe.src = mapUrl;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    updateMapLocation();
    
    // Agregar efecto de typing al título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLine = heroTitle.querySelector('.title-line');
        const titleHighlight = heroTitle.querySelector('.title-highlight');
        
        if (titleLine && titleHighlight) {
            const text1 = titleLine.textContent;
            const text2 = titleHighlight.textContent;
            
            titleLine.textContent = '';
            titleHighlight.textContent = '';
            
            let i = 0;
            const typeWriter1 = () => {
                if (i < text1.length) {
                    titleLine.textContent += text1.charAt(i);
                    i++;
                    setTimeout(typeWriter1, 100);
                } else {
                    setTimeout(typeWriter2, 800);
                }
            };
            
            let j = 0;
            const typeWriter2 = () => {
                if (j < text2.length) {
                    titleHighlight.textContent += text2.charAt(j);
                    j++;
                    setTimeout(typeWriter2, 100);
                } else {
                    // Animar las palabras de valores después del título
                    setTimeout(animateValues, 500);
                }
            };
            
            setTimeout(typeWriter1, 500);
        }
    }

    // Animación de las palabras de valores
    function animateValues() {
        const valueItems = document.querySelectorAll('.value-item');
        valueItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    // Animación de contadores en las estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = stat.textContent.includes('+') ? 
            parseInt(stat.textContent) : 
            parseInt(stat.textContent.replace('%', ''));
        
        stat.textContent = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
});

// Función para manejar el modo oscuro (opcional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferencia de modo oscuro guardada
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Detectar preferencia del sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
} 