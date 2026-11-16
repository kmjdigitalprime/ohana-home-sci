"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function EnquiryForm({ landSlug }: { landSlug?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, landSlug }),
      });
      const result = await response.json();
      setMessage(result.message);
      setState(response.ok ? "success" : "error");
      if (response.ok) form.reset();
    } catch {
      setMessage(
        "La demande n’a pas pu être envoyée. Vous pouvez nous joindre sur WhatsApp.",
      );
      setState("error");
    }
  }

  return (
    <form className="form enquiry-form" onSubmit={submit}>
      <div className="row">
        <div className="field">
          <label htmlFor="name">Votre nom *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Prénom et nom"
            required
            minLength={2}
          />
        </div>
        <div className="field">
          <label htmlFor="contact">Téléphone ou e-mail *</label>
          <input
            id="contact"
            name="contact"
            inputMode="email"
            autoComplete="email"
            placeholder="+237… ou nom@exemple.com"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="request">Votre demande *</label>
        <textarea
          id="request"
          name="request"
          rows={4}
          required
          defaultValue={
            landSlug ? "Je souhaite organiser une visite de ce terrain." : ""
          }
          placeholder="Décrivez brièvement votre projet"
        />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="zone">Zone recherchée</label>
          <input
            id="zone"
            name="zone"
            autoComplete="address-level2"
            placeholder="Ex. Douala, Yaoundé…"
          />
        </div>
        <div className="field">
          <label htmlFor="budget">Budget indicatif</label>
          <input
            id="budget"
            name="budget"
            inputMode="numeric"
            placeholder="Ex. 5 000 000 FCFA"
          />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="slot">Créneau souhaité</label>
          <input
            id="slot"
            name="slot"
            placeholder="Ex. samedi matin"
          />
        </div>
        <div className="field">
          <label htmlFor="timezone">Votre fuseau horaire</label>
          <input
            id="timezone"
            name="timezone"
            placeholder="Ex. Europe/Paris"
          />
        </div>
      </div>

      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="form-honeypot"
      />

      <button className="btn form-submit" disabled={state === "loading"}>
        <Send aria-hidden="true" />
        {state === "loading" ? "Enregistrement…" : "Envoyer ma demande"}
      </button>

      {state === "success" && (
        <p className="success" role="status">
          {message}
        </p>
      )}
      {state === "error" && (
        <p className="error" role="alert">
          {message}
        </p>
      )}
      <small className="form-note">
        Votre demande sera relue par un conseiller. Aucun rendez-vous n’est confirmé
        automatiquement.
      </small>
    </form>
  );
}
