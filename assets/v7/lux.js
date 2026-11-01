/* Hashmi Digital lux layer v4: IO reveals up front; GSAP (gsap-core +
   gsap-scrolltrigger patterns) loads after window load for scroll moments,
   so no animation library sits in the critical path. */
(function(){
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches||/[?&]nomo/.test(location.search);

  /* mobile menu */
  var mbtn=document.querySelector('.mnav-btn'),mnav=document.getElementById('mnav');
  if(mbtn&&mnav){
    mbtn.addEventListener('click',function(){
      var open=mnav.hidden;
      mnav.hidden=!open;
      mbtn.classList.toggle('on',open);
      mbtn.setAttribute('aria-expanded',open?'true':'false');
      document.body.style.overflow=open?'hidden':'';
      if(open&&window.gsap&&!RM){
        gsap.from('#mnav a, #mnav .mnav-note',{opacity:0,y:18,duration:.5,stagger:.06,ease:'power2.out',clearProps:'all'});
      }
    });
    mnav.addEventListener('click',function(e){
      if(e.target.tagName==='A'){mnav.hidden=true;mbtn.classList.remove('on');mbtn.setAttribute('aria-expanded','false');document.body.style.overflow=''}
    });
  }

  /* reduced motion: show the chat demo's final state instead of animating */
  if(RM){
    document.querySelectorAll('.bot-body .m').forEach(function(m){
      if(m.classList.contains('typing'))return;
      m.classList.add('show','vis');
    });
  }

  /* hero loops: start after first paint settles; poster images carry the LCP */
  if(!RM){
    setTimeout(function(){
      document.querySelectorAll('[data-heroloop]').forEach(function(v){
        if(getComputedStyle(v).display!=='none'){v.play().catch(function(){})}
      });
    },250);
  }

  /* reveals: IntersectionObserver, visible-at-load shows at once */
  var els=[].slice.call(document.querySelectorAll('.rv'));
  var hero=function(el){return !!el.closest('.hero-lx')};
  var below=els.filter(function(e){return !hero(e)});
  if(RM||!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in')});
  }else{
    below.forEach(function(e){
      if(e.getBoundingClientRect().top<innerHeight*0.9)e.classList.add('in');
    });
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}});
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    below.forEach(function(e){if(!e.classList.contains('in'))io.observe(e)});
  }

  /* GSAP scroll moments, loaded after the page is done */
  function initGsap(){
    if(!window.gsap||!window.ScrollTrigger)return;
    gsap.registerPlugin(ScrollTrigger);
    var sig=document.querySelector('.sig-word');
    if(sig){
      gsap.fromTo(sig,{opacity:.1,scale:.94,letterSpacing:'0.06em'},{
        opacity:.92,scale:1,letterSpacing:'0em',ease:'none',
        scrollTrigger:{trigger:'.sig-band',start:'top 90%',end:'center 55%',scrub:true}
      });
    }
    gsap.matchMedia().add('(min-width: 1021px)',function(){
      document.querySelectorAll('.bd>.bd-img').forEach(function(img){
        gsap.fromTo(img,{yPercent:-5},{yPercent:5,ease:'none',
          scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
      });
    });
  }
  function loadScript(src,cb){var sc=document.createElement('script');sc.src=src;sc.onload=cb;document.head.appendChild(sc)}
  if(!RM&&(document.querySelector('.sig-word')||document.querySelector('.bd'))){
    var boot=function(){
      loadScript('/assets/vendor/gsap/gsap.min.js',function(){
        loadScript('/assets/vendor/gsap/ScrollTrigger.min.js',initGsap);
      });
    };
    if(document.readyState==='complete'){boot()}else{addEventListener('load',boot)}
  }

  /* ad cards: tap to play with sound, one at a time */
  var cards=[].slice.call(document.querySelectorAll('.adc'));
  function stopAll(except){
    cards.forEach(function(c){
      var v=c.querySelector('video');
      if(v&&v!==except){v.pause();c.classList.remove('playing')}
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
