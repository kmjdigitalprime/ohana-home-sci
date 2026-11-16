"use client";
import { useRef, useState } from "react";
import Link from "next/link";
export function EnquiryForm({landSlug}:{landSlug?:string}) {
  const [state,setState]=useState<"idle"|"loading"|"success"|"error">("idle");
  const [message,setMessage]=useState("");
  const busy=useRef(false);
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(busy.current)return;
    busy.current=true;
    const form=event.currentTarget;
    setState("loading");
    try{
      const response=await fetch("/api/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Object.fromEntries(new FormData(form)),landSlug})});
      const result=await response.json();
      setMessage(result.message);
      setState(response.ok?"success":"error");
      if(response.ok)form.reset();
    }catch{setMessage("La connexion a été interrompue. Réessayez ou contactez-nous sur WhatsApp.");setState("error");}
    finally{busy.current=false;}
  }
  return <form className="form" onSubmit={submit} aria-busy={state==="loading"}>
    <div className="row"><div className="field"><label htmlFor="name">Votre nom *</label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80}/></div><div className="field"><label htmlFor="contact">Téléphone ou e-mail *</label><input id="contact" name="contact" required minLength={5} maxLength={120}/></div></div>
    <div className="field"><label htmlFor="request">Votre demande *</label><textarea id="request" name="request" rows={4} minLength={4} maxLength={1000} required defaultValue={landSlug?"Je souhaite organiser une visite de ce terrain.":""}/></div>
    <details><summary>Préciser mon projet et mes disponibilités (facultatif)</summary><div className="row"><div className="field"><label htmlFor="zone">Zone recherchée</label><input id="zone" name="zone" maxLength={100}/></div><div className="field"><label htmlFor="budget">Budget total en FCFA</label><input id="budget" name="budget" maxLength={50}/></div></div><div className="row"><div className="field"><label htmlFor="slot">Créneau souhaité</label><input id="slot" name="slot" maxLength={100} placeholder="Ex. samedi matin"/></div><div className="field"><label htmlFor="timezone">Votre fuseau ou votre ville</label><input id="timezone" name="timezone" maxLength={80} placeholder="Ex. Europe/Paris"/></div></div></details>
    <div hidden aria-hidden="true"><label>Ne pas remplir<input name="company" tabIndex={-1} autoComplete="off"/></label></div>
    <button className="btn" disabled={state==="loading"}>{state==="loading"?"Enregistrement…":"Envoyer ma demande"}</button>
    {state==="success"&&<p className="success" role="status">{message}</p>}{state==="error"&&<p className="error" role="alert">{message}</p>}
    <small>Vos coordonnées servent à traiter votre demande. Aucun rendez-vous n’est confirmé automatiquement. <Link href="/confidentialite">Confidentialité</Link></small>
  </form>;
}
