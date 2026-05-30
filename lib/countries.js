// Phone / WhatsApp country codes — African countries first, then international
export const PHONE_CODES = [
  // West Africa
  { code: '+228', label: '🇹🇬 Togo (+228)', lengths: [8] },
  { code: '+229', label: '🇧🇯 Bénin (+229)', lengths: [8] },
  { code: '+226', label: '🇧🇫 Burkina Faso (+226)', lengths: [8] },
  { code: '+225', label: '🇨🇮 Côte d\'Ivoire (+225)', lengths: [10] },
  { code: '+233', label: '🇬🇭 Ghana (+233)', lengths: [9] },
  { code: '+224', label: '🇬🇳 Guinée (+224)', lengths: [9] },
  { code: '+245', label: '🇬🇼 Guinée-Bissau (+245)', lengths: [7] },
  { code: '+231', label: '🇱🇷 Liberia (+231)', lengths: [7, 8, 9] },
  { code: '+223', label: '🇲🇱 Mali (+223)', lengths: [8] },
  { code: '+222', label: '🇲🇷 Mauritanie (+222)', lengths: [8] },
  { code: '+234', label: '🇳🇬 Nigeria (+234)', lengths: [10] },
  { code: '+227', label: '🇳🇪 Niger (+227)', lengths: [8] },
  { code: '+221', label: '🇸🇳 Sénégal (+221)', lengths: [9] },
  { code: '+232', label: '🇸🇱 Sierra Leone (+232)', lengths: [8] },
  { code: '+220', label: '🇬🇲 Gambie (+220)', lengths: [7] },
  { code: '+238', label: '🇨🇻 Cap-Vert (+238)', lengths: [7] },

  // Central Africa
  { code: '+237', label: '🇨🇲 Cameroun (+237)', lengths: [9] },
  { code: '+236', label: '🇨🇫 Rép. Centrafricaine (+236)', lengths: [8] },
  { code: '+235', label: '🇹🇩 Tchad (+235)', lengths: [8] },
  { code: '+241', label: '🇬🇦 Gabon (+241)', lengths: [8, 9] },
  { code: '+242', label: '🇨🇬 Congo-Brazzaville (+242)', lengths: [9] },
  { code: '+243', label: '🇨🇩 Rép. Dém. Congo (+243)', lengths: [9] },
  { code: '+240', label: '🇬🇶 Guinée Équatoriale (+240)', lengths: [9] },
  { code: '+239', label: '🇸🇹 Sao Tomé-et-Principe (+239)', lengths: [7] },

  // East Africa & Horn
  { code: '+257', label: '🇧🇮 Burundi (+257)', lengths: [8] },
  { code: '+253', label: '🇩🇯 Djibouti (+253)', lengths: [8] },
  { code: '+291', label: '🇪🇷 Érythrée (+291)', lengths: [7] },
  { code: '+251', label: '🇪🇹 Éthiopie (+251)', lengths: [9] },
  { code: '+254', label: '🇰🇪 Kenya (+254)', lengths: [9] },
  { code: '+250', label: '🇷🇼 Rwanda (+250)', lengths: [9] },
  { code: '+252', label: '🇸🇴 Somalie (+252)', lengths: [8, 9] },
  { code: '+211', label: '🇸🇸 Soudan du Sud (+211)', lengths: [9] },
  { code: '+249', label: '🇸🇩 Soudan (+249)', lengths: [9] },
  { code: '+255', label: '🇹🇿 Tanzanie (+255)', lengths: [9] },
  { code: '+256', label: '🇺🇬 Ouganda (+256)', lengths: [9] },

  // Southern Africa & Indian Ocean
  { code: '+244', label: '🇦🇴 Angola (+244)', lengths: [9] },
  { code: '+267', label: '🇧🇼 Botswana (+267)', lengths: [7, 8] },
  { code: '+268', label: '🇸🇿 Eswatini (+268)', lengths: [8] },
  { code: '+266', label: '🇱🇸 Lesotho (+266)', lengths: [8] },
  { code: '+261', label: '🇲🇬 Madagascar (+261)', lengths: [9] },
  { code: '+265', label: '🇲🇼 Malawi (+265)', lengths: [7, 8, 9] },
  { code: '+230', label: '🇲🇺 Maurice (+230)', lengths: [7, 8] },
  { code: '+258', label: '🇲🇿 Mozambique (+258)', lengths: [9] },
  { code: '+264', label: '🇳🇦 Namibie (+264)', lengths: [8, 9] },
  { code: '+248', label: '🇸🇨 Seychelles (+248)', lengths: [7] },
  { code: '+27',  label: '🇿🇦 Afrique du Sud (+27)', lengths: [9] },
  { code: '+260', label: '🇿🇲 Zambie (+260)', lengths: [9] },
  { code: '+263', label: '🇿🇼 Zimbabwe (+263)', lengths: [9] },
  { code: '+269', label: '🇰🇲 Comores (+269)', lengths: [7] },

  // North Africa
  { code: '+212', label: '🇲🇦 Maroc (+212)', lengths: [9] },
  { code: '+213', label: '🇩🇿 Algérie (+213)', lengths: [9] },
  { code: '+216', label: '🇹🇳 Tunisie (+216)', lengths: [8] },
  { code: '+218', label: '🇱🇾 Libye (+218)', lengths: [8, 9] },
  { code: '+20',  label: '🇪🇬 Égypte (+20)', lengths: [10] },

  // Europe & Americas & Others
  { code: '+33',  label: '🇫🇷 France (+33)', lengths: [9] },
  { code: '+32',  label: '🇧🇪 Belgique (+32)', lengths: [8, 9] },
  { code: '+41',  label: '🇨🇭 Suisse (+41)', lengths: [9] },
  { code: '+1',   label: '🇺🇸 USA / Canada (+1)', lengths: [10] },
  { code: '+44',  label: '🇬🇧 Royaume-Uni (+44)', lengths: [10] },
  { code: '+49',  label: '🇩🇪 Allemagne (+49)', lengths: [10, 11] },
  { code: '+34',  label: '🇪🇸 Espagne (+34)', lengths: [9] },
  { code: '+39',  label: '🇮🇹 Italie (+39)', lengths: [9, 10] },
  { code: '+86',  label: '🇨🇳 Chine (+86)', lengths: [11] },
  { code: '+91',  label: '🇮🇳 Inde (+91)', lengths: [10] },
  { code: '+90',  label: '🇹🇷 Turquie (+90)', lengths: [10] },
  { code: '+966', label: '🇸🇦 Arabie Saoudite (+966)', lengths: [9] },
  { code: '+971', label: '🇦🇪 Émirats Arabes Unis (+971)', lengths: [9] },
]

export const NATIONALITIES = [
  // West Africa
  'Togolaise', 'Béninoise', 'Burkinabé', 'Ivoirienne', 'Ghanéenne',
  'Guinéenne', 'Bissau-Guinéenne', 'Libérienne', 'Malienne', 'Mauritanienne',
  'Nigériane', 'Nigérienne', 'Sénégalaise', 'Sierra-Léonaise', 'Gambienne', 'Cap-Verdienne',

  // Central Africa
  'Camerounaise', 'Centrafricaine', 'Tchadienne', 'Gabonaise',
  'Congolaise (Brazzaville)', 'Congolaise (RDC)', 'Équato-Guinéenne', 'Santoméenne',

  // East Africa
  'Burundaise', 'Djiboutienne', 'Érythréenne', 'Éthiopienne', 'Kenyane',
  'Rwandaise', 'Somalienne', 'Sud-Soudanaise', 'Soudanaise', 'Tanzanienne', 'Ougandaise',

  // Southern Africa
  'Angolaise', 'Botswanaise', 'Eswatinienne', 'Lesothane', 'Malgache',
  'Malawienne', 'Mauricienne', 'Mozambicaine', 'Namibienne', 'Seychelloise',
  'Sud-Africaine', 'Zambienne', 'Zimbabwéenne', 'Comorienne',

  // North Africa
  'Marocaine', 'Algérienne', 'Tunisienne', 'Libyenne', 'Égyptienne',

  // European & Others
  'Française', 'Belge', 'Suisse', 'Américaine', 'Canadienne', 'Britannique',
  'Allemande', 'Espagnole', 'Italienne', 'Chinoise', 'Indienne', 'Turque',
  'Saoudienne', 'Émiratie', 'Autre'
]

export function cleanPhoneNumber(code, number) {
  if (!number) return ''
  let clean = number.replace(/\D/g, '')
  if (code !== '+1' && clean.startsWith('0')) {
    clean = clean.substring(1)
  }
  return clean
}

export function validatePhoneNumber(code, number) {
  const clean = cleanPhoneNumber(code, number)
  if (!clean) return false
  const country = PHONE_CODES.find(c => c.code === code)
  if (!country) {
    return clean.length >= 7 && clean.length <= 15
  }
  return country.lengths.includes(clean.length)
}
