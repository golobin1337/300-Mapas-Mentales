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

  // Testimonials carousel (autoplay + swipe)
  var testiWrap = document.getElementById('testiCarousel');
  if(testiWrap){
    var testiCards = testiWrap.querySelectorAll('.testi-card');
    var testiDotsWrap = document.getElementById('testiDots');
    var testiCurrent = 0;
    var testiDelay = 4500;
    var testiTimer;
    var testiSyncing = false;

    testiCards.forEach(function(_, i){
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
      dot.addEventListener('click', function(){
        scrollToCard(i);
        restartTesti();
      });
      testiDotsWrap.appendChild(dot);
    });
    var testiDots = testiDotsWrap.querySelectorAll('.carousel-dot');

    function setActiveTestiDot(i){
      testiDots[testiCurrent].classList.remove('active');
      testiCurrent = i;
      testiDots[testiCurrent].classList.add('active');
    }

    function scrollToCard(i){
      i = (i + testiCards.length) % testiCards.length;
      testiSyncing = true;
      testiWrap.scrollTo({ left: testiCards[i].offsetLeft, behavior: 'smooth' });
      setActiveTestiDot(i);
    }

    function nextTesti(){ scrollToCard(testiCurrent + 1); }
    function prevTesti(){ scrollToCard(testiCurrent - 1); }

    function startTesti(){ testiTimer = setInterval(nextTesti, testiDelay); }
    function restartTesti(){ clearInterval(testiTimer); startTesti(); }

    var testiPrevBtn = document.getElementById('testiPrev');
    var testiNextBtn = document.getElementById('testiNext');
    if(testiPrevBtn){ testiPrevBtn.addEventListener('click', function(){ prevTesti(); restartTesti(); }); }
    if(testiNextBtn){ testiNextBtn.addEventListener('click', function(){ nextTesti(); restartTesti(); }); }

    testiWrap.addEventListener('mouseenter', function(){ clearInterval(testiTimer); });
    testiWrap.addEventListener('mouseleave', startTesti);

    var testiScrollTimeout;
    testiWrap.addEventListener('scroll', function(){
      if(testiSyncing){ testiSyncing = false; return; }
      clearTimeout(testiScrollTimeout);
      testiScrollTimeout = setTimeout(function(){
        var closest = 0, minDist = Infinity;
        testiCards.forEach(function(card, i){
          var dist = Math.abs(card.offsetLeft - testiWrap.scrollLeft);
          if(dist < minDist){ minDist = dist; closest = i; }
        });
        if(closest !== testiCurrent){ setActiveTestiDot(closest); }
      }, 120);
    });

    startTesti();
  }
})();
