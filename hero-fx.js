/* Search Converts interactive heroes: leak meter, locked door, 5-second phone test */
(function(){'use strict';
var D=document,W=window,NS='http://www.w3.org/2000/svg';
var RM=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
function el(n,a){var e=D.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
function visible(node,cb){if(!('IntersectionObserver' in W)){cb(true);return}var io=new IntersectionObserver(function(es){es.forEach(function(e){cb(e.isIntersecting)})},{threshold:.15});io.observe(node)}

/* ---------------- LEAK METER ---------------- */
(function(){
 var box=D.getElementById('lk');if(!box)return;
 var SRC=[['#4285f4','Google'],['#34a853','Maps'],['#f97316','Ads'],['#8b5cf6','Social']];
 var L=[{x:190,loss:.36,n:'Slow page'},{x:345,loss:.42,n:'Unclear offer'},{x:500,loss:.6,n:'Hidden phone'}],fixed=[0,0,0];
 var lk=D.getElementById('lk-leaks'),flow=D.getElementById('lk-flow'),fx=D.getElementById('lk-fxl'),jar=D.getElementById('lk-liq'),bub=D.getElementById('lk-bub');
 var callsE=D.getElementById('lk-calls'),upE=D.getElementById('lk-up'),jarN=D.getElementById('lk-jn');
 L.forEach(function(l,i){var g=el('g',{});
  g.appendChild(el('ellipse',{cx:l.x,cy:176,rx:26,ry:8,fill:'#ef4444',opacity:.35,filter:'url(#lkGlow)','class':'lk-g'}));
  g.appendChild(el('path',{d:'M'+(l.x-12)+' 170 l6 -7 l5 8 l6 -9 l7 8',fill:'none',stroke:'#7f1d1d','stroke-width':2.2,'stroke-linecap':'round','stroke-linejoin':'round','class':'lk-crack'}));
  var cl=el('g',{opacity:0,'class':'lk-clamp'});cl.appendChild(el('rect',{x:l.x-16,y:112,width:32,height:66,rx:8,fill:'url(#lkClamp)',stroke:'#0b1a44','stroke-width':1.5}));
  cl.appendChild(el('circle',{cx:l.x,cy:178,r:6,fill:'#f97316',stroke:'#9a3412','stroke-width':1.5}));cl.appendChild(el('rect',{x:l.x-12,y:116,width:5,height:58,rx:2.5,fill:'#fff',opacity:.35}));
  g.appendChild(cl);
  var t=el('text',{x:l.x,y:214,'text-anchor':'middle','font-family':'Inter,system-ui,sans-serif','font-weight':800,'font-size':17,fill:'#b42318'});t.textContent=l.n;g.appendChild(t);
  l.t=t;l.cl=cl;l.g=g;lk.appendChild(g)});
 function rate(){var r=1;L.forEach(function(l,i){r*=1-(fixed[i]?l.loss*.5:l.loss)});return r}
 var base=rate();
 function read(){var r=rate(),calls=r*100*.14;callsE.textContent=calls.toFixed(1);jarN.textContent=calls.toFixed(1);
  var up=Math.round((r/base-1)*100);upE.textContent=up>0?('+'+up+'%'):'0%';upE.className=up>0?'up':'';
  var h=Math.min(1,calls/7.5)*200;jar.setAttribute('height',h.toFixed(0));jar.setAttribute('y',(334-h).toFixed(0))}
 D.querySelectorAll('#lk .lk-fx button').forEach(function(b){b.addEventListener('click',function(){var i=+b.getAttribute('data-i');fixed[i]=fixed[i]?0:1;b.setAttribute('aria-pressed',fixed[i]?'true':'false');b.querySelector('small').textContent=fixed[i]?'Plugged':'Leaking';
  var l=L[i];l.t.setAttribute('fill',fixed[i]?'#15803d':'#b42318');l.cl.setAttribute('opacity',fixed[i]?1:0);l.g.querySelector('.lk-g').setAttribute('fill',fixed[i]?'#22c55e':'#ef4444');l.g.querySelector('.lk-crack').setAttribute('opacity',fixed[i]?0:1);
  if(fixed[i]&&!RM){l.cl.animate&&l.cl.animate([{transform:'translateY(-18px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:320,easing:'cubic-bezier(.2,1.4,.4,1)'})}
  read()})});
 read();
 if(RM)return;
 var drops=[],parts=[],on=false,t0=0,sp=0,raf=0;
 function spawn(){var s=SRC[Math.floor(Math.random()*SRC.length)];var d=el('circle',{r:7.5,fill:s[0],stroke:'#fff','stroke-width':2});flow.appendChild(d);drops.push({e:d,x:36,y:140+(Math.random()*10-5),vx:2.3,vy:0,st:'p',li:0,c:s[0]})}
 function splash(x,y,c){for(var i=0;i<5;i++){var p=el('circle',{r:2.4,fill:c});fx.appendChild(p);parts.push({e:p,x:x,y:y,vx:(Math.random()-.5)*3,vy:-Math.random()*3-1,life:30})}}
 function bubble(){var b=el('circle',{cx:620+Math.random()*50,cy:330,r:2+Math.random()*3,fill:'#fff',opacity:.7});bub.appendChild(b);parts.push({e:b,x:+b.getAttribute('cx'),y:330,vx:0,vy:-.9-Math.random(),life:120,bub:1})}
 function tick(ts){if(!on){raf=0;return}var dt=Math.min(40,ts-(t0||ts))/16;t0=ts;sp+=dt;if(sp>15){sp=0;spawn()}if(Math.random()<.08*dt)bubble();
  drops.forEach(function(d){
   if(d.st==='p'){d.x+=d.vx*dt;var l=L[d.li];if(l&&d.x>=l.x){var loss=fixed[d.li]?l.loss*.5:l.loss;if(Math.random()<loss){d.st='f';d.vx=.5}d.li++}if(d.x>=578){d.st='j';d.vy=1}}
   else if(d.st==='f'){d.vy+=.36*dt;d.y+=d.vy*dt;d.x+=d.vx*dt;if(d.y>336){d.st='x';splash(d.x,338,d.c)}}
   else if(d.st==='j'){d.x+=(645-d.x)*.14*dt;d.vy+=.42*dt;d.y+=d.vy*dt;if(d.y>+jar.getAttribute('y')+6){d.st='x'}}
   d.e.setAttribute('cx',d.x.toFixed(1));d.e.setAttribute('cy',d.y.toFixed(1))});
  drops=drops.filter(function(d){if(d.st==='x'){d.e.remove();return false}return true});
  parts.forEach(function(p){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(!p.bub)p.vy+=.25*dt;p.e.setAttribute('cx',p.x.toFixed(1));p.e.setAttribute('cy',p.y.toFixed(1));if(p.bub&&p.y<+jar.getAttribute('y'))p.life=0});
  parts=parts.filter(function(p){if(p.life<=0){p.e.remove();return false}return true});
  raf=requestAnimationFrame(tick)}
 visible(box,function(v){on=v;if(v&&!raf){t0=0;raf=requestAnimationFrame(tick)}});
})();

/* ---------------- LOCKED DOOR ---------------- */
(function(){
 var root=D.getElementById('dr');if(!root)return;
 var g=D.getElementById('dr-people'),outE=D.getElementById('dr-out'),inE=D.getElementById('dr-in'),btn=D.getElementById('dr-btn'),sign=D.getElementById('dr-sign');
 var open=false,out=0,inn=0,ws=[],t0=0,on=false,raf=0,acc=0;
 function person(){var p=el('g',{});p.appendChild(el('ellipse',{cx:0,cy:2,rx:22,ry:6,fill:'#000',opacity:.28,filter:'url(#drSoft2)'}));var b=el('g',{});
  b.appendChild(el('path',{d:'M-9 0 L-6 -44 L6 -44 L9 0 Z',fill:'#1b2230'}));b.appendChild(el('path',{d:'M-15 -44 Q-16 -86 0 -88 Q16 -86 15 -44 Z',fill:'url(#drPerson)'}));
  b.appendChild(el('circle',{cx:0,cy:-100,r:13,fill:'url(#drPerson)'}));b.appendChild(el('path',{d:'M-8 -108 A13 13 0 0 1 8 -110',stroke:'#fff','stroke-opacity':.25,'stroke-width':2,fill:'none'}));
  p.appendChild(b);p._b=b;g.appendChild(p);return p}
 function spawn(x,d){var L=Math.random()<.5;ws.push({e:person(),x:x!=null?x:(L?-40:940),dir:d||(L?1:-1),st:'in',t:0,y:520+Math.random()*40,sp:2.4+Math.random()*.8,ph:Math.random()*6})}
 function tick(ts){if(!on){raf=0;return}var dt=Math.min(40,ts-(t0||ts));t0=ts;acc+=dt;if(acc>(open?650:1050)&&ws.length<(open?8:6)){acc=0;spawn()}
  ws.forEach(function(w){w.ph+=dt*.012;
   if(w.st==='in'){w.x+=w.dir*w.sp*dt*.06;if(Math.abs(w.x-450)<(open?4:26)){w.st=open?'en':'try';w.t=0}}
   else if(w.st==='try'){w.t+=dt;if(w.t>900){w.st='aw';out++;outE.textContent=out}}
   else if(w.st==='aw'){w.x-=w.dir*w.sp*1.2*dt*.06;w.y+=dt*.01}
   else if(w.st==='en'){w.t+=dt;w.y-=dt*.05}
   var s=.95+(w.y-480)/260,bob=w.st==='try'?Math.sin(w.t*.03)*2:Math.abs(Math.sin(w.ph))*-3,op=w.st==='en'?Math.max(0,1-w.t/700):1;
   w.e.setAttribute('transform','translate('+w.x.toFixed(1)+' '+w.y.toFixed(1)+') scale('+(w.dir*s).toFixed(3)+' '+s.toFixed(3)+')');w.e.setAttribute('opacity',op.toFixed(2));w.e._b.setAttribute('transform','translate(0 '+bob.toFixed(1)+')');
   if(w.st==='en'&&op<=0&&!w.done){w.done=1;inn++;inE.textContent=inn}});
  ws=ws.filter(function(w){var dead=(w.st==='aw'&&(w.x<-80||w.x>980))||w.done;if(dead)w.e.remove();return !dead});
  raf=requestAnimationFrame(tick)}
 btn.addEventListener('click',function(){open=!open;root.classList.toggle('open',open);btn.textContent=open?'Lock it again':'Unlock the door';sign.textContent=open?'OPEN':'CLOSED';sign.setAttribute('fill',open?'#15803d':'#b42318')});
 if(RM){outE.textContent='37';return}
 spawn(330,1);
 visible(root,function(v){on=v;if(v&&!raf){t0=0;raf=requestAnimationFrame(tick)}});
})();

/* ---------------- 5-SECOND PHONE TEST ---------------- */
(function(){
 var scr=D.getElementById('p5-scr');if(!scr)return;
 var eye=D.getElementById('p5-eye'),rg=D.getElementById('p5-rg'),rt=D.getElementById('p5-rt'),after=D.getElementById('p5-after'),hdl=D.getElementById('p5-hdl'),sl=D.getElementById('p5-sl'),again=D.getElementById('p5-again');
 var pts=[[30,12],[70,30],[40,55],[75,62],[25,70],[60,82],[50,40],[80,20]],run=0;
 function set(v){after.style.clipPath='inset(0 0 0 '+(100-v)+'%)';hdl.style.left=(100-v)+'%';if(v>2)scr.classList.remove('show')}
 sl.addEventListener('input',function(){set(+sl.value)});
 function test(){run++;var my=run;scr.classList.remove('show');sl.value=0;set(0);var start=performance.now(),i=-1;eye.style.opacity=1;
  function step(ts){if(my!==run)return;var e=(ts-start)/1000,left=Math.max(0,5-e);rt.textContent=Math.ceil(left);rg.setAttribute('stroke-dashoffset',(138.2*(1-left/5)).toFixed(1));
   var k=Math.floor(e/.6);if(k!==i&&k<pts.length){i=k;eye.style.left=pts[k][0]+'%';eye.style.top=pts[k][1]+'%'}
   if(left>0)requestAnimationFrame(step);else{eye.style.opacity=0;scr.classList.add('show');setTimeout(function(){if(my!==run)return;var v=0;(function sld(){if(my!==run||+sl.value>v+1)return;v+=2.2;sl.value=v;set(v);if(v<55)requestAnimationFrame(sld)})()},1600)}}
  requestAnimationFrame(step)}
 again.addEventListener('click',test);
 if(RM){set(50);sl.value=50;return}
 var done=false;visible(scr,function(v){if(v&&!done){done=true;test()}});
})();
})();
