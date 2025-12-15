// Smooth scrolling para links internos
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

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('mensaje').value
    };

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return;
    }

    // Crear mensaje para WhatsApp
    const whatsappMessage = `Hola, mi nombre es ${formData.nombre}.\n\nCorreo: ${formData.email}\nTeléfono: ${formData.telefono}\n\nMensaje: ${formData.mensaje}`;
    const whatsappURL = `https://wa.me/56951884518?text=${encodeURIComponent(whatsappMessage)}`;

    // Mostrar mensaje de éxito
    showSuccessMessage();

    // Limpiar formulario
    contactForm.reset();

    // Redirigir a WhatsApp después de 1.5 segundos
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1500);
});

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    // Crear elemento de mensaje si no existe
    let successMessage = document.querySelector('.success-message');
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = '¡Mensaje enviado! Serás redirigido a WhatsApp para completar tu consulta.';
        contactForm.insertBefore(successMessage, contactForm.firstChild);
    }

    // Mostrar mensaje
    successMessage.classList.add('show');

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// Animación suave al hacer scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Agregar clase cuando se hace scroll
    if (scrollTop > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Tracking de clicks en botones importantes (para métricas)
function trackClick(element, category) {
    console.log(`Click en ${category}: ${element}`);
    // Aquí puedes agregar integración con Google Analytics u otra herramienta
    // Ejemplo: gtag('event', 'click', { 'event_category': category, 'event_label': element });
}

// Añadir tracking a botones de WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', () => trackClick('WhatsApp Button', 'Contact'));
});

// Añadir tracking a botones de teléfono
document.querySelectorAll('a[href^="tel:"]').forEach(button => {
    button.addEventListener('click', () => trackClick('Phone Button', 'Contact'));
});

// Añadir tracking a botones de email
document.querySelectorAll('a[href^="mailto:"]').forEach(button => {
    button.addEventListener('click', () => trackClick('Email Button', 'Contact'));
});

// Prevenir envío de formulario si hay campos vacíos
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('error');
    });

    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});
