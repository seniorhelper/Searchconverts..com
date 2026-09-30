/* Search Converts funnel tool: finds the weakest stage and shows what fixing it is worth. Math on your inputs, not a forecast. */
(function(){'use strict';var D=document;
D.querySelectorAll('.ft[data-stages]').forEach(function(box){
 var cfg=JSON.parse(box.getAttribute('data-stages')),stEl=box.querySelector('.ft-st'),vIn=box.querySelector('.ft-v'),valIn=box.querySelector('.ft-val');
 var out=box.querySelector('.ft-out'),note=box.querySelector('.ft-note'),rows=[];
 cfg.forEach(function(s,i){var r=D.createElement('div');r.innerHTML='<div class="ft-row"><span>'+s[0]+'</span><input type="range" min="1" max="100" step="0.5" value="'+s[1]+'" aria-label="'+s[0]+' rate, percent"><output>'+s[1]+'%</output></div><div class="ft-bar"><em></em></div>';stEl.appendChild(r);rows.push(r)});
 function f(n){return Math.round(n).toLocaleString('en-US')}
 function calc(){var v=Math.max(0,+vIn.value||0),val=Math.max(0,+valIn.value||0),n=v,rates=[],weak=0,wv=999,worth;
  rows.forEach(function(r,i){var x=+r.querySelector('input').value;rates.push(x/100);r.querySelector('output').textContent=x+'%';var rel=x/(cfg[i][2]||x);if(rel<wv){wv=rel;weak=i}});
  var counts=[];rates.forEach(function(r){n=n*r;counts.push(n)});
  rows.forEach(function(r,i){var b=r.querySelector('.ft-bar');b.style.width=Math.max(2,counts[i]/Math.max(1e-9,counts[0])*100)+'%';b.classList.toggle('w',i===weak);b.querySelector('em').textContent=f(counts[i])});
  var cust=counts[counts.length-1],better=rates.slice();better[weak]=Math.min(1,better[weak]*1.2);var c2=v;better.forEach(function(r){c2*=r});
  out.innerHTML='<div><small>'+cfg[cfg.length-1][0]+' a month</small><b>'+f(cust)+'</b></div><div><small>Revenue a month</small><b>$'+f(cust*val)+'</b></div>';
  note.innerHTML='<b>Weakest stage: '+cfg[weak][0]+'.</b> Lifting it 20% (from '+(rates[weak]*100).toFixed(1)+'% to '+(better[weak]*100).toFixed(1)+'%) adds about <b>'+f(c2-cust)+'</b> a month, worth <b>$'+f((c2-cust)*val)+'</b>. Weakest means furthest below a rough working reference for that step, not a published benchmark. Arithmetic on your numbers, not a forecast.'}
 box.addEventListener('input',calc);calc()})})();
