    // ===== Data (DRY source of truth) =====
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
        { title: 'Pac‑Man (Vanilla JS)', desc: 'A classic Pac‑Man clone built with plain JavaScript, keyboard controls, and collision logic.' },
        { title: 'Burger Stacker (React)', desc: 'Interactive burger builder using React state, props, and controlled components.' },
        { title: 'Contacts API (Node/Express)', desc: 'RESTful API with validation and error handling; deployed with a lightweight DB.' },
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
          const card = el('div', { className: 'tag', title: name });
          const img = el('img', { src: icon, alt: `${name} logo` });
          const p = el('p', { textContent: name });
          card.append(img, p); wrap.append(card);
        });
      })();
  
      // ===== Build Projects =====
      (function buildProjects(){
        const grid = $('#projects-grid');
        PROJECTS.forEach(({title, desc}) => {
          const card = el('article', { className: 'card' });
          const h3 = el('h3');
          const a = el('a', { href: '#', textContent: title }); // swap to your live/demo URL
          const p = el('p', { textContent: desc });
          h3.append(a); card.append(h3, p); grid.append(card);
        });
      })();
  
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