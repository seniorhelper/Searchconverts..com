/* Search Converts copy grader: a heuristic check of headline and first-screen copy. Runs in the browser; nothing is sent. */
(function(){'use strict';var D=document,box=D.getElementById('cg');if(!box)return;
var ta=D.getElementById('cg-in'),out=D.getElementById('cg-out'),ex=D.getElementById('cg-ex');
var JARGON=['solution','solutions','innovative','innovation','synergy','leverage','cutting-edge','cutting edge','world-class','world class','best-in-class','seamless','robust','empower','holistic','excellence','one-stop','one stop','state-of-the-art','state of the art','premier','top-notch','top notch','dedicated to','committed to','passionate about','quality service','welcome to','your one','next level','game changer','game-changing','unparalleled','unmatched','revolutionary','disruptive','scalable','best practices','value-added','turnkey'];
var CTA=/\b(call|book|schedule|get|request|claim|start|try|see|download|order|buy|shop|reserve|text|chat|contact)\b/i;
var PROOF=/(\b\d[\d,.]*\+?\s*(reviews?|customers?|clients?|homes?|jobs?|projects?|years?|stars?)\b|★|⭐|\b[45]\.\d\b|\bstar(s)?\b|\blicensed\b|\binsured\b|\bbonded\b|\bcertified\b|\baward|\bbbb\b|\ba\+\b|\bsince (19|20)\d\d\b|\bwarrant(y|ies)\b|\bguarantee)/i;
var SPEC=/(\b\d+\b|\btoday\b|\btomorrow\b|\bthis week\b|\bsame[- ]day\b|\bsame[- ]week\b|\bhours?\b|\bminutes?\b|\bfree\b|\$\d)/ig;
function words(t){return (t.toLowerCase().match(/[a-z0-9'’$+]+/g)||[])}
function grade(){var t=ta.value.trim();if(!t){out.innerHTML='<p class="cg-empty">Paste your homepage headline and the first few lines under it, then press <b>Grade my copy</b>.</p>';return}
 var lines=t.split(/\n+/).map(function(s){return s.trim()}).filter(Boolean),head=lines[0],w=words(t),hw=words(head);
 var you=w.filter(function(x){return /^(you|your|you're|youre|yours|you’re)$/.test(x)}).length,we=w.filter(function(x){return /^(we|our|us|we're|were|ours|i|my|we’re)$/.test(x)}).length;
 var lower=t.toLowerCase(),jar=JARGON.filter(function(j){return lower.indexOf(j)>-1});
 var spec=(t.match(SPEC)||[]).length,cta=CTA.test(t),proof=PROOF.test(t);
 var s1=you+we===0?50:Math.round(Math.min(100,you/(you+we)*100+ (you>=we?10:0)));
 var s2=Math.min(100,spec*25);
 var hl=hw.length,s3=Math.max(0,(hl>=5&&hl<=14?100:hl<5?70:Math.max(35,100-(hl-14)*8))-jar.length*18);
 var s4=cta?100:0,s5=proof?100:0;
 var total=Math.round(s1*.25+s2*.2+s3*.25+s4*.15+s5*.15);
 var col=total>=80?'#15803d':total>=55?'#b45309':'#b42318',lab=total>=80?'Strong. A visitor knows what you do and what to do next.':total>=55?'Close. A few changes would make it much clearer.':'Leaky. Visitors will struggle to see why they should stay.';
 function bar(n,v,why){var c=v>=80?'#15803d':v>=50?'#c2410c':'#b42318';return '<div class="cg-row"><div class="cg-rl"><b>'+n+'</b><span>'+why+'</span></div><div class="cg-bar"><i style="width:'+Math.max(4,v)+'%;background:'+c+'"></i></div><output>'+v+'</output></div>'}
 var tips=[];
 if(we>you)tips.push('You say "we/our" '+we+' times and "you/your" '+you+' times. Rewrite around the customer: what they get, not who you are.');
 if(spec<2)tips.push('Add something specific: a timeframe ("this week"), a number, a place, or a free offer. Specific sounds true.');
 if(jar.length)tips.push('Cut the filler phrases: <i>'+jar.slice(0,5).join(', ')+'</i>. They could describe anyone.');
 if(hl>14)tips.push('Your headline is '+hl+' words. Aim for 6 to 12 so it reads in one glance.');
 if(hl<5)tips.push('Your headline is very short. Make sure it says what you do and for whom.');
 if(!cta)tips.push('There is no clear next step. Add one action, like "Call for a free estimate" or "Book this week."');
 if(!proof)tips.push('Add proof near the top: reviews, years in business, licensing or a guarantee you actually offer.');
 if(!tips.length)tips.push('Nice work. Next, test it: show it to someone for five seconds and ask what you do.');
 out.innerHTML='<div class="cg-score"><div class="cg-dial" style="--v:'+total+';--c:'+col+'"><b>'+total+'</b><small>/100</small></div><div><b style="font-size:19px;color:'+col+'">'+lab+'</b><p>Headline checked: “'+(W=head.replace(/</g,'&lt;')).slice(0,120)+'”</p></div></div>'
  +bar('Customer focus',s1,you+' you / '+we+' we')+bar('Specificity',s2,spec+' specific detail'+(spec===1?'':'s'))+bar('Clarity',s3,hl+'-word headline'+(jar.length?', '+jar.length+' filler phrase'+(jar.length>1?'s':''):''))+bar('Clear next step',s4,cta?'action found':'no action found')+bar('Proof',s5,proof?'proof found':'no proof found')
  +'<h4>What to fix first</h4><ul>'+tips.slice(0,4).map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><p class="cg-note">A heuristic check of wording, not a prediction of results. Real proof comes from testing. <a href="/free-strategy-session/">Want a copywriter to rewrite it?</a></p>'}
var W='';
D.getElementById('cg-go').addEventListener('click',grade);
ex.addEventListener('click',function(){ta.value='Welcome to Smith & Co.\nWe are a family-owned company committed to excellence and quality service since 1998. Our innovative solutions exceed expectations.';grade()});
D.getElementById('cg-ex2').addEventListener('click',function(){ta.value='Leaky roof? Fixed this week.\nFree inspection across the metro. 4.9 stars from 212 local reviews. Licensed and insured. Call for your free estimate today.';grade()});
grade();})();
