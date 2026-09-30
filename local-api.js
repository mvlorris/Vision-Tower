/* Banco local do Vision Tower. Não depende de servidor e funciona no GitHub Pages. */
window.localAPI = (() => {
  const DB_KEY = 'vision-tower-local-db-v1';
  const defaultUser = {id:1,name:'Marcus',username:'marcus',email:'marcus@local',role:'admin',active:true,permissions:['view_dashboard','edit_vehicles','manage_vehicle_data','manage_locations','manage_trips','manage_users','view_indicators']};
  const seed = () => ({users:[defaultUser],vehicles:(window.VISION_DATA||[]).map((v,i)=>({...v,id:i+1,trackerStatus:v.tracker||'Atualizado',riskActive:/risco/i.test(v.status),updatedAt:v.position})),locations:[],trips:[],alerts:[],history:[]});
  const load = () => {try {const saved=JSON.parse(localStorage.getItem(DB_KEY)||'null'); return saved || seed()} catch {return seed()}};
  const save = db => localStorage.setItem(DB_KEY,JSON.stringify(db));
  const api = {
    session(){return JSON.parse(localStorage.getItem('vision-tower-local-session')||'null')},
    login(identifier,password){if(!identifier||!password) throw new Error('Informe usuário e senha'); const db=load(); let user=db.users.find(u=>u.username===identifier||u.email===identifier)||{...defaultUser,name:identifier,username:identifier,email:identifier+'@local'}; localStorage.setItem('vision-tower-local-session',JSON.stringify(user)); return {user}},
    logout(){localStorage.removeItem('vision-tower-local-session')},
    getVehicles(){return load().vehicles},
    updateVehicle(id,patch){const db=load(); const item=db.vehicles.find(v=>v.id===id); if(!item) throw new Error('Veículo não encontrado'); Object.assign(item,patch,{updatedAt:new Date().toISOString()}); db.history.push({at:new Date().toISOString(),type:'vehicle_update',vehicleId:id,patch}); save(db); return item},
    getLocations(){return load().locations},
    saveLocation(location){const db=load(); location.id=location.id||Date.now(); const i=db.locations.findIndex(x=>x.id===location.id); i>=0?db.locations.splice(i,1,location):db.locations.push(location); save(db); return location},
    getTrips(){return load().trips},
    saveTrip(trip){const db=load(); trip.id=trip.id||Date.now(); const i=db.trips.findIndex(x=>x.id===trip.id); i>=0?db.trips.splice(i,1,trip):db.trips.push(trip); save(db); return trip},
    getUsers(){return load().users},
    getAlerts(){const vehicles=load().vehicles; return vehicles.filter(v=>/aguardando|parado/i.test(v.status)||v.riskActive).map((v,i)=>({id:i+1,vehicle:v.plate,title:v.riskActive?'Área de risco':v.status,description:`Acompanhamento local da unidade ${v.unit}`,severity:v.riskActive?'critical':'attention'}))},
    getHistory(){return load().history},
    getPreferences(){try{return JSON.parse(localStorage.getItem('vision-tower-local-preferences')||'{}')}catch{return {}}},
    savePreferences(prefs){localStorage.setItem('vision-tower-local-preferences',JSON.stringify(prefs)); return prefs},
    reset(){localStorage.removeItem(DB_KEY);localStorage.removeItem('vision-tower-local-session');localStorage.removeItem('vision-tower-local-preferences');location.reload()}
  };
  return api;
})();
