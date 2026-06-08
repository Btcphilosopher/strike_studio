import { Project, ServiceDetail } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'maison-du-lac',
    title: 'MAISON DU LAC',
    location: 'Austin, Texas',
    country: 'USA',
    year: '2023',
    area: '340 m²',
    client: 'Privé',
    image: '/src/assets/images/maison_du_lac_1780916358418.png',
    description: "Une demeure de béton et de verre s'insérant avec délicatesse sur les rives rocheuses du lac d'Austin. Conçue pour épouser les variations naturelles de la lumière texane, elle propose une frontière poreuse entre espaces intérieurs raffinés et végétation sauvage. Chaque volume s'aligne rigoureusement sur les courbes topographiques pour dissimuler sa présence depuis les rivages opposés.",
    highlights: ["Intégration topographique", "Récupération d'eaux de pluie", "Béton bas carbone matricé", "Piscine naturelle filtrée"]
  },
  {
    id: 'loft-tribeca',
    title: 'LOFT TRIBECA',
    location: 'New York, New York',
    country: 'USA',
    year: '2022',
    area: '210 m²',
    client: 'Collectionneur d’art',
    image: '/src/assets/images/loft_tribeca_1780916371549.png',
    description: "Une réinterprétation contemporaine d'un espace industriel historique de Manhattan. Les volumes d'origine sont préservés et structurés par un jeu subtil de boîtes en bois sombre et de verrières d'acier brut. Les textures d'origine, briques patinées par le temps et solives de cèdre rouge, sont sublimées par l'application de crépis artisanaux à base de chaux et des touches de bronze mat.",
    highlights: ["Restauration de briques", "Mezzanine suspendue d'acier", "Acoustique muséale optimisée", "Ventilation double flux intégrée"]
  },
  {
    id: 'pavillon-desert',
    title: 'PAVILLON DESERT',
    location: 'Palm Springs, California',
    country: 'USA',
    year: '2024',
    area: '185 m²',
    client: 'Fondation d’Art',
    image: '/src/assets/images/pavillon_desert_1780916386784.png',
    description: "Un havre de paix horizontal à l'architecture radicalement épurée, niché au cœur des sables arides de Palm Springs. Pensé pour absorber les fortes oscillations thermiques quotidiennes du désert, le bâtiment s'appuie sur de grands pans de pisé local et de très profonds avant-toits d'aluminium brossé. Une circulation d'air naturelle traversante rafraîchit les patios intérieurs sans recours à la climatisation active.",
    highlights: ["Épaisseur thermique en pisé local", "Autarcie solaire complète", "Patios d'ombrage géométriques", "Flore désertique résiliente"]
  },
  {
    id: 'villa-monolithes',
    title: 'VILLA MONOLITHE',
    location: 'Surgères, France',
    country: 'France',
    year: '2021',
    area: '410 m²',
    client: 'Famille Royer',
    image: 'https://picsum.photos/seed/monolith/800/600',
    description: "Un bloc sculptural de calcaire local extrait en bloc à moins de 30 kilomètres du site. Ce volume minéral colossal fait face aux plaines maraîchères, protégé par des ouvertures fines semblables à des meurtrières sur son flanc nord, et complètement vitré au sud derrière d'élégants brise-soleil rétractables en bois d'acacia.",
    highlights: ["Calcaire local porteur", "Double isolation liège expansé", "Plafonnier chauffant géothermique", "Chêne massif de forêt certifiée"]
  },
  {
    id: 'tour-mecanique',
    title: 'TOUR MÉCANIQUE',
    location: 'Lyon, France',
    country: 'France',
    year: '2023',
    area: '1 250 m²',
    client: 'Métropole de Lyon',
    image: 'https://picsum.photos/seed/mecanique/800/600',
    description: "Un tiers-lieu expérimental de réemploi de matériaux ferroviaires en centre urbain. En mariant habilement une ossature métallique réassemblée et des remplissages de façades en terre crue stabilisée et paille hachée, le bâtiment affiche un bilan carbone exceptionnellement négatif dès sa livraison.",
    highlights: ["Charpente de réemploi", "Mur rideau paille isolée", "Régulation hygrométrique passive", "Terrasses de permaculture"]
  },
  {
    id: 'pavillon-solaire',
    title: 'PAVILLON SOLAIRE',
    location: 'Sion, Suisse',
    country: 'Suisse',
    year: '2024',
    area: '120 m²',
    client: 'Club Alpin Suisse',
    image: 'https://picsum.photos/seed/solaire/800/600',
    description: "Établi à 1 800 mètres d'altitude, ce refuge d'alpage d'avant-garde tire parti de l'ensoleillement de la vallée du Rhône pour fonctionner de façon 100% autonome. Sa toiture intègre des capteurs photovoltaïques minéraux de couleur ardoise, préservant l'unité visuelle avec les granges alpines environnantes tout en assurant l'alimentation hivernale.",
    highlights: ["Toiture photovoltaïque minérale", "Structure préfabriquée en mélèze", "Filtration de neige fondue", "Zéro rejet environnemental"]
  }
];

export const SERVICES: ServiceDetail[] = [
  {
    id: 'architecture',
    title: 'ARCHITECTURE',
    tagline: 'Des bâtiments durables et inspirants, conçus pour leur contexte.',
    description: 'Une démarche architecturale globale recherchant l’équilibre parfait entre géométrie rigoureuse, matérialité franche et inscription paysagère d’exception.',
    methodology: [
      'Étude contextuelle et climatique fine',
      'Esquisses volumétriques tridimensionnelles',
      'Modélisation BIM et calculs thermiques prédictifs',
      'Direction d’exécution de chantier au millimeter'
    ],
    materials: [
      'Béton matricé teinté dans la masse',
      'Pierre de taille d’origine locale',
      'Verre structurel anti-réfléchissant',
      'Sapin de Douglas issu de sylviculture régionale'
    ]
  },
  {
    id: 'interior',
    title: 'DESIGN D’INTÉRIEUR',
    tagline: 'Des intérieurs raffinés qui allient matière, lumière et fonction.',
    description: 'Concevoir l’espace depuis le sensible. Nous sculptons les volumes intérieurs pour créer des atmosphères feutrées préservant l’intimité tout en favorisant le partage.',
    methodology: [
      'Étude fine d’ergonomie et de flux circulatoires',
      'Design de mobilier intégré exclusif',
      'Scénographie d’éclairage nocturne et diurne',
      'Conception de traitement acoustique furtif'
    ],
    materials: [
      'Plâtres cirés vénitiens à base de chaux naturelle',
      'Chêne brûlé (Shou Sugi Ban) brossé',
      'Laiton patiné à l’acide sulfurique léger',
      'Plaques de marbre brut de Carrare satiné'
    ]
  },
  {
    id: 'urbanism',
    title: 'URBANISME',
    tagline: 'Des stratégies urbaines responsables pour des villes résilientes.',
    description: 'Penser la ville de demain avec humilité en renforçant les écosystèmes, les continuités piétonnes, et en instaurant une vraie résilience face aux aléas climatiques.',
    methodology: [
      'Analyse multiscalaire de l’activité territoriale',
      'Aménagement de corridors de mobilité douce',
      'Diagnostic de biodiversité urbaine et trames vertes',
      'Ateliers participatifs avec les acteurs locaux'
    ],
    materials: [
      'Sols en terre stabilisée drainants perméables',
      'Pavage calcaire régulateur thermique',
      'Mobilier urbain en composite d’algues recyclées',
      'Bois traité par acétylation non toxique'
    ]
  },
  {
    id: 'consulting',
    title: 'CONSEIL',
    tagline: 'Une expertise stratégique pour accompagner vos projets complexes.',
    description: 'Conseil en amont auprès des investisseurs, promoteurs et institutions publiques pour définir des programmes carbone neutre pragmatiques et audacieux.',
    methodology: [
      'Audit de faisabilité technique et foncière intégrale',
      'Analyse de Cycle de Vie (ACV) comparée des projets',
      'Calculatrice d’économie circulaire intégrée',
      'Stratégie de certification (BREEAM, HQE, Passivhaus)'
    ],
    materials: [
      'Rapports d’analyse structurelle digitale',
      'Outils propriétaires de simulation thermodynamique',
      'Banque de matériaux de construction de réemploi'
    ]
  }
];
