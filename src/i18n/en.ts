/**
 * English content — must stay structurally identical to fr.ts.
 * `Copy` is inferred from the French file, so a missing or renamed key
 * fails `npm run typecheck` rather than silently shipping a half-translated page.
 *
 * Content source: Context/Siraj360_SalesPrez_EN_v2.2_2026-09.pptx
 */
import type { Copy } from './types'

export const en: Copy = {
  htmlLang: 'en',
  name: 'English',
  short: 'EN',

  nav: {
    skip: 'Skip to main content',
    platform: 'The platform',
    darija: 'Darija',
    figures: 'Figures',
    offers: 'Pricing',
    publisher: 'Publisher',
    cta: 'Request a pilot',
    descriptor: 'Media intelligence',
    switchTo: 'Passer en français',
  },

  hero: {
    eyebrow: 'Product ref. P03 · Media monitoring',
    title: 'The Moroccan media monitoring and strategic intelligence platform.',
    lede: 'Press, TV, radio and social media analysed continuously by an AI that understands Arabic, Darija, French and English.',
    tagline: 'Illuminate today, anticipate tomorrow',
    chips: [
      'Data hosted in Morocco',
      'Multilingual AI AR · Darija · FR · EN',
      'Real-time monitoring',
    ],
    ctaPrimary: 'Request a free pilot',
    ctaSecondary: 'Explore the platform',
    markAlt: 'The Siraj 360 lighthouse, beams lit over the wave',
    /* Bandeau de tête : la maison mère et le lieu, avant même le titre. */
    place: 'Rabat · Morocco',
    /* Sens du nom, relevé dans la charte (brand.arabicName). */
    nameMeaning: 'The lamp, the beacon',
  },

  stakes: {
    eyebrow: 'Context',
    title: 'Mastering information today means mastering tomorrow’s decisions.',
    statValue: '5 bn',
    statUnit: 'contents per day',
    statNote: 'published every day across global media, all channels combined.',
    fieldLabel: 'What the media publish, every day',
    fieldNote: 'A handful concern you. They still have to be found.',
    risks: [
      {
        title: 'Reputation loss',
        body: 'Without monitoring, negative messages spread unchecked.',
      },
      {
        title: 'Late detection',
        body: 'Media crises escalate before teams identify them.',
      },
      {
        title: 'Foreign dependency',
        body: 'Tools hosted outside Morocco, billed in foreign currency, with no fine-grained coverage of national media.',
      },
      {
        title: 'Anticipation gap',
        body: 'Without trend tracking, strategic opportunities are missed.',
      },
    ],
    closing: 'Media monitoring is no longer a luxury: it is a lever of national sovereignty.',
  },

  pipeline: {
    eyebrow: 'Solution',
    title: 'Capture, understand, anticipate.',
    lede: 'A sovereign, intelligent, real-time platform, designed by and for Morocco.',
    steps: [
      {
        name: 'Capture',
        title: 'Multi-source collection',
        items: [
          'Press, TV, radio, social media, forums',
          'More than 100 Moroccan press sources',
          'Automated collection: RSS, APIs',
          'Near real-time pipeline, from publication to alert',
        ],
      },
      {
        name: 'Understand',
        title: 'Multilingual AI & NLP',
        items: [
          'Sentiment and entities in Arabic, Darija, French and English',
          'Automatic classification on your topics',
          'TV clips segmented by topic',
          'Word cloud, trend curves, maps',
        ],
      },
      {
        name: 'Anticipate',
        title: 'Alerts & reports',
        items: [
          'Push alerts on keywords, all channels',
          'Daily press review as a PDF',
          'Thematic GenAI reports, exportable',
          'Strategic chatbot in natural language',
        ],
      },
    ],
    flowTitle: 'From signal to decision, in near real time',
    flow: [
      { name: 'Sources', body: 'Press · TV · radio · social media · podcasts' },
      { name: 'Extraction', body: 'RSS · APIs · automated collection' },
      { name: 'Database', body: 'Structured storage, hosted in Morocco' },
      { name: 'AI engine', body: 'NLP · sentiment · entities · classification' },
      { name: 'Delivery', body: 'Dashboard · alerts · reports' },
    ],
  },

  workspace: {
    eyebrow: 'Product',
    title: 'The workspace: a single web platform to steer everything.',
    lede: 'One interface for sources, languages, sentiment, entities, alerts and reports.',
    dash: {
      app: 'Siraj 360 · Monitoring console',
      ranges: ['24 h', '7 d', '30 d'],
      live: 'Live',
      paused: 'Paused',
      kpis: [
        { label: 'Mentions · 24 h', value: '1,074', delta: '+12%', trend: 'up' },
        { label: 'Active sources', value: '118', delta: '+3', trend: 'up' },
        { label: 'Alerts triggered', value: '7', delta: '−2', trend: 'down' },
        { label: 'Median latency', value: '3 min', delta: '', trend: 'flat' },
      ],
      volume: 'Mention volume',
      volumeUnit: 'per hour, last 24 hours',
      peak: 'Peak',
      langsTitle: 'Breakdown by language',
      langs: ['Arabic', 'Darija', 'French', 'English'],
      feedTitle: 'Live feed',
      sentiment: 'Sentiment',
      note: 'Illustrative example — a demonstration of the processing, not client data.',
    },
    blocks: [
      {
        title: 'Dashboard',
        body: 'Statistics by source, language and sentiment. Word cloud, trend curves, maps. Filters on tags, stars, date, entity.',
      },
      {
        title: 'Alerts & reports',
        body: 'Push alerts on critical keywords, PDF press review, configurable thematic reports.',
      },
      {
        title: 'Strategic chatbot',
        body: 'Natural-language questions on your data, immediate summaries.',
      },
    ],
  },

  darija: {
    eyebrow: 'Differentiator',
    title: 'Arabic, Darija, French, English: the whole Moroccan conversation, read in full.',
    lede: 'The Moroccan conversation happens in Darija, often written in Latin characters. That is precisely what the international platforms do not read.',
    capabilities: [
      { title: 'Sentiment', body: 'Positive, negative, neutral — by language and by source.' },
      { title: 'Entities', body: 'People, organisations, places, brands.' },
      { title: 'Topics', body: 'Automatic classification on your monitoring topics.' },
      { title: 'TV & radio', body: 'Clips segmented with access to the excerpt.' },
    ],
    sampleCaption: 'Illustrative example of an analysed mention',
    analysis: {
      source: 'Facebook · public page',
      time: '2 min ago',
      parts: [
        { t: 'Had l’khedma dyal ' },
        { t: 'tramway', entity: 'Service' },
        { t: ' f ' },
        { t: 'Casa', entity: 'Place' },
        { t: ' wellat ahsen bezzaf, walakin ' },
        { t: 'lprix', entity: 'Price' },
        { t: ' ghali chwiya.' },
      ],
      language: 'Darija · Latin characters',
      languageScore: 0.97,
      sentiment: 'Positive, qualified',
      sentimentScore: 0.68,
      tone: 'positive',
      topic: 'Urban transport',
      confidence: 'Confidence',
      gloss: '“The tramway service in Casa has got a lot better, but the fare is a bit steep.”',
      glossLabel: 'Translation',
    },
    sampleLabels: {
      language: 'Detected language',
      sentiment: 'Sentiment',
      entities: 'Entities',
      topic: 'Topic',
    },
    samples: [
      {
        source: 'Facebook · public page',
        time: 'just now',
        text: 'Had l’khedma dyal tramway f Casa wellat ahsen bezzaf, walakin lprix ghali chwiya.',
        language: 'Darija (Latin characters)',
        sentiment: 'Positive',
        tone: 'positive',
        entities: ['Casablanca', 'Tramway'],
        topic: 'Urban transport',
      },
      {
        source: 'Online press · national daily',
        time: '1 min ago',
        text: 'انطلاق أشغال توسعة شبكة النقل الحضري بالمدينة خلال الأشهر المقبلة',
        language: 'Modern Standard Arabic',
        sentiment: 'Neutral',
        tone: 'neutral',
        entities: ['Transport network'],
        topic: 'Urban transport',
      },
      {
        source: 'X · verified account',
        time: '2 min ago',
        text: 'Another 40-minute wait this morning. Service has been getting worse since September.',
        language: 'French',
        sentiment: 'Negative',
        tone: 'negative',
        entities: ['Passenger service'],
        topic: 'Service quality',
      },
      {
        source: 'Radio · FM breakfast show',
        time: '3 min ago',
        text: 'A 2 min 40 s segment on funding the line extension, with a response from the operator.',
        language: 'French · radio clip',
        sentiment: 'Neutral',
        tone: 'neutral',
        entities: ['Operator', 'Line extension'],
        topic: 'Funding',
      },
      {
        source: 'Instagram · community account',
        time: '4 min ago',
        text: 'Lmachi f tram daba wella sahl, 3la 9bel kount kanb9a n3ttel kol nhar.',
        language: 'Darija (Latin characters)',
        sentiment: 'Positive',
        tone: 'positive',
        entities: ['Tramway'],
        topic: 'Rider experience',
      },
      {
        source: 'Online press · weekly',
        time: '6 min ago',
        text: 'الأسعار الجديدة تثير نقاشا واسعا بين المستعملين والمهنيين',
        language: 'Modern Standard Arabic',
        sentiment: 'Negative',
        tone: 'negative',
        entities: ['Pricing'],
        topic: 'Pricing',
      },
      {
        source: 'TV · 8 p.m. news',
        time: '8 min ago',
        text: 'Segmented 1 min 12 s clip: report on ridership at peak hours.',
        language: 'Arabic · TV clip',
        sentiment: 'Neutral',
        tone: 'neutral',
        entities: ['Ridership'],
        topic: 'Urban transport',
      },
    ],
    feed: {
      label: 'Monitoring feed',
      analysed: 'mentions analysed',
      live: 'Live',
      paused: 'Paused',
      pause: 'Pause the feed',
      resume: 'Resume the feed',
      disclaimer: 'Illustrative example — a demonstration of the processing, not client data.',
    },
  },

  metrics: {
    eyebrow: 'Maturity',
    title: 'A platform already in operation, validated in the field.',
    items: [
      {
        value: '816 K',
        label: 'articles in the database',
        note: 'collected, analysed and indexed.',
      },
      {
        value: '100+',
        label: 'Moroccan sources',
        note: 'press sources, in automated collection.',
      },
      { value: '4', label: 'languages', note: 'Arabic · Darija · French · English' },
      { value: '< 5 min', label: 'target latency', note: 'from publication to alert.' },
    ],
    milestones: [
      { title: 'MVP validated', body: 'End-to-end working platform.' },
      { title: 'Field pilot completed', body: 'Real usage on client monitoring topics.' },
      { title: 'Scale-up', body: 'Industrialising collection and processing.' },
    ],
    footnote: 'Indicators observed or targeted within the pilot.',
  },

  useCases: {
    eyebrow: 'Use cases',
    title: 'One platform, four business lenses.',
    items: [
      {
        title: 'Public institutions',
        body: 'Ministries, agencies, regulators: image of public action, tracking of sensitive topics, daily press review.',
      },
      {
        title: 'Corporates & banks',
        body: 'Communication departments: online reputation, competitive intelligence, early crisis detection.',
      },
      {
        title: 'Media & agencies',
        body: 'Communication and PR agencies: press review, client reports, alerts.',
      },
      {
        title: 'Events & crises',
        body: 'A dedicated scope for the duration of an event: elections, launch, crisis — custom themes and alerts.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Positioning',
    title: 'Against the international media monitoring platforms.',
    columns: ['Criterion', 'Meltwater', 'Talkwalker', 'Siraj 360'],
    rows: [
      ['Data hosting', 'United States', 'United States', 'Morocco'],
      ['Moroccan media coverage', 'Partial', 'Partial', 'Complete'],
      ['Arabic & Darija support', 'Limited', 'Limited', 'Native'],
      ['TV / video segmentation', 'No', 'Partial', 'Yes'],
      ['Conversational AI agent', 'No', 'No', 'Yes'],
      ['Business model', 'Subscription in €', 'Subscription in €', 'Tailored, in MAD'],
    ],
    closing:
      'The difference lies in the combination of AI platform + sovereignty + Darija, not in a single feature.',
    source: 'Comparison compiled by Harmony Technology, September 2026.',
  },

  sovereignty: {
    eyebrow: 'Commitments',
    title: 'Sovereignty, security, compliance.',
    lede: 'Your monitoring data stays in Morocco, under Moroccan law, billed in dirhams.',
    items: [
      {
        title: 'Hosted in Morocco',
        body: '100% of collected and indexed data is stored on infrastructure hosted in Morocco.',
      },
      {
        title: 'Law 09-08 compliance',
        body: 'Personal data processing compliant with Law 09-08 · no profiling of private individuals.',
      },
      {
        title: 'Cybersecurity',
        body: 'End-to-end encryption and half-yearly security audits.',
      },
      {
        title: 'Diversified sources',
        body: 'Permanent diversification and contractual watch against dependency on third-party APIs.',
      },
      {
        title: 'Copyright',
        body: 'Partnerships with publishers and specialised legal counsel on content reuse.',
      },
      {
        title: 'Scalability',
        body: 'Cloud-native architecture, auto-scaling and proactive monitoring during load peaks.',
      },
    ],
    footnote:
      'Billing in dirhams · R&D co-funding possible · guaranteed data reversibility at end of contract.',
  },

  offers: {
    eyebrow: 'Offer',
    title: 'A commercial model adapted to each profile.',
    tiers: [
      {
        name: 'Institutional',
        audience: 'Ministries · administrations',
        features: [
          'Tailored annual licence',
          'Onboarding & training included',
          'Guaranteed SLA & dedicated support',
          'Sovereign hosting',
        ],
      },
      {
        name: 'Enterprise',
        audience: 'Large groups · media',
        features: [
          'Configurable modules',
          'Integration API',
          'Custom reports',
          'Multi-user & roles',
        ],
      },
      {
        name: 'SMEs & agencies',
        audience: 'Communication agencies',
        features: [
          'Flexible monthly subscription',
          'Simplified interface',
          'Essential alerts & reports',
          'Support by e-mail / chat',
        ],
      },
      {
        name: 'Partners',
        audience: 'Resellers · integrators',
        features: [
          'Supported resale',
          'Integration API',
          'Reports for your clients',
          'Team training',
        ],
      },
    ],
    footnote: 'Pricing in MAD · R&D co-funding possible · free pilot on request.',
  },

  publisher: {
    eyebrow: 'The publisher',
    title: 'Siraj 360 is published by Harmony.',
    lede: 'Siraj 360 is not a standalone product: it comes from a firm that has been building information systems for the public sector and industry for over ten years.',
    figures: [
      { value: '+11', label: 'years of expertise', note: 'AI, IoT and smart city' },
      { value: '+110', label: 'experts', note: 'Multidisciplinary team' },
      { value: '+150', label: 'clients', note: 'Africa and the MENA region' },
      { value: '+250', label: 'digital projects', note: '15 patents and innovations' },
    ],
    pillarsTitle: 'Four domains',
    pillars: [
      'Document intelligence and digital knowledge',
      'AI, data analysis and development',
      'Smart industry X.0 — IoT and robotics',
      'Smart cities and territorial intelligence',
    ],
    addressTitle: 'Head office',
    address: 'Villa no. 14, rue Annassime, block M, sector 9, Hay Riad — 10100 Rabat',
    labTitle: 'Innovation centre',
    lab: 'Villa no. 9, rue Al Kassous, sector 11, Hay Riad — 10100 Rabat',
    footnote: 'Figures published by Harmony on harmony.ma.',
  },

  pilot: {
    eyebrow: 'Next step',
    title: 'Launch your pilot, measure the value.',
    lede: 'A scoping workshop, a four-week pilot on your own monitoring topics, then a measured review: you decide on results.',
    steps: [
      { title: 'Scoping workshop', body: 'Your priority topics, sources and keywords.' },
      { title: '4-week pilot', body: 'Sovereign deployment and team onboarding.' },
      { title: 'Review & roll-out', body: 'Measured gains and roll-out plan.' },
    ],
    form: {
      legend: 'Request a free pilot',
      organisation: 'Organisation',
      profile: 'Profile',
      profileOptions: ['Public institution', 'Corporate or bank', 'Media or agency', 'Other'],
      fullName: 'Full name',
      role: 'Role',
      email: 'Work e-mail',
      phone: 'Phone',
      topics: 'Your priority monitoring topics',
      topicsHint: 'Themes, brands, institutions or keywords to track.',
      optional: 'optional',
      consent:
        'I agree that Harmony Technology may process this information to answer my request, in accordance with Law 09-08.',
      submit: 'Send my request',
      submitting: 'Sending…',
      successTitle: 'Request sent.',
      successBody:
        'Our sales department will get back to you within two business days to set up the scoping workshop.',
      errorTitle: 'Sending failed.',
      errorBody: 'Try again in a moment, or write to us directly at',
      required: 'This field is required.',
      invalidEmail: 'Enter a valid e-mail address.',
      consentRequired: 'Your agreement is needed to process the request.',
      privacyTitle: 'Personal data',
      privacy:
        'The information collected is processed by Harmony, Hay Riad — 10100 Rabat, solely to handle your pilot request. It is neither passed to third parties nor used for any other purpose, and is kept for the duration of the commercial exchange. Under Law 09-08 you have a right of access, rectification and objection, which you may exercise at the address above.',
      privacyCndp: 'Processing declared to the CNDP under no. ',
    },
  },

  footer: {
    company: 'Harmony Technology',
    baseline: 'Where Technology Meets Humanity',
    catalog: 'Product ref. P03 — Media monitoring & strategic intelligence',
    contactTitle: 'Contact',
    officeTitle: 'Head office',
    office: 'Harmony · Hay Riad, 10100 Rabat, Morocco',
    siteTitle: 'Website',
    rights: 'All rights reserved.',
    legal: 'Legal notice',
    privacy: 'Data protection',
  },
}
