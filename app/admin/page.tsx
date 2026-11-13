import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidAdminSession } from "@/lib/admin-session";
import { lands } from "@/lib/data";
import { editorialFields, socialNetworks } from "@/lib/editorial";
import { listEnquiries } from "@/lib/store";

export const dynamic = "force-dynamic";

const realisationFields = [
  "Titre et slug",
  "Résumé et description",
  "Localisation et date",
  "Médias autorisés",
  "Ordre d’affichage",
  "Statut éditorial",
];

const mapFields = [
  "Latitude et longitude confirmées",
  "Lien Google Maps et repère",
  "Statut de vérification",
  "Précision : exacte, approximative, privée ou non confirmée",
  "Autorisation de publication",
];

export default async function Admin() {
  if (!isValidAdminSession((await cookies()).get("ohana_admin")?.value)) {
    redirect("/admin/login");
  }

  const enquiries = listEnquiries();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="eyebrow">Espace privé · gestionnaire</div>
          <h1>Pilotage OHANA</h1>
          <p>Catalogue, contenus éditoriaux et demandes enregistrées.</p>
        </div>
      </div>

      <section className="section admin-dashboard">
        <div className="container">
          <div className="admin-heading">
            <div>
              <span className="eyebrow">Catalogue</span>
              <h2>Terrains</h2>
            </div>
            <span className="status">{lands.length} références</span>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Référence</th>
                  <th>Terrain</th>
                  <th>Éditorial</th>
                  <th>Commercial</th>
                  <th>Carte</th>
                </tr>
              </thead>
              <tbody>
                {lands.map((land) => (
                  <tr key={land.id}>
                    <td>{land.id}</td>
                    <td>{land.name}</td>
                    <td>{land.editorial}</td>
                    <td>{land.availability}</td>
                    <td>{land.mapVerified && land.mapPublicationAllowed ? "Publiable" : "Non vérifiée"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-heading admin-heading--spaced">
            <div>
              <span className="eyebrow">Cartographie</span>
              <h2>Confidentialité des localisations</h2>
            </div>
          </div>
          <div className="admin-field-grid admin-field-grid--compact">
            {mapFields.map((field) => (
              <article key={field}>
                <strong>{field}</strong>
                <span>Privé tant que la donnée n’est pas validée</span>
              </article>
            ))}
          </div>

          <div className="admin-heading admin-heading--spaced">
            <div>
              <span className="eyebrow">Formulaire OHANA HOME</span>
              <h2>Champs éditoriaux préparés</h2>
            </div>
          </div>
          <div className="admin-field-grid">
            {editorialFields.map((field) => (
              <article key={field.key}>
                <small>{field.group}</small>
                <strong>{field.label}</strong>
                <span>{field.visibility === "private" ? "Interne" : "Public après validation"}</span>
              </article>
            ))}
          </div>

          <div className="admin-heading admin-heading--spaced">
            <div>
              <span className="eyebrow">Réalisations</span>
              <h2>Structure de publication</h2>
            </div>
          </div>
          <div className="admin-field-grid admin-field-grid--compact">
            {realisationFields.map((field) => (
              <article key={field}>
                <strong>{field}</strong>
                <span>Brouillon par défaut</span>
              </article>
            ))}
          </div>

          <div className="admin-heading admin-heading--spaced">
            <div>
              <span className="eyebrow">Présence sociale</span>
              <h2>Réseaux configurables</h2>
            </div>
          </div>
          <div className="admin-social-list">
            {socialNetworks.map((network) => (
              <div key={network.id}>
                <strong>{network.label}</strong>
                <span>{network.confirmed ? "Lien confirmé" : "URL à renseigner"}</span>
              </div>
            ))}
          </div>

          <div className="admin-heading admin-heading--spaced">
            <div>
              <span className="eyebrow">Suivi commercial</span>
              <h2>Demandes</h2>
            </div>
          </div>
          {enquiries.length === 0 ? (
            <p>Aucune demande enregistrée.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Nom</th>
                    <th>Contact</th>
                    <th>Demande</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id}>
                      <td>{new Date(enquiry.created_at).toLocaleString("fr-CM")}</td>
                      <td>{enquiry.name}</td>
                      <td>{enquiry.contact}</td>
                      <td>{enquiry.request}</td>
                      <td>{enquiry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="notice admin-connection-note">
            Le modèle de contenu est prêt. La modification persistante, le téléversement
            des médias et les rôles avancés restent à relier à la base Supabase avant la
            production.
          </div>
        </div>
      </section>
    </>
  );
}
