import type { Language } from "@/store/localeStore";

// ─────────────────────────────────────────────────────────────────────────────
// ALVINA — Translation Dictionary
// Keys are always in camelCase English. Values are per-language strings.
// ─────────────────────────────────────────────────────────────────────────────

export type TranslationKey = keyof typeof translations.fr;

const translations = {
  // ── FRENCH (default) ──────────────────────────────────────────────────────
  fr: {
    // Nav
    navShop:    "Boutique",
    navAbout:   "À Propos",
    navContact: "Contact",
    navSearch:  "Rechercher",
    navDark:    "Mode sombre",
    navLight:   "Mode clair",

    // Hero
    heroCollection: "Collection SS 2025",
    heroSub:        "Robes, Caftans & Créations Uniques",
    heroDiscover:   "Découvrir la Collection",
    heroStory:      "Notre Histoire →",
    heroScroll:     "Défiler",
    heroLine1:      "L'Art de la",
    heroLine2:      "Féminité",
    heroLine3:      "Intemporelle",

    // Newsletter
    newsletterTitle:   "Rejoignez le Cercle",
    newsletterSub:     "Inscrivez-vous pour obtenir un accès privilégié à nos nouvelles collections, ventes privées et histoires d'artisanat.",
    newsletterBtn:     "S'abonner",
    newsletterPlaceholder: "VOTRE ADRESSE E-MAIL",
    newsletterSuccess: "Merci de votre inscription.",

    // Search
    searchPlaceholder:   "Rechercher un article…",
    searchPopular:       "Recherches populaires",
    searchResults:       "résultat",
    searchResults_pl:    "résultats",
    searchNoResults:     "Aucun résultat",
    searchNoResultsSub:  "Essayez «\u202fManteau\u202f», «\u202fTunique\u202f» ou «\u202fRobe\u202f».",
    searchViewAll:       "Voir tous les articles",
    searchPopularTerms:  "Manteau,Tunique,Robe,Abaya,Ensemble",

    // Brand Story
    brandLabel:     "Maison ALVINA",
    brandTitle:     "Héritage & Vision",
    brandBody:      "ALVINA construit un vestiaire où la pudeur dialogue avec la haute couture. Chaque pièce est pensée comme un équilibre entre structure, mouvement et intemporalité.",
    brandMilestone1: "Naissance de l'atelier ALVINA à Istanbul.",
    brandMilestone2: "Déploiement international de la ligne couture modeste.",
    brandMilestone3: "Lancement des capsules premium en édition limitée.",
    brandMilestone4: "Nouvelle ère éditoriale entre héritage et modernité.",

    // Footer
    footerTagline:      "Wear the Silence of Luxury.",
    footerSub:          "Mode modeste haute couture depuis Istanbul — pour la femme élégante du monde entier.",
    footerCollections:  "Collections",
    footerInfo:         "Informations",
    footerService:      "Service Client",
    footerPartnerLabel: "Partenaires & Publicité",
    footerPartnerTitle: "Collaborons Ensemble",
    footerPartnerBody:  "ALVINA accueille des collaborations sélectives avec des marques, créateurs et médias partageant nos valeurs d'élégance et de mode modeste. Nous proposons des espaces publicitaires, des partenariats influenceurs et des collaborations capsule.",
    footerPartnerCta:   "Proposer un Partenariat →",
    footerRights:       "Tous droits réservés.",

    // Locale modal
    localeTitle:    "Région & Langue",
    localeLang:     "Langue",
    localeCurrency: "Devise",
    localeConfirm:  "Sélectionner & Continuer",

    // Contact page
    contactTitle:    "Contactez Nous",
    contactService:  "Service Client",
    contactName:     "Nom Complet",
    contactEmail:    "Adresse E-mail",
    contactSubject:  "Sujet",
    contactMessage:  "Message",
    contactSend:     "Envoyer le message",
    contactSending:  "Envoi en cours...",
    contactSent:     "Message Envoyé",
    contactSentSub:  "Nous vous répondrons dans les plus brefs délais.",
    contactFollow:   "Suivez-nous",

    // Shop
    shopTitle:    "Boutique",
    shopArticle:  "article",
    shopArticles: "articles",
    addToCart:    "Ajouter au Panier",
    categoryNew:  "Nouveau",
    categoryBest: "Bestseller",
    catCoats:     "Manteaux & Vestes",
    catDresses:   "Robes & Tuniques",
    catSets:      "Ensembles",
    catAbaya:     "Abaya & Ferace",
    catAccessories: "Accessoires",

    collectionsTitle: "Nos Collections",
    coll1Sub: "Fluidité et pudeur raffinée",
    coll2Sub: "L'allure hivernale maîtrisée",
    coll3Sub: "Confort et prestance au quotidien",
    discoverBtn: "Découvrir →",
    newArrivalsTitle: "Nouveautés",
    newArrivalsSub: "Les dernières créations ALVINA.",
    lookbookTitle: "Éditorial",
    shopTheLook: "Acheter le look",

    filterAll: "Tout",
    filterCategories: "Catégories",
    filterPrice: "Prix",
    filterSort: "Trier Par",
    filterSortNewest: "Nouveautés",
    filterSortPriceAsc: "Prix: Croissant",
    filterSortPriceDesc: "Prix: Décroissant",
    filterSortPopularity: "Popularité",
    filterFilters: "Filtres",
    filterApply: "Appliquer",

    footerDelivery: "Livraison & Retours",
    footerFAQ: "FAQ",
    footerTerms: "Conditions Générales",
    footerPrivacy: "Politique de Confidentialité",
    adBanner: "✦ Bannières & Display",
    adSponsor: "✦ Contenu Sponsorisé",
    adCapsule: "✦ Capsule Exclusive",
    adInfluencer: "✦ Influenceurs",

    productColor: "Couleur",
    productSize: "Taille",
    productSizeGuide: "Guide des tailles",
    productStock: "Plus que {stock} en stock",
    productDescription: "Description",
    productComposition: "Composition & Entretien",
    productCare: "Nettoyage à sec recommandé. Ne pas utiliser de javel. Repassage à basse température.",
    productDeliveryText: "Livraison internationale disponible depuis Istanbul. Livraison express vers la France, Belgique, Suisse et Maghreb.",
    productReturnText: "Retours acceptés sous 14 jours. L'article doit être renvoyé dans son état et emballage d'origine.",
    productCompleteLook: "Compléter le look",
    productYouMayAlsoLike: "Vous pourriez aussi aimer",
  },

  // ── ENGLISH ───────────────────────────────────────────────────────────────
  en: {
    navShop:    "Shop",
    navAbout:   "About",
    navContact: "Contact",
    navSearch:  "Search",
    navDark:    "Dark mode",
    navLight:   "Light mode",

    heroCollection: "SS 2025 Collection",
    heroSub:        "Dresses, Caftans & Unique Creations",
    heroDiscover:   "Discover the Collection",
    heroStory:      "Our Story →",
    heroScroll:     "Scroll",
    heroLine1:      "The Art of",
    heroLine2:      "Timeless",
    heroLine3:      "Femininity",

    newsletterTitle:   "Join the Circle",
    newsletterSub:     "Subscribe for exclusive access to new collections, private sales and craft stories.",
    newsletterBtn:     "Subscribe",
    newsletterPlaceholder: "YOUR EMAIL ADDRESS",
    newsletterSuccess: "Thank you for subscribing.",

    searchPlaceholder:   "Search for an item…",
    searchPopular:       "Popular searches",
    searchResults:       "result",
    searchResults_pl:    "results",
    searchNoResults:     "No results found",
    searchNoResultsSub:  "Try \"Coat\", \"Tunic\" or \"Dress\".",
    searchViewAll:       "View all items",
    searchPopularTerms:  "Coat,Tunic,Dress,Abaya,Set",

    brandLabel:     "Maison ALVINA",
    brandTitle:     "Heritage & Vision",
    brandBody:      "ALVINA builds a wardrobe where modesty meets haute couture. Each piece is designed as a balance between structure, movement, and timelessness.",
    brandMilestone1: "Birth of the ALVINA atelier in Istanbul.",
    brandMilestone2: "International expansion of the modest couture line.",
    brandMilestone3: "Launch of limited-edition premium capsule collections.",
    brandMilestone4: "New editorial era between heritage and modernity.",

    footerTagline:      "Wear the Silence of Luxury.",
    footerSub:          "Modest haute couture from Istanbul — for the elegant woman everywhere.",
    footerCollections:  "Collections",
    footerInfo:         "Information",
    footerService:      "Customer Service",
    footerPartnerLabel: "Partners & Advertising",
    footerPartnerTitle: "Let's Collaborate",
    footerPartnerBody:  "ALVINA welcomes selective collaborations with brands, designers and media sharing our values of elegance and modest fashion. We offer advertising space, influencer partnerships and capsule collaborations.",
    footerPartnerCta:   "Propose a Partnership →",
    footerRights:       "All rights reserved.",

    localeTitle:    "Region & Language",
    localeLang:     "Language",
    localeCurrency: "Currency",
    localeConfirm:  "Select & Continue",

    contactTitle:    "Contact Us",
    contactService:  "Customer Service",
    contactName:     "Full Name",
    contactEmail:    "Email Address",
    contactSubject:  "Subject",
    contactMessage:  "Message",
    contactSend:     "Send Message",
    contactSending:  "Sending...",
    contactSent:     "Message Sent",
    contactSentSub:  "We will reply as soon as possible.",
    contactFollow:   "Follow us",

    shopTitle:    "Shop",
    shopArticle:  "item",
    shopArticles: "items",
    addToCart:    "Add to Cart",
    categoryNew:  "New",
    categoryBest: "Bestseller",
    catCoats:     "Coats & Jackets",
    catDresses:   "Dresses & Tunics",
    catSets:      "Sets",
    catAbaya:     "Abaya & Ferace",
    catAccessories: "Accessories",

    collectionsTitle: "Our Collections",
    coll1Sub: "Fluidity and refined modesty",
    coll2Sub: "Mastered winter allure",
    coll3Sub: "Everyday comfort and presence",
    discoverBtn: "Discover →",
    newArrivalsTitle: "New Arrivals",
    newArrivalsSub: "The latest ALVINA creations.",
    lookbookTitle: "Editorial",
    shopTheLook: "Shop the look",

    filterAll: "All",
    filterCategories: "Categories",
    filterPrice: "Price",
    filterSort: "Sort By",
    filterSortNewest: "Newest",
    filterSortPriceAsc: "Price: Low to High",
    filterSortPriceDesc: "Price: High to Low",
    filterSortPopularity: "Popularity",
    filterFilters: "Filters",
    filterApply: "Apply",

    footerDelivery: "Shipping & Returns",
    footerFAQ: "FAQ",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    adBanner: "✦ Banners & Display",
    adSponsor: "✦ Sponsored Content",
    adCapsule: "✦ Exclusive Capsule",
    adInfluencer: "✦ Influencers",

    productColor: "Color",
    productSize: "Size",
    productSizeGuide: "Size Guide",
    productStock: "Only {stock} left in stock",
    productDescription: "Description",
    productComposition: "Composition & Care",
    productCare: "Dry clean recommended. Do not bleach. Iron at low temperature.",
    productDeliveryText: "International delivery available from Istanbul. Express delivery to France, Belgium, Switzerland and Maghreb.",
    productReturnText: "Returns accepted within 14 days. The item must be returned in its original condition and packaging.",
    productCompleteLook: "Complete the look",
    productYouMayAlsoLike: "You may also like",
  },

  // ── ARABIC ────────────────────────────────────────────────────────────────
  ar: {
    navShop:    "المتجر",
    navAbout:   "من نحن",
    navContact: "اتصل بنا",
    navSearch:  "بحث",
    navDark:    "الوضع الداكن",
    navLight:   "الوضع الفاتح",

    heroCollection: "مجموعة ربيع-صيف 2025",
    heroSub:        "فساتين، قفاطين وإبداعات فريدة",
    heroDiscover:   "اكتشف المجموعة",
    heroStory:      "قصتنا ←",
    heroScroll:     "تمرير",
    heroLine1:      "فن",
    heroLine2:      "الأنوثة",
    heroLine3:      "الخالدة",

    newsletterTitle:   "انضمي إلى الدائرة",
    newsletterSub:     "اشتركي للحصول على وصول حصري للمجموعات الجديدة والتخفيضات الخاصة.",
    newsletterBtn:     "اشتراك",
    newsletterPlaceholder: "عنوان بريدك الإلكتروني",
    newsletterSuccess: "شكراً لاشتراككِ.",

    searchPlaceholder:   "ابحث عن منتج…",
    searchPopular:       "عمليات البحث الشائعة",
    searchResults:       "نتيجة",
    searchResults_pl:    "نتائج",
    searchNoResults:     "لا توجد نتائج",
    searchNoResultsSub:  "جربي «معطف» أو «تونيك» أو «فستان».",
    searchViewAll:       "عرض جميع المنتجات",
    searchPopularTerms:  "معطف,تونيك,فستان,عباءة,طقم",

    brandLabel:     "دار ألفينا",
    brandTitle:     "الإرث والرؤية",
    brandBody:      "تبني ألفينا خزانة ملابس حيث تلتقي العفة بالأزياء الراقية. كل قطعة مصممة كتوازن بين البنية والحركة والخلود.",
    brandMilestone1: "ولادة محترف ألفينا في إسطنبول.",
    brandMilestone2: "التوسع الدولي لخط الأزياء المحتشمة.",
    brandMilestone3: "إطلاق مجموعات كبسول المميزة محدودة الإصدار.",
    brandMilestone4: "حقبة تحريرية جديدة بين الإرث والحداثة.",

    footerTagline:      "ارتدي صمت الفخامة.",
    footerSub:          "أزياء محتشمة راقية من إسطنبول — للمرأة الأنيقة في كل مكان.",
    footerCollections:  "المجموعات",
    footerInfo:         "معلومات",
    footerService:      "خدمة العملاء",
    footerPartnerLabel: "الشركاء والإعلانات",
    footerPartnerTitle: "لنتعاون معاً",
    footerPartnerBody:  "ترحب ألفينا بالتعاون المنتقى مع العلامات التجارية والمصممين والإعلام الذين يشاركوننا قيم الأناقة والأزياء المحتشمة.",
    footerPartnerCta:   "اقتراح شراكة ←",
    footerRights:       "جميع الحقوق محفوظة.",

    localeTitle:    "المنطقة واللغة",
    localeLang:     "اللغة",
    localeCurrency: "العملة",
    localeConfirm:  "اختر وتابع",

    contactTitle:    "اتصل بنا",
    contactService:  "خدمة العملاء",
    contactName:     "الاسم الكامل",
    contactEmail:    "البريد الإلكتروني",
    contactSubject:  "الموضوع",
    contactMessage:  "الرسالة",
    contactSend:     "إرسال الرسالة",
    contactSending:  "جارٍ الإرسال...",
    contactSent:     "تم إرسال الرسالة",
    contactSentSub:  "سنرد عليكِ في أقرب وقت ممكن.",
    contactFollow:   "تابعونا",

    shopTitle:    "المتجر",
    shopArticle:  "منتج",
    shopArticles: "منتجات",
    addToCart:    "أضف إلى السلة",
    categoryNew:  "جديد",
    categoryBest: "الأكثر مبيعاً",
    catCoats:     "معاطف وسترات",
    catDresses:   "فساتين وتونيك",
    catSets:      "أطقم",
    catAbaya:     "عباءة وفراشة",
    catAccessories: "إكسسوارات",

    collectionsTitle: "مجموعاتنا",
    coll1Sub: "انسيابية وعفة راقية",
    coll2Sub: "إطلالة شتوية متقنة",
    coll3Sub: "راحة وحضور يومي",
    discoverBtn: "اكتشف ←",
    newArrivalsTitle: "وصل حديثاً",
    newArrivalsSub: "أحدث إبداعات ألفينا.",
    lookbookTitle: "الافتتاحية",
    shopTheLook: "تسوق الإطلالة",

    filterAll: "الكل",
    filterCategories: "الفئات",
    filterPrice: "السعر",
    filterSort: "ترتيب حسب",
    filterSortNewest: "الأحدث",
    filterSortPriceAsc: "السعر: من الأقل للأعلى",
    filterSortPriceDesc: "السعر: من الأعلى للأقل",
    filterSortPopularity: "الشعبية",
    filterFilters: "عوامل التصفية",
    filterApply: "تطبيق",

    footerDelivery: "الشحن والإرجاع",
    footerFAQ: "الأسئلة الشائعة",
    footerTerms: "الشروط والأحكام",
    footerPrivacy: "سياسة الخصوصية",
    adBanner: "✦ لافتات وعرض",
    adSponsor: "✦ محتوى مدعوم",
    adCapsule: "✦ مجموعة حصرية",
    adInfluencer: "✦ مؤثرون",

    productColor: "اللون",
    productSize: "المقاس",
    productSizeGuide: "دليل المقاسات",
    productStock: "تبقى {stock} فقط في المخزن",
    productDescription: "الوصف",
    productComposition: "التركيب والعناية",
    productCare: "ينصح بالتنظيف الجاف. لا تستخدم المبيض. كي على درجة حرارة منخفضة.",
    productDeliveryText: "توصيل دولي متاح من اسطنبول. توصيل سريع إلى فرنسا وبلجيكا وسويسرا والمغرب العربي.",
    productReturnText: "يتم قبول المرتجعات خلال 14 يومًا. يجب إرجاع العنصر في حالته الأصلية وتغليفه.",
    productCompleteLook: "أكمل الإطلالة",
    productYouMayAlsoLike: "قد يعجبك أيضًا",
  },

  // ── TURKISH ───────────────────────────────────────────────────────────────
  tr: {
    navShop:    "Mağaza",
    navAbout:   "Hakkında",
    navContact: "İletişim",
    navSearch:  "Ara",
    navDark:    "Karanlık mod",
    navLight:   "Aydınlık mod",

    heroCollection: "İlkbahar-Yaz 2025 Koleksiyonu",
    heroSub:        "Elbiseler, Kaftanlar & Özgün Tasarımlar",
    heroDiscover:   "Koleksiyonu Keşfet",
    heroStory:      "Hikayemiz →",
    heroScroll:     "Kaydır",
    heroLine1:      "Kadınlığın",
    heroLine2:      "Zamansız",
    heroLine3:      "Sanatı",

    newsletterTitle:   "Çembere Katılın",
    newsletterSub:     "Yeni koleksiyonlara, özel satışlara ve zanaatkârlık hikâyelerine ayrıcalıklı erişim için abone olun.",
    newsletterBtn:     "Abone Ol",
    newsletterPlaceholder: "E-POSTA ADRESİNİZ",
    newsletterSuccess: "Abone olduğunuz için teşekkürler.",

    searchPlaceholder:   "Ürün ara…",
    searchPopular:       "Popüler aramalar",
    searchResults:       "sonuç",
    searchResults_pl:    "sonuç",
    searchNoResults:     "Sonuç bulunamadı",
    searchNoResultsSub:  "\"Mont\", \"Tunik\" veya \"Elbise\" deneyin.",
    searchViewAll:       "Tüm ürünleri görüntüle",
    searchPopularTerms:  "Mont,Tunik,Elbise,Abaya,Takım",

    brandLabel:     "Maison ALVINA",
    brandTitle:     "Miras & Vizyon",
    brandBody:      "ALVINA, mütevazılığın haute couture ile buluştuğu bir gardrop inşa eder. Her parça, yapı, hareket ve zamansızlık arasında bir denge olarak tasarlanmıştır.",
    brandMilestone1: "ALVINA atölyesinin İstanbul'da kuruluşu.",
    brandMilestone2: "Mütevazı couture hattının uluslararası yayılımı.",
    brandMilestone3: "Sınırlı sayıda premium kapsül koleksiyonların lansmanı.",
    brandMilestone4: "Miras ve modernite arasında yeni bir editöryal dönem.",

    footerTagline:      "Lüksün Sessizliğini Giyin.",
    footerSub:          "İstanbul'dan mütevazı haute couture — dünyanın her yerindeki zarif kadın için.",
    footerCollections:  "Koleksiyonlar",
    footerInfo:         "Bilgi",
    footerService:      "Müşteri Hizmetleri",
    footerPartnerLabel: "Ortaklar & Reklamcılık",
    footerPartnerTitle: "Birlikte Çalışalım",
    footerPartnerBody:  "ALVINA, zarafet ve mütevazı moda değerlerimizi paylaşan markalar, tasarımcılar ve medyayla seçici işbirlikleri yapmaktadır.",
    footerPartnerCta:   "Ortaklık Teklifi →",
    footerRights:       "Tüm hakları saklıdır.",

    localeTitle:    "Bölge & Dil",
    localeLang:     "Dil",
    localeCurrency: "Para Birimi",
    localeConfirm:  "Seç & Devam Et",

    contactTitle:    "Bize Ulaşın",
    contactService:  "Müşteri Hizmetleri",
    contactName:     "Ad Soyad",
    contactEmail:    "E-posta Adresi",
    contactSubject:  "Konu",
    contactMessage:  "Mesaj",
    contactSend:     "Mesaj Gönder",
    contactSending:  "Gönderiliyor...",
    contactSent:     "Mesaj Gönderildi",
    contactSentSub:  "En kısa sürede yanıt vereceğiz.",
    contactFollow:   "Bizi takip edin",

    shopTitle:    "Mağaza",
    shopArticle:  "ürün",
    shopArticles: "ürün",
    addToCart:    "Sepete Ekle",
    categoryNew:  "Yeni",
    categoryBest: "Çok Satan",
    catCoats:     "Mont & Ceket",
    catDresses:   "Elbise & Tunik",
    catSets:      "Takım",
    catAbaya:     "Abaya & Ferace",
    catAccessories: "Aksesuar",

    collectionsTitle: "Koleksiyonlarımız",
    coll1Sub: "Akıcılık ve zarif mütevazılık",
    coll2Sub: "Kışlık duruş",
    coll3Sub: "Günlük konfor ve duruş",
    discoverBtn: "Keşfet →",
    newArrivalsTitle: "Yeni Gelenler",
    newArrivalsSub: "En son ALVINA kreasyonları.",
    lookbookTitle: "Editöryal",
    shopTheLook: "Kombini Satın Al",

    filterAll: "Tümü",
    filterCategories: "Kategoriler",
    filterPrice: "Fiyat",
    filterSort: "Sırala",
    filterSortNewest: "En Yeni",
    filterSortPriceAsc: "Fiyat: Düşükten Yükseğe",
    filterSortPriceDesc: "Fiyat: Yüksekten Düşüğe",
    filterSortPopularity: "Popülerlik",
    filterFilters: "Filtreler",
    filterApply: "Uygula",

    footerDelivery: "Teslimat ve İade",
    footerFAQ: "SSS",
    footerTerms: "Şartlar ve Koşullar",
    footerPrivacy: "Gizlilik Politikası",
    adBanner: "✦ Afiş ve Ekran",
    adSponsor: "✦ Sponsorlu İçerik",
    adCapsule: "✦ Özel Kapsül",
    adInfluencer: "✦ Influencer'lar",

    productColor: "Renk",
    productSize: "Beden",
    productSizeGuide: "Beden Tablosu",
    productStock: "Stokta sadece {stock} adet kaldı",
    productDescription: "Açıklama",
    productComposition: "İçerik ve Bakım",
    productCare: "Kuru temizleme önerilir. Ağartıcı kullanmayın. Düşük ısıda ütüleyin.",
    productDeliveryText: "İstanbul'dan uluslararası teslimat mevcuttur. Fransa, Belçika, İsviçre ve Mağrip'e hızlı teslimat.",
    productReturnText: "İadeler 14 gün içinde kabul edilir. Ürün orijinal durumunda ve ambalajında iade edilmelidir.",
    productCompleteLook: "Kombini Tamamla",
    productYouMayAlsoLike: "Bunları da beğenebilirsiniz",
  },
} as const;

export function translateProductName(name: string, language: string) {
  if (language === "fr") return name;
  let translated = name;
  const dicts: Record<string, Record<string, string>> = {
    en: {
      "Manteau": "Coat", "Pardesü": "Pardesu", "Long": "Long", "Terracotta": "Terracotta",
      "Ceinturé": "Belted", "Beige": "Beige", "Noir": "Black", "Noire": "Black", "Marron": "Brown",
      "Gris": "Grey", "Sable": "Sand", "Argenté": "Silver", "Blanc": "White",
      "Robe": "Dress", "Tricot": "Knit", "Deux Pièces": "Two-Piece", "Tunique": "Tunic",
      "Pêche": "Peach", "Bordeaux": "Burgundy", "Moutarde": "Mustard", "Orange": "Orange",
      "Soleil": "Sun", "Classique": "Classic", "Doré": "Golden", "Ensemble": "Set",
      "Survêtement": "Tracksuit", "Strass": "Rhinestone", "Café": "Coffee", "Sport": "Sport",
      "Crème": "Cream", "Pantalon": "Pants", "Fluide": "Fluid", "Luxe": "Luxury",
      "Pull": "Sweater", "Gilet": "Vest", "Cuir": "Leather", "Aspect": "Aspect",
      "Cachemire": "Cashmere", "Cardigan": "Cardigan", "Veste": "Jacket", "Jacquard": "Jacquard"
    },
    ar: {
      "Manteau": "معطف", "Pardesü": "بارديسو", "Long": "طويل", "Terracotta": "تراكوتا",
      "Ceinturé": "بحزام", "Beige": "بيج", "Noir": "أسود", "Noire": "أسود", "Marron": "بني",
      "Gris": "رمادي", "Sable": "رملي", "Argenté": "فضي", "Blanc": "أبيض",
      "Robe": "فستان", "Tricot": "تريكو", "Deux Pièces": "قطعتين", "Tunique": "تونيك",
      "Pêche": "خوخي", "Bordeaux": "عنابي", "Moutarde": "خردلي", "Orange": "برتقالي",
      "Soleil": "شمس", "Classique": "كلاسيكي", "Doré": "ذهبي", "Ensemble": "طقم",
      "Survêtement": "بدلة رياضية", "Strass": "ستراس", "Café": "قهوة", "Sport": "رياضي",
      "Crème": "كريمي", "Pantalon": "بنطلون", "Fluide": "انسيابي", "Luxe": "فاخر",
      "Pull": "بلوفر", "Gilet": "جيليه", "Cuir": "جلد", "Aspect": "مظهر",
      "Cachemire": "كشمير", "Cardigan": "كارديجان", "Veste": "سترة", "Jacquard": "جاكار"
    },
    tr: {
      "Manteau": "Kaban", "Pardesü": "Pardesü", "Long": "Uzun", "Terracotta": "Kiremit",
      "Ceinturé": "Kemerli", "Beige": "Bej", "Noir": "Siyah", "Noire": "Siyah", "Marron": "Kahverengi",
      "Gris": "Gri", "Sable": "Kum", "Argenté": "Gümüş", "Blanc": "Beyaz",
      "Robe": "Elbise", "Tricot": "Triko", "Deux Pièces": "İki Parça", "Tunique": "Tunik",
      "Pêche": "Şeftali", "Bordeaux": "Bordo", "Moutarde": "Hardal", "Orange": "Turuncu",
      "Soleil": "Güneş", "Classique": "Klasik", "Doré": "Altın", "Ensemble": "Takım",
      "Survêtement": "Eşofman", "Strass": "Taşlı", "Café": "Kahve", "Sport": "Spor",
      "Crème": "Krem", "Pantalon": "Pantolon", "Fluide": "Dökümlü", "Luxe": "Lüks",
      "Pull": "Kazak", "Gilet": "Yelek", "Cuir": "Deri", "Aspect": "Görünüm",
      "Cachemire": "Kaşmir", "Cardigan": "Hırka", "Veste": "Ceket", "Jacquard": "Jakar"
    }
  };

  const dict = dicts[language];
  if (dict) {
    Object.keys(dict).forEach((key) => {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      translated = translated.replace(regex, dict[key]);
    });
  }

  return translated;
}

export function getTranslations(lang: Language) {
  return translations[lang] ?? translations.fr;
}

/** React hook — always re-renders when language changes */
export function useTranslation() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useLocaleStore } = require("@/store/localeStore") as typeof import("@/store/localeStore");
  const language: Language = useLocaleStore((s: { language: Language }) => s.language);
  const t = getTranslations(language);
  const isRTL = language === "ar";
  
  const tp = (productName: string) => translateProductName(productName, language);

  return { t, language, isRTL, tp };
}
