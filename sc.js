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
