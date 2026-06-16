export const TICKER_ITEMS = [
  'UNIT ONLINE',
  'ID VERIFIED',
  'NAYAX ACTIVE',
  'TVPA COMPLIANT',
  'AGE 19+ CONFIRMED',
  'AUTO-RESTOCK',
  'REVENUE SHARE',
  'ZERO COST TO VENUE',
] as const;

export const BADGES = [
  { variant: 'pk' as const, label: 'Launching YVR 2026' },
  { variant: 'pu' as const, label: '100% Free Terminals' },
  { variant: 'pk' as const, label: '19+ Verified' },
  { variant: 'pu' as const, label: 'TVPA Compliant' },
];

export const FEATURES = [
  {
    variant: 'pk' as const,
    icon: '🪪',
    title: 'ID Scanner',
    description:
      'PDF417 barcode scan on all Canadian IDs. Hard lock on fail. Zero human override possible.',
  },
  {
    variant: 'pu' as const,
    icon: '💳',
    title: 'Cashless Pay',
    description:
      'Nayax POS. Interac, Apple Pay, Google Pay, and tap. Every sale logged automatically.',
  },
  {
    variant: 'pk' as const,
    icon: '📡',
    title: 'Live Monitor',
    description:
      'Real-time inventory telemetry. We restock before you run out — your staff never touch it.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    variant: 'pk' as const,
    number: '01',
    title: 'We own the hardware',
    description:
      'The machine is ours — purchased, certified, and delivered at zero cost to you. Nayax POS and PDF417 ID scanner built in.',
  },
  {
    variant: 'pu' as const,
    number: '02',
    title: 'We hold every filing',
    description:
      'BCER Notice of Intent, TVPA compliance, city business licence. All regulatory obligations sit with us — not your venue.',
  },
  {
    variant: 'pk' as const,
    number: '03',
    title: 'We handle all operations',
    description:
      'Restocking, signage, maintenance, and tax remittance handled end to end. Your staff never interact with the machine.',
  },
  {
    variant: 'pu' as const,
    number: '04',
    title: 'You collect a revenue share',
    description:
      'Monthly deposit, every venue. Real-time sales data through the operator dashboard. Passive income for providing the floor space.',
  },
];

export const HOME_COMPLIANCE_ITEMS = [
  {
    title: 'BC Tobacco and Vapour Products Control Act (TVPA)',
    description:
      'All sales, inventory, and reporting obligations managed under the TVPA. Full provincial compliance maintained on an ongoing basis.',
  },
  {
    title: 'BCER Notice of Intent — E-Substances Regulation',
    description:
      'Filed through the BC Energy Regulator portal per venue, per unit, before deployment.',
  },
  {
    title: 'City Business Licence',
    description:
      'Active business licence on file in every city of operation before machines are placed.',
  },
];

export const VENUE_TYPES = [
  'Nightclub',
  'Lounge / Bar',
  'Live Music Venue',
  'Event Space',
  'Hotel',
] as const;

export const TECH_ITEMS = [
  {
    variant: 'default' as const,
    icon: '🪪',
    tag: 'Age Verification',
    title: 'PDF417 Optical Scanner',
    description:
      'Reads all Canadian provincial IDs in under a second. Verifies DOB, checks authenticity markers, and hard-locks the machine on any failed read. No manual bypass.',
  },
  {
    variant: 'pk' as const,
    icon: '💳',
    tag: 'Payments',
    title: 'Nayax POS Terminal',
    description:
      'Trusted by vending operators across 55 countries. Supports Interac, Visa, Mastercard, Apple Pay, and Google Pay. Every transaction encrypted and logged in real time.',
  },
  {
    variant: 'pk' as const,
    icon: '📡',
    tag: 'Monitoring',
    title: 'Live Telemetry Network',
    description:
      'Always-on connection streams inventory levels, sales data, and machine health 24/7. We know what\'s selling and what\'s low before your staff ever notice.',
  },
  {
    variant: 'default' as const,
    icon: '🔒',
    tag: 'Regulatory',
    title: 'VTM Compliance Engine',
    description:
      'Built on Vending Telemetry Management protocol. Automates TVPA sales reporting, flags anomalies, and maintains a full audit trail for every transaction.',
  },
];

export const HARDWARE_UNITS = {
  wall: {
    id: 'wall' as const,
    label: 'The Vault Slim Wall',
    unitLabel: 'Wall-Fit Unit',
    name: 'VAULT\nSLIM WALL',
    description:
      'Built for tight installs — behind-bar alcoves, VIP corridors, and bottle service zones. Mounts flush to the wall with no floor footprint. Same full compliance stack, smaller profile.',
    imageAlt: 'The Vault Slim Wall unit',
    specs: [
      { key: 'Screen', value: '21" LED Touch' },
      { key: 'Install Type', value: 'Wall Mount' },
      { key: 'ID Verification', value: 'PDF417' },
      { key: 'Payment', value: 'Nayax POS' },
    ],
  },
  tower: {
    id: 'tower' as const,
    label: 'The Vault Slim Tower',
    unitLabel: 'Floor-Standing Unit',
    name: 'VAULT\nSLIM TOWER',
    description:
      'Built for open floor placement — main rooms, patios, and high-traffic corridors. Freestanding tower format with maximum visibility. Same full compliance stack, standalone footprint.',
    imageAlt: 'The Vault Slim Tower unit',
    specs: [
      { key: 'Screen', value: '32" LED Touch' },
      { key: 'Install Type', value: 'Freestanding' },
      { key: 'ID Verification', value: 'PDF417' },
      { key: 'Payment', value: 'Nayax POS' },
    ],
  },
};

export const COMPLIANCE_REGIMES = [
  {
    number: '01',
    level: 'Federal',
    name: 'CANADA — TOBACCO & VAPING PRODUCTS ACT',
    act: 'Tobacco and Vaping Products Act (TVPA)',
    text: 'All vapour products sold through Vault terminals comply with federal packaging, labelling, and nicotine concentration limits. Sales restricted to adults 19+ in BC. No promotion visible to minors.',
    pills: [
      { variant: 'pu' as const, label: 'Federal Compliance' },
      { variant: 'pk' as const, label: '19+ Sales Only' },
    ],
  },
  {
    number: '02',
    level: 'Provincial',
    name: 'BC — TOBACCO & VAPOUR PRODUCTS CONTROL ACT',
    act: 'TVPA · E-Substances Regulation · TVPA Regulation',
    text: 'Every unit operates under full provincial compliance. We file BCER Notice of Intent per venue, maintain Tobacco Retail Authorization, affix mandated warning decals, and report all sales through the VTM compliance engine.',
    pills: [
      { variant: 'pu' as const, label: 'BCER Filed' },
      { variant: 'pk' as const, label: 'TVPA Compliant' },
      { variant: 'gr' as const, label: 'Decals Affixed' },
    ],
  },
  {
    number: '03',
    level: 'Municipal',
    name: 'CITY — BUSINESS LICENCE & LOCAL BYLAWS',
    act: 'Municipal Business Licence · Local Health Authority',
    text: 'Active business licence on file in every city of operation before machines are placed. Units deployed only in **19+ licensed venues** where minors cannot access or view the machine.',
    pills: [
      { variant: 'gr' as const, label: 'Licence Active' },
      { variant: 'pk' as const, label: '19+ Venue Only' },
    ],
  },
];

export type HardwareUnitId = keyof typeof HARDWARE_UNITS;

export const FAQ_ITEMS = [
  {
    question: 'What is The Vault?',
    answer:
      'The Vault is a premium age-verified vape vending service for licensed 19+ venues in British Columbia. We place smart vending terminals in nightclubs, bars, lounges, hotels, and hospitality spaces at zero cost to the venue, with full regulatory compliance handled by our team.',
  },
  {
    question: 'How much does it cost my venue?',
    answer:
      'Nothing upfront. The Vault purchases, delivers, installs, and maintains every unit. Your venue provides floor space in a 19+ licensed environment and receives a monthly revenue share from sales.',
  },
  {
    question: 'Who handles compliance and regulatory filings?',
    answer:
      'The Vault Vending Inc. holds all regulatory obligations — including TVPA compliance, BCER Notice of Intent filings, city business licences, and sales reporting. Your venue holds zero regulatory liability.',
  },
  {
    question: 'How does age verification work?',
    answer:
      'Every sale requires a PDF417 barcode scan of a valid Canadian government ID. The machine verifies date of birth and hard-locks on any failed read. There is no manual override.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'All units include Nayax cashless payment terminals supporting Interac, Visa, Mastercard, Apple Pay, Google Pay, and contactless tap. Every transaction is encrypted and logged automatically.',
  },
  {
    question: 'Which venue types qualify?',
    answer:
      'Licensed 19+ venues in British Columbia including nightclubs, bars, lounges, live music venues, casinos, hotels, and private event spaces where minors cannot access or view the machine.',
  },
  {
    question: 'Do my staff need to restock or maintain the machine?',
    answer:
      'No. The Vault handles restocking, signage, maintenance, and tax remittance end to end. Live telemetry alerts our team before inventory runs low.',
  },
  {
    question: 'Where is The Vault launching?',
    answer:
      'The Vault is launching in Metro Vancouver (YVR) in 2026, with expansion across British Columbia for qualified hospitality partners.',
  },
] as const;
