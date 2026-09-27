/**
 * Jeu de données de démonstration.
 *
 * ⚠️ CONTENU FICTIF — marques, prix, témoignages et réalisations sont
 * inventés pour permettre de faire tourner le site. À remplacer par les
 * données réelles de Starios avant toute mise en ligne.
 *
 * Lancement : npm run db:seed
 */
import { PrismaClient, ProductType, ServiceCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const IMG = '/images/placeholder.svg';

const BRANDS = [
  { name: 'Daikin', slug: 'daikin', order: 1 },
  { name: 'LG', slug: 'lg', order: 2 },
  { name: 'Samsung', slug: 'samsung', order: 3 },
  { name: 'Gree', slug: 'gree', order: 4 },
  { name: 'Carrier', slug: 'carrier', order: 5 },
  { name: 'Mitsubishi Electric', slug: 'mitsubishi-electric', order: 6 },
];

const SERVICES = [
  {
    category: ServiceCategory.INSTALLATION_CLIM,
    slug: 'installation-climatisation',
    icon: 'AirVent',
    order: 1,
    featured: true,
    titleFr: 'Installation de climatisation',
    titleAr: 'تركيب أجهزة التكييف',
    excerptFr:
      'Split, gainable, cassette ou VRV/VRF : nous dimensionnons, fournissons et posons le système adapté à votre local.',
    excerptAr: 'سبليت، مخفي، كاسيت أو VRV/VRF: نحسب ونوفّر ونركّب النظام المناسب لمحلك.',
    contentFr:
      "Le choix d'un climatiseur ne se résume pas à une puissance en BTU. Nous étudions la surface, l'orientation, l'isolation et l'usage du local avant de recommander un matériel. L'installation comprend le tirage au vide, le contrôle d'étanchéité du circuit frigorifique, la mise en service et la remise du certificat de garantie.",
    contentAr:
      'اختيار المكيّف لا يقتصر على القدرة بالوحدات الحرارية. ندرس المساحة والاتجاه والعزل واستعمال المحل قبل التوصية بالمعدات. يشمل التركيب تفريغ الهواء واختبار إحكام الدارة والتشغيل وتسليم شهادة الضمان.',
  },
  {
    category: ServiceCategory.B13_PLATRE,
    slug: 'b13-platre',
    icon: 'PaintRoller',
    order: 2,
    featured: false,
    titleFr: 'B13 Plâtre — faux plafonds et habillage',
    titleAr: 'بلاتر B13 — أسقف مستعارة وتغليف',
    excerptFr:
      'Faux plafonds et coffrages en plâtre pour dissimuler gaines et unités gainables, avec finition prête à peindre.',
    excerptAr: 'أسقف مستعارة وتغليف بالبلاتر لإخفاء القنوات والوحدات المخفية، بتشطيب جاهز للطلاء.',
    contentFr:
      "Une installation gainable ou un réseau de gaines bien conçu se termine par un travail de plâtre soigné. Notre équipe réalise les faux plafonds, trappes de visite et coffrages nécessaires pour dissimuler l'ensemble de l'installation, avec une finition lisse prête à peindre.",
    contentAr:
      'تنتهي أي عملية تركيب مخفي أو شبكة قنوات محكمة بعمل بلاتر متقن. يُنجز فريقنا الأسقف المستعارة وفتحات المراقبة والتغليف اللازم لإخفاء كامل التركيب، بتشطيب أملس جاهز للطلاء.',
  },
  {
    category: ServiceCategory.PRODUITS_CLIM,
    slug: 'produits-climatisation',
    icon: 'ShoppingBag',
    order: 3,
    featured: false,
    titleFr: 'Produits de climatisation',
    titleAr: 'منتجات التكييف',
    excerptFr:
      'Vente de climatiseurs split, gainables, cassettes et mobiles, toutes marques, avec conseil sur le modèle adapté à votre besoin.',
    excerptAr:
      'بيع مكيفات سبليت ومخفية وكاسيت ومتنقلة، لجميع الماركات، مع نصيحة حول الطراز المناسب لاحتياجكم.',
    contentFr:
      'Nous distribuons les grandes marques du marché (Daikin, LG, Samsung, Gree, Carrier, Mitsubishi Electric) et vous orientons vers le modèle correspondant réellement à votre surface, votre budget et votre usage, sans surdimensionnement inutile.',
    contentAr:
      'نوزّع العلامات الكبرى في السوق (دايكن، إل جي، سامسونغ، غري، كاريير، ميتسوبيشي إلكتريك) ونوجهكم نحو الطراز المناسب فعلاً لمساحتكم وميزانيتكم واستعمالكم، دون مبالغة في القدرة.',
  },
  {
    category: ServiceCategory.MAINTENANCE,
    slug: 'maintenance-entretien',
    icon: 'Wrench',
    order: 4,
    featured: true,
    titleFr: 'Maintenance et entretien',
    titleAr: 'الصيانة والعناية الدورية',
    excerptFr:
      "Contrat annuel ou visite ponctuelle : contrôle du gaz, des filtres et de l'écoulement pour éviter la panne en pleine chaleur.",
    excerptAr: 'عقد سنوي أو زيارة ظرفية: فحص الغاز والمرشّحات والتصريف لتفادي العطل في عز الحرارة.',
    contentFr:
      "Un climatiseur entretenu consomme jusqu'à 20 % de moins et dure nettement plus longtemps. Notre visite d'entretien couvre le nettoyage des filtres et de l'échangeur, le contrôle de la charge en fluide frigorigène, la vérification des connexions électriques et le test de l'évacuation des condensats.",
    contentAr:
      'المكيّف المُصان يستهلك أقل بنسبة تصل إلى 20٪ ويدوم أطول. تشمل زيارة الصيانة تنظيف المرشّحات والمبادل، ومراقبة شحنة الغاز، وفحص التوصيلات الكهربائية، واختبار تصريف المياه.',
  },
  {
    category: ServiceCategory.VENTILATION,
    slug: 'ventilation',
    icon: 'Fan',
    order: 5,
    featured: false,
    titleFr: 'Ventilation',
    titleAr: 'التهوية',
    excerptFr:
      "Extraction, insufflation, VMC simple ou double flux pour renouveler l'air des logements et des locaux professionnels.",
    excerptAr: 'شفط، دفع، تهوية بتدفق بسيط أو مزدوج لتجديد هواء المساكن والمحلات المهنية.',
    contentFr:
      "Climatiser sans ventiler revient à recycler un air vicié. Nous installons des systèmes d'extraction et de renouvellement d'air dimensionnés selon le volume et l'occupation : cuisines professionnelles, sanitaires, salles de réunion, ateliers.",
    contentAr:
      'التكييف دون تهوية يعني إعادة تدوير هواء فاسد. نركّب أنظمة شفط وتجديد الهواء محسوبة حسب الحجم وعدد المستعملين: مطابخ مهنية، مرافق صحية، قاعات اجتماعات، ورشات.',
  },
  {
    category: ServiceCategory.VENTILATION_CAISSON,
    slug: 'ventilation-caisson',
    icon: 'Wind',
    order: 6,
    featured: false,
    titleFr: 'Ventilation caisson',
    titleAr: 'صندوق التهوية',
    excerptFr:
      'Fourniture et pose de caissons de ventilation (extraction ou insufflation) pour cuisines professionnelles, parkings et locaux techniques.',
    excerptAr: 'توفير وتركيب صناديق التهوية (شفط أو دفع) للمطابخ المهنية والمرآب والمحلات التقنية.',
    contentFr:
      "Le caisson de ventilation centralise l'extraction ou l'insufflation d'air pour un bâtiment entier. Nous le dimensionnons selon le débit requis, l'installons en toiture ou en local technique, et le raccordons au réseau de gaines existant.",
    contentAr:
      'يجمّع صندوق التهوية عملية الشفط أو الدفع لمبنى كامل. نحسب حجمه حسب التدفق المطلوب، ونركّبه على السطح أو في محل تقني، ونربطه بشبكة القنوات القائمة.',
  },
  {
    category: ServiceCategory.POMPE_CHALEUR,
    slug: 'pompe-a-chaleur',
    icon: 'Flame',
    order: 7,
    featured: true,
    titleFr: 'Pompe à chaleur',
    titleAr: 'مضخة حرارية',
    excerptFr:
      "Installation de pompes à chaleur air/air et air/eau pour chauffer, rafraîchir et produire de l'eau chaude sanitaire à moindre coût.",
    excerptAr: 'تركيب مضخات حرارية هواء/هواء وهواء/ماء للتدفئة والتبريد وإنتاج الماء الساخن بتكلفة أقل.',
    contentFr:
      "La pompe à chaleur puise les calories de l'air extérieur pour chauffer ou rafraîchir votre logement, avec une consommation électrique nettement inférieure à un chauffage classique. Nous étudions votre installation existante avant de recommander un modèle air/air ou air/eau.",
    contentAr:
      'تستمد المضخة الحرارية السعرات من الهواء الخارجي لتدفئة أو تبريد منزلكم، باستهلاك كهربائي أقل بكثير من التدفئة التقليدية. ندرس تجهيزكم القائم قبل التوصية بطراز هواء/هواء أو هواء/ماء.',
  },
  {
    category: ServiceCategory.CTA,
    slug: 'centrale-traitement-air',
    icon: 'Layers',
    order: 8,
    featured: false,
    titleFr: "Centrale de traitement d'air (CTA)",
    titleAr: 'مركزية معالجة الهواء',
    excerptFr:
      "Conception, installation et maintenance de centrales de traitement d'air pour immeubles, commerces et sites industriels.",
    excerptAr: 'تصميم وتركيب وصيانة مركزيات معالجة الهواء للعمارات والمحلات والمواقع الصناعية.',
    contentFr:
      "Une centrale de traitement d'air filtre, chauffe, refroidit et déshumidifie l'air avant de le distribuer dans le bâtiment. Nous dimensionnons l'installation selon le débit et la qualité d'air requis, et assurons son entretien préventif.",
    contentAr:
      'تقوم مركزية معالجة الهواء بترشيح وتسخين وتبريد وتجفيف الهواء قبل توزيعه في المبنى. نحسب التركيب حسب التدفق وجودة الهواء المطلوبة، ونضمن صيانته الوقائية.',
  },
  {
    category: ServiceCategory.PLOMBERIE,
    slug: 'plomberie',
    icon: 'Droplets',
    order: 9,
    featured: false,
    titleFr: 'Plomberie',
    titleAr: 'السباكة',
    excerptFr:
      "Raccordements d'évacuation des condensats, alimentation en eau et petits travaux de plomberie liés à votre installation de climatisation.",
    excerptAr: 'توصيلات تصريف مياه التكثيف، التزويد بالماء وأشغال سباكة صغيرة مرتبطة بتركيب التكييف.',
    contentFr:
      "Une climatisation mal évacuée finit par tacher un plafond ou endommager un mur. Nous réalisons les raccordements d'évacuation des condensats, ainsi que les travaux de plomberie associés à une pompe à chaleur air/eau ou à une installation multi-split.",
    contentAr:
      'التكييف الذي لا يُصرَّف جيداً ينتهي بتلطيخ سقف أو إتلاف جدار. ننجز توصيلات تصريف مياه التكثيف، وكذا أشغال السباكة المرتبطة بمضخة حرارية هواء/ماء أو تركيب متعدد الوحدات.',
  },
];

const PRODUCTS = [
  {
    slug: 'daikin-sensira-12000-btu',
    brand: 'daikin',
    type: ProductType.SPLIT,
    btu: 12000,
    coverageM2: 30,
    price: 7490,
    oldPrice: 8200,
    energyClass: 'A++',
    inverter: true,
    warrantyMonths: 36,
    stock: 14,
    featured: true,
    nameFr: 'Daikin Sensira 12 000 BTU Inverter',
    nameAr: 'دايكن سنسيرا 12000 وحدة إنفرتر',
    descriptionFr:
      "Split mural inverter silencieux (19 dB en veille), adapté à un salon ou une chambre jusqu'à 30 m². Filtre à particules et mode nuit.",
    descriptionAr:
      'سبليت جداري إنفرتر هادئ (19 ديسيبل)، مناسب لصالون أو غرفة حتى 30 م². مرشّح جسيمات ووضع ليلي.',
  },
  {
    slug: 'lg-dualcool-18000-btu',
    brand: 'lg',
    type: ProductType.SPLIT,
    btu: 18000,
    coverageM2: 45,
    price: 10900,
    energyClass: 'A++',
    inverter: true,
    warrantyMonths: 60,
    stock: 9,
    featured: true,
    nameFr: 'LG DualCool 18 000 BTU Inverter',
    nameAr: 'إل جي ديوال كول 18000 وحدة إنفرتر',
    descriptionFr:
      'Double compresseur rotatif, refroidissement rapide et garantie compresseur 10 ans. Pièces de 35 à 45 m².',
    descriptionAr:
      'ضاغط دوّار مزدوج، تبريد سريع وضمان الضاغط 10 سنوات. للغرف من 35 إلى 45 م².',
  },
  {
    slug: 'samsung-windfree-9000-btu',
    brand: 'samsung',
    type: ProductType.SPLIT,
    btu: 9000,
    coverageM2: 22,
    price: 6290,
    energyClass: 'A+++',
    inverter: true,
    warrantyMonths: 36,
    stock: 21,
    featured: true,
    nameFr: 'Samsung WindFree 9 000 BTU',
    nameAr: 'سامسونغ ويند فري 9000 وحدة',
    descriptionFr:
      "Diffusion sans souffle direct par 23 000 micro-perforations : confort accru dans les chambres d'enfant.",
    descriptionAr:
      'توزيع دون تيار هوائي مباشر عبر 23000 ثقب دقيق: راحة أكبر في غرف الأطفال.',
  },
  {
    slug: 'gree-pular-24000-btu',
    brand: 'gree',
    type: ProductType.SPLIT,
    btu: 24000,
    coverageM2: 60,
    price: 12400,
    oldPrice: 13500,
    energyClass: 'A+',
    inverter: true,
    warrantyMonths: 24,
    stock: 6,
    featured: false,
    nameFr: 'Gree Pular 24 000 BTU Inverter',
    nameAr: 'غري بولار 24000 وحدة إنفرتر',
    descriptionFr:
      'Bon rapport puissance/prix pour grands séjours et open spaces jusqu\'à 60 m². Wi-Fi intégré.',
    descriptionAr: 'نسبة قدرة/ثمن جيدة للصالونات الكبيرة حتى 60 م². واي فاي مدمج.',
  },
  {
    slug: 'carrier-cassette-36000-btu',
    brand: 'carrier',
    type: ProductType.CASSETTE,
    btu: 36000,
    coverageM2: 85,
    price: 23800,
    energyClass: 'A+',
    inverter: true,
    warrantyMonths: 24,
    stock: 4,
    featured: false,
    nameFr: 'Carrier Cassette 4 voies 36 000 BTU',
    nameAr: 'كاريير كاسيت 4 اتجاهات 36000 وحدة',
    descriptionFr:
      'Encastrable en faux plafond, diffusion sur quatre côtés. Solution de référence pour bureaux et salles de réunion.',
    descriptionAr:
      'مدمج في السقف المستعار، توزيع من أربع جهات. حل مرجعي للمكاتب وقاعات الاجتماعات.',
  },
  {
    slug: 'mitsubishi-gainable-30000-btu',
    brand: 'mitsubishi-electric',
    type: ProductType.GAINABLE,
    btu: 30000,
    coverageM2: 70,
    price: 27500,
    energyClass: 'A++',
    inverter: true,
    warrantyMonths: 36,
    stock: 3,
    featured: false,
    nameFr: 'Mitsubishi Electric gainable 30 000 BTU',
    nameAr: 'ميتسوبيشي إلكتريك مخفي 30000 وحدة',
    descriptionFr:
      'Unité gainable invisible, raccordée à un réseau de gaines. Idéale en rénovation haut de gamme où aucun appareil ne doit être visible.',
    descriptionAr:
      'وحدة مخفية موصولة بشبكة قنوات. مثالية في الترميم الراقي حيث لا ينبغي أن يظهر أي جهاز.',
  },
  {
    slug: 'daikin-vrv-multi-bureaux',
    brand: 'daikin',
    type: ProductType.VRV_VRF,
    btu: 48000,
    coverageM2: 120,
    price: 68000,
    energyClass: 'A++',
    inverter: true,
    warrantyMonths: 36,
    stock: 2,
    featured: false,
    nameFr: 'Daikin VRV — système multi-zones',
    nameAr: 'دايكن VRV — نظام متعدد المناطق',
    descriptionFr:
      'Système centralisé pilotant jusqu\'à 8 unités intérieures avec régulation indépendante par zone. Étude technique obligatoire.',
    descriptionAr:
      'نظام مركزي يتحكم في ما يصل إلى 8 وحدات داخلية مع ضبط مستقل لكل منطقة. الدراسة التقنية إلزامية.',
  },
  {
    slug: 'lg-mobile-9000-btu',
    brand: 'lg',
    type: ProductType.MOBILE,
    btu: 9000,
    coverageM2: 18,
    price: 3990,
    energyClass: 'A',
    inverter: false,
    warrantyMonths: 12,
    stock: 17,
    featured: false,
    nameFr: 'LG climatiseur mobile 9 000 BTU',
    nameAr: 'إل جي مكيّف متنقل 9000 وحدة',
    descriptionFr:
      "Solution d'appoint sans installation, pour les locations ou les pièces où la pose murale est impossible.",
    descriptionAr: 'حل إضافي دون تركيب، للأكرية أو الغرف التي يتعذّر فيها التثبيت الجداري.',
  },
];

const TESTIMONIALS = [
  {
    authorName: 'Karim Benjelloun',
    city: 'Casablanca',
    role: 'Gérant, Café Riad',
    rating: 5,
    order: 1,
    contentFr:
      "Trois unités posées en une journée dans la salle, sans fermer le café. Le technicien a pris le temps d'expliquer le réglage à mon équipe.",
    contentAr:
      'ثلاث وحدات رُكّبت في يوم واحد داخل القاعة دون إغلاق المقهى. أخذ الفني وقته لشرح الضبط لفريقي.',
  },
  {
    authorName: 'Salma Idrissi',
    city: 'Rabat',
    role: 'Particulier',
    rating: 5,
    order: 2,
    contentFr:
      "J'avais reçu trois devis très différents. Starios est le seul à avoir calculé la puissance au lieu de me vendre le plus gros modèle.",
    contentAr:
      'توصلت بثلاثة عروض مختلفة جداً. ستاريوس الوحيدة التي حسبت القدرة بدل بيعي أكبر جهاز.',
  },
  {
    authorName: 'Youssef El Amrani',
    city: 'Mohammedia',
    role: 'Responsable technique',
    rating: 4,
    order: 3,
    contentFr:
      'Contrat de maintenance sur nos six bureaux depuis deux ans. Les visites sont faites aux dates prévues, ce qui est plus rare que ça ne devrait.',
    contentAr:
      'عقد صيانة لمكاتبنا الستة منذ سنتين. تُنجز الزيارات في المواعيد المحددة، وهو أمر أندر مما ينبغي.',
  },
  {
    authorName: 'Nadia Cherkaoui',
    city: 'Marrakech',
    role: 'Propriétaire de riad',
    rating: 5,
    order: 4,
    contentFr:
      'Installation discrète dans un riad classé, avec des contraintes fortes sur le passage des gaines. Le résultat est propre et invisible.',
    contentAr:
      'تركيب متقن في رياض مصنّف، مع قيود كبيرة على تمرير القنوات. النتيجة نظيفة وغير مرئية.',
  },
  {
    authorName: 'Omar Tazi',
    city: 'Casablanca',
    role: 'Particulier',
    rating: 5,
    order: 5,
    contentFr:
      "Dépannage un samedi d'août, unité repartie le jour même. Le diagnostic annoncé au téléphone correspondait à la facture.",
    contentAr:
      'إصلاح يوم سبت من غشت، واشتغلت الوحدة في نفس اليوم. التشخيص المُعلن هاتفياً طابق الفاتورة.',
  },
];

const PROJECTS = [
  {
    slug: 'restaurant-ain-diab-casablanca',
    city: 'Casablanca',
    category: ServiceCategory.INSTALLATION_CLIM,
    brand: 'carrier',
    completedAt: new Date('2025-06-18'),
    featured: true,
    order: 1,
    titleFr: 'Restaurant en bord de mer — Aïn Diab',
    titleAr: 'مطعم على شاطئ عين الذياب',
    descriptionFr:
      "Six cassettes 4 voies encastrées en faux plafond pour une salle de 180 m² exposée plein ouest. Contrainte principale : maintenir le service pendant les travaux, réalisés de nuit sur quatre interventions.",
    descriptionAr:
      'ست وحدات كاسيت مدمجة في السقف لقاعة 180 م² معرّضة للغرب. القيد الأساسي: استمرار الخدمة أثناء الأشغال، المنجزة ليلاً في أربعة تدخلات.',
  },
  {
    slug: 'plateau-bureaux-anfa-casablanca',
    city: 'Casablanca',
    category: ServiceCategory.INSTALLATION_CLIM,
    brand: 'daikin',
    completedAt: new Date('2025-04-02'),
    featured: true,
    order: 2,
    titleFr: 'Plateau de bureaux 420 m² — Anfa',
    titleAr: 'مكاتب بمساحة 420 م² — أنفا',
    descriptionFr:
      'Système VRV multi-zones avec régulation indépendante par bureau, piloté depuis une centrale unique. Consommation suivie mensuellement depuis la mise en service.',
    descriptionAr:
      'نظام VRV متعدد المناطق بضبط مستقل لكل مكتب، يُدار من وحدة مركزية واحدة. يُتابع الاستهلاك شهرياً منذ التشغيل.',
  },
  {
    slug: 'riad-medina-marrakech',
    city: 'Marrakech',
    category: ServiceCategory.INSTALLATION_CLIM,
    brand: 'mitsubishi-electric',
    completedAt: new Date('2025-03-11'),
    featured: true,
    order: 3,
    titleFr: 'Riad classé — médina de Marrakech',
    titleAr: 'رياض مصنّف — المدينة القديمة بمراكش',
    descriptionFr:
      'Gainables dissimulés dans les faux plafonds de six chambres, sans percement des façades patrimoniales. Reprises de gaines par les combles.',
    descriptionAr:
      'وحدات مخفية في أسقف ست غرف، دون ثقب الواجهات التراثية. تمرير القنوات عبر السطح.',
  },
  {
    slug: 'villa-souissi-rabat',
    city: 'Rabat',
    category: ServiceCategory.INSTALLATION_CLIM,
    brand: 'lg',
    completedAt: new Date('2025-07-25'),
    featured: false,
    order: 4,
    titleFr: 'Villa 320 m² — Souissi',
    titleAr: 'فيلا 320 م² — السويسي',
    descriptionFr:
      'Cinq splits inverter répartis sur deux niveaux, avec unités extérieures regroupées côté nord pour limiter les nuisances sonores au séjour.',
    descriptionAr:
      'خمس وحدات سبليت إنفرتر على مستويين، مع تجميع الوحدات الخارجية في الجهة الشمالية للحد من الضجيج.',
  },
  {
    slug: 'pharmacie-centre-mohammedia',
    city: 'Mohammedia',
    category: ServiceCategory.MAINTENANCE,
    brand: 'gree',
    completedAt: new Date('2025-05-09'),
    featured: false,
    order: 5,
    titleFr: 'Pharmacie de garde — centre-ville',
    titleAr: 'صيدلية الحراسة — وسط المدينة',
    descriptionFr:
      "Contrat de maintenance trimestriel avec engagement de température : le stock de médicaments impose une plage stricte, contrôlée à chaque visite.",
    descriptionAr:
      'عقد صيانة فصلي مع التزام بدرجة الحرارة: مخزون الأدوية يفرض مجالاً صارماً يُراقب في كل زيارة.',
  },
  {
    slug: 'atelier-industriel-had-soualem',
    city: 'Casablanca',
    category: ServiceCategory.VENTILATION,
    brand: null,
    completedAt: new Date('2024-11-20'),
    featured: false,
    order: 6,
    titleFr: 'Atelier industriel — Had Soualem',
    titleAr: 'ورشة صناعية — حد السوالم',
    descriptionFr:
      "Réseau d'extraction et de renouvellement d'air pour un atelier de 900 m², dimensionné sur le nombre de postes et la chaleur dégagée par les machines.",
    descriptionAr:
      'شبكة شفط وتجديد الهواء لورشة 900 م²، محسوبة حسب عدد المناصب والحرارة المنبعثة من الآلات.',
  },
];

/** Document Tiptap minimal : un titre et des paragraphes. */
function doc(paragraphs: string[]) {
  return {
    type: 'doc',
    content: paragraphs.map((text) => ({
      type: 'paragraph',
      content: [{ type: 'text', text }],
    })),
  };
}

const POSTS = [
  {
    slug: 'choisir-puissance-climatiseur-btu',
    tags: ['conseils', 'achat'],
    titleFr: 'Quelle puissance de climatiseur pour quelle surface ?',
    titleAr: 'أي قدرة تكييف لأي مساحة؟',
    excerptFr:
      "Le sur-dimensionnement coûte aussi cher que le sous-dimensionnement. Voici comment estimer les BTU nécessaires avant de demander un devis.",
    excerptAr:
      'القدرة الزائدة تكلّف بقدر القدرة الناقصة. إليك كيفية تقدير الوحدات الحرارية اللازمة قبل طلب عرض السعر.',
    contentFr: doc([
      "On lit souvent qu'il faut compter 100 BTU par mètre carré. C'est un raccourci trompeur : la règle dépend de l'usage du local, de son exposition et de son isolation.",
      "Pour un appartement correctement isolé, comptez environ 130 BTU/m². Une villa exposée plein sud monte à 150. Un restaurant, avec sa cuisine et son affluence, peut atteindre 220 BTU/m².",
      "Un appareil trop puissant refroidit trop vite, s'arrête, redémarre, et déshumidifie mal : l'air devient froid et moite. Il s'use aussi plus vite à cause des cycles courts répétés.",
      "En pratique, faites calculer la puissance avant de comparer les prix. Deux devis pour deux puissances différentes ne sont pas comparables.",
    ]),
    contentAr: doc([
      'كثيراً ما يُقال إن كل متر مربع يحتاج 100 وحدة حرارية. هذا اختصار مضلّل: القاعدة تتوقف على استعمال المحل وتعرّضه وعزله.',
      'بالنسبة لشقة معزولة جيداً، احسب حوالي 130 وحدة/م². الفيلا المعرّضة للجنوب ترتفع إلى 150. المطعم قد يبلغ 220 وحدة/م².',
      'الجهاز القوي أكثر من اللازم يبرّد بسرعة ثم يتوقف ويعيد التشغيل، ويزيل الرطوبة بشكل سيئ: يصبح الهواء بارداً ورطباً.',
      'عملياً، اطلب حساب القدرة قبل مقارنة الأثمنة. عرضان بقدرتين مختلفتين غير قابلين للمقارنة.',
    ]),
  },
  {
    slug: 'entretien-climatiseur-frequence',
    tags: ['entretien', 'économies'],
    titleFr: 'À quelle fréquence entretenir sa climatisation ?',
    titleAr: 'ما وتيرة صيانة المكيّف؟',
    excerptFr:
      "Filtres, échangeur, charge en fluide : ce qui doit être vérifié, à quel rythme, et ce que vous pouvez faire vous-même.",
    excerptAr: 'المرشّحات، المبادل، شحنة الغاز: ما يجب فحصه، وبأي وتيرة، وما يمكنك فعله بنفسك.',
    contentFr: doc([
      "Les filtres se nettoient tous les mois en période d'utilisation intensive. C'est la seule opération à votre portée, et elle suffit à éviter une bonne partie des pertes de rendement.",
      "L'échangeur, lui, demande un démontage. Une fois par an suffit pour un usage domestique, deux fois pour un local recevant du public.",
      "La charge en fluide frigorigène ne doit pas baisser : un circuit est étanche par conception. Si votre appareil refroidit moins bien, c'est souvent le signe d'une fuite, pas d'une recharge à prévoir périodiquement.",
      "Un entretien annuel coûte une fraction du prix d'un compresseur, qui est la pièce la plus chère de l'appareil.",
    ]),
    contentAr: doc([
      'تُنظّف المرشّحات كل شهر في فترة الاستعمال المكثف. هذه العملية الوحيدة في متناولك، وتكفي لتفادي جزء كبير من ضعف المردودية.',
      'أما المبادل فيتطلب الفكّ. مرة في السنة تكفي للاستعمال المنزلي، ومرتان للمحلات التي تستقبل الجمهور.',
      'شحنة الغاز يجب ألا تنقص: الدارة محكمة بحكم التصميم. إذا ضعف التبريد فذلك غالباً علامة تسرّب، لا حاجة دورية لإعادة الشحن.',
      'تكلفة الصيانة السنوية جزء يسير من ثمن الضاغط، وهو أغلى قطعة في الجهاز.',
    ]),
  },
  {
    slug: 'reduire-facture-electricite-climatisation',
    tags: ['économies', 'conseils'],
    titleFr: 'Cinq réglages qui réduisent la facture de climatisation',
    titleAr: 'خمسة إعدادات تخفّض فاتورة التكييف',
    excerptFr:
      "Sans changer d'appareil : température de consigne, orientation des volets, mode nuit et programmation.",
    excerptAr: 'دون تغيير الجهاز: درجة الحرارة المضبوطة، اتجاه الريش، الوضع الليلي والبرمجة.',
    contentFr: doc([
      "Chaque degré gagné sur la consigne représente environ 7 % de consommation en moins. Passer de 21 à 24 °C change la facture sans changer réellement le confort ressenti.",
      "Orientez les volets vers le haut en mode froid : l'air frais descend naturellement et brasse mieux la pièce.",
      "Le mode nuit réduit la vitesse du ventilateur et remonte progressivement la consigne. Il est fait pour être utilisé, pas pour rester décoratif dans le menu.",
      "Fermez volets et rideaux aux heures les plus chaudes : la climatisation combat un apport solaire que vous pouvez supprimer gratuitement.",
      "Enfin, un filtre encrassé force le ventilateur. Le nettoyer est le geste le plus rentable de cette liste.",
    ]),
    contentAr: doc([
      'كل درجة تُكسب في الضبط تمثل حوالي 7٪ استهلاكاً أقل. الانتقال من 21 إلى 24 درجة يغيّر الفاتورة دون تغيير الراحة فعلياً.',
      'وجّه الريش إلى الأعلى في وضع التبريد: الهواء البارد ينزل طبيعياً ويوزّع أفضل داخل الغرفة.',
      'الوضع الليلي يخفّض سرعة المروحة ويرفع الضبط تدريجياً. صُمّم ليُستعمل، لا ليبقى زينة في القائمة.',
      'أغلق الستائر في الساعات الأشد حرارة: التكييف يحارب إسهاماً شمسياً يمكنك إزالته مجاناً.',
      'أخيراً، المرشّح المتسخ يُجهد المروحة. تنظيفه أكثر إجراء مردودية في هذه القائمة.',
    ]),
  },
];

const FAQ = [
  {
    order: 1,
    questionFr: 'Le devis est-il vraiment gratuit ?',
    questionAr: 'هل عرض السعر مجاني فعلاً؟',
    answerFr:
      "Oui. L'estimation en ligne et le devis établi après visite technique sont gratuits et sans engagement.",
    answerAr: 'نعم. التقدير عبر الإنترنت وعرض السعر بعد المعاينة مجانيان وبدون التزام.',
  },
  {
    order: 2,
    questionFr: "L'estimation affichée sur le site est-elle le prix final ?",
    questionAr: 'هل التقدير المعروض في الموقع هو الثمن النهائي؟',
    answerFr:
      "Non. Il s'agit d'une fourchette indicative calculée à partir de la surface et du type de local. Le prix ferme est établi après visite technique, qui seule permet de tenir compte de l'accès, du passage des liaisons et de l'installation existante.",
    answerAr:
      'لا. الأمر يتعلق بمجال إرشادي محسوب من المساحة ونوع المحل. يُحدَّد الثمن النهائي بعد المعاينة التقنية التي وحدها تراعي الولوج وتمرير التوصيلات والتجهيز القائم.',
  },
  {
    order: 3,
    questionFr: 'Quelles villes couvrez-vous ?',
    questionAr: 'ما المدن التي تغطونها؟',
    answerFr:
      "Casablanca et Mohammedia en intervention courante. Rabat, Salé, Marrakech, Tanger, Agadir, Fès, Kénitra et El Jadida sur planification.",
    answerAr:
      'الدار البيضاء والمحمدية بشكل اعتيادي. الرباط وسلا ومراكش وطنجة وأكادير وفاس والقنيطرة والجديدة بموعد مسبق.',
  },
  {
    order: 4,
    questionFr: 'Quelle garantie sur le matériel et la pose ?',
    questionAr: 'ما الضمان على المعدات والتركيب؟',
    answerFr:
      "La garantie constructeur va de 12 à 60 mois selon le modèle, et figure sur la fiche produit. La pose est garantie un an.",
    answerAr:
      'ضمان المُصنّع يتراوح بين 12 و60 شهراً حسب الطراز، ويُذكر في بطاقة المنتج. التركيب مضمون سنة واحدة.',
  },
  {
    order: 5,
    questionFr: 'Intervenez-vous sur un appareil que vous n\'avez pas vendu ?',
    questionAr: 'هل تتدخلون في جهاز لم تبيعوه؟',
    answerFr:
      'Oui, en dépannage comme en entretien, quelle que soit la marque, sous réserve de disponibilité des pièces détachées.',
    answerAr: 'نعم، في الإصلاح والصيانة، مهما كانت العلامة، شريطة توفّر قطع الغيار.',
  },
];

async function main() {
  console.log('🌱 Seed en cours…');

  // Idempotent : on vide les tables dans l'ordre des dépendances.
  await prisma.quote.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();
  await prisma.product.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.setting.deleteMany();

  // --- Admin ---
  const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@starios.ma').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'Starios2026!';
  const admin = await prisma.admin.create({
    data: {
      email,
      name: 'Administrateur Starios',
      role: 'OWNER',
      passwordHash: await bcrypt.hash(password, 12),
    },
  });
  console.log(`   ✓ Admin : ${email}`);

  // --- Marques ---
  const brands = new Map<string, string>();
  for (const brand of BRANDS) {
    const created = await prisma.brand.create({
      data: { ...brand, logoUrl: IMG },
    });
    brands.set(brand.slug, created.id);
  }
  console.log(`   ✓ ${BRANDS.length} marques`);

  // --- Services ---
  for (const service of SERVICES) {
    await prisma.service.create({ data: { ...service, coverImage: IMG, active: true } });
  }
  console.log(`   ✓ ${SERVICES.length} services`);

  // --- Produits ---
  for (const { brand, ...product } of PRODUCTS) {
    await prisma.product.create({
      data: { ...product, brandId: brands.get(brand)!, images: [IMG], active: true },
    });
  }
  console.log(`   ✓ ${PRODUCTS.length} produits`);

  // --- Témoignages ---
  for (const testimonial of TESTIMONIALS) {
    await prisma.testimonial.create({ data: { ...testimonial, published: true } });
  }
  console.log(`   ✓ ${TESTIMONIALS.length} témoignages`);

  // --- Réalisations ---
  for (const { brand, ...project } of PROJECTS) {
    await prisma.project.create({
      data: {
        ...project,
        brandId: brand ? brands.get(brand)! : null,
        beforeImage: IMG,
        afterImage: IMG,
        gallery: [IMG],
        published: true,
      },
    });
  }
  console.log(`   ✓ ${PROJECTS.length} réalisations`);

  // --- Articles ---
  for (const post of POSTS) {
    await prisma.blogPost.create({
      data: {
        ...post,
        coverImage: IMG,
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });
  }
  console.log(`   ✓ ${POSTS.length} articles`);

  // --- FAQ ---
  for (const item of FAQ) {
    await prisma.faqItem.create({ data: { ...item, published: true } });
  }
  console.log(`   ✓ ${FAQ.length} questions fréquentes`);

  // --- Paramètres éditables depuis l'admin ---
  await prisma.setting.createMany({
    data: [
      { key: 'phone', valueFr: '06 61 78 47 16' },
      { key: 'whatsapp', valueFr: '212661784716' },
      {
        key: 'address',
        valueFr: 'ZI Sapino, 3ème étage, lot 719, Nouaceur',
        valueAr: 'المنطقة الصناعية سابينو، الطابق الثالث، البقعة 719، النواصر',
      },
      { key: 'hours', valueFr: 'Ouvert 24h/24', valueAr: 'مفتوح على مدار 24 ساعة' },
    ],
  });

  console.log('✅ Seed terminé.');
  console.log(`   Connexion admin : ${email} / ${password}`);
}

main()
  .catch((error) => {
    console.error('❌ Seed en échec :', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
