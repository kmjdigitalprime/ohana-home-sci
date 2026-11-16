import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm,readFile,readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
let server,dir;const base='http://127.0.0.1:3027';
before(async()=>{
 dir=await mkdtemp(path.join(tmpdir(),'ohana-test-'));
 server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3027'],{env:{...process.env,OHANA_DATA_DIR:dir,PREVIEW_ACCESS_PASSWORD:'legacy-password-must-not-block',ADMIN_DEMO_TOKEN:'local-test-admin-only-2026'},stdio:['ignore','pipe','pipe']});
 let logs='';server.stderr.on('data',x=>logs+=x);
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok)return;}catch{}await new Promise(r=>setTimeout(r,250));}
 throw Error('Server unavailable: '+logs);
});
after(async()=>{server?.kill();if(dir)await rm(dir,{recursive:true,force:true});});
test('Public routes open without preview session',async()=>{
 for(const route of ['/','/terrains','/agence','/agence/le-promoteur','/diaspora','/contact','/realisations','/faq','/mentions-legales','/confidentialite']){
  const r=await fetch(base+route,{redirect:'manual'});assert.equal(r.status,200,route);const html=await r.text();assert.ok(!html.includes('Mot de passe de l’aperçu'),route);assert.ok(!html.includes('Aperçu privé'),route);
 }
});
test('Logo returns image bytes rather than login HTML',async()=>{const r=await fetch(base+'/ohana-home-logo.png',{redirect:'manual'});assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/image\/png/);assert.deepEqual([...new Uint8Array(await r.arrayBuffer()).slice(0,8)],[137,80,78,71,13,10,26,10]);});
test('Drafts are excluded from listing, deep links and contact',async()=>{for(const slug of ['missole-pk30-acces-8-km','missole-pk30-acces-4-km']){assert.equal((await fetch(base+'/terrains/'+slug)).status,404);const html=await (await fetch(base+'/contact?terrain='+slug)).text();assert.ok(!html.includes('Terrain sélectionné'));}const html=await(await fetch(base+'/terrains?q=Missol%C3%A9')).text();assert.ok(!html.includes('OH-003'));assert.ok(!html.includes('OH-004'));});
test('Admin and future admin APIs reject anonymous access',async()=>{const r=await fetch(base+'/admin',{redirect:'manual'});assert.equal(r.status,307);assert.ok(r.headers.get('location').endsWith('/admin/login'));assert.equal((await fetch(base+'/api/admin/catalogue',{method:'POST'})).status,401);assert.equal((await fetch(base+'/api/admin/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:'wrong'})})).status,401);});
test('Enquiries validate, save once and remain private',async()=>{const send=body=>fetch(base+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});assert.equal((await send({name:'X'})).status,400);const body={name:'Test Recette',contact:'test@example.invalid',request:'Demande fictive de recette uniquement'};assert.equal((await send({...body,landSlug:'missole-pk30-acces-8-km'})).status,400);assert.equal((await send({...body,company:'spam'})).status,400);assert.equal((await send(body)).status,201);assert.equal((await send(body)).status,409);assert.equal(JSON.parse(await readFile(path.join(dir,'ohana.json'),'utf8')).enquiries.length,1);assert.equal((await fetch(base+'/data/ohana.json')).status,404);});

test('Private catalogue never enters downloadable browser bundles',async()=>{async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await scan(file);else if(file.endsWith('.js')){const js=await readFile(file,'utf8');assert.ok(!js.includes('missole-pk30-acces-8-km'),file);assert.ok(!js.includes('OH-003'),file);}}}await scan('.next/static');});
