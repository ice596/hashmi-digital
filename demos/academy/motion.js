/* Tide page v2: reveals, hero parallax, device scaling, role tabs, checklist, 25-second auto demo. No dependencies. */
(function(){
'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* reveals + split lines */
$$('[data-split] .ln').forEach(ln=>{const s=document.createElement('span');s.innerHTML=ln.innerHTML;ln.innerHTML='';ln.appendChild(s)});
$$('[data-split]').forEach(h=>h.querySelectorAll('.ln').forEach((ln,i)=>ln.style.setProperty('--i',i)));
const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){en.target.classList.add('in'); io.unobserve(en.target)} }),{rootMargin:'0px 0px -10% 0px',threshold:.05});
$$('[data-reveal],[data-split]').forEach(el=>io.observe(el));

/* smooth scroll (lerp on wheel, native on touch) */
const finePointer=matchMedia('(pointer: fine)').matches;
let target=window.scrollY,current=window.scrollY,animating=false,lastNative=window.scrollY;
const maxScroll=()=>document.documentElement.scrollHeight-window.innerHeight;
function tick(){current+= (target-current)*.11; if(Math.abs(target-current)<.4){current=target;animating=false} window.scrollTo(0,current); lastNative=current; if(animating) requestAnimationFrame(tick)}
if(finePointer&&!reduced){
  addEventListener('wheel',e=>{ if(e.ctrlKey) return; const sc=e.target.closest&&e.target.closest('.screen,.sheet'); if(sc){const dn=sc.scrollTop+sc.clientHeight<sc.scrollHeight-1,up=sc.scrollTop>0; if((e.deltaY>0&&dn)||(e.deltaY<0&&up)) return;} e.preventDefault(); const d=e.deltaMode===1?e.deltaY*18:e.deltaMode===2?e.deltaY*innerHeight:e.deltaY; target=clamp(target+d,0,maxScroll()); if(!animating){animating=true;requestAnimationFrame(tick)} },{passive:false});
  addEventListener('scroll',()=>{ if(!animating&&Math.abs(window.scrollY-lastNative)>1){target=current=lastNative=window.scrollY} },{passive:true});
}

/* vision: pinned photo story driven by scroll */
const vision=$('#vision'), vshots=$$('.vision .shot'), vlines=$$('.vline'), vprog=$$('.vision-prog i');
let vActive=-1;
function visionFrame(y){
  if(!vision) return;
  const top=vision.offsetTop, h=vision.offsetHeight-innerHeight; const p=clamp((y-top)/h,0,1);
  const idx=p<1/3?0:p<2/3?1:2;
  vprog.forEach((el,i)=>el.style.setProperty('--p',clamp(p*3-i,0,1).toFixed(3)));
  if(idx!==vActive){vActive=idx; vshots.forEach((s,i)=>s.classList.toggle('on',i===idx)); vlines.forEach((l,i)=>{l.classList.toggle('on',i===idx);l.classList.toggle('past',i<idx);l.classList.toggle('next',i>idx)})}
}

/* gallery marquee: drifts on its own, speeds up with scroll */
const track=$('#gTrack'); let gx=0, gv=0, lastY=window.scrollY, setW=0;
function gMeasure(){const s=$('.g-set'); if(!s) return; setW=s.getBoundingClientRect().width; if(track.children.length<2){track.appendChild(s.cloneNode(true));track.appendChild(s.cloneNode(true))}}
function gTick(){ if(!track) return; const y=window.scrollY; const dy=y-lastY; lastY=y; gv+=dy*.35; gv*=.92; gx-= (reduced?0:0.6)+gv; if(setW){ if(gx<-setW) gx+=setW; if(gx>0) gx-=setW; } track.style.setProperty('--gx',gx.toFixed(1)+'px'); requestAnimationFrame(gTick) }

/* hero parallax + top bar */
const heroImg=$('.hero-media img'), top=$('#top');
function onScroll(){const y=window.scrollY;
  if(heroImg&&!reduced) heroImg.style.transform=`translateY(${(y*.22).toFixed(1)}px)`;
  top.classList.toggle('solid',y>60);
  visionFrame(y);
}
addEventListener('scroll',onScroll,{passive:true}); onScroll();

/* device scale to fit its column */
const wrap=$('.device-wrap');
function fit(){const w=wrap.clientWidth; const maxH=innerWidth<=900?innerHeight*.8:innerHeight*.78; const s=Math.min(1, w/414, maxH/868); document.documentElement.style.setProperty('--s',s.toFixed(4))}
fit(); addEventListener('resize',()=>{fit();gMeasure()}); addEventListener('load',()=>{fit();gMeasure();onScroll()});
gMeasure(); if(!reduced) requestAnimationFrame(gTick); else if(track) track.style.setProperty('--gx','0px');

/* role tabs <-> app */
$$('#roles [data-role]').forEach(b=>b.addEventListener('click',()=>{ stopDemo(); if(window.SU) SU.setRole(b.dataset.role) }));
document.addEventListener('click',e=>{ const b=e.target.closest('#rolebar [data-role]'); if(!b) return; stopDemo(); $$('#roles [data-role]').forEach(x=>x.classList.toggle('on',x.dataset.role===b.dataset.role)) });
document.addEventListener('su:action',e=>{ const li=$(`#checklist [data-check="${e.detail.type}"]`); if(li) li.classList.add('done') });

/* smooth anchor scroll */
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{ const el=$(a.getAttribute('href')); if(!el) return; e.preventDefault(); const yy=clamp(el.offsetTop,0,maxScroll()); if(finePointer&&!reduced){target=yy; if(!animating){animating=true;requestAnimationFrame(tick)}} else el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}) }));

/* 25-second auto demo */
const playBtn=$('#playDemo'), cap=$('#demoCap');
let demoTimers=[], running=false;
function say(t){cap.textContent=t;cap.classList.add('on')}
function at(ms,fn){demoTimers.push(setTimeout(fn,ms))}
function stopDemo(){ if(!running) return; running=false; demoTimers.forEach(clearTimeout); demoTimers=[]; playBtn.classList.remove('running'); cap.classList.remove('on') }
function runDemo(){
  if(!window.SU) return; if(running){stopDemo();return}
  running=true; playBtn.classList.add('running');
  const roleBtn=r=>$$('#roles [data-role]').forEach(x=>x.classList.toggle('on',x.dataset.role===r));
  SU.markZayed(false);
  at(0,()=>{ roleBtn('parent'); SU.show('parent','home'); say('Zayed has 5 of 8 sessions left. His mother can see it.') ; setTimeout(()=>SU.focus('.pack'),400)});
  at(4200,()=>{ roleBtn('coach'); SU.show('coach','today'); say("Saturday 10:00. Coach Karim opens his class.") });
  at(7200,()=>{ SU.show('coach','class','c1'); say('Five swimmers. He marks Zayed present.') });
  at(10200,()=>{ SU.markZayed(true); say('One tap. The package drops to 4.') });
  at(13200,()=>{ roleBtn('wa'); SU.show('wa','chat'); say('Noor gets it on WhatsApp too. No app to download.') });
  at(17200,()=>{ roleBtn('parent'); SU.show('parent','home'); say('Her balance updates. 4 of 8 left. Nobody typed anything.'); setTimeout(()=>SU.focus('.pack'),400) });
  at(21200,()=>{ roleBtn('admin'); SU.show('admin','dash'); say('The office sees attendance, balances and payments, live.') });
  at(25000,()=>{ running=false; playBtn.classList.remove('running'); say('That\'s the whole system. Now you try.') ; setTimeout(()=>cap.classList.remove('on'),3500) });
}
playBtn.addEventListener('click',runDemo);
})();
