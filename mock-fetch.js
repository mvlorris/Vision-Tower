/* Mock server-side API for the faithful static GitHub Pages build. */
(() => {
  const SESSION='vision-faithful-session'; const DB='vision-faithful-db';
  const seed=()=>({vehicles:(window.LOCAL_VEHICLES||[]),users:[{id:1,name:'Marcus',username:'marcus',email:'marcus@local',role:'admin',active:true,permissions:['view_dashboard','edit_vehicles','manage_vehicle_data','manage_locations','manage_trips','manage_users','view_indicators']}],locations:[],riskLocations:[{id:1,name:'Área de demonstração',category:'other',severity:'attention',latitude:-25.43,longitude:-49.27,radiusM:1000,description:'Área fictícia para demonstração',active:true}],trips:[],history:[],selection:{configured:true,selectedUnits:null}});
  const db=()=>{try{return JSON.parse(localStorage.getItem(DB))||seed()}catch{return seed()}}; const save=x=>localStorage.setItem(DB,JSON.stringify(x));
  const response=(data,status=200,headers={})=>({ok:status>=200&&status<300,status,headers:{get:k=>headers[k]||null},json:async()=>data});
  const parseBody=o=>{try{return JSON.parse(o?.body||'{}')}catch{return {}}};
  window.fetch=async(input,options={})=>{const raw=typeof input==='string'?input:input.url;const u=new URL(raw,location.href);const path=u.pathname;const method=(options.method||'GET').toUpperCase();const data=db();const session=JSON.parse(localStorage.getItem(SESSION)||'null');
    if(path==='/api/session') return response({user:session});
    if(path==='/api/login'&&method==='POST'){const b=parseBody(options);const user={...data.users[0],name:String(b.email||'Marcus').split('@')[0]};localStorage.setItem(SESSION,JSON.stringify(user));return response({user});}
    if(path==='/api/logout'){localStorage.removeItem(SESSION);return response({ok:true});}
    if(path==='/api/unit-selection'&&method==='PUT'){data.selection={configured:true,selectedUnits:parseBody(options).selectedUnits};save(data);return response(data.selection)}
    if(path==='/api/unit-selection'&&method==='GET'){return response(data.selection)}
    if(path==='/api/vehicles'&&method==='GET')return response({vehicles:data.vehicles,collectedAt:new Date().toISOString() },200,{etag:'local-'+data.vehicles.length});
    if(path==='/api/vehicles'&&method==='PUT'){const b=parseBody(options);const v=data.vehicles.find(x=>x.plate===b.plate);if(v){Object.assign(v,b);data.history.push({recordedAt:new Date().toISOString(),plate:v.plate,eventType:'manual_update',newValue:v.operationalStatus||v.operationalStatusCode});save(data)}return response({vehicle:v||b});}
    if(path==='/api/risk-locations'&&method==='GET')return response({riskLocations:data.riskLocations});
    if(path==='/api/risk-locations'&&(method==='POST'||method==='PUT')){const b=parseBody(options);b.id=b.id||Date.now();const i=data.riskLocations.findIndex(x=>x.id===b.id);i>=0?data.riskLocations.splice(i,1,b):data.riskLocations.push(b);save(data);return response({riskLocation:b});}
    if(path==='/api/locations'&&method==='GET')return response({locations:data.locations});
    if(path==='/api/locations'&&(method==='POST'||method==='PUT')){const b=parseBody(options);b.id=b.id||Date.now();const i=data.locations.findIndex(x=>x.id===b.id);i>=0?data.locations.splice(i,1,b):data.locations.push(b);save(data);return response({location:b});}
    if(path==='/api/reports/fleet'&&method==='GET')return response({vehicles:data.vehicles,generatedAt:new Date().toISOString()});
    if(path==='/api/trips'&&method==='GET')return response({trips:data.trips,sheetSync:null});
    if(path==='/api/trips'&&(method==='POST'||method==='PUT')){const b=parseBody(options);b.id=b.id||Date.now();const i=data.trips.findIndex(x=>x.id===b.id);i>=0?data.trips.splice(i,1,b):data.trips.push(b);save(data);return response({trip:b});}
    if(path.startsWith('/api/trips/')&&path.endsWith('/events'))return response({events:[]});
    if(path==='/api/users'&&method==='GET')return response({users:data.users});
    if(path==='/api/users'&&(method==='POST'||method==='PUT')){const b=parseBody(options);b.id=b.id||Date.now();const i=data.users.findIndex(x=>x.id===b.id);i>=0?data.users.splice(i,1,{...data.users[i],...b}):data.users.push(b);save(data);return response({user:b});}
    if(path==='/api/users/password')return response({ok:true,reauthenticate:false});
    if(path==='/api/history/status')return response({summary:{lastCaptureAt:new Date().toISOString(),firstEventAt:new Date().toISOString(),totalEvents:data.history.length,monitoredVehicles:data.vehicles.length},recent:data.history});
    if(path==='/api/app-version')return response({version:'local-faithful-1'});
    if(path==='/api/vehicle-directory')return response({vehicles:data.vehicles});
    if(path==='/api/vehicle-manual-audit' || path.includes('/summary'))return response({entries:[],actors:[],nextCursor:null,total:0,users:[]});
    return response({});
  };
})();
