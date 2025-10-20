const NAV_ITEMS = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about-me' },
    { label: 'Technologies', id: 'technologies' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact Me', id: 'contact-me' },
    ];
    
    
    const TECH = [
    { name: 'HTML', icon: './tags-images/html-5.svg' },
    { name: 'CSS3', icon: './tags-images/css3.svg' },
    { name: 'JavaScript', icon: './tags-images/javaScript.svg' },
    { name: 'React', icon: './tags-images/react.svg' },
    { name: 'Node.js', icon: './tags-images/node-js.svg' },
    { name: 'Express', icon: './tags-images/node-js.svg' }, // swap to express.svg if you have it
    { name: 'MongoDB', icon: './tags-images/mongodb.svg' },
    { name: 'Mongoose', icon: './tags-images/mongodb.svg' },
    { name: 'NPM', icon: './tags-images/npm.svg' },
    { name: 'Yarn', icon: './tags-images/yarn.svg' },
    { name: 'Python', icon: './tags-images/python.svg' },
    { name: 'Django', icon: './tags-images/django.svg' },
    { name: 'Bootstrap', icon: './tags-images/bootstrap.svg' },
    { name: 'SASS', icon: './tags-images/sass.svg' },
    { name: 'Figma', icon: './tags-images/figma.svg' },
    { name: 'GitHub', icon: './tags-images/github.svg' },
    ];
    
    
    // Example projects (optional seed)
    const PROJECTS = [
    {
    title: "Get'a Wave",
    desc: "I built a grid-based Frogger-style game in one week using JavaScript, HTML and CSS. The game features three characters, keyboard navigation, obstacles and progressive difficulty.",
    video: "/videos/GetaWaveVideo.mp4", // place your converted MP4 at this path
    live: "https://iuryliberato.github.io/Get-a-wave/",
    git: "https://github.com/iuryliberato/Get-a-wave",
    tags: ["HTML5", "CSS3", "JavaScript"],
    buttons: { liveStyle: "accent", gitStyle: "outline" }
    },
    {
        title: "EVE Events",
        desc: "React front-end with Styled-Components and a Python/Django back-end. Users can sign up/login (including Google), switch light/dark themes, search & filter events, RSVP, and create/manage their own events from their profile.",
        video: "/videos/EventsVideo.mp4", 
        live: "https://eve-social-events.herokuapp.com/",
        git: "https://github.com/iuryliberato/events",
        tags: ["HTML5", "React", "Python", "Django", "Styled Components", "PostgreSQL"],
        buttons: { liveStyle: "accent", gitStyle: "outline" }
        },
        {
            title: "Patrycja Langa Personal Website",
            desc: "I've designed and built a dual‑language personal website using Next.js, React, JavaScript and Styled‑Components. The website presents education, skills and services, and includes a contact form powered by EmailJS.",
            video: "/videos/PatriciaVideo.mp4",
            live: "https://www.patrycjalanga.com/En",
            git: "https://github.com/iuryliberato/PatriciaWebsite",
            tags: ["HTML5", "Styled Components", "JavaScript", "React", "Next.js", "Yarn"],
            buttons: { liveStyle: "accent", gitStyle: "outline" }
            }
    ];


    // ===== Utilities =====
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
const el = (tag, opts = {}) => Object.assign(document.createElement(tag), opts);


// ===== Build Nav =====
(function buildNav(){
const navUl = $('#nav');
NAV_ITEMS.forEach(({label, id}) => {
const li = el('li');
const a = el('a', { className: 'nav__link', href: `#${id}`, textContent: label });
li.append(a); navUl.append(li);
});


// Build burger button & mobile menu structure
const burger = $('#burger');
const mobileMenu = $('#mobile-menu');
const mobileNav = $('#mobile-nav');


// Build mobile links from same source
NAV_ITEMS.forEach(({label, id}) => {
const li = el('li');
const a = el('a', { href: `#${id}`, textContent: label });
a.addEventListener('click', () => closeMenu());
li.append(a); mobileNav.append(li);
});


const openMenu = () => {
    burger.dataset.open = 'true';
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    burger.textContent = '✖';
    mobileMenu.hidden = false;
    // prevent background scroll
    document.documentElement.style.overflow = 'hidden';
    };
    const closeMenu = () => {
    delete burger.dataset.open;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    burger.textContent = '☰';
    mobileMenu.hidden = true;
    document.documentElement.style.overflow = '';
    };
    
    
    const toggleMenu = () => (burger.dataset.open ? closeMenu() : openMenu());
    burger.addEventListener('click', toggleMenu);
    mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu(); // click outside content closes
    });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => {
    // If resized to desktop, ensure menu is closed
    if (window.innerWidth > 495) closeMenu();
    });
    })();

    // Active link highlight with IntersectionObserver
(function observeSections(){
    const linksById = new Map(NAV_ITEMS.map(({id}) => [id, $(`a[href="#${id}"]`)]));
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    const link = linksById.get(entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
    // Clear others
    linksById.forEach(a => a.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'true');
    }
    });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
    
    
    NAV_ITEMS.forEach(({id}) => {
    const sec = document.getElementById(id);
    if (sec) observer.observe(sec);
    });
    })();
    
    
    // ===== Build Tech Tags =====
    (function buildTags(){
    const wrap = $('#tech-tags');
    TECH.forEach(({name, icon}) => {
    const card = el('div', { className: 'tag reveal', title: name });
    const img = el('img', { src: icon, alt: `${name} logo` });
    const p = el('p', { textContent: name });
    card.append(img, p); wrap.append(card);
    });
    })();

   // ===== Build Projects =====
(function buildProjects(){
const grid = $('#projects-grid');
grid.innerHTML = '';

PROJECTS.forEach((p) => {
const card = el('article', { className: 'card reveal' });

// Media (inline video if provided)
if (p.video){
const media = el('div', { className: 'card__media' });
const video = el('video', { src: p.video, controls: true, preload: 'metadata' });
media.append(video); card.append(media);
}

// Title
const h3 = el('h3');
h3.textContent = p.title;
card.append(h3);


// Description
if (p.desc){ card.append(el('p', { textContent: p.desc })); }


// Tech badges
if (p.tags && p.tags.length){
const wrap = el('div', { className: 'badges' });
p.tags.forEach(t => wrap.append(el('span', { className: 'badge', textContent: t })));
card.append(wrap);
}


// Buttons row
const btns = el('div', { className: 'btns' });
if (p.live){
const liveBtn = el('a', { href: p.live, target: '_blank', rel: 'noopener noreferrer', className: 'btn btn--accent' });
liveBtn.textContent = 'Live Demo';
btns.append(liveBtn);
}
if (p.git){
const gitBtn = el('a', { href: p.git, target: '_blank', rel: 'noopener noreferrer', className: 'btn btn--outline' });
gitBtn.textContent = 'GitHub';
btns.append(gitBtn);
}
card.append(btns);


grid.append(card);
});
})();

const revealItems = $$('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }); // triggers a touch earlier

revealItems.forEach((el) => observer.observe(el));

    
   // ===== Typing effect in JS (types once then keeps caret blinking) =====
(function typingEffect(){
    const span = document.getElementById('type-target');
    const text = span?.dataset.text || span?.textContent || '';
    if (!span || !text) return;
    
    
    // accessibility: prevent double-reading while typing
    span.setAttribute('aria-label', text);
    
    
    span.textContent = '';
    span.classList.add('cursor');
    
    
    let i = 0;
    const speed = 65; // ms per char
    const timer = setInterval(() => {
    span.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(timer); // stop when complete; cursor keeps blinking via CSS
    }, speed);
    })();
      (function emailJsContact(){
        // 1) Ensure SDK is loaded
        if (!window.emailjs) {
          console.warn('EmailJS SDK not loaded – check your <script src=...> tag.');
          return;
        }
      
        // 2) Init with your PUBLIC KEY (copy exactly from EmailJS dashboard)
        // Your example key looks fine; just paste yours here:
        emailjs.init({ publicKey: "e_YXHolFRiYL5mubJ" });
      
        const form   = document.getElementById('contact-form');
        const btn    = document.getElementById('send-btn');
        const status = document.getElementById('form-status');
      
        if (!form) return;
      
        const SERVICE_ID  = 'service_dfdcdim';
        const TEMPLATE_ID = 'template_tgtx0k5';
      
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
      
          // Honeypot
          const honey = form.querySelector('input[name="company"]');
          if (honey && honey.value.trim() !== '') {
            status.textContent = "Thanks! We'll be in touch.";
            form.reset();
            return;
          }
      
          // UI: sending…
          const original = btn.textContent;
          btn.disabled = true;
          btn.textContent = 'Sending…';
          status.textContent = '';
      
          try {
            // Sends fields by their name= attributes
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
            status.textContent = 'Message sent! I’ll get back to you soon.';
            btn.textContent = 'Sent';
            form.reset();
          } catch (err) {
            console.error(err);
            status.textContent = 'Something went wrong. Please try again or email me directly.';
            btn.textContent = original;
          } finally {
            btn.disabled = false;
          }
        });
      })();