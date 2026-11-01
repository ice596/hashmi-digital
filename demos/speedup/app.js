/* SpeedUp Sports Academy prototype. Hashmi Digital. Sample data only. */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- data ---------- */
const VENUES={jaz:{name:'Al Jazira Club',short:'Al Jazira',area:'Abu Dhabi'},saad:{name:'LFITM Saadiyat',short:'Saadiyat',area:'Saadiyat Island'}};
const COACHES={shiko:{name:'Coach Shiko',full:'Shaker Moustafa',role:'Head Swimming Coach',ini:'SM'},ezz:{name:'Coach Ezz',full:'Mohamed Ezeldein',role:'Swimming Coach',ini:'ME'}};
const PROGRAMS=[
  {id:'kids',name:'Kids Swimming',venue:'jaz',tag:'Most popular',desc:'Water confidence to stroke technique. Max 5 per class.'},
  {id:'squad',name:'The SpeedUp Squad',venue:'saad',tag:'Competitive',desc:'Small-group squad training, max 5 swimmers.'},
  {id:'toddler',name:'Parent and Toddler',venue:'jaz',tag:'Ages 1 to 3',desc:'A parent in the pool with the child.'},
  {id:'adults',name:'Adults Swimming',venue:'jaz',tag:'Most flexible',desc:'Beginners, returners and confident swimmers.'},
  {id:'advanced',name:'Advanced Swimming',venue:'jaz',tag:'Technique',desc:'Stroke correction and competition prep.'},
];
const LEVELS=['Water Confidence','Floating and Kicking','Stroke Builder','Four Strokes','Endurance','Advanced','Competition'];
const DAYS=['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];

/* classes today (Sat 1 Nov in the demo) */
const CLASSES=[
  {id:'c1',time:'10:00',end:'10:45',prog:'kids',level:3,venue:'jaz',coach:'shiko',swimmers:['s1','s2','s3','s4','s5']},
  {id:'c2',time:'11:00',end:'11:45',prog:'kids',level:1,venue:'jaz',coach:'shiko',swimmers:['s6','s7','s8','s9']},
  {id:'c3',time:'12:00',end:'12:45',prog:'toddler',level:1,venue:'jaz',coach:'shiko',swimmers:['s10','s11','s12']},
  {id:'c4',time:'17:00',end:'18:00',prog:'squad',level:7,venue:'saad',coach:'ezz',swimmers:['s13','s14','s15','s16','s17']},
  {id:'c5',time:'18:00',end:'18:45',prog:'advanced',level:6,venue:'jaz',coach:'ezz',swimmers:['s18','s19','s20']},
];

const state={
  role:'parent', tab:'home', view:null, viewArg:null,
  swimmers:{
    s1:{name:'Zayed Al Mansoori',age:7,parent:'Noor Al Mansoori',prog:'kids',level:3,pack:{size:8,used:3,bought:'4 Oct'},day:0,time:'10:00',venue:'jaz',coach:'shiko',paid:true,hat:true,notes:'Mild asthma, inhaler in bag',certs:['Water Confidence','Floating and Kicking'],ready:false,
      history:[{d:'25 Oct',s:'present'},{d:'18 Oct',s:'present'},{d:'11 Oct',s:'present'}]},
    s2:{name:'Mariam Hassan',age:8,parent:'Dina Hassan',prog:'kids',level:3,pack:{size:8,used:7,bought:'6 Sep'},day:0,time:'10:00',venue:'jaz',coach:'shiko',paid:true,hat:true,ready:true,history:[]},
    s3:{name:'Omar Khalil',age:6,parent:'Rami Khalil',prog:'kids',level:3,pack:{size:8,used:2,bought:'18 Oct'},day:0,time:'10:00',venue:'jaz',coach:'shiko',paid:false,hat:true,history:[]},
    s4:{name:'Layla Ahmed',age:7,parent:'Sara Ahmed',prog:'kids',level:3,pack:{size:8,used:5,bought:'27 Sep'},day:0,time:'10:00',venue:'jaz',coach:'shiko',paid:true,hat:true,history:[]},
    s5:{name:'Hamdan Saeed',age:9,parent:'Khalid Saeed',prog:'kids',level:3,pack:{size:8,used:8,bought:'30 Aug'},day:0,time:'10:00',venue:'jaz',coach:'shiko',paid:true,hat:true,history:[]},
    s6:{name:'Alia Rashid',age:4,parent:'Maha Rashid',prog:'kids',level:1,pack:{size:8,used:1,bought:'25 Oct'},day:0,time:'11:00',venue:'jaz',coach:'shiko',paid:true,hat:false,history:[]},
    s7:{name:'Yousef Nabil',age:5,parent:'Heba Nabil',prog:'kids',level:1,pack:{size:8,used:4,bought:'4 Oct'},day:0,time:'11:00',venue:'jaz',coach:'shiko',paid:true,hat:true,history:[]},
    s8:{name:'Fatima Al Ali',age:5,parent:'Reem Al Ali',prog:'kids',level:1,pack:{size:8,used:6,bought:'20 Sep'},day:0,time:'11:00',venue:'jaz',coach:'shiko',paid:true,hat:true,history:[]},
    s9:{name:'Adam Farid',age:4,parent:'Lina Farid',prog:'kids',level:1,pack:{size:8,used:3,bought:'11 Oct'},day:0,time:'11:00',venue:'jaz',coach:'shiko',paid:false,hat:true,history:[]},
    s10:{name:'Noah Perez',age:2,parent:'Ana Perez',prog:'toddler',level:1,pack:{size:8,used:2,bought:'18 Oct'},day:0,time:'12:00',venue:'jaz',coach:'shiko',paid:true,hat:false,history:[]},
    s11:{name:'Hind Al Shamsi',age:2,parent:'Amna Al Shamsi',prog:'toddler',level:1,pack:{size:8,used:5,bought:'27 Sep'},day:0,time:'12:00',venue:'jaz',coach:'shiko',paid:true,hat:false,history:[]},
    s12:{name:'Leo Martin',age:3,parent:'Claire Martin',prog:'toddler',level:1,pack:{size:8,used:7,bought:'13 Sep'},day:0,time:'12:00',venue:'jaz',coach:'shiko',paid:true,hat:false,history:[]},
    s13:{name:'Saif Al Hammadi',age:12,parent:'Mohammed Al Hammadi',prog:'squad',level:7,pack:{size:8,used:4,bought:'4 Oct'},day:0,time:'17:00',venue:'saad',coach:'ezz',paid:true,hat:true,history:[]},
    s14:{name:'Tala Younis',age:11,parent:'Rana Younis',prog:'squad',level:7,pack:{size:8,used:6,bought:'20 Sep'},day:0,time:'17:00',venue:'saad',coach:'ezz',paid:true,hat:true,history:[]},
    s15:{name:'Jassim Al Kaabi',age:13,parent:'Sultan Al Kaabi',prog:'squad',level:7,pack:{size:8,used:2,bought:'18 Oct'},day:0,time:'17:00',venue:'saad',coach:'ezz',paid:true,hat:true,history:[]},
    s16:{name:'Sophie Laurent',age:12,parent:'Marie Laurent',prog:'squad',level:7,pack:{size:8,used:8,bought:'30 Aug'},day:0,time:'17:00',venue:'saad',coach:'ezz',paid:false,hat:true,history:[]},
    s17:{name:'Rashed Al Dhaheri',age:14,parent:'Ahmed Al Dhaheri',prog:'squad',level:7,pack:{size:8,used:3,bought:'11 Oct'},day:0,time:'17:00',venue:'saad',coach:'ezz',paid:true,hat:true,history:[]},
    s18:{name:'Maya Ibrahim',age:10,parent:'Yasmin Ibrahim',prog:'advanced',level:6,pack:{size:8,used:5,bought:'27 Sep'},day:0,time:'18:00',venue:'jaz',coach:'ezz',paid:true,hat:true,history:[]},
    s19:{name:'Karim Hossam',age:11,parent:'Nadia Hossam',prog:'advanced',level:6,pack:{size:8,used:1,bought:'25 Oct'},day:0,time:'18:00',venue:'jaz',coach:'ezz',paid:true,hat:true,history:[]},
    s20:{name:'Dana Al Marzouqi',age:10,parent:'Hessa Al Marzouqi',prog:'advanced',level:6,pack:{size:8,used:7,bought:'13 Sep'},day:0,time:'18:00',venue:'jaz',coach:'ezz',paid:true,hat:true,history:[]},
  },
  attendance:{}, // classId -> {swimmerId: 'present'|'absent'|'late'}
  camps:[{id:'dec',name:'Winter Camp',venue:'saad',dates:'14 to 18 Dec',ages:'3 to 16',spots:40,booked:27,days:['Mon','Tue','Wed','Thu','Fri']}],
  campRegs:[{camp:'dec',s:'s2'},{camp:'dec',s:'s7'}],
  myCampReg:null,
  payments:[
    {id:'p1',s:'s3',what:'8-session package',amt:1200,status:'unpaid',d:'18 Oct'},
    {id:'p2',s:'s9',what:'8-session package',amt:1200,status:'unpaid',d:'11 Oct'},
    {id:'p3',s:'s16',what:'Squad 8-session package',amt:1600,status:'unpaid',d:'30 Aug'},
    {id:'p4',s:'s6',what:'8-session package',amt:1200,status:'paid',d:'25 Oct'},
    {id:'p5',s:'s19',what:'8-session package',amt:1200,status:'paid',d:'25 Oct'},
    {id:'p6',s:'s1',what:'8-session package',amt:1200,status:'paid',d:'4 Oct'},
    {id:'p7',s:'s15',what:'Squad 8-session package',amt:1600,status:'paid',d:'18 Oct'},
    {id:'p8',s:'s5',what:'8-session package',amt:1200,status:'paid',d:'30 Aug'},
    {id:'p9',s:'s2',what:'8-session package',amt:1200,status:'paid',d:'6 Sep'},
  ],
  book:{prog:'kids',day:0,time:'10:00',venue:'jaz'},
  campForm:{days:['Mon','Tue','Wed','Thu','Fri']},
  notifs:[
    {t:'Zayed has 5 sessions left on his package',when:'Today'},
    {t:'Winter Camp registration is open: 14 to 18 Dec at LFITM Saadiyat',when:'Yesterday'},
    {t:'Reminder: Kids Swimming, Sat 10:00 at Al Jazira Club',when:'Fri'},
  ],
  autoRem:true,
};
const IC={
  bell:'<svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/></svg>',
  med:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></svg>',
  award:'<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/></svg>',
  star:'<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
  home:'<svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  cal:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  camp:'<svg viewBox="0 0 24 24"><path d="M4 20 12 5l8 15M4 20h16M12 13l-3 7M12 13l3 7"/></svg>',
  user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  clip:'<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 12l2 2 4-4"/></svg>',
  week:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M9 9v12M15 9v12"/></svg>',
  swim:'<svg viewBox="0 0 24 24"><path d="M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><circle cx="16" cy="8" r="2.2"/><path d="M4 13l5-5 4 4"/></svg>',
  chart:'<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  card:'<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
  ticket:'<svg viewBox="0 0 24 24"><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-6z"/><path d="M13 5v14"/></svg>',
  chat:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z"/></svg>',
};
function emit(type){document.dispatchEvent(new CustomEvent('su:action',{detail:{type}}))}
const PARENT_PHOTO={s1:'img/parent-noor-sm.jpg',s5:'img/parent-khalid-sm.jpg',s12:'img/parent-claire-sm.jpg'};
const ME='s1';
const left=s=>s.pack.size-s.pack.used;
const prog=id=>PROGRAMS.find(p=>p.id===id);
const cls=id=>CLASSES.find(c=>c.id===id);
const ini=n=>n.split(' ').slice(0,2).map(x=>x[0]).join('');

/* ---------- helpers ---------- */
let toastT;
function toast(msg){const o=$('#overlay');let t=o.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';o.appendChild(t)}t.textContent=msg;clearTimeout(toastT);toastT=setTimeout(()=>t.remove(),2200)}
function sheet(html){const o=$('#overlay');o.innerHTML=`<div class="sheet-bg" data-close><div class="sheet"><div class="grab"></div>${html}</div></div>`}
function closeSheet(){const b=$('#overlay .sheet-bg');if(b)b.remove()}
function go(view,arg){state.view=view;state.viewArg=arg;render()}
function setTab(t){state.tab=t;state.view=null;render();$('#screen').scrollTop=0}
function setRole(r){state.role=r;state.view=null;state.tab={parent:'home',coach:'today',admin:'dash'}[r];render();$('#screen').scrollTop=0;
  document.querySelectorAll('[data-role]').forEach(b=>b.classList.toggle('on',b.dataset.role===r))}
function ring(s){const r=34,c=2*Math.PI*r,p=left(s)/s.pack.size;return `<div class="ring"><svg width="84" height="84"><circle class="bgc" cx="42" cy="42" r="${r}"/><circle class="fg" cx="42" cy="42" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p)}"/></svg><div class="num"><div><b>${left(s)}</b><small>of ${s.pack.size}</small></div></div></div>`}
function pathHtml(level){return `<div class="path">${LEVELS.map((l,i)=>`<i class="${i+1<level?'done':i+1===level?'now':''}"></i>`).join('')}</div>`}

/* ---------- PARENT ---------- */
const P={};
P.home=()=>{const s=state.swimmers[ME];const low=left(s)<=2;
  return `<div class="topbar"><div class="hello-row"><img class="avatar" src="img/parent-noor-sm.jpg" alt="" width="44" height="44"><div class="hello"><small>Good morning</small><b>Noor</b></div></div><button class="icon-btn" data-go="notifs">${IC.bell}<span class="n">${state.notifs.length}</span></button></div>
  <div class="hero photo"><img src="img/coach-deck.jpg" alt="" loading="lazy"><small>Next lesson</small><h3>Sat 1 Nov, 10:00</h3><p>Kids Swimming · Level 3 · ${VENUES.jaz.name}<br>${COACHES.shiko.name}</p>
    <div class="row"><button class="solid" data-act="checkin">Confirm attendance</button><button data-go="reschedule">Can't make it</button></div></div>
  <div class="card pack ${low?'low':''}" data-go="package">${ring(s)}<div class="info"><b>${s.name.split(' ')[0]}'s package</b><p>${left(s)} of ${s.pack.size} sessions left · bought ${s.pack.bought}</p>${low?'<span class="pill warn" style="margin-top:6px">Renew soon</span>':`<span class="pill" style="margin-top:6px">Every Saturday 10:00</span>`}</div><span class="chev">›</span></div>
  <div class="qa"><button data-go="book"><span class="ic">${IC.cal}</span>Book</button><button data-go="package"><span class="ic">${IC.ticket}</span>Renew</button><button data-go="camps"><span class="ic">${IC.camp}</span>Camps</button><button data-act="wa"><span class="ic">${IC.chat}</span>WhatsApp</button></div>
  <div class="sec-h"><b>Zayed's progress</b><button data-go="swimmer">See all</button></div>
  <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><div><b>Level 3 · Stroke Builder</b><div class="sub" style="margin:2px 0 0">2 certificates earned</div></div><span class="pill sky">On track</span></div>${pathHtml(s.level)}</div>
  <div class="sec-h"><b>Recent sessions</b><button data-go="package">History</button></div>
  <div class="card" style="padding:4px 16px">${s.history.slice(0,3).map(h=>`<div class="li"><div class="when"><b>${h.d.split(' ')[0]}</b><small>${h.d.split(' ')[1]}</small></div><div class="tx"><b>Kids Swimming</b><small>${COACHES.shiko.name} · Al Jazira Club</small></div><div class="r"><span class="pill ${h.s==='present'?'':h.s==='late'?'warn':'bad'}">${h.s==='present'?'Attended':h.s==='late'?'Late':'Missed'}</span></div></div>`).join('')}</div>`};

P.book=()=>{const b=state.book,p=prog(b.prog);const slots=p.venue==='saad'?['07:00','08:00','09:00','10:00','11:00','17:00']:['09:00','10:00','11:00','12:00','16:00','17:00'];
  return `<button class="back" data-back>‹ Back</button><h2 class="h1">Book a recurring lesson</h2><p class="sub">Pick a program and a weekly slot. The same slot is held for you every week.</p>
  <span class="lbl">Program</span><div class="chips">${PROGRAMS.map(x=>`<button class="chip ${b.prog===x.id?'on':''}" data-prog="${x.id}">${x.name}</button>`).join('')}</div>
  <div class="card" style="padding:12px 14px;display:flex;gap:10px;align-items:center"><span class="ico">${IC.pin}</span><div><b>${VENUES[p.venue].name}</b><div class="sub" style="margin:0">${p.desc}</div></div></div>
  <span class="lbl">Day</span><div class="days">${DAYS.map((d,i)=>`<button class="${b.day===i?'on':''}" data-day="${i}">${d}<small>${[1,2,3,4,5,6,7][i]} Nov</small></button>`).join('')}</div>
  <span class="lbl">Time</span><div class="slots">${slots.map((t,i)=>{const full=(i===3&&b.day===0&&p.id==='kids');return `<button class="slot ${b.time===t?'on':''} ${full?'full':''}" data-time="${t}" ${full?'disabled':''}>${t}<small>${full?'Full':i%2?'2 spots':'1 spot'}</small></button>`}).join('')}</div>
  <div class="sum"><div><span>Swimmer</span><b>Zayed, 7</b></div><div><span>Repeats</span><b>Every ${DAYS[b.day]} at ${b.time}</b></div><div><span>Coach</span><b>${COACHES[p.venue==='saad'?'ezz':'shiko'].name}</b></div><div><span>Uses</span><b>1 session per class</b></div></div>
  <button class="btn" data-act="confirmBook">Confirm weekly booking</button><p class="note">Missed classes can be made up within the same month, as per SpeedUp's policy.</p>`};

P.booked=()=>`<div class="success fade-in"><div class="ok"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1F7F6C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div><h2>You're booked</h2><p>Zayed swims every ${DAYS[state.book.day]} at ${state.book.time}<br>${VENUES[prog(state.book.prog).venue].name}. A reminder goes out the evening before.</p><button class="btn" data-tab="home">Back to home</button><button class="btn ghost" style="margin-top:8px" data-act="addCal">Add to calendar</button></div>`;

P.package=()=>{const s=state.swimmers[ME];
  return `<button class="back" data-back>‹ Back</button><h2 class="h1">Package and history</h2>
  <div class="card pack ${left(s)<=2?'low':''}">${ring(s)}<div class="info"><b>8-session package</b><p>Bought ${s.pack.bought} · ${s.pack.used} used · ${left(s)} left<br>Valid 30 days, pausable for longer breaks</p></div></div>
  <div class="row2" style="margin-top:10px"><button class="btn" data-act="renew">Renew 8 sessions</button><button class="btn ghost" data-act="pause">Pause package</button></div>
  <div class="sec-h"><b>Session history</b><span class="pill grey">${s.history.length} logged</span></div>
  <div class="card" style="padding:4px 16px">${s.history.map(h=>`<div class="li"><div class="when"><b>${h.d.split(' ')[0]}</b><small>${h.d.split(' ')[1]}</small></div><div class="tx"><b>Kids Swimming · L3</b><small>Marked by ${COACHES.shiko.name}</small></div><div class="r"><span class="pill ${h.s==='present'?'':h.s==='late'?'warn':'bad'}">${h.s==='present'?'Attended':h.s==='late'?'Late':'Missed'}</span></div></div>`).join('')}</div>
  <p class="note">Each class the coach marks as attended uses one session. Missed classes don't, and can be made up within the month.</p>`};

P.camps=()=>{const c=state.camps[0];const reg=state.myCampReg;
  return `<button class="back" data-back>‹ Back</button><h2 class="h1">Holiday camps</h2><p class="sub">Swimming and football every day, plus basketball, padel and martial arts.</p>
  <div class="hero photo"><img src="img/squad-saadiyat.jpg" alt="" loading="lazy"><small>Registration open</small><h3>${c.name} · ${c.dates}</h3><p>${VENUES[c.venue].name} · Ages ${c.ages} · ${c.spots-c.booked} spots left</p>
    <div class="row">${reg?'<span class="pill" style="background:#fff">Zayed is registered</span>':'<button class="solid" data-go="campReg">Register Zayed</button>'}</div></div>
  <div class="card"><b>What's included</b><div class="sub" style="margin:6px 0 0;line-height:1.6">Daily 9:00 to 14:00 · Swim session every morning with a SpeedUp coach · Lunch not included · Bring swimwear, goggles, towel and pool shoes</div></div>
  ${reg?`<div class="card" style="margin-top:10px"><b>Your registration</b><div class="sub" style="margin:6px 0 0">${reg.days.length} days · ${reg.days.join(', ')}<br>Pickup contact: Noor · Emergency: +971 50 000 0000</div></div>`:''}`};

P.campReg=()=>{const f=state.campForm;const c=state.camps[0];
  return `<button class="back" data-back>‹ Back</button><h2 class="h1">Register for ${c.name}</h2>
  <span class="lbl">Days</span><div class="days">${c.days.map(d=>`<button class="${f.days.includes(d)?'on':''}" data-cday="${d}">${d}<small>${{Mon:14,Tue:15,Wed:16,Thu:17,Fri:18}[d]} Dec</small></button>`).join('')}</div>
  <span class="lbl">Swimmer</span><div class="card" style="padding:12px 14px;display:flex;gap:10px;align-items:center"><div class="av" style="width:40px;height:40px;border-radius:12px;background:var(--teal-soft);color:var(--teal-d);display:grid;place-items:center;font-weight:800">ZA</div><div><b>Zayed Al Mansoori, 7</b><div class="sub" style="margin:0">Swim level 3 · Asthma noted in records</div></div></div>
  <span class="lbl">Pickup person</span><input class="field" value="Noor Al Mansoori (mother)">
  <span class="lbl">Emergency contact</span><input class="field" value="+971 50 000 0000">
  <div class="sum" style="margin-top:14px"><div><span>Days selected</span><b>${f.days.length} of 5</b></div><div><span>Venue</span><b>LFITM Saadiyat</b></div><div><span>Total</span><b>AED ${(f.days.length*190).toLocaleString()}</b></div></div>
  <button class="btn" data-act="confirmCamp" ${f.days.length?'':'disabled'}>Continue to payment</button>`};

P.swimmer=()=>{const s=state.swimmers[ME];
  return `<button class="back" data-back>‹ Back</button><h2 class="h1">Zayed's record</h2>
  <div class="card"><div style="display:flex;gap:12px;align-items:center"><div style="width:56px;height:56px;border-radius:18px;background:var(--teal-soft);color:var(--teal-d);display:grid;place-items:center;font-weight:800;font-size:18px">ZA</div><div><b style="font-size:17px">Zayed Al Mansoori</b><div class="sub" style="margin:2px 0 0">7 years · Kids Swimming · Al Jazira Club</div></div></div>
  <div class="sum" style="margin:14px 0 0"><div><span>Current level</span><b>3 · Stroke Builder</b></div><div><span>Started</span><b>Aug 2026</b></div><div><span>Swim hat</span><b>Issued ✓</b></div><div><span>Medical note</span><b>${s.notes}</b></div><div><span>Lessons attended</span><b>11</b></div></div></div>
  <div class="sec-h"><b>Pathway</b><span class="pill sky">Level 3 of 7</span></div>
  <div class="levels">${LEVELS.map((l,i)=>`<div class="lv ${i+1<s.level?'done':i+1===s.level?'now':''}"><div class="k">${i+1<s.level?'✓':i+1}</div><div><b>${l}</b><small>${i+1<s.level?'Certificate earned':i+1===s.level?'In progress · coach says: strong kick, working on breathing':'Next'}</small></div></div>`).join('')}</div>
  <div class="sec-h"><b>Certificates</b></div>${s.certs.map(c=>`<div class="cert"><span class="ic">${IC.award}</span><div><b>${c}</b><small>Awarded by ${COACHES.shiko.name}</small></div></div>`).join('')}`};

P.notifs=()=>`<button class="back" data-back>‹ Back</button><h2 class="h1">Notifications</h2><div class="card" style="padding:4px 16px">${state.notifs.map(n=>`<div class="li"><div class="av ic">${IC.bell}</div><div class="tx"><b style="font-size:14px;font-weight:600">${esc(n.t)}</b><small>${n.when}</small></div></div>`).join('')}</div>
  <div class="card" style="margin-top:10px;display:flex;align-items:center;gap:12px"><div style="flex:1"><b>Lesson reminders</b><div class="sub" style="margin:2px 0 0">WhatsApp the evening before</div></div><button class="tog ${state.autoRem?'on':''}" data-act="togRem"></button></div>`;

P.reschedule=()=>`<button class="back" data-back>‹ Back</button><h2 class="h1">Can't make Saturday?</h2><p class="sub">Choose a make-up slot this month. Your package isn't charged for the missed class.</p>
  <div class="card" style="padding:4px 16px">${[['Sun 2 Nov','11:00','Coach Shiko','2 spots'],['Tue 4 Nov','16:00','Coach Shiko','1 spot'],['Thu 6 Nov','17:00','Coach Ezz','3 spots']].map(x=>`<div class="li" data-act="makeup"><div class="when"><b>${x[0].split(' ')[1]}</b><small>${x[0].split(' ')[0]}</small></div><div class="tx"><b>${x[1]} · Level 3</b><small>${x[2]} · Al Jazira Club · ${x[3]}</small></div><span class="chev">›</span></div>`).join('')}</div>`;

P.profile=()=>`<h2 class="h1" style="margin-top:6px">Account</h2>
  <div class="card" style="display:flex;gap:12px;align-items:center"><img class="avatar lg" src="img/parent-noor.jpg" alt="" width="56" height="56"><div><b>Noor Al Mansoori</b><div class="sub" style="margin:2px 0 0">+971 50 000 0000 · noor@example.com</div></div></div>
  <div class="sec-h"><b>Swimmers</b><button data-act="addSwimmer">+ Add</button></div>
  <div class="card" style="padding:4px 16px"><div class="li" data-go="swimmer"><div class="av">ZA</div><div class="tx"><b>Zayed, 7</b><small>Kids Swimming · Level 3 · ${left(state.swimmers.s1)} sessions left</small></div><span class="chev">›</span></div></div>
  <div class="sec-h"><b>Settings</b></div>
  <div class="card" style="padding:4px 16px"><div class="li"><div class="tx"><b>Language</b><small>English</small></div><span class="pill grey">العربية</span></div><div class="li" data-act="methods"><div class="tx"><b>Payment methods</b><small>Apple Pay · Visa ···· 4421</small></div><span class="chev">›</span></div><div class="li"><div class="tx"><b>Policies</b><small>Refunds, make-ups, pausing</small></div><span class="chev">›</span></div></div>
  <p class="note">This is a working prototype by Hashmi Digital for SpeedUp Sports Academy. Everything you tap here would be real in the live app.</p>`;

/* ---------- COACH ---------- */
const C={};
const attOf=(cid,sid)=>(state.attendance[cid]||{})[sid];
C.today=()=>{const mine=CLASSES.filter(c=>c.coach==='shiko');
  return `<div class="topbar"><div class="hello"><small>Saturday 1 Nov</small><b>${COACHES.shiko.name}</b></div><button class="icon-btn">SM</button></div>
  <div class="kpis"><div class="kpi"><small>Classes today</small><b>${mine.length}</b></div><div class="kpi"><small>Swimmers</small><b>${mine.reduce((a,c)=>a+c.swimmers.length,0)}</b></div></div>
  <div class="sec-h"><b>Today at Al Jazira Club</b><span class="pill grey">09:00 to 19:00</span></div>
  <div class="card" style="padding:4px 16px">${mine.map(c=>{const done=Object.keys(state.attendance[c.id]||{}).length;const p=prog(c.prog);const lowN=c.swimmers.filter(id=>left(state.swimmers[id])<=1).length;
    return `<div class="li" data-go="class" data-arg="${c.id}"><div class="when"><b>${c.time}</b><small>${c.end}</small></div><div class="tx"><b>${p.name} · L${c.level}</b><small>${c.swimmers.length} swimmers${lowN?` · ${lowN} low balance`:''}</small></div><div class="r">${done===c.swimmers.length?'<span class="pill">Done ✓</span>':done?`<span class="pill warn">${done}/${c.swimmers.length}</span>`:'<span class="pill sky">Mark</span>'}</div></div>`}).join('')}</div>
  <div class="sec-h"><b>Needs your attention</b></div>
  <div class="alert"><span class="ico">${IC.star}</span><div><b>Mariam Hassan is ready for Level 4</b>You flagged her last week. Promote her so the office can move her slot.</div><button data-act="promote" data-arg="s2">Promote</button></div>
  <div class="alert bad"><span class="ico">${IC.ticket}</span><div><b>Hamdan Saeed has 0 sessions left</b>Parent gets a renew reminder automatically. He can still attend today.</div></div>`};

C.class=()=>{const c=cls(state.viewArg);const p=prog(c.prog);const att=state.attendance[c.id]||{};const done=Object.keys(att).length;
  return `<button class="back" data-back>‹ Today</button><h2 class="h1">${p.name} · Level ${c.level}</h2><p class="sub">${c.time} to ${c.end} · ${VENUES[c.venue].name} · ${c.swimmers.length} swimmers</p>
  <div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><b>Attendance</b><span class="pill ${done===c.swimmers.length?'':'grey'}">${done} of ${c.swimmers.length} marked</span></div>
  ${c.swimmers.map(id=>{const s=state.swimmers[id];const a=att[id];const l=left(s);return `<div class="att ${l<=1?'low':''}" id="att-${id}"><div class="av" style="width:40px;height:40px;border-radius:12px;background:var(--teal-soft);color:var(--teal-d);display:grid;place-items:center;font-weight:800;font-size:13px;flex:none">${ini(s.name)}</div><div class="tx"><b>${s.name}</b><small>${l===0?'0 sessions left · renew needed':l===1?'Last session on package':`${l} of ${s.pack.size} sessions left`}${s.hat?'':' · no hat yet'}</small></div>
    <div class="seg"><button class="${a==='present'?'p':''}" data-att="present" data-s="${id}" data-c="${c.id}">✓</button><button class="${a==='late'?'l':''}" data-att="late" data-s="${id}" data-c="${c.id}">L</button><button class="${a==='absent'?'a':''}" data-att="absent" data-s="${id}" data-c="${c.id}">✕</button></div></div>`}).join('')}</div>
  <div class="row2" style="margin-top:10px"><button class="btn" data-act="allPresent" data-arg="${c.id}">Mark all present</button><button class="btn ghost" data-act="classNote">Add class note</button></div>
  <p class="note">Marking present uses one session from the swimmer's package. The parent sees the new balance straight away.</p>`};

C.schedule=()=>{const rows=[['10:00','c1',null],['11:00','c2',null],['12:00','c3',null],['16:00',null,null],['17:00',null,'c4'],['18:00','c5',null]];
  return `<h2 class="h1" style="margin-top:6px">My week</h2><p class="sub">Set by the office. Tap a free slot to offer availability.</p>
  <div class="days" style="margin-top:0">${DAYS.map((d,i)=>`<button class="${i===0?'on':''}">${d}<small>${i+1} Nov</small></button>`).join('')}</div>
  <div class="ghead"><div></div><div>Al Jazira</div><div>Saadiyat</div></div>
  <div class="grid">${rows.map(r=>`<div class="t">${r[0]}</div>${[r[1],r[2]].map((cid,i)=>{if(!cid)return `<div class="c open" data-act="avail">+</div>`;const c=cls(cid);const mine=c.coach==='shiko';return `<div class="c has ${i?'sq':''}"><b>${prog(c.prog).name.replace('The SpeedUp ','')}</b><small>L${c.level} · ${c.swimmers.length} sw · ${mine?'you':COACHES[c.coach].name}</small></div>`}).join('')}`).join('')}</div>`};

C.swimmers=()=>{const mine=Object.entries(state.swimmers).filter(([id,s])=>s.coach==='shiko');
  return `<h2 class="h1" style="margin-top:6px">My swimmers</h2><div class="search">${IC.search}<input placeholder="Search swimmer" data-search="coach"></div>
  <div class="card" style="padding:4px 16px" id="coachList">${mine.map(([id,s])=>`<div class="li" data-go="cswimmer" data-arg="${id}"><div class="av">${ini(s.name)}</div><div class="tx"><b>${s.name}</b><small>${prog(s.prog).name} · Level ${s.level} · ${left(s)} left</small></div>${s.ready?'<span class="pill warn">Ready ↑</span>':''}<span class="chev">›</span></div>`).join('')}</div>`};

C.cswimmer=()=>{const id=state.viewArg,s=state.swimmers[id];
  return `<button class="back" data-back>‹ Swimmers</button><h2 class="h1">${s.name}</h2><p class="sub">${s.age} years · ${prog(s.prog).name} · ${DAYS[s.day]} ${s.time} · Parent: ${s.parent}</p>
  <div class="card pack ${left(s)<=2?'low':''}">${ring(s)}<div class="info"><b>Package</b><p>${left(s)} of ${s.pack.size} left · bought ${s.pack.bought}</p></div></div>
  <div class="sec-h"><b>Level ${s.level} · ${LEVELS[s.level-1]}</b>${s.ready?'<span class="pill warn">Ready to move up</span>':''}</div>
  <div class="card">${pathHtml(s.level)}<div class="row2" style="margin-top:14px"><button class="btn sm deep" data-act="promote" data-arg="${id}" style="width:100%">Promote to Level ${s.level+1}</button><button class="btn sm ghost" data-act="skillNote" style="width:100%">Add skill note</button></div></div>
  ${s.notes?`<div class="alert" style="margin-top:10px"><span class="ico">${IC.med}</span><div><b>Medical note</b>${s.notes}</div></div>`:''}
  <div class="sec-h"><b>Skills checklist</b></div><div class="card" style="padding:4px 16px">${['Front crawl 25m','Back crawl 25m','Breathing every 3','Streamline push-off','Treading water 1 min'].map((k,i)=>`<div class="li"><div class="tx"><b style="font-weight:600;font-size:14px">${k}</b></div><span class="pill ${i<3?'':'grey'}">${i<3?'Done':'Working'}</span></div>`).join('')}</div>`};

/* ---------- ADMIN ---------- */
const A={};
A.dash=()=>{const all=Object.values(state.swimmers);const low=all.filter(s=>left(s)<=1).length;const unpaid=state.payments.filter(p=>p.status==='unpaid');const today=CLASSES.length;const marked=Object.values(state.attendance).reduce((a,o)=>a+Object.values(o).filter(v=>v==='present').length,0);
  return `<div class="topbar"><div class="hello"><small>SpeedUp Sports Academy</small><b>Office</b></div><button class="icon-btn">AS</button></div>
  <div class="kpis"><div class="kpi"><small>Active swimmers</small><b>${all.length}</b><i>+3 this month</i></div><div class="kpi"><small>Classes today</small><b>${today}</b><i>${marked} attended so far</i></div><div class="kpi"><small>Packages ending</small><b>${low}</b><i class="down">need renewal</i></div><div class="kpi"><small>Unpaid</small><b>AED ${unpaid.reduce((a,p)=>a+p.amt,0).toLocaleString()}</b><i class="down">${unpaid.length} invoices</i></div></div>
  <div class="alert"><span class="ico">${IC.ticket}</span><div><b>${low} swimmers have 1 or 0 sessions left</b>Renewal reminders were sent on WhatsApp automatically.</div><button data-tab="swimmers">View</button></div>
  <div class="alert bad"><span class="ico">${IC.card}</span><div><b>${unpaid.length} packages unpaid</b>Oldest is ${unpaid[unpaid.length-1].d}. Tap to send a payment link.</div><button data-tab="payments">Chase</button></div>
  <div class="sec-h"><b>Attendance this week</b><span class="pill">91%</span></div>
  <div class="card" style="padding:16px 16px 28px"><div class="bars">${[82,95,88,90,96,93,94].map((v,i)=>`<i class="${i===0?'hi':''}" style="height:${v}%"><span>${DAYS[i]}</span></i>`).join('')}</div></div>
  <div class="sec-h"><b>Today's classes</b><button data-tab="schedule">Schedule</button></div>
  <div class="card" style="padding:4px 16px">${CLASSES.map(c=>{const done=Object.keys(state.attendance[c.id]||{}).length;return `<div class="li"><div class="when ${c.venue==='saad'?'sky':''}"><b>${c.time}</b><small>${VENUES[c.venue].short}</small></div><div class="tx"><b>${prog(c.prog).name} · L${c.level}</b><small>${COACHES[c.coach].name} · ${c.swimmers.length} swimmers</small></div><div class="r">${done===c.swimmers.length?'<span class="pill">Marked ✓</span>':done?`<span class="pill warn">${done}/${c.swimmers.length}</span>`:'<span class="pill grey">Upcoming</span>'}</div></div>`}).join('')}</div>`};

A.swimmers=()=>{const list=Object.entries(state.swimmers).sort((a,b)=>left(a[1])-left(b[1]));
  return `<h2 class="h1" style="margin-top:6px">Swimmers</h2><div class="search">${IC.search}<input placeholder="Search name or parent" data-search="admin"></div>
  <div class="chips" style="margin-top:0"><button class="chip on">All ${list.length}</button><button class="chip">Low balance</button><button class="chip">Unpaid</button><button class="chip">Squad</button></div>
  <div class="card" style="padding:4px 16px" id="adminList">${list.map(([id,s])=>{const l=left(s);return `<div class="li" data-go="aswimmer" data-arg="${id}" data-name="${esc(s.name+' '+s.parent).toLowerCase()}">${PARENT_PHOTO[id]?`<img class="av photo" src="${PARENT_PHOTO[id]}" alt="" width="42" height="42">`:`<div class="av ${s.prog==='squad'?'sky':''}">${ini(s.name)}</div>`}<div class="tx"><b>${s.name}</b><small>${prog(s.prog).name} · ${DAYS[s.day]} ${s.time} · ${COACHES[s.coach].name}</small></div><div class="r"><span class="pill ${l===0?'bad':l<=2?'warn':''}">${l} left</span>${s.paid?'':'<small style="display:block;color:var(--bad);font-weight:700;margin-top:3px">Unpaid</small>'}</div></div>`}).join('')}</div>`};

A.aswimmer=()=>{const id=state.viewArg,s=state.swimmers[id];const pays=state.payments.filter(p=>p.s===id);
  return `<button class="back" data-back>‹ Swimmers</button><h2 class="h1">${s.name}</h2><div class="parentrow">${PARENT_PHOTO[id]?`<img class="avatar" src="${PARENT_PHOTO[id]}" alt="" width="36" height="36">`:`<span class="avatar ini">${ini(s.parent)}</span>`}<div><b>${s.parent}</b><small>Parent · ${s.age} years old swimmer · +971 5x xxx xxxx</small></div></div>
  <div class="card pack ${left(s)<=2?'low':''}">${ring(s)}<div class="info"><b>${s.pack.size}-session package</b><p>Bought ${s.pack.bought} · ${s.pack.used} used</p><span class="pill ${s.paid?'':'bad'}" style="margin-top:6px">${s.paid?'Paid':'Unpaid'}</span></div></div>
  <div class="row2" style="margin-top:10px"><button class="btn sm" style="width:100%" data-act="adminRenew" data-arg="${id}">Add 8 sessions</button><button class="btn sm ghost" style="width:100%" data-act="waParent">WhatsApp parent</button></div>
  <div class="sum" style="margin-top:14px"><div><span>Program</span><b>${prog(s.prog).name}</b></div><div><span>Slot</span><b>Every ${DAYS[s.day]} ${s.time} · ${VENUES[s.venue].short}</b></div><div><span>Coach</span><b>${COACHES[s.coach].name}</b></div><div><span>Level</span><b>${s.level} · ${LEVELS[s.level-1]}</b></div><div><span>Swim hat</span><b>${s.hat?'Issued':'Not yet'}</b></div>${s.notes?`<div><span>Medical</span><b>${s.notes}</b></div>`:''}</div>
  <div class="sec-h"><b>Payments</b></div><div class="card" style="padding:4px 16px">${pays.length?pays.map(p=>`<div class="li"><div class="tx"><b>${p.what}</b><small>${p.d}</small></div><div class="r"><b>AED ${p.amt.toLocaleString()}</b><span class="pill ${p.status==='paid'?'':'bad'}">${p.status}</span></div></div>`).join(''):'<div class="li"><div class="tx"><small>No payments recorded in the sample</small></div></div>'}</div>`};

A.schedule=()=>{const rows=[['10:00','c1',null],['11:00','c2',null],['12:00','c3',null],['16:00',null,null],['17:00',null,'c4'],['18:00','c5',null]];
  return `<h2 class="h1" style="margin-top:6px">Coach schedule</h2><p class="sub">Saturday 1 Nov. Tap a slot to assign a coach or open a class.</p>
  <div class="chips" style="margin-top:0"><button class="chip on">Sat</button><button class="chip">Sun</button><button class="chip">Mon</button><button class="chip">Tue</button><button class="chip">Wed</button></div>
  <div class="ghead"><div></div><div>Al Jazira Club</div><div>LFITM Saadiyat</div></div>
  <div class="grid">${rows.map(r=>`<div class="t">${r[0]}</div>${[r[1],r[2]].map((cid,i)=>{if(!cid)return `<div class="c open" data-act="assign" data-arg="${r[0]}|${i?'saad':'jaz'}">+</div>`;const c=cls(cid);return `<div class="c has ${i?'sq':''}" data-act="assign" data-arg="${r[0]}|${c.venue}"><b>${prog(c.prog).name.replace('The SpeedUp ','')}</b><small>${COACHES[c.coach].name} · ${c.swimmers.length}/5</small></div>`}).join('')}`).join('')}</div>
  <div class="sec-h"><b>Coaches</b></div><div class="card" style="padding:4px 16px">${Object.values(COACHES).map(c=>`<div class="li"><div class="av deep">${c.ini}</div><div class="tx"><b>${c.name}</b><small>${c.full} · ${c.role}</small></div><div class="r"><b>${CLASSES.filter(x=>COACHES[x.coach]===c).length} today</b><small>${c===COACHES.shiko?'Al Jazira':'Both venues'}</small></div></div>`).join('')}</div>`};

A.payments=()=>{const un=state.payments.filter(p=>p.status==='unpaid'),pd=state.payments.filter(p=>p.status==='paid');
  return `<h2 class="h1" style="margin-top:6px">Payments</h2>
  <div class="kpis"><div class="kpi"><small>Collected this month</small><b>AED ${(state.collected||18400).toLocaleString()}</b><i>${state.payments.filter(p=>p.online).length} paid online</i></div><div class="kpi"><small>Outstanding</small><b>AED ${un.reduce((a,p)=>a+p.amt,0).toLocaleString()}</b><i class="down">${un.length} unpaid</i></div></div>
  <div class="sec-h"><b>Unpaid</b><button data-act="chaseAll">Send all links</button></div>
  <div class="card" style="padding:4px 16px">${un.length?un.map(p=>`<div class="li"><div class="av" style="background:var(--bad-soft);color:var(--bad)">${ini(state.swimmers[p.s].name)}</div><div class="tx"><b>${state.swimmers[p.s].name}</b><small>${p.what} · since ${p.d}</small></div><div class="r"><b>AED ${p.amt.toLocaleString()}</b><button class="pill" data-act="markPaid" data-arg="${p.id}" style="border:0;cursor:pointer;margin-top:3px">Mark paid</button></div></div>`).join(''):'<div class="li"><div class="tx"><b>All clear</b><small>No unpaid packages</small></div></div>'}</div>
  <div class="sec-h"><b>Recent</b></div><div class="card" style="padding:4px 16px">${pd.map(p=>`<div class="li"><div class="av">${ini(state.swimmers[p.s].name)}</div><div class="tx"><b>${state.swimmers[p.s].name}</b><small>${p.what} · ${p.d}</small></div><div class="r"><b>AED ${p.amt.toLocaleString()}</b><small>${p.online?'Paid online':p.status}</small></div></div>`).join('')}</div>
  <p class="note">Sample amounts. In the live system parents pay online and this updates itself; cash and bank transfers can be logged by the office.</p>`};

A.camps=()=>{const c=state.camps[0];const regs=state.campRegs.filter(r=>r.camp===c.id);
  return `<h2 class="h1" style="margin-top:6px">Camps</h2>
  <div class="hero photo"><img src="img/squad-saadiyat.jpg" alt="" loading="lazy"><small>Open</small><h3>${c.name} · ${c.dates}</h3><p>${VENUES[c.venue].name} · Ages ${c.ages}</p><div class="prog" style="background:rgba(255,255,255,.2)"><i style="width:${Math.round(c.booked/c.spots*100)}%;background:#7FE0C6"></i></div><p style="margin-top:8px">${c.booked} of ${c.spots} spots filled</p></div>
  <div class="sec-h"><b>Registrations</b><button data-act="exportCamp">Export list</button></div>
  <div class="card" style="padding:4px 16px">${regs.map(r=>{const s=state.swimmers[r.s];return `<div class="li"><div class="av sky">${ini(s.name)}</div><div class="tx"><b>${s.name}, ${s.age}</b><small>${r.days?r.days.length+' days':'5 days'} · Parent ${s.parent}${s.notes?' · medical note':''}</small></div><span class="pill">Paid</span></div>`}).join('')}<div class="li"><div class="tx"><small>+ ${c.booked-regs.length} more in the sample</small></div></div></div>
  <button class="btn ghost" style="margin-top:12px" data-act="newCamp">+ Create a camp</button>`};

/* ---------- tabs ---------- */
const TABS={
  parent:[['home',IC.home,'Home'],['book',IC.cal,'Book'],['camps',IC.camp,'Camps'],['profile',IC.user,'Account']],
  coach:[['today',IC.clip,'Today'],['schedule',IC.week,'Week'],['swimmers',IC.swim,'Swimmers']],
  admin:[['dash',IC.chart,'Overview'],['swimmers',IC.swim,'Swimmers'],['schedule',IC.week,'Schedule'],['payments',IC.card,'Payments'],['camps',IC.camp,'Camps']],
};
const SCREENS={parent:P,coach:C,admin:A};

function render(){
  const S=SCREENS[state.role];const fn=state.view?S[state.view]:S[state.tab];
  $('#screen').innerHTML=`<div class="fade-in">${fn()}</div>`;
  $('#tabbar').innerHTML=TABS[state.role].map(([k,ic,l])=>`<button class="tab ${state.tab===k&&!state.view?'on':''}" data-tab="${k}"><span class="ic">${ic}</span>${l}</button>`).join('');
}

/* ---------- actions ---------- */
function markAtt(cid,sid,v){const a=state.attendance[cid]=state.attendance[cid]||{};const prev=a[sid];const s=state.swimmers[sid];
  if(prev==='present'||prev==='late')s.pack.used=Math.max(0,s.pack.used-1);
  if(v==='present'||v==='late')s.pack.used=Math.min(s.pack.size,s.pack.used+1);
  a[sid]=v;
  if(sid===ME){s.history=s.history.filter(h=>h.d!=='1 Nov');if(v)s.history.unshift({d:'1 Nov',s:v});}
}
const actions={
  checkin(){toast('Attendance confirmed for Saturday')},
  wa(){window.open('https://wa.me/971555887946','_blank')},
  confirmBook(){const s=state.swimmers[ME];s.day=state.book.day;s.time=state.book.time;go('booked');emit('book')},
  addCal(){toast('Added to calendar')},
  renew(){openPay({kind:'pack',title:'Renew 8 sessions',sub:'Kids Swimming · Zayed · valid 30 days',amt:1200,lines:[['8-session package','AED 1,200'],['Valid from','1 Nov, 30 days']]})},
  pause(){toast('Package paused. Resume anytime')},
  methods(){sheet(`<h2 class="h1">Payment methods</h2><p class="sub">Used for packages, camps and private lessons.</p><div class="card" style="padding:4px 16px"><div class="li"><div class="av" style="background:#111;color:#fff;font-size:12px">Pay</div><div class="tx"><b>Apple Pay</b><small>Default on this phone</small></div><span class="pill">Default</span></div><div class="li"><div class="av sky">VISA</div><div class="tx"><b>Visa ···· 4421</b><small>Expires 09/28</small></div></div><div class="li"><div class="av" style="background:var(--teal-soft)">+</div><div class="tx"><b>Add a card</b><small>Visa, Mastercard, Mada</small></div></div></div><button class="btn ghost" style="margin-top:14px" data-close-btn>Done</button>`)},
  confirmCamp(){openPay({kind:'camp',title:'Winter Camp',sub:`${state.campForm.days.length} days · LFITM Saadiyat · Zayed`,amt:state.campForm.days.length*190,lines:[[`${state.campForm.days.length} days × AED 190`,'AED '+(state.campForm.days.length*190).toLocaleString()],['Includes','Swim session daily, all activities']]})},
  confirmCampDone(){emit('camp');state.myCampReg={days:state.campForm.days.slice()};state.campRegs.push({camp:'dec',s:ME,days:state.campForm.days.slice()});state.camps[0].booked++;toast('Zayed is registered for Winter Camp');go('camps')},
  makeup(){toast('Make-up booked: Sun 2 Nov, 11:00');go('home')},
  togRem(){state.autoRem=!state.autoRem;render()},
  addSwimmer(){toast('Add another child (demo)')},
  allPresent(cid){cls(cid).swimmers.forEach(id=>markAtt(cid,id,'present'));toast('All marked present');emit('present');render()},
  classNote(){toast('Class note saved')},
  promote(id){emit('promote');const s=state.swimmers[id];if(s.level<7){s.level++;s.ready=false;s.certs=s.certs||[];s.certs.push(LEVELS[s.level-2]);}toast(`${s.name.split(' ')[0]} promoted to Level ${s.level}. Parent notified`);render()},
  skillNote(){toast('Skill note saved')},
  avail(){toast('Availability sent to the office')},
  assign(arg){const [t,v]=arg.split('|');sheet(`<h2 class="h1">${t} · ${VENUES[v].name}</h2><p class="sub">Assign a coach to this slot</p><div class="card" style="padding:4px 16px">${Object.entries(COACHES).map(([k,c])=>`<div class="li" data-act="doAssign" data-arg="${c.name}"><div class="av deep">${c.ini}</div><div class="tx"><b>${c.name}</b><small>${c.role} · free at ${t}</small></div><span class="chev">›</span></div>`).join('')}</div>`)},
  doAssign(name){closeSheet();toast(`${name} assigned. Parents in that class notified`)},
  adminRenew(id){const s=state.swimmers[id];s.pack={size:8,used:0,bought:'1 Nov'};s.paid=false;state.payments.unshift({id:'p'+Date.now(),s:id,what:'8-session package',amt:s.prog==='squad'?1600:1200,status:'unpaid',d:'1 Nov'});toast('8 sessions added, payment link sent to parent');render()},
  waParent(){toast('Opens WhatsApp with the parent (demo)')},
  markPaid(pid){emit('paid');const p=state.payments.find(x=>x.id===pid);p.status='paid';state.swimmers[p.s].paid=true;toast('Marked as paid');render()},
  chaseAll(){toast('Payment links sent to 3 parents on WhatsApp')},
  exportCamp(){toast('Camp list exported to Excel')},
  newCamp(){toast('Create camp (demo)')},
};


/* ---------- payments ---------- */
let payCtx=null;
function openPay(ctx){payCtx=ctx;state.payMethod=state.payMethod||'card';renderPay()}
function renderPay(){const c=payCtx;if(!c)return;const m=state.payMethod;
  sheet(`<div class="pay"><h2 class="h1">${esc(c.title)}</h2><p class="sub">${esc(c.sub)}</p>
  <div class="sum">${c.lines.map(l=>`<div><span>${esc(l[0])}</span><b>${esc(l[1])}</b></div>`).join('')}<div><span>Total</span><b class="tot">AED ${c.amt.toLocaleString()}</b></div></div>
  <span class="lbl">Pay with</span>
  <div class="paym">
    <button class="pm ${m==='apple'?'on':''}" data-pm="apple"><span class="apay">Pay</span><small>Apple Pay</small></button>
    <button class="pm ${m==='card'?'on':''}" data-pm="card"><span class="cardico"><i></i><i></i></span><small>Visa ···· 4421</small></button>
    <button class="pm ${m==='new'?'on':''}" data-pm="new"><span class="plus">+</span><small>New card</small></button>
  </div>
  ${m==='new'?`<input class="field" placeholder="Card number" style="margin-top:10px" inputmode="numeric"><div class="row2" style="margin-top:8px"><input class="field" placeholder="MM / YY"><input class="field" placeholder="CVC"></div>`:''}
  <button class="btn ${m==='apple'?'apple':''}" data-act="payNow" style="margin-top:16px">${m==='apple'?'<span class="apay light">Pay</span> with Apple Pay':'Pay AED '+c.amt.toLocaleString()}</button>
  <p class="note" style="text-align:center;margin-top:10px">Secured by SpeedUp Pay · receipt sent to WhatsApp and email</p></div>`)}
function payDone(){const c=payCtx;if(!c)return;closeSheet();
  const o=$('#overlay');o.insertAdjacentHTML('beforeend',`<div class="payok"><div class="ok"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#157F6C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div><b>Paid AED ${c.amt.toLocaleString()}</b><small>Receipt on its way</small></div>`);
  setTimeout(()=>{const p=o.querySelector('.payok');if(p)p.remove()},1500);
  state.payments.unshift({id:'p'+Date.now(),s:ME,what:c.kind==='pack'?'8-session package':'Winter Camp, '+state.campForm.days.length+' days',amt:c.amt,status:'paid',d:'1 Nov',online:true});
  state.collected=(state.collected||18400)+c.amt;
  if(c.kind==='pack'){const s=state.swimmers[ME];s.pack={size:8,used:0,bought:'1 Nov'};s.paid=true;state.notifs.unshift({t:'Payment received: AED 1,200. 8 sessions added for Zayed',when:'Just now'});setTimeout(()=>{toast('8 sessions added to Zayed\'s package');render()},900)}
  else{setTimeout(()=>actions.confirmCampDone(),900)}
  emit('pay');payCtx=null}

/* ---------- events ---------- */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-role],[data-tab],[data-go],[data-back],[data-act],[data-prog],[data-day],[data-time],[data-cday],[data-att],[data-close],[data-pm],[data-close-btn]');
  if(!t)return;
  if(t.dataset.close!==undefined&&e.target===t){closeSheet();return}
  if(t.dataset.closeBtn!==undefined){closeSheet();return}
  if(t.dataset.role){setRole(t.dataset.role);return}
  if(t.dataset.tab){closeSheet();setTab(t.dataset.tab);return}
  if(t.dataset.go){go(t.dataset.go,t.dataset.arg);$('#screen').scrollTop=0;return}
  if(t.dataset.back!==undefined){const backTo={class:'today',cswimmer:'swimmers',aswimmer:'swimmers',campReg:'camps'}[state.view];if(backTo&&TABS[state.role].some(x=>x[0]===backTo)){setTab(backTo)}else if(backTo){go(backTo)}else{state.view=null;render()}return}
  if(t.dataset.prog){state.book.prog=t.dataset.prog;const p=prog(t.dataset.prog);state.book.time=p.venue==='saad'?'07:00':'09:00';render();return}
  if(t.dataset.day){state.book.day=+t.dataset.day;render();return}
  if(t.dataset.time){state.book.time=t.dataset.time;render();return}
  if(t.dataset.cday){const d=t.dataset.cday,f=state.campForm.days;f.includes(d)?f.splice(f.indexOf(d),1):f.push(d);render();return}
  if(t.dataset.att){const sid=t.dataset.s,cid=t.dataset.c;const cur=attOf(cid,sid);markAtt(cid,sid,cur===t.dataset.att?undefined:t.dataset.att);if(cur===t.dataset.att)delete state.attendance[cid][sid];render();const row=document.getElementById('att-'+sid);if(row)row.classList.add('flash');
    if(t.dataset.att==='present'&&cur!=='present')emit('present');if(sid===ME&&t.dataset.att==='present'&&cur!=='present')toast(`Zayed marked present · ${left(state.swimmers[ME])} sessions left`);return}
  if(t.dataset.pm){state.payMethod=t.dataset.pm;renderPay();return}
  if(t.dataset.act==='payNow'){const b=t;b.disabled=true;b.innerHTML='<span class="spin"></span> Processing';setTimeout(payDone,1100);return}
  if(t.dataset.act){const fn=actions[t.dataset.act];if(fn)fn(t.dataset.arg)}
});
document.addEventListener('input',e=>{const q=e.target.dataset.search;if(!q)return;const v=e.target.value.toLowerCase();const list=document.getElementById(q==='admin'?'adminList':'coachList');list.querySelectorAll('.li').forEach(li=>{li.style.display=li.textContent.toLowerCase().includes(v)?'':'none'})});

/* ---------- init ---------- */
function fit(){const s=Math.min(1,(window.innerHeight-48)/868);document.documentElement.style.setProperty('--s',s.toFixed(3))}
fit();addEventListener('resize',fit);
(function clock(){const d=new Date();$('#clock').textContent=d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')})();
const qp=new URLSearchParams(location.search);if(['parent','coach','admin'].includes(qp.get('as')))state.role=qp.get('as');
setRole(state.role);
/* public API for the page story */
window.SU={
  setRole, go, setTab, state, render,
  show(role,view,arg){ if(state.role!==role){state.role=role;state.tab={parent:'home',coach:'today',admin:'dash'}[role];document.querySelectorAll('[data-role]').forEach(b=>b.classList.toggle('on',b.dataset.role===role));}
    const tabs=TABS[role].map(x=>x[0]); if(tabs.includes(view)){state.tab=view;state.view=null}else{state.view=view;state.viewArg=arg} render(); const sc=$('#screen'); if(sc) sc.scrollTop=0; },
  markZayed(on){ const cur=attOf('c1',ME); if(on&&cur!=='present'){markAtt('c1',ME,'present'); toast(`Zayed marked present · ${left(state.swimmers[ME])} sessions left`);} if(!on&&cur==='present'){markAtt('c1',ME,undefined); delete state.attendance.c1[ME];} render(); const row=document.getElementById('att-'+ME); if(row&&on) row.classList.add('flash'); },
  focus(sel){ const el=$('#screen').querySelector(sel); if(el){el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse');} },
};
})();
