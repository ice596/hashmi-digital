/* Hashmi Digital lux layer JS: scroll reveals + ad card playback. */
(function(){
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches||/[?&]nomo/.test(location.search);

  /* reveals */
  var els=document.querySelectorAll('.rv');
  if(RM||!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in')});
  }else{
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){io.observe(e)});
  }

  /* reduced motion: show the chat demo's final state instead of animating */
  if(RM){
    document.querySelectorAll('.bot-body .m').forEach(function(m){
      if(m.classList.contains('typing'))return;
      m.classList.add('show','vis');
    });
  }

  /* hero loop: autoplay only when motion is ok */
  var hv=document.querySelector('[data-heroloop]');
  if(hv&&!RM){hv.play().catch(function(){})}

  /* ad cards: tap to play with sound, one at a time */
  var cards=[].slice.call(document.querySelectorAll('.adc'));
  function stopAll(except){
    cards.forEach(function(c){
      var v=c.querySelector('video');
      if(v!==except){v.pause();c.classList.remove('playing')}
    });
  }
  cards.forEach(function(c){
    var v=c.querySelector('video'),p=c.querySelector('.play');
    if(!v||!p)return;
    p.addEventListener('click',function(){
      stopAll(v);
      v.muted=false;v.currentTime=0;
      v.play().catch(function(){v.muted=true;v.play().catch(function(){})});
      c.classList.add('playing');
    });
    v.addEventListener('click',function(){v.pause()});
    v.addEventListener('pause',function(){c.classList.remove('playing')});
    v.addEventListener('ended',function(){c.classList.remove('playing');v.currentTime=0});
  });
})();
