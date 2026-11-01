/* Tappy: Hashmi Digital's mascot. A chat bubble that types. Hand-built SVG so it can blink, wave and type forever. */
(function(){
  var C={b:'#FF6A1F',s:'#E5530E',h:'#FFA36B',e:'#26202E',ck:'#FF9A80',leg:'#EF5E15',sole:'#2B2733',lace:'#D9D5DF'};
  function arm(pose,side){
    var L=side==='l';
    if(pose==='cheer') return L
      ? '<g class="tp-arm tp-arm-l"><path d="M54 130 Q30 96 22 64" stroke="'+C.b+'" stroke-width="26" stroke-linecap="round" fill="none"/><circle cx="22" cy="60" r="16" fill="'+C.b+'"/></g>'
      : '<g class="tp-arm tp-arm-r"><path d="M246 130 Q270 96 278 64" stroke="'+C.b+'" stroke-width="26" stroke-linecap="round" fill="none"/><circle cx="278" cy="60" r="16" fill="'+C.b+'"/></g>';
    if(pose==='wave' && !L) return '<g class="tp-arm tp-wave"><path d="M248 150 Q276 128 284 92" stroke="'+C.b+'" stroke-width="26" stroke-linecap="round" fill="none"/><circle cx="285" cy="86" r="17" fill="'+C.b+'"/><path d="M272 76 q4 -10 10 -6" stroke="'+C.s+'" stroke-width="4" stroke-linecap="round" fill="none" opacity=".5"/></g>';
    if(pose==='point' && !L) return '<g class="tp-arm tp-point"><path d="M248 150 Q280 150 300 136" stroke="'+C.b+'" stroke-width="24" stroke-linecap="round" fill="none"/><circle cx="302" cy="134" r="15" fill="'+C.b+'"/></g>';
    /* hands on hips */
    return L
      ? '<g class="tp-arm tp-arm-l"><path d="M48 150 Q22 172 40 198 Q52 210 70 204" stroke="'+C.b+'" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>'
      : '<g class="tp-arm tp-arm-r"><path d="M252 150 Q278 172 260 198 Q248 210 230 204" stroke="'+C.b+'" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>';
  }
  function shoe(x){
    return '<g><path d="M'+(x-38)+' 336 C'+(x-38)+' 306 '+(x-18)+' 298 '+(x+2)+' 299 C'+(x+26)+' 300 '+(x+42)+' 312 '+(x+44)+' 332 L'+(x+44)+' 338 L'+(x-38)+' 338 Z" fill="#fff"/>'+
      '<rect x="'+(x-40)+'" y="333" width="86" height="11" rx="5.5" fill="'+C.sole+'"/>'+
      '<path d="M'+(x-8)+' 316 l10 4 M'+(x-4)+' 312 l10 4" stroke="'+C.lace+'" stroke-width="3.5" stroke-linecap="round"/></g>';
  }
  window.tappy=function(pose,label){
    pose=pose||'hips';
    var id='tp'+Math.random().toString(36).slice(2,7);
    return '<svg class="tappy tp-'+pose+'" viewBox="-10 -10 330 370" role="img" aria-label="'+(label||'Tappy, the Hashmi Digital mascot')+'">'+
      '<defs><clipPath id="'+id+'"><path d="M110 22 H190 C238 22 262 46 262 102 V150 C262 204 238 230 190 230 H110 C62 230 38 204 38 150 V102 C38 46 62 22 110 22 Z"/></clipPath></defs>'+
      '<ellipse class="tp-shadow" cx="150" cy="346" rx="86" ry="9" fill="#2B2733" opacity=".08"/>'+
      '<g class="tp-legs"><rect x="106" y="236" width="38" height="80" rx="19" fill="'+C.leg+'"/><rect x="158" y="236" width="38" height="80" rx="19" fill="'+C.leg+'"/>'+shoe(122)+shoe(182)+'</g>'+
      '<g transform="translate(0,30)"><g class="tp-top">'+
        arm(pose,'l')+
        '<path d="M254 118 Q282 124 298 120 Q288 140 254 160 Z" fill="'+C.b+'"/>'+
        '<path d="M110 22 H190 C238 22 262 46 262 102 V150 C262 204 238 230 190 230 H110 C62 230 38 204 38 150 V102 C38 46 62 22 110 22 Z" fill="'+C.b+'"/>'+
        '<g clip-path="url(#'+id+')"><path d="M20 196 Q150 236 280 196 V250 H20 Z" fill="'+C.s+'"/></g>'+
        '<ellipse cx="80" cy="54" rx="15" ry="8" transform="rotate(-32 80 54)" fill="'+C.h+'"/><circle cx="66" cy="74" r="4.5" fill="'+C.h+'"/>'+
        '<g class="tp-face">'+
          '<g class="tp-eyes"><ellipse cx="120" cy="102" rx="21" ry="23" fill="#fff"/><ellipse cx="182" cy="102" rx="21" ry="23" fill="#fff"/>'+
            '<g class="tp-pupils"><circle cx="123" cy="104" r="10" fill="'+C.e+'"/><circle cx="185" cy="104" r="10" fill="'+C.e+'"/><circle cx="127" cy="100" r="3.2" fill="#fff"/><circle cx="189" cy="100" r="3.2" fill="#fff"/></g></g>'+
          '<path d="M101 72 Q118 64 135 70 M167 70 Q184 64 201 72" stroke="'+C.e+'" stroke-width="6" stroke-linecap="round" fill="none"/><ellipse cx="94" cy="140" rx="12" ry="7" fill="'+C.ck+'" opacity=".45"/><ellipse cx="208" cy="140" rx="12" ry="7" fill="'+C.ck+'" opacity=".45"/>'+
          '<path class="tp-mouth" d="M128 134 Q151 160 174 134 Q151 143 128 134 Z" fill="#5A1A10"/><path d="M140 145 Q151 152 162 145 Q151 148 140 145 Z" fill="#FF8F7A"/>'+
        '</g>'+
        '<g class="tp-dots"><circle cx="132" cy="180" r="6.5" fill="#fff"/><circle cx="151" cy="180" r="6.5" fill="#fff"/><circle cx="170" cy="180" r="6.5" fill="#fff"/></g>'+
        arm(pose,'r')+
      '</g></g></svg>';
  };
  function mount(){document.querySelectorAll('[data-tappy]').forEach(function(el){if(!el.firstElementChild)el.innerHTML=window.tappy(el.getAttribute('data-tappy'),el.getAttribute('data-label'))});}
  if(document.readyState!=='loading')mount();else document.addEventListener('DOMContentLoaded',mount);
})();
