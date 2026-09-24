/**
 * Contenu français — langue de référence.
 *
 * Le type `Copy` est inféré depuis ce fichier (voir ./types.ts) : toute clé
 * ajoutée ici doit être traduite dans en.ts, sinon `npm run typecheck` échoue.
 * C'est volontaire — le deck commercial v2.2 a dérivé entre FR et EN, on ne
 * laisse pas la landing page dériver.
 *
 * Source du contenu : Context/Siraj360_SalesPrez_FR_v2.2_2026-09.pptx
 */
export const fr = {
  htmlLang: 'fr',
  name: 'Français',
  short: 'FR',

  nav: {
    skip: 'Aller au contenu principal',
    platform: 'La plateforme',
    darija: 'Darija',
    figures: 'Chiffres',
    offers: 'Offres',
    publisher: 'Éditeur',
    cta: 'Demander un pilote',
    descriptor: 'Veille médiatique',
    switchTo: 'Switch to English',
  },

  hero: {
    eyebrow: 'Réf. produit P03 · Veille médiatique',
    title: 'La plateforme marocaine de veille médiatique et d’intelligence stratégique.',
    lede: 'Presse, TV, radios et réseaux sociaux analysés en continu par une IA qui comprend l’arabe, la darija, le français et l’anglais.',
    tagline: 'Éclairer aujourd’hui, anticiper demain',
    chips: [
      'Données hébergées au Maroc',
      'IA multilingue AR · Darija · FR · EN',
      'Veille temps réel',
    ],
    ctaPrimary: 'Demander un pilote gratuit',
    ctaSecondary: 'Découvrir la plateforme',
    markAlt: 'Le phare Siraj 360, faisceaux allumés sur la vague',
    /* Bandeau de tête : la maison mère et le lieu, avant même le titre. */
    place: 'Rabat · Maroc',
    /* Sens du nom, relevé dans la charte (brand.arabicName). */
    nameMeaning: 'La lampe, le flambeau',
  },

  stakes: {
    eyebrow: 'Contexte',
    title: 'Maîtriser l’information aujourd’hui, c’est maîtriser la décision de demain.',
    statValue: '5 Mrd',
    statUnit: 'contenus par jour',
    statNote: 'publiés chaque jour sur les médias mondiaux, tous canaux confondus.',
    /* Légendes du champ de bruit : c'est lui qui porte l'argument, le texte
       ne fait que le nommer. */
    fieldLabel: 'Ce que publient les médias, chaque jour',
    fieldNote: 'Une poignée vous concerne. Encore faut-il la trouver.',
    risks: [
      {
        title: 'Perte d’image',
        body: 'Sans monitoring, les messages négatifs prolifèrent sans intervention.',
      },
      {
        title: 'Détection tardive',
        body: 'Les crises médiatiques s’emballent avant d’être identifiées par les équipes.',
      },
      {
        title: 'Dépendance étrangère',
        body: 'Outils hébergés hors du Maroc, facturés en devises, sans couverture fine des médias nationaux.',
      },
      {
        title: 'Déficit anticipatif',
        body: 'Sans suivi des tendances, les opportunités stratégiques sont manquées.',
      },
    ],
    closing:
      'La veille médiatique n’est plus un luxe : c’est un levier de souveraineté nationale.',
  },

  pipeline: {
    eyebrow: 'Solution',
    title: 'Capter, comprendre, anticiper.',
    lede: 'Une plateforme souveraine, intelligente et temps réel, conçue par et pour le Maroc.',
    steps: [
      {
        name: 'Capter',
        title: 'Collecte multi-sources',
        items: [
          'Presse, TV, radios, réseaux sociaux, forums',
          'Plus de 100 sources de presse marocaines',
          'Collecte automatisée : RSS, APIs',
          'Pipeline quasi temps réel, de la publication à l’alerte',
        ],
      },
      {
        name: 'Comprendre',
        title: 'IA & NLP multilingue',
        items: [
          'Sentiment et entités en arabe, darija, français et anglais',
          'Classification automatique sur vos thématiques',
          'Segmentation des séquences TV par thématique',
          'Wordcloud, courbes de tendance, cartes',
        ],
      },
      {
        name: 'Anticiper',
        title: 'Alertes & rapports',
        items: [
          'Alertes push sur mots-clés, tous canaux',
          'Revue de presse quotidienne en PDF',
          'Rapports GenAI thématiques, exportables',
          'Chatbot stratégique en langage naturel',
        ],
      },
    ],
    flowTitle: 'Du signal à la décision, en quasi temps réel',
    flow: [
      { name: 'Sources', body: 'Presse · TV · radios · réseaux sociaux · podcasts' },
      { name: 'Extraction', body: 'RSS · APIs · collecte automatisée' },
      { name: 'Base de données', body: 'Stockage structuré, hébergé au Maroc' },
      { name: 'Moteur IA', body: 'NLP · sentiment · entités · classification' },
      { name: 'Restitution', body: 'Tableau de bord · alertes · rapports' },
    ],
  },

  workspace: {
    eyebrow: 'Produit',
    title: 'Le poste de travail : une plateforme web unique pour tout piloter.',
    lede: 'Une seule interface pour les sources, les langues, le sentiment, les entités, les alertes et les rapports.',
    dash: {
      app: 'Siraj 360 · Console de veille',
      ranges: ['24 h', '7 j', '30 j'],
      live: 'En direct',
      paused: 'En pause',
      kpis: [
        { label: 'Mentions · 24 h', value: '1 074', delta: '+12 %', trend: 'up' },
        { label: 'Sources actives', value: '118', delta: '+3', trend: 'up' },
        { label: 'Alertes déclenchées', value: '7', delta: '−2', trend: 'down' },
        { label: 'Latence médiane', value: '3 min', delta: '', trend: 'flat' },
      ],
      volume: 'Volume des mentions',
      volumeUnit: 'par heure, 24 dernières heures',
      peak: 'Pic',
      langsTitle: 'Répartition par langue',
      langs: ['Arabe', 'Darija', 'Français', 'Anglais'],
      feedTitle: 'Flux en direct',
      sentiment: 'Sentiment',
      note: 'Exemple illustratif — démonstration du traitement, pas des données client.',
    },
    blocks: [
      {
        title: 'Tableau de bord',
        body: 'Statistiques par source, langue et sentiment. Wordcloud, courbes de tendance, cartes. Filtres tags, étoiles, date, entité.',
      },
      {
        title: 'Alertes & rapports',
        body: 'Alertes push sur mots-clés critiques, revue de presse PDF, rapports thématiques configurables.',
      },
      {
        title: 'Chatbot stratégique',
        body: 'Questions en langage naturel sur vos données, synthèses immédiates.',
      },
    ],
  },

  darija: {
    eyebrow: 'Différenciateur',
    title: 'Arabe, darija, français, anglais : la conversation marocaine, lue en entier.',
    lede: 'La conversation marocaine se tient en darija, souvent écrite en caractères latins. C’est exactement ce que les plateformes internationales ne lisent pas.',
    capabilities: [
      { title: 'Sentiment', body: 'Positif, négatif, neutre — par langue et par source.' },
      { title: 'Entités', body: 'Personnes, organisations, lieux, marques.' },
      { title: 'Thématiques', body: 'Classification automatique sur vos sujets de veille.' },
      { title: 'TV & radio', body: 'Segmentation des séquences avec accès à l’extrait.' },
    ],
    sampleCaption: 'Exemple illustratif d’une mention analysée',
    /* La mention vitrine, décomposée : c'est la démonstration du produit.
       `parts` porte le marquage d'entités en ligne — impossible à déduire
       du texte seul, et c'est précisément ce que fait le moteur. */
    analysis: {
      source: 'Facebook · page publique',
      time: 'il y a 2 min',
      parts: [
        { t: 'Had l’khedma dyal ' },
        { t: 'tramway', entity: 'Service' },
        { t: ' f ' },
        { t: 'Casa', entity: 'Lieu' },
        { t: ' wellat ahsen bezzaf, walakin ' },
        { t: 'lprix', entity: 'Tarif' },
        { t: ' ghali chwiya.' },
      ],
      language: 'Darija · caractères latins',
      languageScore: 0.97,
      sentiment: 'Positif, nuancé',
      sentimentScore: 0.68,
      tone: 'positive',
      topic: 'Transport urbain',
      confidence: 'Confiance',
      gloss:
        '« Le service du tramway à Casa s’est beaucoup amélioré, mais le prix est un peu cher. »',
      glossLabel: 'Traduction',
    },
    sampleLabels: {
      language: 'Langue détectée',
      sentiment: 'Sentiment',
      entities: 'Entités',
      topic: 'Thématique',
    },
    samples: [
      {
        source: 'Facebook · page publique',
        time: 'à l’instant',
        text: 'Had l’khedma dyal tramway f Casa wellat ahsen bezzaf, walakin lprix ghali chwiya.',
        language: 'Darija (caractères latins)',
        sentiment: 'Positif',
        tone: 'positive',
        entities: ['Casablanca', 'Tramway'],
        topic: 'Transport urbain',
      },
      {
        source: 'Presse en ligne · quotidien national',
        time: 'il y a 1 min',
        text: 'انطلاق أشغال توسعة شبكة النقل الحضري بالمدينة خلال الأشهر المقبلة',
        language: 'Arabe standard',
        sentiment: 'Neutre',
        tone: 'neutral',
        entities: ['Réseau de transport'],
        topic: 'Transport urbain',
      },
      {
        source: 'X · compte vérifié',
        time: 'il y a 2 min',
        text: 'Encore 40 minutes d’attente ce matin. Le service se dégrade depuis la rentrée.',
        language: 'Français',
        sentiment: 'Négatif',
        tone: 'negative',
        entities: ['Service voyageurs'],
        topic: 'Qualité de service',
      },
      {
        source: 'Radio · matinale FM',
        time: 'il y a 3 min',
        text: 'Séquence de 2 min 40 sur le financement du prolongement de la ligne, avec réaction de l’exploitant.',
        language: 'Français · séquence radio',
        sentiment: 'Neutre',
        tone: 'neutral',
        entities: ['Exploitant', 'Prolongement de ligne'],
        topic: 'Financement',
      },
      {
        source: 'Instagram · compte communautaire',
        time: 'il y a 4 min',
        text: 'Lmachi f tram daba wella sahl, 3la 9bel kount kanb9a n3ttel kol nhar.',
        language: 'Darija (caractères latins)',
        sentiment: 'Positif',
        tone: 'positive',
        entities: ['Tramway'],
        topic: 'Expérience usager',
      },
      {
        source: 'Presse en ligne · hebdomadaire',
        time: 'il y a 6 min',
        text: 'الأسعار الجديدة تثير نقاشا واسعا بين المستعملين والمهنيين',
        language: 'Arabe standard',
        sentiment: 'Négatif',
        tone: 'negative',
        entities: ['Tarification'],
        topic: 'Tarification',
      },
      {
        source: 'TV · journal de 20 h',
        time: 'il y a 8 min',
        text: 'Séquence segmentée de 1 min 12 : reportage sur la fréquentation en heure de pointe.',
        language: 'Arabe · séquence TV',
        sentiment: 'Neutre',
        tone: 'neutral',
        entities: ['Fréquentation'],
        topic: 'Transport urbain',
      },
    ],
    feed: {
      label: 'Flux de veille',
      analysed: 'mentions analysées',
      live: 'En direct',
      paused: 'En pause',
      pause: 'Mettre le flux en pause',
      resume: 'Reprendre le flux',
      disclaimer: 'Exemple illustratif — démonstration du traitement, pas des données client.',
    },
  },

  metrics: {
    eyebrow: 'Maturité',
    title: 'Une plateforme déjà opérationnelle, validée sur le terrain.',
    items: [
      { value: '816 K', label: 'articles en base', note: 'collectés, analysés et indexés.' },
      {
        value: '100+',
        label: 'sources marocaines',
        note: 'de presse, en collecte automatisée.',
      },
      { value: '4', label: 'langues', note: 'arabe · darija · français · anglais' },
      { value: '< 5 min', label: 'latence cible', note: 'de la publication à l’alerte.' },
    ],
    milestones: [
      { title: 'MVP validé', body: 'Plateforme fonctionnelle de bout en bout.' },
      { title: 'Pilote terrain réalisé', body: 'Usage réel sur des sujets de veille clients.' },
      {
        title: 'Passage à l’échelle',
        body: 'Industrialisation de la collecte et du traitement.',
      },
    ],
    footnote: 'Indicateurs observés ou visés dans le cadre du pilote.',
  },

  useCases: {
    eyebrow: 'Cas d’usage',
    title: 'Un même socle, quatre lectures métier.',
    items: [
      {
        title: 'Institutions publiques',
        body: 'Ministères, agences, régulateurs : image de l’action publique, suivi des sujets sensibles, revue de presse quotidienne.',
      },
      {
        title: 'Entreprises & banques',
        body: 'Directions de la communication : e-réputation, veille concurrentielle, détection précoce des crises.',
      },
      {
        title: 'Médias & agences',
        body: 'Agences de communication et relations presse : revue de presse, rapports pour leurs clients, alertes.',
      },
      {
        title: 'Événements & crises',
        body: 'Scope dédié le temps d’un événement : élections, lancement, crise — thèmes et alertes sur mesure.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Positionnement',
    title: 'Face aux plateformes internationales de veille médiatique.',
    columns: ['Critère', 'Meltwater', 'Talkwalker', 'Siraj 360'],
    rows: [
      ['Hébergement des données', 'États-Unis', 'États-Unis', 'Maroc'],
      ['Couverture des médias marocains', 'Partielle', 'Partielle', 'Complète'],
      ['Support arabe & darija', 'Limité', 'Limité', 'Natif'],
      ['Segmentation TV / vidéo', 'Non', 'Partielle', 'Oui'],
      ['Agent IA conversationnel', 'Non', 'Non', 'Oui'],
      ['Modèle économique', 'Abonnement en €', 'Abonnement en €', 'Sur mesure, en MAD'],
    ],
    closing:
      'La différence tient à la combinaison plateforme IA + souveraineté + darija, pas à une fonctionnalité isolée.',
    source: 'Comparatif établi par Harmony Technology, septembre 2026.',
  },

  sovereignty: {
    eyebrow: 'Engagements',
    title: 'Souveraineté, sécurité, conformité.',
    lede: 'Vos données de veille restent au Maroc, sous droit marocain, facturées en dirhams.',
    items: [
      {
        title: 'Hébergement au Maroc',
        body: '100 % des données collectées et indexées sont stockées sur une infrastructure hébergée au Maroc.',
      },
      {
        title: 'Conformité loi 09-08',
        body: 'Traitement des données personnelles conforme à la loi 09-08 · aucun profilage d’individus privés.',
      },
      {
        title: 'Cybersécurité',
        body: 'Chiffrement de bout en bout et audits de sécurité semestriels.',
      },
      {
        title: 'Sources diversifiées',
        body: 'Diversification permanente et veille contractuelle face à la dépendance aux APIs tierces.',
      },
      {
        title: 'Droits d’auteur',
        body: 'Partenariats avec les éditeurs et conseil juridique spécialisé sur la reprise de contenus.',
      },
      {
        title: 'Scalabilité',
        body: 'Architecture cloud-native, auto-scaling et monitoring proactif lors des pics de charge.',
      },
    ],
    footnote:
      'Facturation en dirhams · co-financement R&D possible · réversibilité des données garantie en fin de contrat.',
  },

  offers: {
    eyebrow: 'Offre',
    title: 'Un modèle commercial adapté à chaque profil.',
    tiers: [
      {
        name: 'Institutionnel',
        audience: 'Ministères · administrations',
        features: [
          'Licence annuelle sur mesure',
          'Onboarding & formation inclus',
          'SLA garanti & support dédié',
          'Hébergement souverain',
        ],
      },
      {
        name: 'Entreprise',
        audience: 'Grands groupes · médias',
        features: [
          'Modules configurables',
          'API d’intégration',
          'Rapports personnalisés',
          'Multi-utilisateurs & rôles',
        ],
      },
      {
        name: 'PME & agences',
        audience: 'Agences de communication',
        features: [
          'Abonnement mensuel souple',
          'Interface simplifiée',
          'Alertes & rapports essentiels',
          'Support par e-mail / chat',
        ],
      },
      {
        name: 'Partenaires',
        audience: 'Revendeurs · intégrateurs',
        features: [
          'Revente accompagnée',
          'API d’intégration',
          'Rapports pour vos clients',
          'Formation des équipes',
        ],
      },
    ],
    footnote: 'Tarification en MAD · co-financement R&D possible · pilote gratuit sur demande.',
  },

  publisher: {
    eyebrow: 'L’éditeur',
    title: 'Siraj 360 est édité par Harmony.',
    lede: 'Siraj 360 n’est pas un produit isolé : il sort d’une maison qui construit des systèmes d’information pour le secteur public et l’industrie depuis plus de dix ans.',
    figures: [
      { value: '+11', label: 'ans d’expertise', note: 'IA, IoT et ville intelligente' },
      { value: '+110', label: 'experts', note: 'Équipe pluridisciplinaire' },
      { value: '+150', label: 'clients', note: 'Afrique et région MENA' },
      { value: '+250', label: 'projets digitaux', note: '15 brevets et innovations' },
    ],
    pillarsTitle: 'Quatre domaines',
    pillars: [
      'Intelligence documentaire et savoir numérique',
      'IA, analyse de données et développement',
      'Industrie intelligente X.0 — IoT et robotique',
      'Villes intelligentes et intelligence territoriale',
    ],
    addressTitle: 'Siège',
    address: 'Villa n° 14, rue Annassime, bloc M, secteur 9, Hay Riad — 10100 Rabat',
    labTitle: 'Centre d’innovation',
    lab: 'Villa n° 9, rue Al Kassous, secteur 11, Hay Riad — 10100 Rabat',
    footnote: 'Chiffres publiés par Harmony sur harmony.ma.',
  },

  pilot: {
    eyebrow: 'Prochaine étape',
    title: 'Lancez votre pilote, mesurez la valeur.',
    lede: 'Un atelier de cadrage, quatre semaines de pilote sur vos propres sujets de veille, puis un bilan chiffré : vous décidez sur des résultats.',
    steps: [
      { title: 'Atelier de cadrage', body: 'Vos sujets, sources et mots-clés prioritaires.' },
      {
        title: 'Pilote de 4 semaines',
        body: 'Déploiement souverain et prise en main des équipes.',
      },
      { title: 'Bilan & déploiement', body: 'Mesure des gains et plan de généralisation.' },
    ],
    form: {
      legend: 'Demander un pilote gratuit',
      organisation: 'Organisation',
      profile: 'Profil',
      profileOptions: [
        'Institution publique',
        'Entreprise ou banque',
        'Média ou agence',
        'Autre',
      ],
      fullName: 'Nom et prénom',
      role: 'Fonction',
      email: 'E-mail professionnel',
      phone: 'Téléphone',
      topics: 'Vos sujets de veille prioritaires',
      topicsHint: 'Thématiques, marques, institutions ou mots-clés à suivre.',
      optional: 'facultatif',
      consent:
        'J’accepte que Harmony Technology traite ces informations pour répondre à ma demande, conformément à la loi 09-08.',
      submit: 'Envoyer ma demande',
      submitting: 'Envoi en cours…',
      successTitle: 'Demande envoyée.',
      successBody:
        'Notre direction commerciale vous recontacte sous 48 heures ouvrées pour fixer l’atelier de cadrage.',
      errorTitle: 'L’envoi a échoué.',
      errorBody: 'Réessayez dans un instant, ou écrivez-nous directement à',
      required: 'Ce champ est obligatoire.',
      invalidEmail: 'Saisissez une adresse e-mail valide.',
      consentRequired: 'Votre accord est nécessaire pour traiter la demande.',
      privacyTitle: 'Données à caractère personnel',
      privacy:
        'Les informations recueillies sont traitées par Harmony, Hay Riad — 10100 Rabat, aux seules fins d’instruire votre demande de pilote. Elles ne sont ni cédées à des tiers ni utilisées à d’autres fins, et sont conservées le temps de l’échange commercial. Conformément à la loi 09-08, vous disposez d’un droit d’accès, de rectification et d’opposition, que vous pouvez exercer à l’adresse ci-dessus.',
      privacyCndp: 'Traitement déclaré à la CNDP sous le n° ',
    },
  },

  footer: {
    company: 'Harmony Technology',
    baseline: 'Where Technology Meets Humanity',
    catalog: 'Réf. produit P03 — Veille médiatique & intelligence stratégique',
    contactTitle: 'Contact',
    officeTitle: 'Siège',
    office: 'Harmony · Hay Riad, 10100 Rabat, Maroc',
    siteTitle: 'Site',
    rights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Protection des données',
  },
}
