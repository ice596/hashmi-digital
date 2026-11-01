(function(){
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var top=document.getElementById('top');
  function onScroll(){top.classList.toggle('scrolled',scrollY>40)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();

  /* run a loop only while its art is on screen */
  function whenVisible(el,start,stop){
    if(!('IntersectionObserver' in window)){start();return}
    new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?start():stop&&stop()})},{threshold:.2}).observe(el);
  }

  /* stamp cards fill one by one, then reset */
  document.querySelectorAll('[data-stamps]').forEach(function(card){
    var dots=[].slice.call(card.children),n=0,t=null,max=dots.length;
    function tick(){n=(n+1)%(max+2);dots.forEach(function(d,i){d.classList.toggle('on',i<Math.min(n,max))})}
    if(RM){dots.slice(0,7).forEach(function(d){d.classList.add('on')});return}
    whenVisible(card,function(){if(!t)t=setInterval(tick,850)},function(){clearInterval(t);t=null});
  });

  /* WhatsApp chat plays like a real conversation */
  document.querySelectorAll('[data-chat]').forEach(function(box){
    var ms=[].slice.call(box.children),i=0,t=null,running=false;
    if(RM)return;
    function reset(){ms.forEach(function(m){m.classList.remove('show','vis')});i=0}
    function step(){
      if(!running)return;
      if(i>=ms.length){t=setTimeout(function(){reset();step()},3200);return}
      var m=ms[i];
      if(m.classList.contains('typing')){m.classList.add('show');t=setTimeout(function(){m.classList.remove('show');i++;step()},1300);return}
      m.classList.add('show');requestAnimationFrame(function(){requestAnimationFrame(function(){m.classList.add('vis')})});
      i++;t=setTimeout(step,m.classList.contains('out')?1000:1500);
    }
    reset();
    whenVisible(box,function(){if(!running){running=true;step()}},function(){running=false;clearTimeout(t)});
  });

  /* search box types itself */
  document.querySelectorAll('[data-type]').forEach(function(el){
    var full=el.getAttribute('data-type'),k=0,dir=1,t=null;
    if(RM)return;
    function tick(){
      k+=dir;el.textContent=full.slice(0,k);
      var d=90;
      if(k>=full.length){dir=-1;d=2600}else if(k<=0){dir=1;d=600}else if(dir<0){d=40}
      t=setTimeout(tick,d);
    }
    whenVisible(el,function(){if(!t){k=0;el.textContent='';tick()}},function(){clearTimeout(t);t=null});
  });

  /* work rail: drag on desktop, swipe on touch, arrows */
  var rail=document.getElementById('rail');
  if(rail){
    var down=false,sx=0,sl=0,moved=false;
    rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=rail.scrollLeft});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;rail.classList.add('drag')}rail.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;rail.classList.remove('drag');if(moved)snap()});
    rail.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    rail.addEventListener('dragstart',function(e){e.preventDefault()});
    function cardW(){var c=rail.querySelector('.card');return c?c.getBoundingClientRect().width+22:300}
    function snap(){var w=cardW();rail.scrollTo({left:Math.round(rail.scrollLeft/w)*w,behavior:'smooth'})}
    function go(d){var w=cardW();rail.scrollTo({left:(Math.round(rail.scrollLeft/w)+d)*w,behavior:'smooth'})}
    var p=document.getElementById('wPrev'),n=document.getElementById('wNext');
    p&&p.addEventListener('click',function(){go(-1)});n&&n.addEventListener('click',function(){go(1)});
    rail.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){go(1);e.preventDefault()}if(e.key==='ArrowLeft'){go(-1);e.preventDefault()}});
  }

  /* receipts: open the full list when a number points into it */
  var more=document.getElementById('lgMore');
  function openFor(h){if(more&&h&&more.querySelector(h)){more.open=true}}
  openFor(location.hash);
  addEventListener('hashchange',function(){openFor(location.hash)});
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#r"]');if(a)openFor(a.getAttribute('href'))},true);

  /* pause loops that are off screen so scrolling stays smooth */
  if('IntersectionObserver' in window){
    var po=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('off',!e.isIntersecting)})},{rootMargin:'100px 0px'});
    document.querySelectorAll('.art,.math,.foot,.logo-tp').forEach(function(el){po.observe(el)});
  }

  /* gentle reveal */
  if(!RM&&'IntersectionObserver' in window){
    var els=document.querySelectorAll('.feat-copy,.feat .art,.rcpt,.card,.pcard,.steps li,.lg li,.close .art,.math h2,.how h2,.ledger h2,.close h2,.work-head');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){if(el.getBoundingClientRect().top>innerHeight){el.classList.add('rv');io.observe(el)}});
  }
})();

/* mobile menu: shows the main nav on small screens */
(function(){
  var nav=document.querySelector('.top-nav'),cta=document.querySelector('.top-in > .btn');
  if(!nav||!cta||document.querySelector('.mnav-btn'))return;
  var b=document.createElement('button');b.type='button';b.className='mnav-btn';b.setAttribute('aria-label','Open menu');b.setAttribute('aria-expanded','false');
  b.innerHTML='<i></i><i></i><i></i>';
  var p=document.createElement('div');p.className='mnav';p.hidden=true;
  [].forEach.call(nav.querySelectorAll('a'),function(a){var c=a.cloneNode(true);p.appendChild(c)});
  var bk=document.createElement('a');bk.href='https://calendar.google.com/calendar/appointments/schedules/AcZssZ3mhcpczZA-G5d07i7NI6GrL7w4VSBRHbVHX_467HKG3_Ng0UHUy9YvW1HwX8df-BC1B2a6IXee';bk.target='_blank';bk.rel='noopener';bk.textContent='Book a free call';p.appendChild(bk);
  var c2=cta.cloneNode(true);c2.className='mnav-cta';c2.textContent=cta.textContent.trim();p.appendChild(c2);
  cta.parentNode.insertBefore(b,cta.nextSibling);document.getElementById('top').appendChild(p);
  function set(o){p.hidden=!o;b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');b.classList.toggle('on',o)}
  b.onclick=function(){set(p.hidden)};
  p.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
})();
