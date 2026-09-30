/* Search Converts shared behavior V3: nav, hardened forms, FAQ, reveal, tool helpers. */
(function(){'use strict';
var D=document,W=window;
/* nav */
var togs=D.querySelectorAll('.nav [aria-haspopup]');
togs.forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();var d=b.nextElementSibling,open=b.getAttribute('aria-expanded')==='true';D.querySelectorAll('.drop.on').forEach(function(x){x.classList.remove('on');x.previousElementSibling.setAttribute('aria-expanded','false');});if(!open){d.classList.add('on');b.setAttribute('aria-expanded','true');}});});
D.addEventListener('click',function(){D.querySelectorAll('.drop.on').forEach(function(x){x.classList.remove('on');x.previousElementSibling.setAttribute('aria-expanded','false');});});
D.addEventListener('keydown',function(e){if(e.key==='Escape'){D.querySelectorAll('.drop.on').forEach(function(x){x.classList.remove('on');});var m=D.getElementById('mnav');if(m)m.classList.remove('on');}});
var bg=D.getElementById('burger'),mn=D.getElementById('mnav');
if(bg&&mn){bg.addEventListener('click',function(){mn.classList.add('on');bg.setAttribute('aria-expanded','true');D.body.style.overflow='hidden';});mn.querySelector('.x').addEventListener('click',function(){mn.classList.remove('on');bg.setAttribute('aria-expanded','false');D.body.style.overflow='';});}
/* FAQ */
D.querySelectorAll('.fq button').forEach(function(b){b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true',a=b.nextElementSibling;b.setAttribute('aria-expanded',o?'false':'true');a.style.maxHeight=o?null:a.scrollHeight+'px';});});
/* reveal */
if('IntersectionObserver' in W){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});D.querySelectorAll('.rv').forEach(function(el){io.observe(el);});}else{D.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');});}
/* hardened lead forms → info at eyetoad dot com (assembled at runtime) */
var _L=[112,117,109,118,71,108,128,108,123,118,104,107,53,106,118,116];function dest(){var s='';for(var i=0;i<_L.length;i++)s+=String.fromCharCode(_L[i]-7);return s;}
var touched=false,t0=Date.now();['keydown','pointerdown','touchstart'].forEach(function(e){D.addEventListener(e,function(){touched=true;},{passive:true,capture:true});});
function say(f,k,t){var m=f.querySelector('.msg');if(!m){m=D.createElement('div');m.className='msg';m.setAttribute('role','status');f.appendChild(m);}m.textContent=t;m.style.cssText='margin-top:12px;padding:12px 14px;border-radius:10px;font-size:.95rem;'+(k==='ok'?'background:#ECFDF3;color:#054F31;border:1px solid #A6F4C5':k==='wait'?'background:#EFF8FF;color:#0B4A6F;border:1px solid #B2DDFF':'background:#FEF3F2;color:#7A271A;border:1px solid #FECDCA');}
D.querySelectorAll('form[data-sc]').forEach(function(f){
  if(!f.querySelector('[name="_honey"]')){var hp=D.createElement('input');hp.type='text';hp.name='_honey';hp.tabIndex=-1;hp.autocomplete='off';hp.setAttribute('aria-hidden','true');hp.className='hp';f.appendChild(hp);}
  f.setAttribute('novalidate','');
  f.addEventListener('submit',function(e){e.preventDefault();var hp=f.querySelector('[name="_honey"]');if(hp&&hp.value){say(f,'ok','Thank you. Your message has been received.');return;}
    if(!touched||Date.now()-t0<3500){say(f,'err','Take a moment to fill in the form, then press send again.');return;}
    var bad=[];f.querySelectorAll('[required]').forEach(function(el){var ok=String(el.value||'').trim().length>0&&String(el.value).length<2000;if(ok&&el.type==='email')ok=/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(el.value.trim());el.style.borderColor=ok?'':'#e3111f';if(!ok)bad.push(el);});
    if(bad.length){say(f,'err','Please fill in the highlighted fields.');bad[0].focus();return;}
    var b=f.querySelector('[type="submit"]');if(b)b.disabled=true;say(f,'wait','Sending…');
    var fd=new FormData(f);fd.delete('_honey');fd.set('_captcha','false');fd.set('_template','table');
    if(!fd.get('_subject'))fd.set('_subject','searchconverts.com — '+(f.getAttribute('data-sc')||'lead'));
    fd.set('page',location.pathname);fd.set('page_title',D.title.slice(0,120));fd.set('tool',f.getAttribute('data-tool')||'');fd.set('source_site','searchconverts.com');fd.set('referrer',(D.referrer||'').slice(0,200));
    fetch('https://form'+'submit.co/ajax/'+dest(),{method:'POST',headers:{'Accept':'application/json'},body:fd}).then(function(r){return r.json();}).then(function(j){if(j&&(j.success==='true'||j.success===true)){say(f,'ok','Got it. A real person will call or reply within one business day. If it can\'t wait: 720-712-8615.');f.reset();}else{say(f,'err','Something went wrong. Call 720-712-8615 and we\'ll take it by phone.');if(b)b.disabled=false;}}).catch(function(){say(f,'err','Something went wrong. Call 720-712-8615 and we\'ll take it by phone.');if(b)b.disabled=false;});
  });
});
/* runtime email */
var E=[111,108,115,115,118,71,122,108,104,121,106,111,106,118,117,125,108,121,123,122,53,106,118,116];function em(){var s='';for(var i=0;i<E.length;i++)s+=String.fromCharCode(E[i]-7);return s;}
D.querySelectorAll('[data-email]').forEach(function(a){a.setAttribute('href','mail'+'to:'+em());if(a.getAttribute('data-email')==='text')a.textContent=em();});
/* helpers */
W.SC={money:function(n){return '$'+Math.round(n).toLocaleString('en-US');},on:function(ids,fn){ids.forEach(function(i){var e=D.getElementById(i);if(e){e.addEventListener('input',fn);e.addEventListener('change',fn);}});fn();},esc:function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}};
/* pitch deck */
var deck=D.getElementById('deck');
if(deck){var slides=deck.querySelectorAll('.slide'),i=0,dots=deck.querySelector('.dots');slides.forEach(function(s,k){var d=D.createElement('button');d.type='button';d.setAttribute('aria-label','Slide '+(k+1));d.addEventListener('click',function(){go(k);});dots.appendChild(d);});
 function go(n){i=(n+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('on',k===i);});dots.querySelectorAll('button').forEach(function(d,k){d.classList.toggle('on',k===i);});deck.querySelector('.cnt').textContent=(i+1)+' / '+slides.length;}
 deck.querySelector('.prev').addEventListener('click',function(){go(i-1);});deck.querySelector('.next').addEventListener('click',function(){go(i+1);});
 D.addEventListener('keydown',function(e){var r=deck.getBoundingClientRect();if(r.top>innerHeight||r.bottom<0)return;if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1);});
 var sx=0;deck.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;},{passive:true});deck.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(dx<0?i+1:i-1);},{passive:true});go(0);}
})();

/* ===== v3.2: slim header on scroll + contrast guard ===== */
(function(){'use strict';var D=document,W=window;
var hdr=D.querySelector('.hdr');if(hdr){var tk=false;var sl=false;function sh(){tk=false;var y=W.pageYOffset;if(!sl&&y>140){sl=true;hdr.classList.add('slim')}else if(sl&&y<10){sl=false;hdr.classList.remove('slim')}}W.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(sh)}},{passive:true});sh()}
function P(c){var m=c&&c.match(/rgba?\(([^)]+)\)/);if(!m)return null;var p=m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
function H(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(function(x){return x+x}).join('');return{r:parseInt(h.slice(0,2),16),g:parseInt(h.slice(2,4),16),b:parseInt(h.slice(4,6),16),a:1}}
function L(c){function f(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)}
function R(a,b){var x=L(a),y=L(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function mix(c,t,k){return{r:Math.round(c.r+(t.r-c.r)*k),g:Math.round(c.g+(t.g-c.g)*k),b:Math.round(c.b+(t.b-c.b)*k),a:1}}
function css(c){return'rgb('+c.r+','+c.g+','+c.b+')'}
var WHITE={r:255,g:255,b:255,a:1},INK={r:11,g:18,b:32,a:1};
function bgOf(el){var e=el;while(e&&e.nodeType===1){var s=getComputedStyle(e),bi=s.backgroundImage;if(bi&&bi!=='none'){if(/url\(/.test(bi))return null;var cs=bi.match(/rgba?\([^)]+\)|#[0-9a-f]{3,6}\b/gi);if(cs){var list=cs.map(function(x){return x[0]==='#'?H(x):P(x)}).filter(function(c){return c&&c.a>.35});if(list.length)return{cols:list,own:e}}}var b=P(s.backgroundColor);if(b&&b.a>.5)return{cols:[b],own:e};e=e.parentElement}return{cols:[WHITE],own:D.body}}
function guard(){var w=D.createTreeWalker(D.body,NodeFilter.SHOW_TEXT),n,done=new Set();
 while((n=w.nextNode())){if(n.textContent.trim().length<2)continue;var el=n.parentElement;if(!el||done.has(el)||el.closest('svg,script,style,noscript,#sc-panel,#sc-bub,[data-noguard]'))continue;done.add(el);
  var s=getComputedStyle(el);if(s.visibility==='hidden'||s.display==='none')continue;var r=el.getBoundingClientRect();if(!r.width||!r.height)continue;
  if(s.backgroundClip==='text'||s.webkitBackgroundClip==='text')continue;var fg=P(s.color);if(!fg||fg.a<.1)continue;
  var bg=bgOf(el);if(!bg)continue;var sz=parseFloat(s.fontSize),bold=parseInt(s.fontWeight,10)>=700,need=(sz>=24||(sz>=18.66&&bold))?3.1:4.6;
  function worst(f){return Math.min.apply(null,bg.cols.map(function(c){return R(f,c)}))}
  if(worst(fg)>=need)continue;
  var avg=bg.cols.reduce(function(a,c){return a+L(c)},0)/bg.cols.length,dark=avg<.2,tgt=dark?WHITE:INK,k=0,f2=fg;
  while(k<=1&&worst(f2)<need){k+=.1;f2=mix(fg,tgt,Math.min(1,k))}
  if(worst(f2)>=need){el.style.setProperty('color',css(f2),'important');continue}
  var o=bg.own,ob=P(getComputedStyle(o).backgroundColor);
  if(L(fg)>.6&&o!==D.body&&ob&&ob.a>.5&&bg.cols.length===1){var b2=ob,j=0;while(j<1&&R(fg,b2)<need){j+=.08;b2=mix(ob,INK,j)}o.style.setProperty('background-color',css(b2),'important');o.style.setProperty('background-image','none','important');continue}
  var alt=R(WHITE,bg.cols[0])>R(INK,bg.cols[0])?WHITE:INK;el.style.setProperty('color',css(alt),'important');}
}
var t;function soon(ms){clearTimeout(t);t=setTimeout(function(){try{guard()}catch(e){}},ms||120)}
if(D.readyState==='complete')soon(50);else W.addEventListener('load',function(){soon(50)});
setTimeout(soon,1500);['input','change','click'].forEach(function(ev){D.addEventListener(ev,function(){soon(250)},true)});
var st;W.addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(function(){soon(0)},400)},{passive:true});
W.SCguard=guard;
})();
