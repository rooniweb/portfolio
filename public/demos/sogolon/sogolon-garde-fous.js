/* Sogolon — POC portfolio : garde-fous appliqués au SQL avant exécution.
 *
 * Portage JavaScript (adapté à SQLite) des contrôles du prototype : une seule instruction de lecture,
 * mots-clés d'écriture refusés hors chaînes et commentaires, pas de variables, LIMIT ajouté si absent.
 * Expose window.SogolonGardeFous = { valider(sql) } qui renvoie { ok, sql, controles, erreur }.
 */
(function () {
  "use strict";

  const LIMITE_LIGNES = 1000;
  const MOTS_INTERDITS = [
    "INSERT", "UPDATE", "DELETE", "REPLACE", "MERGE", "UPSERT",
    "DROP", "ALTER", "CREATE", "TRUNCATE", "RENAME",
    "GRANT", "REVOKE", "LOCK", "UNLOCK", "CALL", "EXECUTE", "PREPARE",
    "LOAD", "SET", "INTO", "OUTFILE", "ATTACH", "DETACH", "PRAGMA", "VACUUM", "REINDEX", "ANALYZE"];
  const RE_INTERDITS = new RegExp("\\b(" + MOTS_INTERDITS.join("|") + ")\\b", "i");

  // Renvoie { propre, masque } : commentaires retirés ; dans `masque`, chaînes et identifiants remplacés par '_'.
  function analyser(sql) {
    let propre = "", masque = "", i = 0;
    const n = sql.length;
    while (i < n) {
      const c = sql[i];
      if (sql.startsWith("/*", i)) {
        const fin = sql.indexOf("*/", i + 2);
        if (fin === -1) throw new Error("Commentaire /* non fermé.");
        propre += " "; masque += " "; i = fin + 2; continue;
      }
      if (sql.startsWith("--", i)) {
        const fin = sql.indexOf("\n", i);
        i = fin === -1 ? n : fin; continue;
      }
      if (c === "'" || c === '"' || c === "`") {
        let j = i + 1;
        while (j < n) {
          if (sql[j] === c) {
            if (sql[j + 1] === c) { j += 2; continue; }  // guillemet doublé
            break;
          }
          j++;
        }
        if (j >= n) throw new Error("Chaîne ou identifiant non fermé.");
        propre += sql.slice(i, j + 1); masque += c + "_" + c; i = j + 1; continue;
      }
      propre += c; masque += c; i++;
    }
    return { propre, masque };
  }

  // Vrai si la requête principale (hors sous-requêtes) a déjà un LIMIT.
  function aLimitNiveauZero(masque) {
    let profondeur = 0, niveauZero = "";
    for (const c of masque) {
      if (c === "(") profondeur++;
      else if (c === ")") profondeur--;
      niveauZero += profondeur === 0 && c !== ")" ? c : " ";
    }
    return /\bLIMIT\b/i.test(niveauZero);
  }

  function valider(sql) {
    const controles = [];
    const verifier = (libelle, ok, detail) => { controles.push({ libelle, ok, detail }); return ok; };
    const refus = (erreur) => ({ ok: false, sql: null, controles, erreur });

    if (!verifier("Requête non vide", !!(sql && sql.trim()))) return refus("Requête vide.");
    let propre, masque;
    try {
      ({ propre, masque } = analyser(sql));
    } catch (e) {
      verifier("Syntaxe lisible", false, e.message);
      return refus(e.message);
    }
    propre = propre.trim().replace(/;\s*$/, "").trim();
    masque = masque.trim().replace(/;\s*$/, "").trim();

    if (!verifier("Une seule instruction", !masque.includes(";")))
      return refus("Une seule instruction est autorisée.");
    if (!verifier("Commence par SELECT ou WITH", /^\(?\s*(SELECT|WITH)\b/i.test(masque)))
      return refus("Seules les requêtes commençant par SELECT ou WITH sont autorisées.");
    const interdit = masque.match(RE_INTERDITS);
    if (!verifier("Aucun mot-clé d'écriture", !interdit, interdit ? interdit[0].toUpperCase() : ""))
      return refus(`Mot-clé interdit : ${interdit[0].toUpperCase()}.`);
    if (!verifier("Pas de variables", !/[@$]/.test(masque)))
      return refus("Les variables sont interdites.");

    const limite = aLimitNiveauZero(masque);
    verifier(limite ? "LIMIT déjà présent" : `LIMIT ${LIMITE_LIGNES} ajouté`, true);
    if (!limite) propre += `\nLIMIT ${LIMITE_LIGNES}`;
    verifier("Session en lecture seule (PRAGMA query_only)", true);
    return { ok: true, sql: propre, controles, erreur: null };
  }

  window.SogolonGardeFous = { valider, LIMITE_LIGNES };
})();
