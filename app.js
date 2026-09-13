const demo = {
  drivers:[
    {p:1,code:'NOR',name:'Lando Norris',team:'McLaren',gap:'—',tyre:'M',age:12,pit:1,color:'#ff8700',pts:312},
    {p:2,code:'VER',name:'Max Verstappen',team:'Red Bull Racing',gap:'+2.341',tyre:'H',age:5,pit:1,color:'#3671c6',pts:298},
    {p:3,code:'PIA',name:'Oscar Piastri',team:'McLaren',gap:'+5.892',tyre:'M',age:12,pit:1,color:'#ff8700',pts:287},
    {p:4,code:'LEC',name:'Charles Leclerc',team:'Ferrari',gap:'+9.104',tyre:'H',age:7,pit:1,color:'#e8002d',pts:235},
    {p:5,code:'RUS',name:'George Russell',team:'Mercedes',gap:'+12.220',tyre:'M',age:15,pit:1,color:'#27f4d2',pts:214},
    {p:6,code:'HAM',name:'Lewis Hamilton',team:'Ferrari',gap:'+15.801',tyre:'M',age:15,pit:1,color:'#e8002d',pts:198},
    {p:7,code:'ANT',name:'Kimi Antonelli',team:'Mercedes',gap:'+20.002',tyre:'H',age:9,pit:1,color:'#27f4d2',pts:142},
    {p:8,code:'ALO',name:'Fernando Alonso',team:'Aston Martin',gap:'+25.421',tyre:'S',age:4,pit:2,color:'#229971',pts:91},
    {p:9,code:'SAI',name:'Carlos Sainz',team:'Williams',gap:'+28.006',tyre:'H',age:10,pit:1,color:'#64c4ff',pts:83},
    {p:10,code:'ALB',name:'Alex Albon',team:'Williams',gap:'+31.558',tyre:'M',age:16,pit:1,color:'#64c4ff',pts:72}
  ],
  control:[
    ['21:14','DRS enabled in all available zones'],['21:08','Car 14 noted — track limits Turn 7'],['20:57','Yellow flag Sector 2'],['20:55','Car 44 pit exit'],['20:49','Fastest lap — NOR 1:32.804']
  ],
  races:[
    ['R17','Singapore GP','2026-10-11','20:00'],['R18','United States GP','2026-10-25','05:00'],['R19','Mexico City GP','2026-11-02','04:00'],['R20','São Paulo GP','2026-11-09','01:00'],['R21','Las Vegas GP','2026-11-22','12:00'],['R22','Qatar GP','2026-11-30','00:00'],['R23','Abu Dhabi GP','2026-12-06','21:00']
  ]
};

const qs=(s)=>document.querySelector(s), qsa=(s)=>[...document.querySelectorAll(s)];
function tyreClass(t){return t==='S'?'soft':t==='M'?'medium':'hard'}
function renderTiming(){
  qs('#timingTable').innerHTML=demo.drivers.map(d=>`<div class="timing-row" data-driver="${d.code}"><b>${d.p}</b><div class="driver"><i class="team-bar" style="background:${d.color}"></i><span>${d.code}</span></div><span class="gap">${d.gap}</span><span class="tyre ${tyreClass(d.tyre)}" title="${d.age} laps">${d.tyre}</span><b>${d.pit}</b></div>`).join('');
  qsa('.timing-row').forEach(r=>r.addEventListener('click',()=>openDriver(r.dataset.driver)));
}
function renderFavorites(){
  qs('#favoriteDrivers').innerHTML=demo.drivers.slice(0,3).map(d=>`<div class="fav-card" data-code="${d.code}"><span class="pos">P${d.p}</span><b>${d.code}</b><small>${d.gap==='—'?'Leader':d.gap} · ${d.tyre}${d.age}</small></div>`).join('');
  qsa('.fav-card').forEach(c=>c.addEventListener('click',()=>openDriver(c.dataset.code)));
}
function renderControl(){qs('#raceControlFeed').innerHTML=demo.control.map(x=>`<div class="control-item"><time>${x[0]}</time><p>${x[1]}</p></div>`).join('')}
function renderSchedule(){qs('#scheduleList').innerHTML=demo.races.map(r=>`<div class="race-item"><div class="round">${r[0]}</div><div><b>${r[1]}</b><small>${r[2]}</small></div><time>${r[3]}</time></div>`).join('')}
function renderWeekend(){const data=[['FRI','FP1','18:30'],['FRI','FP2','22:00'],['SAT','FP3','18:30'],['SAT','Qualifying','22:00'],['SUN','Race','20:00']];qs('#weekendTimeline').innerHTML=data.map(x=>`<div class="session"><div class="day">${x[0]}</div><div><b>${x[1]}</b><small>Marina Bay Street Circuit</small></div><div class="time">${x[2]}</div></div>`).join('')}
function renderStandings(){
  qs('#driversStandings').innerHTML=demo.drivers.map((d,i)=>`<div class="standing-row"><div class="rank">${i+1}</div><div class="who"><b>${d.name}</b><small>${d.team}</small></div><div class="pts">${d.pts}</div></div>`).join('');
  const teams=[['McLaren',548],['Red Bull Racing',361],['Ferrari',355],['Mercedes',356],['Williams',155],['Aston Martin',123]];
  qs('#teamsStandings').innerHTML=teams.map((t,i)=>`<div class="standing-row"><div class="rank">${i+1}</div><div class="who"><b>${t[0]}</b><small>Constructors</small></div><div class="pts">${t[1]}</div></div>`).join('')
}
function renderMap(){const pts=[[245,70],[270,81],[300,104],[320,145],[302,182],[255,203],[205,200],[164,186],[128,204],[89,183]];qs('#carDots').innerHTML=demo.drivers.map((d,i)=>`<circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="8" fill="${d.color}"><title>${d.code}</title></circle>`).join('')}
function showPage(id){qsa('.page').forEach(p=>p.classList.toggle('active',p.id===id));qsa('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id));window.scrollTo({top:0,behavior:'smooth'})}
function openDriver(code){const d=demo.drivers.find(x=>x.code===code)||demo.drivers[0];qs('#profileName').textContent=d.name;qs('#profileCode').textContent=d.code;qs('#profileTeam').textContent=d.team;qs('#profilePts').textContent=d.pts;qs('#profileNumber').textContent=d.code==='NOR'?'#4':'#'+({VER:1,PIA:81,LEC:16,RUS:63,HAM:44,ANT:12,ALO:14,SAI:55,ALB:23}[d.code]||'—');showPage('profile')}
function initNav(){qsa('.nav-btn').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));qsa('[data-jump]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.jump)));qsa('[data-live-view]').forEach(b=>b.addEventListener('click',()=>{qsa('[data-live-view]').forEach(x=>x.classList.remove('active'));b.classList.add('active');qsa('.live-view').forEach(v=>v.classList.remove('active'));qs('#'+b.dataset.liveView+'View').classList.add('active')}));qsa('[data-standing]').forEach(b=>b.addEventListener('click',()=>{qsa('[data-standing]').forEach(x=>x.classList.remove('active'));b.classList.add('active');qs('#driversStandings').classList.toggle('active',b.dataset.standing==='drivers');qs('#teamsStandings').classList.toggle('active',b.dataset.standing==='teams')}));}
function updateCountdown(){const race=new Date('2026-10-11T20:00:00+08:00');const now=new Date();let ms=Math.max(0,race-now),d=Math.floor(ms/864e5);ms%=864e5;let h=Math.floor(ms/36e5);ms%=36e5;let m=Math.floor(ms/6e4);qs('#countdown').textContent=`${d}d ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`}
async function tryOpenF1(){
  // V1 keeps the UI usable even if the public live API is unavailable or has no active session.
  try{const c=new AbortController();setTimeout(()=>c.abort(),2200);const r=await fetch('https://api.openf1.org/v1/sessions?session_key=latest',{signal:c.signal});if(!r.ok)throw 0;const data=await r.json();if(data?.length){qs('#refreshBtn').title='OpenF1 reachable';}}
  catch(e){qs('#refreshBtn').title='Demo mode';}
}
qs('#refreshBtn').addEventListener('click',()=>{tryOpenF1();updateCountdown();qs('#refreshBtn').animate([{transform:'rotate(0deg)'},{transform:'rotate(360deg)'}],{duration:500})});
renderTiming();renderFavorites();renderControl();renderSchedule();renderWeekend();renderStandings();renderMap();initNav();updateCountdown();tryOpenF1();setInterval(updateCountdown,30000);
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
