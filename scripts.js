// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle && navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal, .card, .project-card, .member, .news');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.12});
reveals.forEach(r => io.observe(r));

// Counters
const counters = document.querySelectorAll('.num[data-target]');
const animateCounters = () => {
  counters.forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if(current >= target){ el.textContent = target + (target>1?'+':''); clearInterval(timer); }
      else el.textContent = current;
    }, 16);
  });
};

const statsSection = document.querySelector('.stats');
if(statsSection){
  const statsObserver = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){ animateCounters(); statsObserver.disconnect(); }
  },{threshold:0.3});
  statsObserver.observe(statsSection);
}

// Contact form handler
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const formData = new FormData(contactForm);
    const nom = formData.get('nom') || '';
    const prenom = formData.get('prenom') || '';
    const email = formData.get('email') || '';
    const tel = formData.get('tel') || '';
    const sujet = formData.get('sujet') || '';
    const message = formData.get('message') || '';
    const subject = `Nouveau message de ${prenom} ${nom} - ${sujet}`;
    const body = `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nTéléphone: ${tel}\n\nMessage:\n${message}`;

    if(formStatus){
      formStatus.textContent = 'Envoi en cours...';
      formStatus.classList.add('show');
    }

    formData.set('_subject', subject);
    formData.set('_captcha', 'false');
    formData.set('_template', 'table');

    try {
      const response = await fetch('https://formsubmit.co/ajax/linialab@gmail.com', {
        method: 'POST',
        body: formData
      });

      if(response.ok){
        contactForm.reset();
        if(formStatus){
          formStatus.textContent = 'Merci ! Votre message a bien été envoyé.';
          formStatus.classList.add('show');
        }
      } else {
        throw new Error('Échec de l\'envoi');
      }
    } catch (error) {
      if(formStatus){
        formStatus.textContent = 'Une erreur est survenue. Veuillez utiliser votre messagerie ou nous contacter directement à linialab@gmail.com.';
        formStatus.classList.add('show');
      }
      window.location.href = `mailto:mangalacaleb011@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  });
}
