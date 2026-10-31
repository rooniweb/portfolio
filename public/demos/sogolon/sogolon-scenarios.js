/* Sogolon — POC portfolio : questions de démonstration.
 *
 * Requêtes PRÉ-ÉCRITES dans le style de celles de l'assistante (alias en français, règles de la base de
 * connaissance appliquées). Le POC en ligne n'appelle aucun modèle : il les rejoue, comme le prototype
 * rejoue une « requête validée » sans dépenser de jeton.
 * graphique : "barres" (1re colonne = libellé, colonne `valeur` = nombre), "chiffre" (une seule valeur) ou null.
 */
window.SogolonScenarios = [
  {
    id: "parc_actif",
    question: "Combien de contrats actifs avons-nous ?",
    explication: "Contrat actif = état ACTIF et date de fin « sans fin » (3000-01-01), selon le commentaire de la colonne.",
    graphique: "chiffre", valeur: "nb_contrats_actifs",
    sql: `SELECT COUNT(*) AS nb_contrats_actifs
FROM contrat
WHERE etat = 'ACTIF'
  AND date_fin = '3000-01-01'`
  },
  {
    id: "encaissements_boutique",
    question: "Encaissements de septembre 2026 par boutique",
    explication: "« Boutique » = tout point de vente (base de connaissance). Point d'encaissement retrouvé par le caissier ; seuls les encaissements VALIDE comptent.",
    graphique: "barres", libelle: "point_vente", valeur: "montant_encaisse",
    sql: `SELECT p.nom AS point_vente,
       p.type AS type_point,
       COUNT(*) AS nb_encaissements,
       SUM(e.montant) AS montant_encaisse
FROM encaissement e
JOIN agent a ON a.id = e.id_agent
JOIN point_vente p ON p.id = a.id_point
WHERE e.etat = 'VALIDE'
  AND e.date_encaissement >= '2026-09-01'
  AND e.date_encaissement < '2026-10-01'
GROUP BY p.id, p.nom, p.type
ORDER BY montant_encaisse DESC`
  },
  {
    id: "activations_agent",
    question: "Nombre de contrats activés par agent en septembre 2026",
    explication: "Date d'activation = date_effet. Les ventes en ligne (sans agent) sont écartées.",
    graphique: "barres", libelle: "agent", valeur: "nb_activations",
    sql: `SELECT a.login AS login_agent,
       a.nom AS agent,
       p.nom AS point_vente,
       COUNT(*) AS nb_activations
FROM contrat c
JOIN agent a ON a.id = c.id_agent
JOIN point_vente p ON p.id = a.id_point
WHERE c.date_effet >= '2026-09-01'
  AND c.date_effet < '2026-10-01'
GROUP BY a.id, a.login, a.nom, p.nom
ORDER BY nb_activations DESC`
  },
  {
    id: "comptes_impayes",
    question: "Comptes avec plus de 3 factures impayées",
    explication: "Facture impayée = statut VALIDE et solde > 0. Nom affiché : nom du particulier ou raison sociale de l'entreprise.",
    graphique: "barres", libelle: "client", valeur: "montant_impaye",
    sql: `SELECT co.code AS compte,
       COALESCE(NULLIF(TRIM(cl.nom), ''), cl.raison_sociale) AS client,
       COUNT(*) AS nb_factures_impayees,
       SUM(f.solde) AS montant_impaye
FROM facture f
JOIN compte co ON co.id = f.id_compte
JOIN client cl ON cl.id = co.id_client
WHERE f.statut = 'VALIDE'
  AND f.solde > 0
GROUP BY co.id, co.code, client
HAVING COUNT(*) > 3
ORDER BY montant_impaye DESC`
  },
  {
    id: "parc_univers",
    question: "Répartition du parc actif par univers d'offre",
    explication: "Jointure contrat → offre sur le code d'offre ; contrats actifs uniquement.",
    graphique: "barres", libelle: "univers", valeur: "nb_contrats",
    sql: `SELECT o.univers AS univers,
       COUNT(*) AS nb_contrats,
       ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS part_pct
FROM contrat c
JOIN offre o ON o.code = c.code_offre
WHERE c.etat = 'ACTIF'
  AND c.date_fin = '3000-01-01'
GROUP BY o.univers
ORDER BY nb_contrats DESC`
  },
  {
    id: "balance_agee",
    question: "Balance âgée des impayés au 15 octobre 2026",
    explication: "Ancienneté comptée depuis la date d'échéance jusqu'à la date du jour (règle de la base de connaissance).",
    graphique: "barres", libelle: "tranche_anciennete", valeur: "montant_impaye",
    sql: `WITH impayes AS (
  SELECT solde,
         julianday('2026-10-15') - julianday(date_echeance) AS jours_retard
  FROM facture
  WHERE statut = 'VALIDE' AND solde > 0
)
SELECT CASE
         WHEN jours_retard <= 0 THEN '1. Non échu'
         WHEN jours_retard <= 30 THEN '2. 1 à 30 jours'
         WHEN jours_retard <= 60 THEN '3. 31 à 60 jours'
         WHEN jours_retard <= 90 THEN '4. 61 à 90 jours'
         ELSE '5. Plus de 90 jours'
       END AS tranche_anciennete,
       COUNT(*) AS nb_factures,
       SUM(solde) AS montant_impaye
FROM impayes
GROUP BY tranche_anciennete
ORDER BY tranche_anciennete`
  },
  {
    id: "ca_mensuel",
    question: "Évolution du chiffre d'affaires facturé par mois",
    explication: "Somme des factures VALIDE par période AAAA-MM.",
    graphique: "barres", libelle: "periode", valeur: "ca_facture",
    sql: `SELECT periode,
       COUNT(*) AS nb_factures,
       SUM(montant) AS ca_facture
FROM facture
WHERE statut = 'VALIDE'
GROUP BY periode
ORDER BY periode`
  },
  {
    id: "recouvrement",
    question: "Taux de recouvrement par mois de facturation",
    explication: "Encaissé = montant facturé moins le solde restant, rapporté au montant facturé.",
    graphique: "barres", libelle: "periode", valeur: "taux_recouvrement_pct",
    sql: `SELECT periode,
       SUM(montant) AS facture,
       SUM(montant - solde) AS encaisse,
       ROUND(100.0 * SUM(montant - solde) / SUM(montant), 1) AS taux_recouvrement_pct
FROM facture
WHERE statut = 'VALIDE'
GROUP BY periode
ORDER BY periode`
  },
  {
    id: "modes_paiement",
    question: "Part des encaissements par mode de paiement en 2026",
    explication: "Encaissements VALIDE de l'année, part calculée sur le montant.",
    graphique: "barres", libelle: "mode_paiement", valeur: "montant",
    sql: `SELECT mode_paiement,
       COUNT(*) AS nb_encaissements,
       SUM(montant) AS montant,
       ROUND(100.0 * SUM(montant) / SUM(SUM(montant)) OVER (), 1) AS part_pct
FROM encaissement
WHERE etat = 'VALIDE'
  AND date_encaissement >= '2026-01-01'
GROUP BY mode_paiement
ORDER BY montant DESC`
  },
  {
    id: "top_clients_entreprise",
    question: "Top 10 des entreprises par chiffre d'affaires facturé en 2026",
    explication: "Clients de type ENTREPRISE, factures VALIDE des périodes 2026.",
    graphique: "barres", libelle: "entreprise", valeur: "ca_facture",
    sql: `SELECT cl.code AS code_client,
       cl.raison_sociale AS entreprise,
       COUNT(DISTINCT co.id) AS nb_comptes,
       SUM(f.montant) AS ca_facture
FROM facture f
JOIN compte co ON co.id = f.id_compte
JOIN client cl ON cl.id = co.id_client
WHERE cl.type_client = 'ENTREPRISE'
  AND f.statut = 'VALIDE'
  AND f.periode >= '2026-01'
GROUP BY cl.id, cl.code, cl.raison_sociale
ORDER BY ca_facture DESC
LIMIT 10`
  },
  {
    id: "garde_fou_ecriture",
    question: "Supprime les factures annulées",
    explication: "Démonstration des garde-fous : une demande d'écriture produit un DELETE, refusé avant toute exécution.",
    graphique: null,
    sql: `DELETE FROM facture
WHERE statut = 'ANNULEE'`
  },
  {
    id: "hors_schema",
    question: "Quel est le salaire moyen des agents ?",
    explication: "Aucune colonne de salaire dans le schéma : l'assistante répond IMPOSSIBLE au lieu d'inventer un nom de colonne.",
    graphique: null, impossible: true,
    sql: `-- IMPOSSIBLE : le schéma ne contient aucune information de salaire sur les agents.`
  }
];
