/* EZ Plumbing & Heating — shared page behaviour */
(function () {
  // Compact nav after scroll
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 48);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Side rail: section nav built from [data-rail] sections
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-rail]'));
  if (sections.length < 2) return;

  var rail = document.createElement('nav');
  rail.className = 'side-rail';
  rail.setAttribute('aria-label', 'Page sections');

  sections.forEach(function (s, i) {
    if (!s.id) s.id = 'section-' + (i + 1);
    var a = document.createElement('a');
    a.href = '#' + s.id;
    var dot = document.createElement('span');
    dot.className = 'dot';
    var lbl = document.createElement('span');
    lbl.className = 'lbl';
    lbl.textContent = s.getAttribute('data-rail');
    a.appendChild(dot);
    a.appendChild(lbl);
    rail.appendChild(a);
  });
  document.body.appendChild(rail);

  var links = rail.querySelectorAll('a');
  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-30% 0px -55% 0px' });
  sections.forEach(function (s) { observer.observe(s); });
  setActive(sections[0].id);
})();
