/* Hashmi Digital lux layer v3: GSAP reveals and scroll moments (gsap-core,
   gsap-scrolltrigger patterns), ad playback, mobile menu. Falls back to a
   static page when GSAP is missing or reduced motion is on. */
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

  /* hero loop: start fetching and playing once JS is up; poster is the LCP */
  var hv=document.querySelector('[data-heroloop]');
  if(hv&&!RM){hv.play().catch(function(){})}

  /* reveals and scroll moments */
  var els=document.querySelectorAll('.rv');
  var hero=function(el){return !!el.closest('.hero-lx')};
  if(!RM&&window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);

    /* section reveals: quiet opacity with a small rise, batched */
    var below=[].filter.call(els,function(e){return !hero(e)});
    gsap.set(below,{opacity:0,y:18});
    /* anything already inside the first viewport reveals at once */
    below.forEach(function(e){
      if(e.getBoundingClientRect().top<innerHeight*0.88){
        gsap.to(e,{opacity:1,y:0,duration:.6,ease:'power2.out',overwrite:true});
        e.classList.add('in');
      }
    });
    ScrollTrigger.batch(below.filter(function(e){return !e.classList.contains('in')}),{
      start:'top 88%',
      once:true,
      onEnter:function(batch){
        gsap.to(batch,{opacity:1,y:0,duration:.8,stagger:.08,ease:'power2.out',overwrite:true,
          onComplete:function(){batch.forEach(function(b){b.classList.add('in')})}});
      }
    });

    /* signature word scrubs with the scroll */
    var sig=document.querySelector('.sig-word');
    if(sig){
      gsap.fromTo(sig,{opacity:.1,scale:.94,letterSpacing:'0.06em'},{
        opacity:.92,scale:1,letterSpacing:'0em',ease:'none',
        scrollTrigger:{trigger:'.sig-band',start:'top 90%',end:'center 55%',scrub:true}
      });
    }

    /* gentle parallax on section backdrop stills, desktop only */
    gsap.matchMedia().add('(min-width: 1021px)',function(){
      document.querySelectorAll('.bd>.bd-img').forEach(function(img){
        gsap.fromTo(img,{yPercent:-6},{yPercent:6,ease:'none',
          scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
      });
    });
  }else{
    document.documentElement.classList.add('no-gsap');
    if(!RM&&'IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})
      },{threshold:.12});
      els.forEach(function(e){if(!hero(e))io.observe(e)});
    }else{
      els.forEach(function(e){e.classList.add('in')});
    }
  }
  if(RM){els.forEach(function(e){e.classList.add('in')})}

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
