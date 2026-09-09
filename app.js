/* Artisan de Confiance du 13 — interactions (partagé par toutes les pages) */
(function(){
  document.documentElement.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // Révélations au défilement
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:0.14, rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.reveal, .cine .bg').forEach(function(el){ io.observe(el); });

  // Loader (page d'accueil uniquement)
  var loader=document.getElementById('loader');
  if(loader && !reduce){
    document.body.style.overflow='hidden';
    var ldone=false;
    var finish=function(){ if(ldone)return; ldone=true; loader.classList.add('done'); document.body.style.overflow=''; };
    setTimeout(finish, 2600);
    window.addEventListener('wheel', finish, {passive:true});
    window.addEventListener('touchmove', finish, {passive:true});
    window.addEventListener('keydown', finish);
    loader.addEventListener('click', finish);
  } else if(loader){ loader.classList.add('done'); }

  // Prologue (accueil)
  var intro=document.getElementById('intro');
  var beats=intro?intro.querySelectorAll('.beat'):[];
  var cue=intro?intro.querySelector('.cue'):null;
  var pbgs=intro?intro.querySelectorAll('.pbg'):[];
  function introScroll(){
    if(!intro || !intro.offsetHeight) return;
    var total=intro.offsetHeight-window.innerHeight;
    if(total<=0) return;
    var p=Math.min(1,Math.max(0,(-intro.getBoundingClientRect().top)/total));
    var n=beats.length;
    for(var i=0;i<n;i++){
      var c=(i+0.5)/n;
      var o=1-Math.min(1,Math.abs(p-c)/((0.5/n)*1.25));
      beats[i].style.opacity=Math.max(0,o).toFixed(3);
      beats[i].style.transform='translateY('+((p-c)*-50).toFixed(1)+'px)';
    }
    var m=pbgs.length;
    for(var j=0;j<m;j++){
      var cc=(j+0.5)/m;
      var oo=Math.max(0,1-Math.min(1,Math.abs(p-cc)/((0.5/m)*1.35)));
      pbgs[j].style.opacity=oo.toFixed(3);
      pbgs[j].style.transform='scale('+(1.04+(1-oo)*0.08).toFixed(3)+')';
    }
    if(cue) cue.style.opacity=Math.max(0,1-p/0.1).toFixed(3);
  }
  introScroll();
  window.addEventListener('resize', introScroll);

  // Parallaxe légère des visuels encadrés
  var parImgs=document.querySelectorAll('.slot.frame img.ph');
  function parallax(){
    if(reduce) return;
    var vh=window.innerHeight;
    parImgs.forEach(function(img){
      var s=img.parentNode, r=s.getBoundingClientRect();
      if(r.bottom<-60||r.top>vh+60) return;
      var pg=Math.max(-1,Math.min(1,((r.top+r.height/2)-vh/2)/vh));
      img.style.transform='scale(1.14) translateY('+(-pg*r.height*0.05).toFixed(1)+'px)';
    });
  }

  // Barre de progression + nav opaque au défilement
  var nav=document.getElementById('nav'), prog=document.getElementById('progress');
  function onScroll(){
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(nav) nav.classList.toggle('solid', y>60);
    if(prog){ var h=document.documentElement.scrollHeight-window.innerHeight; prog.style.width=(h>0?(y/h*100):0)+'%'; }
    introScroll();
    parallax();
  }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // Menu mobile
  var tog=document.getElementById('navToggle'), mm=document.getElementById('mmenu');
  if(tog&&mm){
    tog.addEventListener('click', function(){ var open=mm.hidden; mm.hidden=!open; tog.classList.toggle('open', open); document.body.style.overflow=open?'hidden':''; });
    mm.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ mm.hidden=true; tog.classList.remove('open'); document.body.style.overflow=''; }); });
  }

  // Formulaire de contact (validation côté client ; l'envoi réel sera branché ensuite)
  var f=document.getElementById('contact-form');
  if(f){ f.addEventListener('submit', function(e){
    e.preventDefault(); var ok=true;
    f.querySelectorAll('[required]').forEach(function(el){
      var bad=!String(el.value).trim();
      if(el.type==='email' && !bad) bad=!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value);
      el.classList.toggle('err', bad); if(bad) ok=false;
    });
    if(!ok) return;
    var data={}; new FormData(f).forEach(function(v,k){ data[k]=v; });
    var btn=f.querySelector('[type=submit]'); var note=f.querySelector('.submit .note');
    if(btn){ btn.disabled=true; btn.textContent='Envoi…'; }
    fetch('/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)})
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ return {ok:r.ok && j.ok, j:j}; }); })
      .then(function(res){
        if(res.ok){ f.hidden=true; var s=document.getElementById('contact-success'); if(s){ s.hidden=false; window.scrollTo(0,0); } }
        else { if(btn){ btn.disabled=false; btn.textContent='Envoyer ma demande'; }
          if(note){ note.textContent='Envoi impossible pour le moment — réessayez, ou écrivez-nous à contact@reseauxartisansdeconfiance13.fr'; note.style.color='#c8552e'; } }
      })
      .catch(function(){ if(btn){ btn.disabled=false; btn.textContent='Envoyer ma demande'; }
        if(note){ note.textContent='Envoi impossible pour le moment — réessayez plus tard.'; note.style.color='#c8552e'; } });
  }); }
})();
