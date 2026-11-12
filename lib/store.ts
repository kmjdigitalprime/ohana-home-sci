import fs from "fs";import path from "path";
export type Enquiry={id:string;created_at:string;name:string;contact:string;request:string;land_slug:string|null;budget:string|null;zone:string|null;slot:string|null;timezone:string|null;status:"nouvelle"|"contactée"|"visite prévue"|"clôturée";fingerprint:string};
type Event={id:string;created_at:string;type:string;land_slug:string|null};type Store={enquiries:Enquiry[];events:Event[]};
const dir=path.join(process.cwd(),"data"),file=path.join(dir,"ohana.json");function ensure(){if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});if(!fs.existsSync(file))fs.writeFileSync(file,JSON.stringify({enquiries:[],events:[]},null,2),"utf8")}
function read():Store{ensure();return JSON.parse(fs.readFileSync(file,"utf8")) as Store}function write(data:Store){const temp=file+".tmp";fs.writeFileSync(temp,JSON.stringify(data,null,2),"utf8");fs.renameSync(temp,file)}
export function addEnquiry(entry:Enquiry){const data=read();if(data.enquiries.some(x=>x.fingerprint===entry.fingerprint))throw new Error("DUPLICATE");data.enquiries.push(entry);write(data)}
export function listEnquiries(){return read().enquiries.sort((a,b)=>b.created_at.localeCompare(a.created_at)).slice(0,50)}
export function addEvent(type:string,land_slug?:string){const data=read();data.events.push({id:crypto.randomUUID(),created_at:new Date().toISOString(),type,land_slug:land_slug||null});write(data)}
