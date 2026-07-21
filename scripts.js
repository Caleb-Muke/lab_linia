
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

const URL = "https://script.google.com/macros/s/AKfycbzz18K2EmZPC9UIrAJB_3ZrMi0s-EFMTLB5G5DC4Ev-iIho7lcmWFam2-xpvDHISTVW/exec";

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const formData = new FormData(contactForm);

const response = await fetch(URL, {
    method: "POST",
    body: formData
});

const result = await response.json();

if(result.status === "success"){
    contactForm.reset();
    formStatus.textContent = "Merci ! Votre message a bien été envoyé.";
}else{
    formStatus.textContent = result.message;
}

    const formData = new FormData(contactForm);

const response = await fetch(URL, {
    method: "POST",
    body: formData
});

const result = await response.json();

if(result.status === "success"){
    contactForm.reset();
    formStatus.textContent = "Merci ! Votre message a bien été envoyé.";
}else{
    formStatus.textContent = result.message;
}

