/* Sogolon — POC portfolio : schéma, commentaires de colonnes et données FICTIVES.
 *
 * Tout est inventé (opérateur télécom imaginaire « Téranga Télécom ») et regénéré à l'identique à chaque
 * chargement grâce à une graine fixe. Aucune donnée réelle, aucun nom de table réel.
 * Expose window.SogolonDonnees = { DATE_DU_JOUR, DDL, COMMENTAIRES, CONNAISSANCES, remplir(db) }.
 */
(function () {
  "use strict";

  const DATE_DU_JOUR = "2026-10-15";

  const DDL = `
CREATE TABLE segment (
  id INTEGER PRIMARY KEY,
  libelle TEXT NOT NULL,
  marche TEXT NOT NULL
);
CREATE TABLE client (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL,
  type_client TEXT NOT NULL,
  nom TEXT,
  prenom TEXT,
  raison_sociale TEXT,
  id_segment INTEGER REFERENCES segment(id),
  date_creation TEXT NOT NULL
);
CREATE TABLE compte (
  id INTEGER PRIMARY KEY,
  id_client INTEGER NOT NULL REFERENCES client(id),
  code TEXT NOT NULL,
  date_creation TEXT NOT NULL,
  etat TEXT NOT NULL
);
CREATE TABLE offre (
  code TEXT PRIMARY KEY,
  libelle TEXT NOT NULL,
  univers TEXT NOT NULL,
  type_paiement TEXT NOT NULL,
  prix_mensuel INTEGER NOT NULL
);
CREATE TABLE point_vente (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL,
  nom TEXT NOT NULL,
  type TEXT NOT NULL,
  ville TEXT NOT NULL
);
CREATE TABLE agent (
  id INTEGER PRIMARY KEY,
  login TEXT NOT NULL,
  nom TEXT NOT NULL,
  id_point INTEGER REFERENCES point_vente(id)
);
CREATE TABLE contrat (
  id INTEGER PRIMARY KEY,
  id_compte INTEGER NOT NULL REFERENCES compte(id),
  nd TEXT NOT NULL,
  code_offre TEXT NOT NULL REFERENCES offre(code),
  date_effet TEXT NOT NULL,
  date_fin TEXT NOT NULL,
  etat TEXT NOT NULL,
  id_agent INTEGER REFERENCES agent(id)
);
CREATE TABLE facture (
  id INTEGER PRIMARY KEY,
  id_compte INTEGER NOT NULL REFERENCES compte(id),
  numero TEXT NOT NULL,
  periode TEXT NOT NULL,
  date_emission TEXT NOT NULL,
  date_echeance TEXT NOT NULL,
  montant INTEGER NOT NULL,
  solde INTEGER NOT NULL,
  statut TEXT NOT NULL
);
CREATE TABLE encaissement (
  id INTEGER PRIMARY KEY,
  id_facture INTEGER NOT NULL REFERENCES facture(id),
  id_agent INTEGER REFERENCES agent(id),
  date_encaissement TEXT NOT NULL,
  montant INTEGER NOT NULL,
  mode_paiement TEXT NOT NULL,
  etat TEXT NOT NULL
);
CREATE INDEX idx_contrat_compte ON contrat(id_compte);
CREATE INDEX idx_facture_compte ON facture(id_compte);
CREATE INDEX idx_enc_facture ON encaissement(id_facture);
`;

  // Équivalent des TABLE_COMMENT / COLUMN_COMMENT de MySQL : c'est tout ce que le modèle « sait » des données.
  const COMMENTAIRES = {
    segment: { "": "Segment marketing du client",
      marche: "Marché : 'B2C' (particuliers) ou 'B2B' (professionnels et entreprises)" },
    client: { "": "Personne ou entreprise cliente",
      code: "Code client affiché à l'écran (différent de id)",
      type_client: "'PARTICULIER' ou 'ENTREPRISE'",
      nom: "Vide pour une entreprise : utiliser raison_sociale",
      raison_sociale: "Renseignée pour les entreprises",
      date_creation: "Date AAAA-MM-JJ" },
    compte: { "": "Compte de facturation d'un client (un client peut en avoir plusieurs)",
      etat: "'ACTIF' ou 'FERME'" },
    offre: { "": "Catalogue des offres commerciales",
      univers: "'MOBILE', 'INTERNET_MOBILE', 'FIXE' ou 'FIBRE'",
      type_paiement: "'PREPAYE' (jamais facturé) ou 'POSTPAYE' (facture mensuelle)",
      prix_mensuel: "Montant en FCFA" },
    point_vente: { "": "Agences, boutiques partenaires et kiosques",
      type: "'AGENCE' (agence de l'opérateur), 'BOUTIQUE' (boutique partenaire) ou 'KIOSQUE'" },
    agent: { "": "Agents commerciaux et caissiers",
      id_point: "Point de vente de rattachement de l'agent" },
    contrat: { "": "Ligne souscrite sur un compte (une ligne = un contrat)",
      nd: "Numéro de la ligne (9 chiffres)",
      date_effet: "Date d'activation de la ligne, AAAA-MM-JJ",
      date_fin: "'3000-01-01' = sans fin ; sinon date de résiliation",
      etat: "'ACTIF', 'SUSPENDU' ou 'RESILIE'. Contrat actif = etat 'ACTIF' ET date_fin '3000-01-01'",
      id_agent: "Agent qui a vendu la ligne ; vide pour les ventes en ligne" },
    facture: { "": "Factures mensuelles des comptes postpayés",
      periode: "Mois facturé au format texte 'AAAA-MM'",
      date_echeance: "Date limite de paiement, AAAA-MM-JJ",
      montant: "Montant facturé en FCFA",
      solde: "Reste à payer en FCFA (0 = soldée)",
      statut: "'VALIDE' ou 'ANNULEE'. Facture impayée = statut 'VALIDE' ET solde > 0" },
    encaissement: { "": "Paiements reçus sur les factures",
      id_agent: "Caissier ; son point de vente donne le point d'encaissement",
      date_encaissement: "Date AAAA-MM-JJ",
      montant: "Montant encaissé en FCFA",
      mode_paiement: "'MOBILE_MONEY', 'ESPECES', 'CARTE' ou 'VIREMENT'",
      etat: "'VALIDE', 'ANNULE' ou 'REJETE'. Seuls les encaissements 'VALIDE' comptent" }
  };

  // Base de connaissance métier envoyée avec chaque question (version courte du prototype).
  const CONNAISSANCES = `- Chaîne client : contrat.id_compte -> compte.id, compte.id_client -> client.id.
- Nom affiché d'un client : COALESCE(NULLIF(TRIM(nom), ''), raison_sociale).
- « Boutique » dans une question = tout point de vente, sauf si la question précise « boutique partenaire ».
- Point d'encaissement : encaissement.id_agent -> agent.id_point -> point_vente.id.
- Chiffre d'affaires facturé d'un mois = somme des montants des factures VALIDE de la période 'AAAA-MM'.
- Ancienneté d'un impayé = jours entre la date d'échéance et la date du jour.`;

  // Générateur pseudo-aléatoire à graine fixe (mulberry32) : mêmes données à chaque chargement.
  function generateur(graine) {
    let a = graine >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const PRENOMS = ["Awa", "Moussa", "Fatou", "Ibrahima", "Aminata", "Cheikh", "Mariama", "Ousmane", "Khady",
    "Abdoulaye", "Ndeye", "Mamadou", "Coumba", "Babacar", "Aïssatou", "Lamine", "Seynabou", "Pape", "Rokhaya", "Alioune"];
  const NOMS = ["Diallo", "Ndoye", "Sow", "Fall", "Ba", "Cissé", "Kane", "Mbaye", "Gaye", "Thiam", "Sy", "Camara",
    "Faye", "Diop", "Ly", "Sarr", "Touré", "Barry", "Niang", "Seck"];
  const SOCIETES = ["Baobab Logistique", "Sahel Agro", "Atlantique BTP", "Cauris Conseil", "Teranga Hôtels",
    "Lagune Pêche", "Savane Transports", "Horizon Santé", "Kora Médias", "Delta Énergie", "Niayes Primeurs",
    "Fleuve Distribution", "Corniche Immobilier", "Soleil Textile", "Acacia Informatique"];

  function date(d) { return d.toISOString().slice(0, 10); }
  function jours(s, n) { const d = new Date(s + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return date(d); }
  function entre(r, debut, fin) {
    const a = Date.parse(debut + "T00:00:00Z"), b = Date.parse(fin + "T00:00:00Z");
    return date(new Date(a + Math.floor(r() * ((b - a) / 864e5 + 1)) * 864e5));
  }

  function remplir(db) {
    const r = generateur(20261015);
    const choisir = (t) => t[Math.floor(r() * t.length)];
    const ponderer = (paires) => { let x = r(), s = 0; for (const [v, p] of paires) { s += p; if (x < s) return v; } return paires[paires.length - 1][0]; };

    db.exec(DDL);
    db.exec("BEGIN");
    const inserer = (table, n) => db.prepare(`INSERT INTO ${table} VALUES (${Array(n).fill("?").join(",")})`);

    const segments = [[1, "Grand public", "B2C"], [2, "Jeunes", "B2C"], [3, "Professionnels", "B2B"], [4, "Entreprises", "B2B"]];
    let st = inserer("segment", 3); segments.forEach((s) => st.run(s)); st.free();

    const offres = [
      ["M_ESS", "Mobile Essentiel", "MOBILE", "PREPAYE", 0],
      ["M_PLUS", "Mobile Plus", "MOBILE", "POSTPAYE", 10000],
      ["M_PRO", "Mobile Pro", "MOBILE", "POSTPAYE", 25000],
      ["BOX_4G", "Box 4G", "INTERNET_MOBILE", "POSTPAYE", 15000],
      ["FX_VOIX", "Fixe Voix", "FIXE", "POSTPAYE", 6000],
      ["FIB_START", "Fibre Start", "FIBRE", "POSTPAYE", 20000],
      ["FIB_MAX", "Fibre Max", "FIBRE", "POSTPAYE", 35000]];
    st = inserer("offre", 5); offres.forEach((o) => st.run(o)); st.free();
    const prix = Object.fromEntries(offres.map((o) => [o[0], o[4]]));

    const points = [
      [1, "AG-CTR", "Agence Centre-ville", "AGENCE", "Dakar"],
      [2, "AG-PLT", "Agence Plateau", "AGENCE", "Dakar"],
      [3, "AG-THS", "Agence Thiès", "AGENCE", "Thiès"],
      [4, "AG-STL", "Agence Saint-Louis", "AGENCE", "Saint-Louis"],
      [5, "AG-ZIG", "Agence Ziguinchor", "AGENCE", "Ziguinchor"],
      [6, "BQ-MRC", "Boutique Marché Central", "BOUTIQUE", "Dakar"],
      [7, "BQ-GAR", "Boutique de la Gare", "BOUTIQUE", "Thiès"],
      [8, "BQ-KAO", "Boutique Kaolack", "BOUTIQUE", "Kaolack"],
      [9, "KQ-UNV", "Kiosque Université", "KIOSQUE", "Dakar"],
      [10, "KQ-PRT", "Kiosque du Port", "KIOSQUE", "Dakar"]];
    st = inserer("point_vente", 5); points.forEach((p) => st.run(p)); st.free();

    const agents = [];
    st = inserer("agent", 4);
    for (let i = 1; i <= 30; i++) {
      const prenom = choisir(PRENOMS), nom = choisir(NOMS);
      const point = i <= 10 ? i : 1 + Math.floor(r() * 10);  // au moins un agent par point
      const login = (prenom[0] + nom).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "") + String(100 + i);
      agents.push([i, login, `${prenom} ${nom}`, point]);
      st.run(agents[i - 1]);
    }
    st.free();

    const stClient = inserer("client", 8), stCompte = inserer("compte", 5), stContrat = inserer("contrat", 8);
    const comptesPostpayes = [];  // [id_compte, [[code_offre, date_effet, date_fin], ...]]
    let idCompte = 0, idContrat = 0;
    for (let idClient = 1; idClient <= 900; idClient++) {
      const entreprise = r() < 0.15;
      const creation = entre(r, "2019-01-01", "2026-08-31");
      if (entreprise) {
        const nomSociete = choisir(SOCIETES) + (r() < 0.6 ? "" : " " + choisir(["SARL", "SA", "& Fils", "Services"]));
        stClient.run([idClient, "C" + String(700000 + idClient), "ENTREPRISE", "", null, nomSociete, r() < 0.4 ? 3 : 4, creation]);
      } else {
        stClient.run([idClient, "C" + String(700000 + idClient), "PARTICULIER", choisir(NOMS).toUpperCase(), choisir(PRENOMS), null, r() < 0.7 ? 1 : 2, creation]);
      }
      const nbComptes = entreprise ? 1 + Math.floor(r() * 3) : (r() < 0.8 ? 1 : 2);
      for (let k = 0; k < nbComptes; k++) {
        idCompte++;
        const ouvert = entre(r, creation, "2026-09-15");
        stCompte.run([idCompte, idClient, `CPT${String(idCompte).padStart(6, "0")}`, ouvert, r() < 0.06 ? "FERME" : "ACTIF"]);
        const lignes = [];
        const nbContrats = entreprise ? 1 + Math.floor(r() * 4) : 1 + Math.floor(r() * 2.2);
        for (let c = 0; c < nbContrats; c++) {
          idContrat++;
          const offre = entreprise
            ? ponderer([["M_PRO", 0.4], ["FIB_MAX", 0.2], ["BOX_4G", 0.15], ["FX_VOIX", 0.15], ["M_PLUS", 0.1]])
            : ponderer([["M_ESS", 0.45], ["M_PLUS", 0.2], ["FIB_START", 0.15], ["BOX_4G", 0.1], ["FIB_MAX", 0.05], ["FX_VOIX", 0.05]]);
          // Activations plus nombreuses récemment, pour avoir un mois de septembre 2026 bien fourni
          const effet = r() < 0.25 ? entre(r, "2026-07-01", "2026-10-14") : entre(r, ouvert, "2026-10-14");
          let etat = ponderer([["ACTIF", 0.8], ["RESILIE", 0.14], ["SUSPENDU", 0.06]]);
          let fin = "3000-01-01";
          if (etat === "RESILIE") {
            fin = entre(r, jours(effet, 30), "2026-10-14");
            if (fin < effet) { etat = "ACTIF"; fin = "3000-01-01"; }
          }
          const agent = r() < 0.3 ? null : 1 + Math.floor(r() * 30);
          const nd = String(choisir([77, 78, 76, 70, 33])) + String(1000000 + idContrat * 7).slice(-7);
          stContrat.run([idContrat, idCompte, nd, offre, effet, fin, etat, agent]);
          if (prix[offre] > 0) lignes.push([offre, effet, fin]);
        }
        if (lignes.length) comptesPostpayes.push([idCompte, lignes]);
      }
    }
    stClient.free(); stCompte.free(); stContrat.free();

    // Factures des 12 derniers mois et encaissements correspondants
    const periodes = [];
    for (let m = 0; m < 12; m++) {
      const d = new Date(Date.UTC(2025, 9 + m, 1));
      periodes.push(d.toISOString().slice(0, 7));
    }
    const stFacture = inserer("facture", 9), stEnc = inserer("encaissement", 7);
    let idFacture = 0, idEnc = 0;
    for (const [compte, lignes] of comptesPostpayes) {
      const mauvaisPayeur = r() < 0.12;
      for (const periode of periodes) {
        const debut = periode + "-01", finMois = jours(jours(debut, 32).slice(0, 8) + "01", -1);
        let montant = 0;
        for (const [offre, effet, fin] of lignes) {
          if (effet <= finMois && fin > debut) montant += prix[offre];
        }
        if (!montant) continue;
        montant = Math.round(montant * (0.9 + r() * 0.35) / 50) * 50;
        idFacture++;
        const emission = jours(finMois, 3), echeance = jours(emission, 15);
        const statut = r() < 0.03 ? "ANNULEE" : "VALIDE";
        let paye = 0;
        if (statut === "VALIDE") {
          const age = (Date.parse(DATE_DU_JOUR) - Date.parse(echeance)) / 864e5;
          const probaPaye = mauvaisPayeur ? 0.35 : (age > 60 ? 0.93 : age > 0 ? 0.8 : 0.45);
          if (r() < probaPaye) {
            const partiel = r() < 0.1;
            const versements = partiel ? [Math.round(montant * (0.3 + r() * 0.4) / 50) * 50] : (r() < 0.15 ? [Math.round(montant / 2 / 50) * 50, montant - Math.round(montant / 2 / 50) * 50] : [montant]);
            let jour = jours(emission, Math.floor(r() * 25));
            for (const v of versements) {
              if (jour > DATE_DU_JOUR) break;
              const etat = ponderer([["VALIDE", 0.95], ["ANNULE", 0.03], ["REJETE", 0.02]]);
              const mode = ponderer([["MOBILE_MONEY", 0.46], ["ESPECES", 0.29], ["VIREMENT", 0.15], ["CARTE", 0.1]]);
              const caissier = mode === "VIREMENT" && r() < 0.7 ? null : 1 + Math.floor(r() * 30);
              idEnc++;
              stEnc.run([idEnc, idFacture, caissier, jour, v, mode, etat]);
              if (etat === "VALIDE") paye += v;
              jour = jours(jour, 5 + Math.floor(r() * 20));
            }
          }
        }
        stFacture.run([idFacture, compte, `F${periode.replace("-", "")}-${String(idFacture).padStart(6, "0")}`, periode, emission, echeance, montant, Math.max(0, montant - paye), statut]);
      }
    }
    stFacture.free(); stEnc.free();
    db.exec("COMMIT");
    // Équivalent de la session MySQL READ ONLY : plus aucune écriture possible sur cette base
    db.exec("PRAGMA query_only = ON");
  }

  window.SogolonDonnees = { DATE_DU_JOUR, DDL, COMMENTAIRES, CONNAISSANCES, remplir };
})();
