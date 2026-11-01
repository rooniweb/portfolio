// Replays of typical runs. Every document, account, person and tool name here is
// fictional and labelled as such on the page.
import type { L } from './content';

export type StepKind = 'input' | 'trigger' | 'think' | 'decide' | 'extract' | 'tool' | 'obs' | 'retrieved' | 'llm' | 'route' | 'answer' | 'refuse';
export type Step = { kind: StepKind; meta?: L | string; body: L | string; code?: boolean };
export type Scenario = { label: L; steps: Step[] };

export const kindLabel: Record<StepKind, L> = {
  input: { en: 'Input', fr: 'Entrée' },
  trigger: { en: 'Trigger', fr: 'Déclencheur' },
  think: { en: 'Reasoning', fr: 'Raisonnement' },
  decide: { en: 'Decision · TypeSafe Jev', fr: 'Décision · TypeSafe Jev' },
  extract: { en: 'Extraction · LLM', fr: 'Extraction · LLM' },
  tool: { en: 'Tool call', fr: 'Appel d’outil' },
  obs: { en: 'Tool result', fr: 'Résultat' },
  retrieved: { en: 'Retrieved', fr: 'Passage retrouvé' },
  llm: { en: 'LLM output', fr: 'Sortie du LLM' },
  route: { en: 'Routing', fr: 'Routage' },
  answer: { en: 'Answer', fr: 'Réponse' },
  refuse: { en: 'Grounded refusal', fr: 'Refus ancré' },
};

export const demos: Record<string, Scenario[]> = {
  email: [
    {
      label: { en: 'Billing complaint', fr: 'Réclamation facture' },
      steps: [
        { kind: 'input', meta: { en: 'New email · client@example.com', fr: 'Nouvel e-mail · client@example.com' }, body: { en: '“Hello, my October invoice charges the fibre subscription twice. Can you correct it?”', fr: '« Bonjour, ma facture d’octobre compte deux fois l’abonnement fibre. Pouvez-vous corriger ? »' } },
        { kind: 'trigger', body: { en: 'n8n picks up the email from the shared mailbox.', fr: 'n8n récupère l’e-mail dans la boîte partagée.' } },
        { kind: 'decide', meta: { en: 'typed questions · probabilities', fr: 'questions typées · probabilités' }, code: true, body: `category  (choice) → billing_complaint   p = 0.93
urgency   (score)  → high                p = 0.81
reply_needed (yes/no) → yes              p = 0.97
confidence 0.91 ≥ threshold 0.80 → automatic routing` },
        { kind: 'extract', code: true, body: `{ "invoice_month": "2026-10", "product": "fibre",
  "issue": "duplicate subscription line" }` },
        { kind: 'route', body: { en: 'Sent to the billing queue, tagged high priority, with the fields pre-filled.', fr: 'Envoyé à la file facturation, marqué prioritaire, avec les champs pré-remplis.' } },
      ],
    },
    {
      label: { en: 'Ambiguous request', fr: 'Demande ambiguë' },
      steps: [
        { kind: 'input', meta: { en: 'New email · customer@example.com', fr: 'Nouvel e-mail · abonne@example.com' }, body: { en: '“Since the move nothing works and I was charged anyway. What do I do?”', fr: '« Depuis le déménagement rien ne marche et on m’a quand même facturé. Je fais comment ? »' } },
        { kind: 'trigger', body: { en: 'n8n picks up the email from the shared mailbox.', fr: 'n8n récupère l’e-mail dans la boîte partagée.' } },
        { kind: 'decide', meta: { en: 'typed questions · probabilities', fr: 'questions typées · probabilités' }, code: true, body: `category  (choice) → technical_issue     p = 0.48
                     billing_complaint   p = 0.41
confidence 0.52 < threshold 0.80 → human review` },
        { kind: 'route', body: { en: 'Too uncertain to route automatically: sent to an agent’s review queue with both candidate categories.', fr: 'Trop incertain pour un routage automatique : envoyé en revue humaine avec les deux catégories candidates.' } },
      ],
    },
    {
      label: { en: 'Newsletter', fr: 'Newsletter' },
      steps: [
        { kind: 'input', meta: { en: 'New email · news@example.org', fr: 'Nouvel e-mail · news@example.org' }, body: { en: '“Our monthly digest: five trends to follow this autumn.”', fr: '« Notre lettre mensuelle : cinq tendances à suivre cet automne. »' } },
        { kind: 'trigger', body: { en: 'n8n picks up the email from the shared mailbox.', fr: 'n8n récupère l’e-mail dans la boîte partagée.' } },
        { kind: 'decide', meta: { en: 'typed questions · probabilities', fr: 'questions typées · probabilités' }, code: true, body: `action_needed (yes/no) → no   p = 0.98
confidence 0.98 → no LLM call needed` },
        { kind: 'route', body: { en: 'Archived. Nobody has to open it, and no LLM tokens were spent.', fr: 'Archivé. Personne n’a besoin de l’ouvrir, et aucun jeton LLM n’a été dépensé.' } },
      ],
    },
  ],

  migroo: [
    {
      label: { en: 'Incident deadline', fr: 'Délai d’incident' },
      steps: [
        { kind: 'input', body: { en: 'How long do we have to report a security incident?', fr: 'De combien de temps dispose-t-on pour signaler un incident de sécurité ?' } },
        { kind: 'retrieved', meta: 'procedure-manual.pdf · p.12 · ¶3 · l.41 · dense #1 · BM25 #2', body: { en: '“Any security incident must be reported to the security desk within 24 hours of detection.”', fr: '« Tout incident de sécurité doit être signalé au guichet sécurité dans les 24 heures suivant sa détection. »' } },
        { kind: 'retrieved', meta: 'procedure-manual.pdf · p.12 · ¶4 · l.47 · dense #3 · BM25 #1', body: { en: '“The report uses form SEC-02 and names the affected system.”', fr: '« Le signalement utilise le formulaire SEC-02 et précise le système concerné. »' } },
        { kind: 'answer', body: { en: 'Within 24 hours of detection, using form SEC-02 and naming the affected system. [procedure-manual.pdf, p.12, ¶3–4]', fr: 'Dans les 24 heures suivant la détection, avec le formulaire SEC-02 en précisant le système concerné. [procedure-manual.pdf, p.12, ¶3–4]' } },
      ],
    },
    {
      label: { en: 'Payment approval', fr: 'Validation de paiement' },
      steps: [
        { kind: 'input', body: { en: 'Who approves a supplier payment above the threshold?', fr: 'Qui valide un paiement fournisseur au-dessus du seuil ?' } },
        { kind: 'retrieved', meta: 'finance-policy.pdf · p.4 · ¶2 · l.18 · dense #1 · BM25 #1', body: { en: '“Payments above the threshold require approval from the finance director, then a second signature.”', fr: '« Les paiements au-dessus du seuil exigent la validation du directeur financier, puis une seconde signature. »' } },
        { kind: 'answer', body: { en: 'The finance director approves, then a second signature is required. [finance-policy.pdf, p.4, ¶2]', fr: 'Le directeur financier valide, puis une seconde signature est requise. [finance-policy.pdf, p.4, ¶2]' } },
      ],
    },
  ],

  privasearch: [
    {
      label: { en: 'In the documents', fr: 'Dans les documents' },
      steps: [
        { kind: 'input', body: { en: 'How many remote work days are allowed per week?', fr: 'Combien de jours de télétravail sont autorisés par semaine ?' } },
        { kind: 'retrieved', meta: { en: 'hr-handbook.pdf · p.7 · similarity 0.82', fr: 'guide-rh.pdf · p.7 · similarité 0,82' }, body: { en: '“Employees may work remotely up to two days per week, agreed with their manager.”', fr: '« Les salariés peuvent télétravailler jusqu’à deux jours par semaine, en accord avec leur manager. »' } },
        { kind: 'answer', body: { en: 'Up to two days per week, agreed with your manager. [hr-handbook.pdf, p.7]', fr: 'Jusqu’à deux jours par semaine, en accord avec votre manager. [guide-rh.pdf, p.7]' } },
      ],
    },
    {
      label: { en: 'Not in the documents', fr: 'Hors des documents' },
      steps: [
        { kind: 'input', body: { en: 'What is the CEO’s salary?', fr: 'Quel est le salaire du directeur général ?' } },
        { kind: 'retrieved', meta: { en: 'hr-handbook.pdf · p.3 · similarity 0.31', fr: 'guide-rh.pdf · p.3 · similarité 0,31' }, body: { en: '“Salary bands are reviewed every year by the HR committee.”', fr: '« Les grilles salariales sont revues chaque année par le comité RH. »' } },
        { kind: 'refuse', body: { en: 'The documents provided do not contain this information, so I cannot answer.', fr: 'Les documents fournis ne contiennent pas cette information : je ne peux pas répondre.' } },
      ],
    },
  ],

  agent: [
    {
      label: { en: 'Weekly spending', fr: 'Dépenses de la semaine' },
      steps: [
        { kind: 'input', body: { en: 'How much did I spend this week?', fr: 'Combien ai-je dépensé cette semaine ?' } },
        { kind: 'think', body: { en: 'I need the transactions of the last 7 days.', fr: 'Il me faut les transactions des 7 derniers jours.' } },
        { kind: 'tool', code: true, body: 'get_transactions(period="7d")' },
        { kind: 'obs', code: true, body: `[
  { "to": "Shop A", "amount": 4500 },
  { "to": "Transport", "amount": 3000 },
  { "to": "Airtime", "amount": 5000 }
]` },
        { kind: 'think', body: { en: 'Three payments. Total: 12,500 FCFA. I can answer.', fr: 'Trois paiements. Total : 12 500 FCFA. Je peux répondre.' } },
        { kind: 'answer', body: { en: 'You spent 12,500 FCFA this week across 3 transactions; airtime was the largest at 5,000 FCFA.', fr: 'Vous avez dépensé 12 500 FCFA cette semaine en 3 transactions ; le crédit téléphonique est le plus important, 5 000 FCFA.' } },
      ],
    },
    {
      label: { en: 'Ambiguous transfer', fr: 'Transfert ambigu' },
      steps: [
        { kind: 'input', body: { en: 'Send 5,000 FCFA to Awa.', fr: 'Envoie 5 000 FCFA à Awa.' } },
        { kind: 'think', body: { en: 'A transfer moves money: first make sure who Awa is.', fr: 'Un transfert déplace de l’argent : d’abord vérifier qui est Awa.' } },
        { kind: 'tool', code: true, body: 'find_contact(name="Awa")' },
        { kind: 'obs', code: true, body: `[
  { "name": "Awa D.", "number": "+221 7X XXX XX 01" },
  { "name": "Awa N.", "number": "+221 7X XXX XX 02" }
]` },
        { kind: 'think', body: { en: 'Two matches. Do not guess: ask the user before any transfer.', fr: 'Deux correspondances. Ne pas deviner : demander avant tout transfert.' } },
        { kind: 'answer', body: { en: 'I found two contacts named Awa (D. and N.). Which one should receive 5,000 FCFA? I will ask you to confirm before sending.', fr: 'J’ai trouvé deux contacts nommés Awa (D. et N.). Lequel doit recevoir 5 000 FCFA ? Je vous demanderai confirmation avant l’envoi.' } },
      ],
    },
  ],
};
