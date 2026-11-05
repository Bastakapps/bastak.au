/* Bastak site: demo carousels (auto-advancing phone screens) and scroll reveal. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-demo]').forEach(function (box) {
    var imgs = box.querySelectorAll('img');
    if (!imgs.length) return;
    var dots = box.parentNode.querySelector('.dots');
    var cap = box.parentNode.querySelector('.cap');
    var i = 0, timer = null;
    if (dots) {
      imgs.forEach(function (_, n) {
        var d = document.createElement('i');
        d.onclick = function () { show(n); restart(); };
        dots.appendChild(d);
      });
    }
    function show(n) {
      i = n;
      imgs.forEach(function (im, k) { im.classList.toggle('on', k === n); });
      if (dots) [].forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === n); });
      if (cap) cap.textContent = imgs[n].getAttribute('data-cap') || '';
    }
    function restart() {
      clearInterval(timer);
      if (!reduce) timer = setInterval(function () { show((i + 1) % imgs.length); }, 3200);
    }
    show(0);
    restart();
    box.addEventListener('mouseenter', function () { clearInterval(timer); });
    box.addEventListener('mouseleave', restart);
  });

  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduce) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();
