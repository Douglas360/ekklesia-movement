/**
 * Ekklesia Movement - Site em Construção Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Countdown Timer
    // Target date set to 30 days from current date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    targetDate.setHours(12, 0, 0, 0);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? `0${days}` : days;
        hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
        minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 3. Email Subscription Form Handler
    const notifyForm = document.getElementById('notifyForm');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');
    const formFeedback = document.getElementById('formFeedback');

    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (!email || !validateEmail(email)) {
                showFeedback('Por favor, informe um endereço de e-mail válido.', 'error');
                return;
            }

            // Simulate API submit state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'ENVIANDO...';

            setTimeout(() => {
                // Save subscriber to localStorage as demonstration
                const subscribers = JSON.parse(localStorage.getItem('ekklesia_subscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('ekklesia_subscribers', JSON.stringify(subscribers));
                }

                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = 'QUERO SER NOTIFICADO';
                emailInput.value = '';

                showFeedback('Obrigado! Seu e-mail foi cadastrado com sucesso. Avisaremos quando estivermos prontos!', 'success');
            }, 1000);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        
        setTimeout(() => {
            if (type === 'error') {
                formFeedback.className = 'form-feedback';
            }
        }, 5000);
    }

    // 4. Subtle Parallax for Glowing Orbs on Mouse Move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');

        if (orb1) orb1.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
        if (orb2) orb2.style.transform = `translate(${mouseX * -40}px, ${mouseY * -40}px)`;
    });
});
