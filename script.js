(function(){
  // Level tabs
  var tabs = document.querySelectorAll('.level-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      var level = tab.getAttribute('data-level');
      tabs.forEach(function(t){t.classList.remove('active');});
      document.querySelectorAll('.level-panel').forEach(function(p){p.classList.remove('active');});
      tab.classList.add('active');
      var panel = document.getElementById('panel-'+level);
      if(panel){ panel.classList.add('active'); }
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
})();
