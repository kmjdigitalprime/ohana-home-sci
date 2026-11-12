"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PreviewLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/preview/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    }).catch(() => null);

    if (!response?.ok) {
      setError(
        response?.status === 503
          ? "L’aperçu n’est pas encore configuré."
          : "Mot de passe incorrect. Vérifiez puis réessayez.",
      );
      setSubmitting(false);
      return;
    }

    const requested = new URLSearchParams(window.location.search).get("next");
    const destination = requested?.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/";
    router.replace(destination);
    router.refresh();
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Aperçu privé · OHANA HOME SCI</div>
          <h1>Bienvenue dans la première version du site.</h1>
          <p>
            Cet aperçu présente des contenus de préparation. Les terrains, prix,
            médias et informations foncières doivent être validés avant publication.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <form className="form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="password">Mot de passe de l’aperçu</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                autoFocus
              />
            </div>
            <button className="btn" disabled={submitting}>
              {submitting ? "Ouverture…" : "Ouvrir l’aperçu"}
            </button>
            {error && <p className="error" role="alert">{error}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
