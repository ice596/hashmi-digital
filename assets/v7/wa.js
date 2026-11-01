/* Hashmi Digital WhatsApp-style assistant: a live demo of the booking bot we sell */
(function(){
  if(document.getElementById('wa-float'))return;
  var NUM='971501351630';
  var BOOK='https://calendar.google.com/calendar/appointments/schedules/AcZssZ3mhcpczZA-G5d07i7NI6GrL7w4VSBRHbVHX_467HKG3_Ng0UHUy9YvW1HwX8df-BC1B2a6IXee';
  var LOGO='<svg viewBox="0 0 64 64"><path d="M22 6h20c12 0 18 6 18 18v10c0 12-6 18-18 18H30l-12 8 2-9c-9-2-14-8-14-17V24C6 12 12 6 22 6z" fill="#FF6A1F"/><circle cx="24" cy="25" r="6" fill="#fff"/><circle cx="40" cy="25" r="6" fill="#fff"/><circle cx="25.5" cy="26" r="2.6" fill="#26202E"/><circle cx="41.5" cy="26" r="2.6" fill="#26202E"/><circle cx="24" cy="40" r="2.8" fill="#fff"/><circle cx="32" cy="40" r="2.8" fill="#fff"/><circle cx="40" cy="40" r="2.8" fill="#fff"/></svg>';
  var WAICON='<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#fff" d="M16.04 3C9.1 3 3.45 8.63 3.45 15.56c0 2.21.58 4.37 1.68 6.27L3.35 28.3l6.62-1.73a12.6 12.6 0 0 0 6.07 1.55h.01c6.94 0 12.6-5.63 12.6-12.56C28.65 8.63 22.99 3 16.04 3zm0 22.99h-.01a10.47 10.47 0 0 1-5.33-1.46l-.38-.23-3.93 1.03 1.05-3.83-.25-.39a10.4 10.4 0 0 1-1.6-5.55c0-5.76 4.7-10.45 10.47-10.45 2.8 0 5.42 1.09 7.4 3.06a10.38 10.38 0 0 1 3.06 7.39c0 5.76-4.7 10.45-10.48 10.45zm5.74-7.82c-.31-.16-1.86-.92-2.15-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.33-.49-2.53-1.56-.93-.83-1.56-1.86-1.75-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.25-.61-.51-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62 0 1.54 1.13 3.04 1.28 3.25.16.21 2.22 3.38 5.37 4.74.75.32 1.34.52 1.8.66.75.24 1.44.21 1.98.13.6-.09 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37z"/></svg>';
  var F='system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
  var css=
  '#wa-float{position:fixed;right:20px;bottom:20px;z-index:9998;display:flex;align-items:center;gap:10px;background:#0E8345;color:#fff;text-decoration:none;font:700 16px/1 '+F+';padding:14px 20px 14px 16px;border:0;border-radius:999px;box-shadow:0 10px 28px rgba(0,0,0,.22);cursor:pointer;transform:translateY(90px);opacity:0;transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .35s,box-shadow .2s}'+
  '#wa-float.in{transform:none;opacity:1}#wa-float:hover{background:#0A7A42;box-shadow:0 14px 34px rgba(14,131,69,.45)}'+
  '#wa-float svg{width:26px;height:26px;flex:none}'+
  '#wa-float .dot{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:#FF3B30;border:2px solid #fff;font:700 11px/16px '+F+';text-align:center;color:#fff;box-sizing:border-box}'+
  '#wa-float.open .dot,#wa-float.seen .dot{display:none}'+
  '#wa-tease{position:fixed;right:20px;bottom:86px;z-index:9998;max-width:260px;background:#fff;color:#111b21;font:500 14.5px/1.4 '+F+';padding:12px 34px 12px 14px;border-radius:14px 14px 4px 14px;box-shadow:0 10px 30px rgba(0,0,0,.18);cursor:pointer;opacity:0;transform:translateY(10px);transition:.3s}'+
  '#wa-tease.in{opacity:1;transform:none}#wa-tease b{display:block;font-weight:700;margin-bottom:2px}'+
  '#wa-tease i{position:absolute;top:6px;right:10px;font-style:normal;color:#8696a0;font-size:18px;line-height:1}'+
  '#wa-panel{position:fixed;right:20px;bottom:90px;z-index:9999;width:370px;height:min(600px,calc(100vh - 120px));display:flex;flex-direction:column;border-radius:18px;overflow:hidden;background:#efeae2;box-shadow:0 24px 60px rgba(0,0,0,.28);font:15px/1.4 '+F+';color:#111b21;opacity:0;transform:translateY(16px) scale(.98);pointer-events:none;transition:.25s cubic-bezier(.2,.8,.2,1)}'+
  '#wa-panel.open{opacity:1;transform:none;pointer-events:auto}'+
  '#wa-panel .hd{display:flex;align-items:center;gap:10px;background:#008069;color:#fff;padding:12px 12px 12px 14px}'+
  '#wa-panel .av{width:40px;height:40px;border-radius:50%;background:#FFF6EF;display:grid;place-items:center;flex:none}#wa-panel .av svg{width:30px;height:30px}'+
  '#wa-panel .nm{flex:1;min-width:0}#wa-panel .nm b{display:flex;align-items:center;gap:5px;font-size:16px}'+
  '#wa-panel .nm b svg{width:16px;height:16px}#wa-panel .nm small{display:block;font-size:12.5px;opacity:.85}'+
  '#wa-panel .x{background:none;border:0;color:#fff;font-size:26px;line-height:1;cursor:pointer;padding:4px 8px;opacity:.9}'+
  '#wa-panel .bd{flex:1;overflow-y:auto;padding:14px 12px 6px;background:#efeae2 radial-gradient(rgba(0,0,0,.035) 1px,transparent 1px) 0 0/18px 18px;scroll-behavior:smooth}'+
  '#wa-panel .day{margin:0 auto 10px;width:max-content;background:#fff;color:#54656f;font-size:12px;padding:4px 10px;border-radius:8px;box-shadow:0 1px .5px rgba(0,0,0,.1)}'+
  '#wa-panel .note{margin:0 8px 12px;background:#fff5c4;color:#54656f;font-size:12px;text-align:center;padding:6px 10px;border-radius:8px}'+
  '#wa-panel .wm{display:block;opacity:1;transform:none;min-width:92px;box-sizing:border-box;max-width:84%;margin:0 0 6px;padding:7px 9px 18px;border-radius:8px;position:relative;box-shadow:0 1px .5px rgba(0,0,0,.13);white-space:pre-line;word-wrap:break-word;animation:waIn .2s ease-out}'+
  '#wa-panel .wm.b{background:#fff;border-top-left-radius:0}#wa-panel .wm.u{width:max-content;max-width:84%;background:#d9fdd3;margin-left:auto;border-top-right-radius:0}'+
  '#wa-panel .wm .t{position:absolute;right:8px;bottom:3px;font-size:11px;color:#667781}'+
  '#wa-panel .wm.u .t:after{content:" \\2713\\2713";color:#53bdeb;letter-spacing:-3px;margin-left:2px}'+
  '#wa-panel .wm a{color:#027eb5;font-weight:600}'+
  '#wa-panel .wm.typ{display:inline-flex;gap:4px;padding:12px 14px}#wa-panel .typ i{width:7px;height:7px;border-radius:50%;background:#8696a0;animation:waDot 1s infinite}'+
  '#wa-panel .typ i:nth-child(2){animation-delay:.15s}#wa-panel .typ i:nth-child(3){animation-delay:.3s}'+
  '#wa-panel .qr{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end;margin:4px 0 10px}'+
  '#wa-panel .qr button{background:#fff;color:#008069;border:1px solid #d1d7db;border-radius:18px;padding:8px 13px;font:600 14px '+F+';cursor:pointer;transition:background .15s}'+
  '#wa-panel .qr button:hover{background:#e7fce3}'+
  '#wa-panel .cta{display:flex;align-items:center;justify-content:center;gap:8px;background:#0E8345;color:#fff!important;text-decoration:none;font-weight:700;border-radius:10px;padding:11px;margin:8px 0 2px}'+
  '#wa-panel .cta svg{width:20px;height:20px}'+
  '#wa-panel form{display:flex;gap:8px;align-items:center;padding:8px 10px;background:#f0f2f5}'+
  '#wa-panel input{flex:1;border:0;border-radius:22px;padding:11px 14px;font:15px '+F+';outline:none;background:#fff;color:#111b21;min-width:0}'+
  '#wa-panel .snd{width:42px;height:42px;border-radius:50%;border:0;background:#00a884;color:#fff;display:grid;place-items:center;cursor:pointer;flex:none}'+
  '#wa-panel .snd svg{width:20px;height:20px}'+
  '#wa-panel .ft{font-size:11px;text-align:center;color:#8696a0;background:#f0f2f5;padding:0 0 6px}'+
  '@keyframes waIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}'+
  '@keyframes waDot{0%,60%,100%{opacity:.35;transform:none}30%{opacity:1;transform:translateY(-3px)}}'+
  '@media (max-width:640px){#wa-float{right:14px;bottom:14px;padding:14px}#wa-float span{display:none}'+
    '#wa-panel{right:0;bottom:0;width:100%;height:100%;border-radius:0}#wa-tease{right:14px;bottom:80px}}'+
  '@media (prefers-reduced-motion:reduce){#wa-float,#wa-panel,#wa-tease,#wa-panel .wm{transition:none;animation:none}}'+
  '@media print{#wa-float,#wa-panel,#wa-tease{display:none}}'+
  '@media (max-width:640px){footer{padding-bottom:84px}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function now(){var d=new Date(),h=d.getHours(),m=d.getMinutes();return (h%12||12)+':'+(m<10?'0':'')+m+(h<12?' am':' pm')}
  function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){}}

  /* launcher */
  var btn=el('button','');btn.id='wa-float';btn.type='button';
  btn.setAttribute('aria-label','Chat with Hashmi Digital');btn.innerHTML=WAICON+'<span>Chat with us</span><i class="dot">1</i>';
  document.body.appendChild(btn);
  (function(){var mob=matchMedia('(max-width:640px)').matches;
    function show(){btn.classList.add('in')}
    if(!mob){setTimeout(show,700);return}
    function chk(){if(scrollY>innerHeight*0.6){show();removeEventListener('scroll',chk)}}
    addEventListener('scroll',chk,{passive:true});chk();setTimeout(show,20000);
  })();

  /* panel */
  var p=el('div','');p.id='wa-panel';p.setAttribute('role','dialog');p.setAttribute('aria-label','Hashmi Digital chat');
  p.innerHTML='<div class="hd"><div class="av">'+LOGO+'</div><div class="nm"><b>Hashmi Digital <svg viewBox="0 0 24 24"><path fill="#25D366" d="M12 2l2.4 2.1 3.2-.3.8 3.1 2.8 1.6-1.2 3 1.2 3-2.8 1.6-.8 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.8-3.1L2.8 15.5l1.2-3-1.2-3 2.8-1.6.8-3.1 3.2.3z"/><path fill="#fff" d="M10.6 15.2l-3-3 1.2-1.2 1.8 1.8 4.6-4.6 1.2 1.2z"/></svg></b><small>online · replies instantly</small></div><button class="x" type="button" aria-label="Close chat">&times;</button></div>'+
    '<div class="bd" aria-live="polite"><div class="day">Today</div><div class="note">This chat is our WhatsApp booking bot. Your business can have one just like it.</div></div>'+
    '<form><input type="text" placeholder="Type a message" aria-label="Type a message" autocomplete="off"><button class="snd" type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path fill="#fff" d="M3.4 20.4l17.4-7.5c.8-.4.8-1.5 0-1.8L3.4 3.6c-.7-.3-1.4.2-1.4.9L2 9.1c0 .5.4.9.9 1l12.1 1.9-12.1 1.9c-.5.1-.9.5-.9 1l.1 4.6c0 .7.7 1.2 1.3.9z"/></svg></button></form>'+
    '<div class="ft">Powered by Hashmi Digital</div>';
  document.body.appendChild(p);
  var bd=p.querySelector('.bd'),form=p.querySelector('form'),inp=p.querySelector('input');

  var S={type:'',need:'',name:'',biz:'',step:'start',started:false};
  var busy=false,queue=[];

  function scroll(){bd.scrollTop=bd.scrollHeight}
  function addMsg(html,who){var m=el('div','wm '+who,html+'<span class="t">'+now()+'</span>');bd.appendChild(m);scroll();return m}
  function clearQR(){var q=bd.querySelectorAll('.qr');for(var i=0;i<q.length;i++)q[i].remove()}
  function say(list,after){
    if(typeof list==='string')list=[list];
    busy=true;var i=0;
    (function next(){
      if(i>=list.length){busy=false;if(queue.length){clearQR();var q=queue.shift();setTimeout(function(){answer(q)},200);return}if(after)after();return}
      var txt=list[i++];var ty=el('div','wm b typ','<i></i><i></i><i></i>');bd.appendChild(ty);scroll();
      var d=Math.min(1400,450+txt.replace(/<[^>]+>/g,'').length*9);
      setTimeout(function(){ty.remove();addMsg(txt,'b');setTimeout(next,250)},d);
    })();
  }
  function quick(opts){
    var q=el('div','qr');
    opts.forEach(function(o){var b=el('button','',esc(o[0]));b.type='button';b.onclick=function(){clearQR();addMsg(esc(o[0]),'u');setTimeout(o[1],300)};q.appendChild(b)});
    bd.appendChild(q);scroll();
  }
  function waLink(){
    var t='Hi Ali, I chatted with your website assistant.';
    if(S.name)t+='\nName: '+S.name;
    if(S.biz)t+='\nBusiness: '+S.biz;
    if(S.type)t+='\nType: '+S.type;
    if(S.need)t+='\nInterested in: '+S.need;
    t+='\nCan I get my free prototype?';
    return 'https://wa.me/'+NUM+'?text='+encodeURIComponent(t);
  }
  function handoff(intro){
    say([intro||'I\'ll pass you to Ali, our founder. He replies personally on WhatsApp.',
      'Tap below and your details are already filled in, so you don\'t need to repeat anything.<a class="cta" target="_blank" rel="noopener" href="'+waLink()+'">'+WAICON+' Continue on WhatsApp</a>'],
      function(){S.step='done';quick([['Book a video call',bookCall],['See all prices',function(){location.href='/pricing/'}],['Start over',start]])});
  }

  function bookCall(){
    say(['Pick any free slot for a 30-minute Google Meet call with Ali. You\'ll see a live demo and can ask anything.<a class="cta" style="background:#1a73e8" target="_blank" rel="noopener" href="'+BOOK+'">Book a free call</a>'],function(){S.step==='done'||afterQ()});
  }
  var GB='Get booked (website + WhatsApp)',GS='Get seen (monthly AI ads)';
  var NEEDS={};
  NEEDS[GB]=['Customers find you on Google, message you, and get booked in, even at 11 pm. You get a website plus a WhatsApp assistant like the one you\'re chatting with now.','Get booked prices (one-time, website + WhatsApp together):\n• Starter: AED 2,900 (one-page site + 24/7 WhatsApp answers, ~7 days)\n• Growth: AED 4,900 (6-page Arabic & English site + WhatsApp books real slots + reminders, ~2 weeks)\n• Pro: AED 7,900 (online booking on your site, deposits, Instagram DMs, monthly report, ~3 weeks)\nRunning costs go to the providers, not us: about AED 200 to 440/month for WhatsApp, plus small Meta per-message fees. Free prototype first.'];
  NEEDS[GS]=['Fresh AI video ads and post ideas every month, so people keep seeing you and coming back. No filming, no studio.','Get seen plans (monthly, cancel anytime):\n• Ideas: AED 400/mo (30 post ideas a month)\n• Growth: AED 1,900/mo (ideas + 8 ready AI videos)\n• Pro: AED 3,500/mo (20 videos, posting calendar, monthly report)\nJust one ad to try? AED 750. Samples: <a href="/ads/">hashmi-digital.com/ads</a>','A marketing hire in Abu Dhabi starts around AED 8,000/month. An agency is usually AED 2,500 to 5,000.'];
  NEEDS['Mobile app']=['Your own iPhone and Android app for booking, ordering and loyalty. It\'s a custom project.','Business App from AED 7,500 (about 4 to 5 weeks). Startup MVP from AED 14,900.'];
  NEEDS['Not sure yet']=['Simple: we\'re one system with two parts. Get booked brings customers in (website + WhatsApp). Get seen keeps them coming (monthly AI ads).','If customers can\'t find you or wait for replies, start with Get booked. Already busy but rarely post? Start with Get seen. Prices: <a href="/pricing/">see prices</a>'];


  function start(){
    clearQR();S={type:'',need:'',name:'',biz:'',step:'type',started:true};
    say(['Hi there! I\'m the Hashmi Digital assistant.','We get local businesses more customers with one system: Get booked (website + WhatsApp booking) and Get seen (monthly AI video ads).','What kind of business do you run?'],
      function(){quick([['Sports academy',function(){pickType('Sports academy')}],['Salon or spa',function(){pickType('Salon or spa')}],['Café or restaurant',function(){pickType('Café or restaurant')}],['Gym or studio',function(){pickType('Gym or studio')}],['Something else',function(){pickType('Other')}]])});
  }
  function pickType(t){
    S.type=t;S.step='need';
    if(t==='Sports academy'){
      S.need='Academy app pilot';
      say(['Academies are our speciality.','We set up your own branded academy app: class booking, renewals, payment reminders and WhatsApp booking, so you stop chasing parents.',
        'Our pilot offer:\n• Free setup\n• First month free\n• Then AED 450/month, no contract, cancel anytime',
        'Try the live demo here: <a href="/demos/academy/" target="_blank">Tide Swim Academy demo</a>'],askProto);
      return;
    }
    say('Nice. What do you need most right now?',function(){
      quick(Object.keys(NEEDS).map(function(k){return [k,function(){pickNeed(k)}]}));
    });
  }
  function pickNeed(k){S.need=k;say(NEEDS[k],askProto)}
  function askProto(){
    S.step='proto';
    say('Want a free prototype for your business? You tap it on your phone in about 3 days, before paying anything.',function(){
      quick([['Yes please',function(){S.step='name';say('Great. What\'s your name?')}],['Book a video call',bookCall],['I have a question',function(){S.step='q';say('Sure, ask me anything. Prices, timing, Arabic, how it works...')}],['Talk to Ali',function(){handoff()}]]);
    });
  }

  /* free-text understanding */
  function answer(txt){
    var t=txt.toLowerCase();
    if(S.step==='name'){S.name=txt.slice(0,60);S.step='biz';say('Nice to meet you, '+esc(S.name)+'. What\'s your business called? (Instagram handle works too)');return}
    if(S.step==='biz'){S.biz=txt.slice(0,80);S.step='done';
      handoff('Perfect, '+esc(S.name)+'. I\'ve got everything Ali needs to start your free prototype for '+esc(S.biz)+'.');return}
    var hit=bestMatch(t);
    if(hit){S.miss=0;hit();return}
    S.miss=(S.miss||0)+1;
    if(S.miss<2){
      say('Hmm, I didn\'t quite get that. Try asking in a different way, or pick a topic:',function(){
        quick([['What you do',function(){KB_RUN('what')}],['Prices',function(){KB_RUN('price')}],['How it works',function(){KB_RUN('process')}],['Book a video call',bookCall]]);
      });return;
    }
    S.miss=0;handoff('That one\'s best answered by Ali personally.');
  }

  /* knowledge base: each entry scores by how many of its patterns match */
  var KB=[
    {id:'hello',p:[/^(hi+|hello|hey+|salam|assalam|marhaba|ahlan|yo|good (morning|afternoon|evening))\b/],a:function(){if(!S.started){start();return}say('Hi again! Ask me anything about our services, prices or how it works.',afterQ)}},
    {id:'able',p:[/(can|could) (you|u) (answer|talk|reply)( me| my)?\??$/,/are (you|u) (a |an )?(bot|real|human|robot|ai|person)/,/who (are|r) (you|u)\b/,/(you|u) (a )?bot/],a:function(){say(['Yes! I\'m the Hashmi Digital assistant. I\'m a bot, just like the ones we build for businesses.','I can answer most questions about what we do, prices, timing, payment and how it all works. Ali, our founder, steps in for anything custom. What would you like to know?'],afterQ)}},
    {id:'what',p:[/what (do|does|did) (you|u|ya|y\'?all)( guys)? do/,/what (is|\'s) hashmi/,/what (do|can) (you|u) (offer|build|make|provide)/,/\bservices?\b/,/about (you|u|hashmi|your (company|business))/,/what (is|\'s) this/,/what (do|does) (your|ur) (company|business)/],a:function(){say(['We\'re an AI-powered digital studio in Abu Dhabi. We help small businesses get more customers and less admin:','One system, two parts:\n1. Get booked: a website that shows up on Google, plus a WhatsApp assistant that answers and books customers 24/7 (like this chat)\n2. Get seen: fresh AI video ads and post ideas every month\nWe also build custom apps, and booking apps for sports academies.','Because we build with AI, it\'s faster and much cheaper than a normal agency, and you see a free prototype before paying anything.'],afterQ)}},
    {id:'process',p:[/how (does|do|will) (it|this|you|u|the process) work/,/\bprocess\b/,/\bsteps?\b/,/get(ting)? started/,/what happens (next|after)/,/how (do|can) (i|we) start/],a:function(){say('Here\'s how it works:\n1. Tell us about your business (here, on WhatsApp or a quick call)\n2. We build a free prototype you can tap on your phone, usually in 3 days\n3. Like it? You pay a fixed, written price and we build the real thing\n4. We launch it, and you get 30 days of free fixes after launch\nNo surprises and no long contracts.',afterQ)}},
    {id:'price',p:[/price|pricing|cost|how much|charge|fee|\baed\b|budget|expensive|afford|بكم|سعر|كم/],a:function(){say(['Our prices are fixed and written down. We\'re one system with two parts:\n• Get booked (website + WhatsApp booking): from AED 2,900 one-time\n• Get seen (monthly AI video ads + post ideas): from AED 400/month\n• Academy app pilot: free setup, first month free, then AED 450/month\n• Custom apps: from AED 7,500','Full details: <a href="/pricing/">see all prices</a>'],afterQ)}},
    {id:'cheap',p:[/discount|deal|promo|offer|cheaper|negotia|lower price|special/],a:function(){say('Best deals right now:\n• Our first 3 founding clients lock launch prices for 12 months\n• Academies get free setup and the first month free\n• Every Get booked package starts with a free prototype, so you only pay if you love it.',afterQ)}},
    {id:'pay',p:[/\bpay(ment|ing)?\b|deposit|card|bank|transfer|instal+ment|upfront|in advance|cash/],a:function(){say('You don\'t pay anything until you\'ve seen and approved your free prototype. Then it\'s 50% to start the build and 50% at launch. For the academy pilot, nothing is due until your second month.',afterQ)}},
    {id:'contract',p:[/contract|cancel|commit|lock(ed)? in|subscription|monthly|recurring|every month/],a:function(){say('No long contracts. Get booked is a one-time price. Get seen plans are monthly and you can cancel anytime. The academy app is AED 450 a month after the free month. The only other ongoing cost for WhatsApp is the platform fee, about AED 200 to 440 a month plus small Meta per-message fees, paid directly to the providers.',afterQ)}},
    {id:'refund',p:[/refund|money back|not happy|don\'?t like|unhappy|guarantee/],a:function(){say('You only pay after you\'ve approved a free prototype, so there\'s no risk up front. Prices are fixed (if it takes longer, that\'s on us), and you get 30 days of free fixes after launch.',afterQ)}},
    {id:'own',p:[/\bown(ership)?\b|\bcode\b|\bmine\b|my account|transfer it/],a:function(){say('Everything is 100% yours: the code, the design and all the accounts. The domain and WhatsApp number are registered in your name.',afterQ)}},
    {id:'support',p:[/support|maintenance|maintain|fix|bug|update|change (it|later|things)|edit|after launch|help later/],a:function(){say('You get 30 days of free fixes after launch, and the bigger website plan includes 3 months of free changes. After that, small updates are quick and cheap, and you just message Ali on WhatsApp.',afterQ)}},
    {id:'time',p:[/how long|how fast|how quick|timeline|deadline|\bdays?\b|\bweeks?\b|when (can|will|could)|ready by|turnaround/],a:function(){say('Typical timing:\n• Free prototype: about 3 days\n• AI video ad: about 3 days\n• WhatsApp bot or website: about 5 to 10 days\n• App: about 4 to 6 weeks',afterQ)}},
    {id:'lang',p:[/arabic|عربي|language|english|bilingual|translate/],a:function(){say('Yes, everything can be in Arabic and English. The WhatsApp bot replies in whichever language your customer writes in.',afterQ)}},
    {id:'where',p:[/where (are|r) (you|u)|location|based|office|abu dhabi|dubai|sharjah|\buae\b|in person|visit/],a:function(){say('We\'re based in Abu Dhabi and work with businesses across the UAE. It\'s all done online, so there\'s no need to meet in person, but a quick video call is always an option.',afterQ)}},
    {id:'demo',p:[/demo|example|portfolio|sample|show me|previous work|your work|see (it|some)/],a:function(){say('Here are live examples:\n• Academy app: <a href="/demos/academy/" target="_blank">Tide Swim Academy</a>\n• Video ads: <a href="/ads/">AI ads</a>\n• Our work: <a href="/#work">portfolio</a>\nAnd this chat itself is a demo of our WhatsApp bot.',afterQ)}},
    {id:'proto',p:[/free|prototype|trial|pilot|try (it|first)|test (it|first)/],a:function(){say('Yes, every website and app starts with a free prototype you can tap on your phone, usually in about 3 days. Academies also get free setup and the first month free.',askProto)}},
    {id:'bot',p:[/whatsapp|\bbot\b|chatbot|auto.?repl|automat|booking system|book(ing)?s?\b/],a:function(){say(NEEDS[GB],afterQ)}},
    {id:'noshow',p:[/no.?shows?|remind|forget|missed (appointments|bookings)|late cancel/],a:function(){say('Our WhatsApp bot sends a reminder the day before, lets customers reschedule in one tap, and on the Pro plan takes a deposit by payment link. That\'s what cuts no-shows the most.',afterQ)}},
    {id:'app',p:[/\bapps?\b|iphone|android|app store|play store|mobile/],a:function(){say(NEEDS['Mobile app'],afterQ)}},
    {id:'web',p:[/web|site|landing page|online presence/],a:function(){say(NEEDS[GB],afterQ)}},
    {id:'content',p:[/content|ideas?\b|what (to|should i) post|posting|social media plan|reels? ideas|calendar|consisten/],a:function(){S.need=GS;say(NEEDS[GS],afterQ)}},
    {id:'video',p:[/video|\bads?\b|advert|reel|tiktok|ugc|commercial|content|marketing/],a:function(){say(NEEDS[GS],afterQ)}},
    {id:'google',p:[/google|seo|search|rank|maps|found online/],a:function(){say('Our Growth website plan (AED 2,900) sets up your Google Business Profile and the Google-ready basics so locals find you on Search and Maps.',afterQ)}},
    {id:'insta',p:[/instagram|insta|\big\b|social media|facebook|dms?\b/],a:function(){say('We can answer your Instagram DMs automatically too (on the Pro bot plan), and our AI video ads are made for Reels and TikTok.',afterQ)}},
    {id:'ai',p:[/\bai\b|chatgpt|artificial|machine learning/],a:function(){say('We use AI to design and build faster, which is why our prices are a fraction of normal agencies. Our video ads are made with AI, so there\'s no filming or studio. Your bot can follow a fixed script (like this one) or use AI to answer anything.',afterQ)}},
    {id:'industry',p:[/salon|spa|nail|barber|cafe|café|restaurant|gym|clinic|dental|shop|store|bakery|academy|school|industry|my business|kind of business/],a:function(){say('Yes, we work with cafés, restaurants, salons, spas, gyms, clinics, shops and sports academies. Each one gets a setup built around how they take bookings and orders.',afterQ)}},
    {id:'ali',p:[/who (is|\'s) ali|founder|owner|\bteam\b|how many (people|staff)|experience|who (made|built|runs)/],a:function(){say('Hashmi Digital was founded by Ali Al Hashmi in Abu Dhabi. He also built Earned, a screen time app that\'s live on the App Store. He works with AI tools to deliver what normally needs a whole agency team.',afterQ)}},
    {id:'trust',p:[/trust|legit|real company|scam|reviews?|clients|testimonial|proof/],a:function(){say('Fair question. We\'re a young studio, so instead of asking you to trust us, we show you: you get a free working prototype of your own app or site before paying anything. Prices are fixed and written down, and everything we build is 100% yours.',afterQ)}},
    {id:'hours',p:[/open|hours|available|reply time|respond|online now|weekend/],a:function(){say('This assistant is here 24/7. Ali usually replies on WhatsApp within the hour, and video calls are available Monday to Friday 4 to 8pm and Saturday 10am to 2pm.',afterQ)}},
    {id:'host',p:[/host(ing)?|domain|server|\.com|email address/],a:function(){say('We set up hosting for you. A domain name is about AED 50 a year, registered in your name, so you always own it.',afterQ)}},
    {id:'call',p:[/meet|meeting|call|zoom|appointment|book a|schedule|موعد/],a:function(){bookCall()}},
    {id:'human',p:[/\bali\b|human|real person|talk to|speak to|contact|phone|number|whatsapp (you|u|him)/],a:function(){handoff()}},
    {id:'thanks',p:[/thank|thx|\bty\b|shukran|شكرا|appreciate|great|awesome|perfect|cool|ok(ay)?$/],a:function(){say('You\'re welcome! Anything else I can help with?',afterQ)}}
  ];
  function bestMatch(t){
    var best=null,bs=0;
    KB.forEach(function(k){var s=0;k.p.forEach(function(r){if(r.test(t))s++});if(s>bs){bs=s;best=k}});
    return best?best.a:null;
  }
  function KB_RUN(id){for(var i=0;i<KB.length;i++)if(KB[i].id===id){KB[i].a();return}}
  function afterQ(){
    if(S.step==='done'){quick([['Book a video call',bookCall],['Continue on WhatsApp',function(){handoff()}],['Start over',start]]);return}
    quick([['Get my free prototype',function(){S.step='name';say('Great. What\'s your name?')}],['Book a video call',bookCall],['Another question',function(){S.step='q';say('Go ahead, ask me anything.')}]]);
  }

  form.onsubmit=function(e){e.preventDefault();var v=inp.value.trim();if(!v)return;inp.value='';clearQR();addMsg(esc(v),'u');if(busy){queue=[v];return}setTimeout(function(){answer(v)},300)};

  /* open / close */
  var tease=null;
  function open(){
    p.classList.add('open');btn.classList.add('open','seen');if(tease){tease.remove();tease=null}
    ss('waSeen','1');
    if(!S.started)start();
    setTimeout(function(){if(matchMedia('(min-width:641px)').matches)inp.focus()},300);
  }
  function close(){p.classList.remove('open');btn.classList.remove('open')}
  btn.onclick=function(){p.classList.contains('open')?close():open()};
  p.querySelector('.x').onclick=close;
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});

  /* gentle teaser, once per visit: after 12s or once the hero is scrolled past */
  if(!ss('waSeen')){
    var teaseShown=false;
    function showTease(){
      if(teaseShown)return;teaseShown=true;
      removeEventListener('scroll',teaseScroll);
      if(p.classList.contains('open')||!btn.classList.contains('in'))return;
      tease=el('div','');tease.id='wa-tease';
      tease.innerHTML='<i aria-label="Dismiss">&times;</i><b>Hashmi Digital</b>Hi! Want a WhatsApp bot like this for your business? Ask me anything.';
      tease.onclick=function(e){if(e.target.tagName==='I'){tease.remove();tease=null;ss('waSeen','1');return}open()};
      document.body.appendChild(tease);requestAnimationFrame(function(){tease.classList.add('in')});
      setTimeout(function(){if(tease){tease.classList.remove('in');setTimeout(function(){if(tease){tease.remove();tease=null}},350)}},10000);
    }
    function teaseScroll(){if(scrollY>innerHeight*0.95)showTease()}
    addEventListener('scroll',teaseScroll,{passive:true});
    setTimeout(showTease,12000);
  } else btn.classList.add('seen');
})();
