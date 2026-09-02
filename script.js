(function(){
  // Level tabs
  var tabs = document.querySelectorAll('.level-tab');
  var levelPlaceholder = document.getElementById('levelPlaceholder');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      var level = tab.getAttribute('data-level');
      tabs.forEach(function(t){t.classList.remove('active');});
      document.querySelectorAll('.level-panel').forEach(function(p){p.classList.remove('active');});
      tab.classList.add('active');
      var panel = document.getElementById('panel-'+level);
      if(panel){ panel.classList.add('active'); }
      if(levelPlaceholder){ levelPlaceholder.classList.add('hidden'); }
    });
  });

  // FAQ accordion
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(item){
    var q = item.querySelector('.faq-q');
    q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      items.forEach(function(i){ i.classList.remove('open'); });
      if(!wasOpen){ item.classList.add('open'); }
    });
  });

  // Mind map image carousel (autoplay)
  var carousel = document.getElementById('mapCarousel');
  if(carousel){
    var slides = carousel.querySelectorAll('.carousel-slide');
    var dotsWrap = document.getElementById('carouselDots');
    var current = 0;
    var delay = 4000;
    var timer;

    slides.forEach(function(_, i){
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
      dot.addEventListener('click', function(){
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.carousel-dot');

    function goTo(index){
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function next(){ goTo(current + 1); }
    function prev(){ goTo(current - 1); }

    function start(){ timer = setInterval(next, delay); }
    function restart(){ clearInterval(timer); start(); }

    var prevBtn = document.getElementById('carouselPrev');
    var nextBtn = document.getElementById('carouselNext');
    if(prevBtn){ prevBtn.addEventListener('click', function(){ prev(); restart(); }); }
    if(nextBtn){ nextBtn.addEventListener('click', function(){ next(); restart(); }); }

    carousel.addEventListener('mouseenter', function(){ clearInterval(timer); });
    carousel.addEventListener('mouseleave', start);

    start();
  }

  // Testimonials carousel (continuous slow infinite scroll)
  var testiWrap = document.getElementById('testiCarousel');
  if(testiWrap){
    var originalTestiCards = Array.prototype.slice.call(testiWrap.querySelectorAll('.testi-card'));
    originalTestiCards.forEach(function(card){
      testiWrap.appendChild(card.cloneNode(true));
    });

    var testiSpeed = 30; // pixels per second
    var testiPaused = false;
    var testiLastTime = null;
    var testiHalfWidth = testiWrap.scrollWidth / 2;
    var testiResumeTimeout;

    function testiFrame(time){
      if(testiLastTime === null){ testiLastTime = time; }
      var delta = time - testiLastTime;
      testiLastTime = time;
      if(!testiPaused){
        testiWrap.scrollLeft += testiSpeed * (delta / 1000);
        if(testiWrap.scrollLeft >= testiHalfWidth){
          testiWrap.scrollLeft -= testiHalfWidth;
        }
      }
      requestAnimationFrame(testiFrame);
    }
    requestAnimationFrame(testiFrame);

    function pauseTestiThenResume(delay){
      testiPaused = true;
      clearTimeout(testiResumeTimeout);
      testiResumeTimeout = setTimeout(function(){ testiPaused = false; }, delay);
    }

    testiWrap.addEventListener('mouseenter', function(){ testiPaused = true; });
    testiWrap.addEventListener('mouseleave', function(){ clearTimeout(testiResumeTimeout); testiPaused = false; });
    testiWrap.addEventListener('touchstart', function(){ testiPaused = true; }, { passive: true });
    testiWrap.addEventListener('touchend', function(){ pauseTestiThenResume(1500); });

    var testiPrevBtn = document.getElementById('testiPrev');
    var testiNextBtn = document.getElementById('testiNext');
    var testiNudge = 320;
    if(testiPrevBtn){
      testiPrevBtn.addEventListener('click', function(){
        testiWrap.scrollLeft -= testiNudge;
        if(testiWrap.scrollLeft < 0){ testiWrap.scrollLeft += testiHalfWidth; }
        pauseTestiThenResume(2000);
      });
    }
    if(testiNextBtn){
      testiNextBtn.addEventListener('click', function(){
        testiWrap.scrollLeft += testiNudge;
        if(testiWrap.scrollLeft >= testiHalfWidth){ testiWrap.scrollLeft -= testiHalfWidth; }
        pauseTestiThenResume(2000);
      });
    }

    window.addEventListener('resize', function(){
      testiHalfWidth = testiWrap.scrollWidth / 2;
    });
  }
})();
