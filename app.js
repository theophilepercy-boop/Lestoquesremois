'use strict';

// ═══════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════
const DAYS_FR = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const MEALS = ['midi','soir'];
const MEAL_ICONS = { midi: '☀️', soir: '🌙' };

const RAYON_ICONS = {
  'Fruits & Légumes':        '🥦',
  'Viandes & Charcuterie':   '🥩',
  'Poissons & Fruits de Mer':'🐟',
  'Produits Laitiers & Œufs':'🥛',
  'Boulangerie & Pâtisserie':'🍞',
  'Épicerie Salée':          '🫙',
  'Épicerie Sucrée':         '🍬',
  'Condiments & Sauces':     '🧴',
  'Herbes & Épices':         '🌿',
  'Surgelés':                '❄️',
  'Boissons':                '🥤',
  'Autres':                  '🛒'
};
const ALL_RAYONS = Object.keys(RAYON_ICONS);

const DEFAULT_INGREDIENTS = [
  // Fruits & Légumes
  {n:'Pommes',r:'Fruits & Légumes'},{n:'Poires',r:'Fruits & Légumes'},{n:'Bananes',r:'Fruits & Légumes'},
  {n:'Oranges',r:'Fruits & Légumes'},{n:'Citrons',r:'Fruits & Légumes'},{n:'Citrons verts',r:'Fruits & Légumes'},
  {n:'Fraises',r:'Fruits & Légumes'},{n:'Framboises',r:'Fruits & Légumes'},{n:'Myrtilles',r:'Fruits & Légumes'},
  {n:'Cerises',r:'Fruits & Légumes'},{n:'Pêches',r:'Fruits & Légumes'},{n:'Abricots',r:'Fruits & Légumes'},
  {n:'Prunes',r:'Fruits & Légumes'},{n:'Raisins',r:'Fruits & Légumes'},{n:'Kiwis',r:'Fruits & Légumes'},
  {n:'Mangue',r:'Fruits & Légumes'},{n:'Ananas',r:'Fruits & Légumes'},{n:'Melon',r:'Fruits & Légumes'},
  {n:'Pastèque',r:'Fruits & Légumes'},{n:'Avocat',r:'Fruits & Légumes'},{n:'Tomates',r:'Fruits & Légumes'},
  {n:'Tomates cerises',r:'Fruits & Légumes'},{n:'Concombre',r:'Fruits & Légumes'},{n:'Courgettes',r:'Fruits & Légumes'},
  {n:'Aubergines',r:'Fruits & Légumes'},{n:'Poivrons',r:'Fruits & Légumes'},{n:'Poivron rouge',r:'Fruits & Légumes'},
  {n:'Poivron vert',r:'Fruits & Légumes'},{n:'Poivron jaune',r:'Fruits & Légumes'},
  {n:'Carottes',r:'Fruits & Légumes'},{n:'Pommes de terre',r:'Fruits & Légumes'},{n:'Patates douces',r:'Fruits & Légumes'},
  {n:'Oignons',r:'Fruits & Légumes'},{n:'Oignons rouges',r:'Fruits & Légumes'},{n:'Échalotes',r:'Fruits & Légumes'},
  {n:'Ail',r:'Fruits & Légumes'},{n:'Poireaux',r:'Fruits & Légumes'},{n:'Céleri',r:'Fruits & Légumes'},
  {n:'Fenouil',r:'Fruits & Légumes'},{n:'Brocoli',r:'Fruits & Légumes'},{n:'Chou-fleur',r:'Fruits & Légumes'},
  {n:'Chou blanc',r:'Fruits & Légumes'},{n:'Chou rouge',r:'Fruits & Légumes'},{n:'Épinards',r:'Fruits & Légumes'},
  {n:'Salade verte',r:'Fruits & Légumes'},{n:'Roquette',r:'Fruits & Légumes'},{n:'Mâche',r:'Fruits & Légumes'},
  {n:'Endives',r:'Fruits & Légumes'},{n:'Champignons',r:'Fruits & Légumes'},{n:'Champignons de Paris',r:'Fruits & Légumes'},
  {n:'Girolles',r:'Fruits & Légumes'},{n:'Asperges',r:'Fruits & Légumes'},{n:'Artichauts',r:'Fruits & Légumes'},
  {n:'Betteraves',r:'Fruits & Légumes'},{n:'Navets',r:'Fruits & Légumes'},{n:'Radis',r:'Fruits & Légumes'},
  {n:'Persil',r:'Fruits & Légumes'},{n:'Basilic',r:'Fruits & Légumes'},{n:'Menthe',r:'Fruits & Légumes'},
  {n:'Coriandre fraîche',r:'Fruits & Légumes'},{n:'Ciboulette',r:'Fruits & Légumes'},
  {n:'Thym frais',r:'Fruits & Légumes'},{n:'Romarin frais',r:'Fruits & Légumes'},
  {n:'Maïs',r:'Fruits & Légumes'},{n:'Haricots verts',r:'Fruits & Légumes'},{n:'Petits pois',r:'Fruits & Légumes'},
  {n:'Courge butternut',r:'Fruits & Légumes'},{n:'Potiron',r:'Fruits & Légumes'},{n:'Courgette',r:'Fruits & Légumes'},
  {n:'Céleri branche',r:'Fruits & Légumes'},{n:'Gingembre frais',r:'Fruits & Légumes'},
  // Viandes & Charcuterie
  {n:'Poulet entier',r:'Viandes & Charcuterie'},{n:'Filet de poulet',r:'Viandes & Charcuterie'},
  {n:'Cuisses de poulet',r:'Viandes & Charcuterie'},{n:'Escalope de poulet',r:'Viandes & Charcuterie'},
  {n:'Escalope de veau',r:'Viandes & Charcuterie'},{n:'Côte de bœuf',r:'Viandes & Charcuterie'},
  {n:'Steak haché',r:'Viandes & Charcuterie'},{n:'Bœuf bourguignon',r:'Viandes & Charcuterie'},
  {n:'Rôti de bœuf',r:'Viandes & Charcuterie'},{n:'Bavette',r:'Viandes & Charcuterie'},
  {n:'Côtelettes d\'agneau',r:'Viandes & Charcuterie'},{n:'Gigot d\'agneau',r:'Viandes & Charcuterie'},
  {n:'Côtes de porc',r:'Viandes & Charcuterie'},{n:'Rôti de porc',r:'Viandes & Charcuterie'},
  {n:'Filet mignon',r:'Viandes & Charcuterie'},{n:'Lardons',r:'Viandes & Charcuterie'},
  {n:'Bacon',r:'Viandes & Charcuterie'},{n:'Jambon blanc',r:'Viandes & Charcuterie'},
  {n:'Jambon de pays',r:'Viandes & Charcuterie'},{n:'Saucisses',r:'Viandes & Charcuterie'},
  {n:'Merguez',r:'Viandes & Charcuterie'},{n:'Chipolatas',r:'Viandes & Charcuterie'},
  {n:'Saucisson',r:'Viandes & Charcuterie'},{n:'Chorizo',r:'Viandes & Charcuterie'},
  {n:'Magret de canard',r:'Viandes & Charcuterie'},{n:'Boudin noir',r:'Viandes & Charcuterie'},
  {n:'Andouillette',r:'Viandes & Charcuterie'},{n:'Foie de veau',r:'Viandes & Charcuterie'},
  // Poissons & Fruits de Mer
  {n:'Saumon frais',r:'Poissons & Fruits de Mer'},{n:'Saumon fumé',r:'Poissons & Fruits de Mer'},
  {n:'Cabillaud',r:'Poissons & Fruits de Mer'},{n:'Thon frais',r:'Poissons & Fruits de Mer'},
  {n:'Thon en boîte',r:'Poissons & Fruits de Mer'},{n:'Sardines',r:'Poissons & Fruits de Mer'},
  {n:'Maquereau',r:'Poissons & Fruits de Mer'},{n:'Dorade',r:'Poissons & Fruits de Mer'},
  {n:'Bar',r:'Poissons & Fruits de Mer'},{n:'Lieu noir',r:'Poissons & Fruits de Mer'},
  {n:'Crevettes',r:'Poissons & Fruits de Mer'},{n:'Gambas',r:'Poissons & Fruits de Mer'},
  {n:'Moules',r:'Poissons & Fruits de Mer'},{n:'Palourdes',r:'Poissons & Fruits de Mer'},
  {n:'Huîtres',r:'Poissons & Fruits de Mer'},{n:'Noix de Saint-Jacques',r:'Poissons & Fruits de Mer'},
  {n:'Calamars',r:'Poissons & Fruits de Mer'},{n:'Poulpe',r:'Poissons & Fruits de Mer'},
  {n:'Langoustines',r:'Poissons & Fruits de Mer'},{n:'Crabe',r:'Poissons & Fruits de Mer'},
  {n:'Truite',r:'Poissons & Fruits de Mer'},{n:'Hareng',r:'Poissons & Fruits de Mer'},
  // Produits Laitiers & Œufs
  {n:'Œufs',r:'Produits Laitiers & Œufs'},{n:'Lait entier',r:'Produits Laitiers & Œufs'},
  {n:'Lait demi-écrémé',r:'Produits Laitiers & Œufs'},{n:'Crème fraîche',r:'Produits Laitiers & Œufs'},
  {n:'Crème liquide',r:'Produits Laitiers & Œufs'},{n:'Crème épaisse',r:'Produits Laitiers & Œufs'},
  {n:'Beurre',r:'Produits Laitiers & Œufs'},{n:'Beurre demi-sel',r:'Produits Laitiers & Œufs'},
  {n:'Yaourt nature',r:'Produits Laitiers & Œufs'},{n:'Yaourt grec',r:'Produits Laitiers & Œufs'},
  {n:'Fromage blanc',r:'Produits Laitiers & Œufs'},{n:'Ricotta',r:'Produits Laitiers & Œufs'},
  {n:'Mascarpone',r:'Produits Laitiers & Œufs'},{n:'Mozzarella',r:'Produits Laitiers & Œufs'},
  {n:'Parmesan',r:'Produits Laitiers & Œufs'},{n:'Gruyère râpé',r:'Produits Laitiers & Œufs'},
  {n:'Emmental',r:'Produits Laitiers & Œufs'},{n:'Comté',r:'Produits Laitiers & Œufs'},
  {n:'Roquefort',r:'Produits Laitiers & Œufs'},{n:'Camembert',r:'Produits Laitiers & Œufs'},
  {n:'Brie',r:'Produits Laitiers & Œufs'},{n:'Chèvre frais',r:'Produits Laitiers & Œufs'},
  {n:'Feta',r:'Produits Laitiers & Œufs'},{n:'Cheddar',r:'Produits Laitiers & Œufs'},
  // Boulangerie & Pâtisserie
  {n:'Baguette',r:'Boulangerie & Pâtisserie'},{n:'Pain de campagne',r:'Boulangerie & Pâtisserie'},
  {n:'Pain de mie',r:'Boulangerie & Pâtisserie'},{n:'Pain complet',r:'Boulangerie & Pâtisserie'},
  {n:'Croissants',r:'Boulangerie & Pâtisserie'},{n:'Pains au chocolat',r:'Boulangerie & Pâtisserie'},
  {n:'Biscottes',r:'Boulangerie & Pâtisserie'},{n:'Crackers',r:'Boulangerie & Pâtisserie'},
  {n:'Pain pita',r:'Boulangerie & Pâtisserie'},{n:'Tortillas',r:'Boulangerie & Pâtisserie'},
  // Épicerie Salée
  {n:'Pâtes',r:'Épicerie Salée'},{n:'Spaghetti',r:'Épicerie Salée'},{n:'Penne',r:'Épicerie Salée'},
  {n:'Tagliatelles',r:'Épicerie Salée'},{n:'Fusilli',r:'Épicerie Salée'},{n:'Lasagnes',r:'Épicerie Salée'},
  {n:'Riz blanc',r:'Épicerie Salée'},{n:'Riz complet',r:'Épicerie Salée'},{n:'Riz basmati',r:'Épicerie Salée'},
  {n:'Riz arborio',r:'Épicerie Salée'},{n:'Quinoa',r:'Épicerie Salée'},{n:'Boulgour',r:'Épicerie Salée'},
  {n:'Lentilles vertes',r:'Épicerie Salée'},{n:'Lentilles corail',r:'Épicerie Salée'},
  {n:'Pois chiches',r:'Épicerie Salée'},{n:'Haricots rouges',r:'Épicerie Salée'},
  {n:'Haricots blancs',r:'Épicerie Salée'},{n:'Farine',r:'Épicerie Salée'},
  {n:'Farine de blé',r:'Épicerie Salée'},{n:'Farine complète',r:'Épicerie Salée'},
  {n:'Farine de riz',r:'Épicerie Salée'},{n:'Semoule',r:'Épicerie Salée'},{n:'Couscous',r:'Épicerie Salée'},
  {n:'Polenta',r:'Épicerie Salée'},{n:'Bouillon de légumes',r:'Épicerie Salée'},
  {n:'Bouillon de poulet',r:'Épicerie Salée'},{n:'Bouillon de bœuf',r:'Épicerie Salée'},
  {n:'Tomates concassées',r:'Épicerie Salée'},{n:'Concentré de tomates',r:'Épicerie Salée'},
  {n:'Sauce tomate',r:'Épicerie Salée'},{n:'Olives noires',r:'Épicerie Salée'},
  {n:'Olives vertes',r:'Épicerie Salée'},{n:'Câpres',r:'Épicerie Salée'},
  {n:'Anchois',r:'Épicerie Salée'},{n:'Sel',r:'Épicerie Salée'},{n:'Poivre',r:'Épicerie Salée'},
  {n:'Huile de sésame',r:'Épicerie Salée'},{n:'Chips',r:'Épicerie Salée'},
  // Épicerie Sucrée
  {n:'Sucre',r:'Épicerie Sucrée'},{n:'Sucre glace',r:'Épicerie Sucrée'},
  {n:'Cassonade',r:'Épicerie Sucrée'},{n:'Sucre de coco',r:'Épicerie Sucrée'},
  {n:'Miel',r:'Épicerie Sucrée'},{n:'Sirop d\'érable',r:'Épicerie Sucrée'},
  {n:'Confiture',r:'Épicerie Sucrée'},{n:'Nutella',r:'Épicerie Sucrée'},
  {n:'Chocolat noir',r:'Épicerie Sucrée'},{n:'Chocolat au lait',r:'Épicerie Sucrée'},
  {n:'Chocolat blanc',r:'Épicerie Sucrée'},{n:'Cacao en poudre',r:'Épicerie Sucrée'},
  {n:'Levure chimique',r:'Épicerie Sucrée'},{n:'Levure de boulanger',r:'Épicerie Sucrée'},
  {n:'Extrait de vanille',r:'Épicerie Sucrée'},{n:'Amandes',r:'Épicerie Sucrée'},
  {n:'Noix',r:'Épicerie Sucrée'},{n:'Noisettes',r:'Épicerie Sucrée'},
  {n:'Pistaches',r:'Épicerie Sucrée'},{n:'Noix de cajou',r:'Épicerie Sucrée'},
  {n:'Raisins secs',r:'Épicerie Sucrée'},{n:'Dattes',r:'Épicerie Sucrée'},
  {n:'Flocons d\'avoine',r:'Épicerie Sucrée'},{n:'Céréales',r:'Épicerie Sucrée'},
  {n:'Biscuits',r:'Épicerie Sucrée'},{n:'Poudre d\'amandes',r:'Épicerie Sucrée'},
  {n:'Noix de coco râpée',r:'Épicerie Sucrée'},{n:'Maïzena',r:'Épicerie Sucrée'},
  // Condiments & Sauces
  {n:'Huile d\'olive',r:'Condiments & Sauces'},{n:'Huile de tournesol',r:'Condiments & Sauces'},
  {n:'Huile de colza',r:'Condiments & Sauces'},{n:'Vinaigre de vin',r:'Condiments & Sauces'},
  {n:'Vinaigre balsamique',r:'Condiments & Sauces'},{n:'Vinaigre de cidre',r:'Condiments & Sauces'},
  {n:'Moutarde',r:'Condiments & Sauces'},{n:'Moutarde à l\'ancienne',r:'Condiments & Sauces'},
  {n:'Mayonnaise',r:'Condiments & Sauces'},{n:'Ketchup',r:'Condiments & Sauces'},
  {n:'Sauce soja',r:'Condiments & Sauces'},{n:'Sauce worcestershire',r:'Condiments & Sauces'},
  {n:'Tabasco',r:'Condiments & Sauces'},{n:'Harissa',r:'Condiments & Sauces'},
  {n:'Pesto',r:'Condiments & Sauces'},{n:'Tapenade',r:'Condiments & Sauces'},
  {n:'Sauce bolognaise',r:'Condiments & Sauces'},{n:'Crème de coco',r:'Condiments & Sauces'},
  {n:'Lait de coco',r:'Condiments & Sauces'},{n:'Sauce teriyaki',r:'Condiments & Sauces'},
  {n:'Nuoc mam',r:'Condiments & Sauces'},{n:'Tahini',r:'Condiments & Sauces'},
  // Herbes & Épices
  {n:'Cumin',r:'Herbes & Épices'},{n:'Cumin en poudre',r:'Herbes & Épices'},
  {n:'Curcuma',r:'Herbes & Épices'},{n:'Paprika',r:'Herbes & Épices'},{n:'Paprika fumé',r:'Herbes & Épices'},
  {n:'Piment',r:'Herbes & Épices'},{n:'Piment en poudre',r:'Herbes & Épices'},
  {n:'Cannelle',r:'Herbes & Épices'},{n:'Gingembre en poudre',r:'Herbes & Épices'},
  {n:'Noix de muscade',r:'Herbes & Épices'},{n:'Cardamome',r:'Herbes & Épices'},
  {n:'Coriandre en poudre',r:'Herbes & Épices'},{n:'Herbes de Provence',r:'Herbes & Épices'},
  {n:'Thym séché',r:'Herbes & Épices'},{n:'Origan',r:'Herbes & Épices'},{n:'Laurier',r:'Herbes & Épices'},
  {n:'Safran',r:'Herbes & Épices'},{n:'Ras el hanout',r:'Herbes & Épices'},
  {n:'Curry',r:'Herbes & Épices'},{n:'Massalé',r:'Herbes & Épices'},
  {n:'Graines de sésame',r:'Herbes & Épices'},{n:'Graines de chia',r:'Herbes & Épices'},
  {n:'Graines de lin',r:'Herbes & Épices'},{n:'Aneth',r:'Herbes & Épices'},
  {n:'Estragon',r:'Herbes & Épices'},{n:'Fenugrec',r:'Herbes & Épices'},
  // Surgelés
  {n:'Légumes surgelés',r:'Surgelés'},{n:'Épinards surgelés',r:'Surgelés'},
  {n:'Petits pois surgelés',r:'Surgelés'},{n:'Haricots verts surgelés',r:'Surgelés'},
  {n:'Maïs surgelé',r:'Surgelés'},{n:'Pizza surgelée',r:'Surgelés'},
  {n:'Poisson pané',r:'Surgelés'},{n:'Crevettes surgelées',r:'Surgelés'},
  {n:'Frites surgelées',r:'Surgelés'},{n:'Glace',r:'Surgelés'},{n:'Sorbet',r:'Surgelés'},
  // Boissons
  {n:'Eau minérale',r:'Boissons'},{n:'Eau gazeuse',r:'Boissons'},{n:'Jus d\'orange',r:'Boissons'},
  {n:'Jus de pomme',r:'Boissons'},{n:'Café',r:'Boissons'},{n:'Café en grains',r:'Boissons'},
  {n:'Thé',r:'Boissons'},{n:'Tisane',r:'Boissons'},{n:'Vin rouge',r:'Boissons'},
  {n:'Vin blanc',r:'Boissons'},{n:'Bière',r:'Boissons'},{n:'Cidre',r:'Boissons'},
  {n:'Sirop',r:'Boissons'},{n:'Lait végétal',r:'Boissons'},
].map(i => ({ name: i.n, rayon: i.r }));

// ═══════════════════════════════════════════════════════
// PRESET TAGS
// ═══════════════════════════════════════════════════════
const PRESET_TAGS = ['Veggie','Healthy','Soir','Rapide','Gourmand','Sucré','Familial','Bébé'];
const NOTE_CONFIG = [
  { label: 'Les Règles',     icon: '📋', size: 'large' },
  { label: 'Boîte à Idées', icon: '💡', size: 'normal' }
];

// ═══════════════════════════════════════════════════════
// PROFILES (un profil = un couple)
// ═══════════════════════════════════════════════════════
const PROFILES = [
  { id: 'theophile-julie',   name: 'Théophile & Julie',  color: '#3A82B8' },
  { id: 'elise-fifou',       name: 'Élise & Fifou',      color: '#9B59B6' },
  { id: 'charlotte-antoine', name: 'Charlotte & Antoine', color: '#E8583A' },
  { id: 'lucie-alexis',      name: 'Lucie & Alexis',     color: '#27AE60' }
];

function getProfileById(id) { return PROFILES.find(p => p.id === id) || PROFILES[0]; }
function getCurrentProfile() { return getProfileById(state.currentProfileId); }

// ═══════════════════════════════════════════════════════
// STATE & STORAGE
// ═══════════════════════════════════════════════════════
let state = {
  currentProfileId: 'theophile-julie',
  recipes:          [],
  ingredientsDb:    [],
  shoppingList:     [],
  menu:             [],
  notes:            [{ messages: [] }, { messages: [] }],
  currentSection:   'recettes',
  currentMenuWeek:  getMondayDate(new Date()),
  tagFilters:       [],
  favorites:        []
};

// ═══════════════════════════════════════════════════════
// FIREBASE
// ═══════════════════════════════════════════════════════
const FB_URL     = 'https://lestoquesremois-default-rtdb.europe-west1.firebasedatabase.app';
const FB_STORAGE = 'https://firebasestorage.googleapis.com/v0/b/lestoquesremois.appspot.com/o';

async function fbGet(path) {
  const res = await fetch(`${FB_URL}/${path}.json`);
  if (!res.ok) throw new Error(`Firebase GET ${path} : ${res.status}`);
  return res.json();
}

async function fbPut(path, data) {
  const res = await fetch(`${FB_URL}/${path}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Firebase PUT ${path} : ${res.status}`);
}

// Firebase renvoie parfois des objets à clés numériques au lieu de tableaux
function fbArr(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(v => v != null);
  return Object.values(val).filter(v => v != null);
}

async function loadState() {
  try {
    const session = JSON.parse(localStorage.getItem('recettes-session') || '{}');
    if (session.profileId) state.currentProfileId = session.profileId;

    // Chargement depuis Firebase
    const [shared, profileRaw] = await Promise.all([
      fbGet('shared'),
      fbGet(`profiles/${state.currentProfileId}`)
    ]);

    const s = shared || {};

    // Migration éventuelle depuis localStorage (première connexion)
    const legacy = localStorage.getItem('recettes-shared');
    if (legacy && !s.recipes?.length) {
      const loc = JSON.parse(legacy);
      s.recipes      = loc.recipes      || [];
      s.ingredientsDb = loc.ingredientsDb || [];
      s.notes        = loc.notes        || [];
      await fbPut('shared', s);
      // migrer les profils localStorage
      ['theophile-julie','elise-fifou','charlotte-antoine'].forEach(async pid => {
        const pd = JSON.parse(localStorage.getItem(`recettes-profile-${pid}`) || '{}');
        if (pd.shoppingList?.length || pd.menu?.length) {
          await fbPut(`profiles/${pid}`, pd);
        }
        localStorage.removeItem(`recettes-profile-${pid}`);
      });
      localStorage.removeItem('recettes-shared');
    }

    state.recipes = fbArr(s.recipes);
    const rawNotes = fbArr(s.notes);
    state.notes = [0, 1].map(i => {
      const n = rawNotes[i];
      if (!n) return { messages: [] };
      if (n.messages) return { messages: fbArr(n.messages) };
      return { messages: n.text ? [{ id: uid(), text: n.text, authorId: n.authorId, createdAt: Date.now() }] : [] };
    });
    const customIng = fbArr(s.ingredientsDb)
      .filter(i => !DEFAULT_INGREDIENTS.some(d => d.name.toLowerCase() === i.name.toLowerCase()));
    state.ingredientsDb = [...DEFAULT_INGREDIENTS, ...customIng];

    const p = profileRaw || {};
    state.shoppingList = fbArr(p.shoppingList);
    state.menu         = fbArr(p.menu);
    state.favorites    = Array.isArray(p.favorites) ? p.favorites : [];

  } catch(e) {
    console.error('Erreur chargement:', e);
    state.ingredientsDb = [...DEFAULT_INGREDIENTS];
    showToast('Erreur de connexion à la base de données', 'error');
  }
}

async function _loadProfileData() {
  try {
    const raw = await fbGet(`profiles/${state.currentProfileId}`) || {};
    state.shoppingList = fbArr(raw.shoppingList);
    state.menu         = fbArr(raw.menu);
    state.favorites    = Array.isArray(raw.favorites) ? raw.favorites : [];
  } catch(e) {
    state.shoppingList = [];
    state.menu = [];
    state.favorites = [];
  }
}

let _saveTimer = null;
function saveState() {
  localStorage.setItem('recettes-session', JSON.stringify({ profileId: state.currentProfileId }));
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(_doSave, 600);
}

async function _doSave() {
  try {
    const customIng = state.ingredientsDb
      .filter(i => !DEFAULT_INGREDIENTS.some(d => d.name.toLowerCase() === i.name.toLowerCase()));
    await Promise.all([
      fbPut('shared', { recipes: state.recipes, ingredientsDb: customIng, notes: state.notes }),
      fbPut(`profiles/${state.currentProfileId}`, { shoppingList: state.shoppingList, menu: state.menu, favorites: state.favorites })
    ]);
  } catch(e) {
    console.error('Erreur sauvegarde:', e);
    showToast('Erreur de sauvegarde — vérifie ta connexion', 'error');
  }
}

async function switchProfile(profileId) {
  clearTimeout(_saveTimer);
  await _doSave();
  state.currentProfileId = profileId;
  localStorage.setItem('recettes-session', JSON.stringify({ profileId }));
  await _loadProfileData();
  hideModal();
  renderUserIndicator();
  renderMainGreeting();
  _updateMobileProfile();
  updateCoursesBadge();
  if (state.currentSection === 'recettes') renderRecipes();
  else if (state.currentSection === 'courses') renderCourses();
  else if (state.currentSection === 'menu') renderMenu();
  showToast(`Profil changé : ${getCurrentProfile().name}`, 'success');
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ═══════════════════════════════════════════════════════
// USER INDICATOR & SESSION SWITCHER
// ═══════════════════════════════════════════════════════
function renderMainGreeting() {
  const el = document.getElementById('main-greeting');
  if (!el) return;
  const p = getCurrentProfile();
  el.innerHTML = `<p class="main-greeting-line">Bonjour, <span style="color:${p.color}">${p.name}</span>&nbsp;!</p>`;
}

function _updateMobileProfile() {
  const p = getCurrentProfile();
  const dot = document.getElementById('mobile-profile-dot');
  const name = document.getElementById('mobile-profile-name');
  if (dot) dot.style.background = p.color;
  if (name) name.textContent = p.name;
}

function renderUserIndicator() {
  const el = document.getElementById('user-indicator');
  if (!el) return;
  const profile = getCurrentProfile();
  el.innerHTML = `
    <div class="user-btn" onclick="openSessionSwitcher()" title="Changer de profil">
      <div class="user-color-bar" style="background:${profile.color}"></div>
      <div class="user-info-block">
        <span class="user-greeting">Bonjour,</span>
        <span class="user-display-name">${profile.name}</span>
      </div>
      <span class="user-switch-arrow">⇄</span>
    </div>`;
}

function openSessionSwitcher() {
  const body = `
    <p class="text-small text-light" style="margin-bottom:18px;">Sélectionnez un profil pour accéder à vos courses et menu.</p>
    <div class="profiles-grid">
      ${PROFILES.map(p => {
        const isActive = p.id === state.currentProfileId;
        return `<button class="profile-btn${isActive ? ' active' : ''}"
                        style="--pc:${p.color}"
                        onclick="switchProfile('${p.id}')">
          <span class="profile-color-dot" style="background:${p.color}"></span>
          <span class="profile-btn-name">${p.name}</span>
          ${isActive ? `<span class="profile-check" style="background:${p.color}">Actif</span>` : ''}
        </button>`;
      }).join('')}
    </div>`;

  showModal({
    title: 'Changer de profil',
    body,
    footer: `<button class="btn-secondary" onclick="hideModal()">Fermer</button>`
  });
}

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
function showSection(name) {
  state.currentSection = name;
  document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.section === name));
  document.querySelectorAll('.section').forEach(el => el.classList.toggle('active', el.id === `section-${name}`));
  updateMobileNav();
  if (name === 'recettes') renderRecipes();
  if (name === 'courses')  renderCourses();
  if (name === 'menu')     renderMenu();
}

function updateCoursesBadge() {
  const unchecked = state.shoppingList.filter(i => !i.checked).length;
  const badge = document.getElementById('courses-badge');
  if (badge) { badge.textContent = unchecked; badge.classList.toggle('hidden', unchecked === 0); }
  const mbadge = document.getElementById('mobile-courses-badge');
  if (mbadge) { mbadge.textContent = unchecked; mbadge.classList.toggle('hidden', unchecked === 0); }
}

function updateMobileNav() {
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === state.currentSection);
  });
}

// ═══════════════════════════════════════════════════════
// WEEK UTILITIES
// ═══════════════════════════════════════════════════════
function getMondayDate(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(12, 0, 0, 0);
  return d.toISOString().split('T')[0];
}

function getWeekDates(weekKey) {
  const monday = new Date(weekKey + 'T12:00:00');
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function getWeekLabel(weekKey) {
  const dates = getWeekDates(weekKey);
  const fmt = d => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  return `Semaine du ${fmt(dates[0])} au ${fmt(dates[6])}`;
}

function addWeeks(weekKey, n) {
  const d = new Date(weekKey + 'T12:00:00');
  d.setDate(d.getDate() + n * 7);
  return d.toISOString().split('T')[0];
}

function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

// ═══════════════════════════════════════════════════════
// INGREDIENT UTILITIES
// ═══════════════════════════════════════════════════════
function findRayon(name) {
  if (!name) return 'Autres';
  const n = name.toLowerCase().trim();
  const exact = state.ingredientsDb.find(i => i.name.toLowerCase() === n);
  if (exact) return exact.rayon;
  const partial = state.ingredientsDb.find(i =>
    n.includes(i.name.toLowerCase()) || i.name.toLowerCase().includes(n)
  );
  return partial ? partial.rayon : 'Autres';
}

function parseIngredient(raw) {
  const s = (raw || '').trim();
  const unitRx = 'kg|g|mg|cl|dl|ml|L|l|' +
    'cuillères?\\s+à\\s+soupe|c\\.?à\\.?s\\.?|càs|' +
    'cuillères?\\s+à\\s+café|c\\.?à\\.?c\\.?|càc|' +
    'tasses?|verres?|pincées?|tranches?|morceaux?|' +
    'feuilles?|gousses?|brins?|bouquets?|sachets?|boîtes?|bottes?|têtes?|' +
    'poignées?|filets?|portions?|part(?:s)?';
  const re = new RegExp(
    `^(\\d+(?:[,.]\\d+)?(?:\\s*\\/\\s*\\d+)?)\\s*(${unitRx})?\\s*(?:de\\s+|d'|du\\s+|des?\\s+)?(.+)$`, 'i'
  );
  const m = s.match(re);
  let quantity = null, unit = '', name = s;
  if (m) {
    const qStr = m[1];
    if (qStr.includes('/')) {
      const parts = qStr.split('/');
      quantity = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      quantity = parseFloat(qStr.replace(',', '.'));
    }
    if (isNaN(quantity)) quantity = null;
    unit = (m[2] || '').trim();
    name = (m[3] || s).trim();
  }
  return { id: uid(), raw: s, quantity, unit, name, rayon: findRayon(name) };
}

function formatQty(qty) {
  if (qty === null || qty === undefined) return '';
  const rounded = Math.round(qty * 8) / 8;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;
  const fracs = { 0.125: '⅛', 0.25: '¼', 0.375: '⅜', 0.5: '½', 0.625: '⅝', 0.75: '¾', 0.875: '⅞' };
  if (frac === 0) return whole > 0 ? String(whole) : '';
  const fracStr = fracs[frac] || frac.toFixed(1).replace('0.', '.');
  return whole > 0 ? `${whole}${fracStr}` : fracStr;
}

// ═══════════════════════════════════════════════════════
// RECIPE SCRAPING
// ═══════════════════════════════════════════════════════
async function fetchWithTimeout(url, ms = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

async function scrapeRecipe(url) {
  // Cas spécial jow.fr : API publique jow
  if (url.includes('jow.fr/recipes/')) {
    try {
      const slug = url.split('/recipes/')[1].split('?')[0];
      // L'ID jow est la dernière partie après le dernier tiret
      const id = slug.split('-').pop();
      // On essaie plusieurs endpoints connus
      const apiCandidates = [
        `https://api.jow.fr/public/recipe/${slug}`,
        `https://api.jow.fr/public/recipe/${id}`,
        `https://www.jow.fr/api/recipes/${slug}`,
      ];
      for (const apiUrl of apiCandidates) {
        try {
          const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
          const res = await fetchWithTimeout(proxied, 12000);
          if (!res.ok) continue;
          const json = await res.json();
          // Valide que c'est bien une recette avec des ingrédients
          const hasIngs = (json?.constituents || json?.ingredients || json?.recipeIngredients || []).length > 0;
          if (json && (json.name || json.title) && hasIngs) {
            return _finalizeRecipe(_normalizeJowRecipe(json), url);
          }
        } catch(_) {}
      }
    } catch(_) {}
    // Si l'API échoue, on tombe dans le scraping HTML normal
  }

  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`
  ];
  let html = null;
  for (const proxy of proxies) {
    try {
      const res = await fetchWithTimeout(proxy, 14000);
      if (res.ok) {
        const text = await res.text();
        if (text.length > 500 && text.includes('<')) { html = text; break; }
      }
    } catch (_) {}
  }
  if (!html) throw new Error('Impossible de récupérer la page (tous les proxies ont échoué). Essayez la saisie manuelle.');


  const doc = new DOMParser().parseFromString(html, 'text/html');
  let rd = null;

  // 1. JSON-LD standard (Marmiton, 750g, AllRecipes…)
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.textContent);
      const find = obj => {
        if (!obj) return null;
        const t = obj['@type'];
        if (t === 'Recipe' || (Array.isArray(t) && t.includes('Recipe'))) return obj;
        if (obj['@graph']) { for (const item of obj['@graph']) { const f = find(item); if (f) return f; } }
        return null;
      };
      rd = find(data);
      if (rd) break;
    } catch (_) {}
  }

  // 2. __NEXT_DATA__ (Next.js SSR — jow.fr, etc.)
  if (!rd) {
    const nextEl = doc.querySelector('#__NEXT_DATA__');
    if (nextEl) {
      try {
        const nd = JSON.parse(nextEl.textContent);
        const pp = nd?.props?.pageProps;

        // Cherche récursivement un objet qui ressemble à une recette
        const findRecipeInObj = (obj, depth = 0) => {
          if (!obj || typeof obj !== 'object' || depth > 6) return null;
          if ((obj.name || obj.title) && (obj.constituents || obj.ingredients || obj.recipeIngredient || obj.steps)) return obj;
          for (const val of Object.values(obj)) {
            const found = findRecipeInObj(val, depth + 1);
            if (found) return found;
          }
          return null;
        };

        // Candidats directs
        const candidate = pp?.recipe || pp?.data?.recipe || pp?.initialRecipe
          || pp?.recipeData || pp?.pageData?.recipe
          // React Query dehydrated state (jow.fr v2)
          || pp?.dehydratedState?.queries?.[0]?.state?.data
          || findRecipeInObj(pp);

        if (candidate && (candidate.name || candidate.title)) {
          rd = _normalizeJowRecipe(candidate);
        }
      } catch(_) {}
    }
  }

  // 3. Microdata HTML (schema.org/Recipe via itemtype — anciennes pages 750g, Marmiton…)
  if (!rd) {
    const recipeEl = doc.querySelector('[itemtype*="schema.org/Recipe"]');
    if (recipeEl) {
      const getProp = (name, multi = false) => {
        const els = recipeEl.querySelectorAll(`[itemprop="${name}"]`);
        if (!els.length) return multi ? [] : '';
        if (multi) return [...els].map(e => e.getAttribute('content') || e.textContent.trim()).filter(Boolean);
        const e = els[0];
        return e.getAttribute('content') || e.getAttribute('datetime') || e.textContent.trim();
      };
      const name = getProp('name');
      if (name) {
        const image = recipeEl.querySelector('[itemprop="image"]')?.getAttribute('src')
          || recipeEl.querySelector('[itemprop="image"]')?.getAttribute('content') || '';
        const yieldRaw = getProp('recipeYield');
        const yieldM = String(yieldRaw).match(/\d+/);
        const recipeIngredient = getProp('recipeIngredient', true).length
          ? getProp('recipeIngredient', true)
          : getProp('ingredients', true);
        const stepsEls = [...recipeEl.querySelectorAll('[itemprop="recipeInstructions"] [itemprop="text"], [itemprop="recipeInstructions"]')];
        const recipeInstructions = stepsEls.length
          ? stepsEls.map(e => e.textContent.trim()).filter(Boolean)
          : [recipeEl.querySelector('[itemprop="recipeInstructions"]')?.textContent.trim() || ''];
        rd = {
          name,
          image,
          recipeYield: yieldM ? parseInt(yieldM[0]) : 4,
          recipeIngredient,
          recipeInstructions
        };
      }
    }
  }

  // 4. Recherche générique dans tous les <script> (données JSON inline)
  if (!rd) {
    for (const script of doc.querySelectorAll('script:not([src])')) {
      try {
        const t = script.textContent;
        // cherche un bloc JSON qui ressemble à une recette jow
        const m = t.match(/"constituents"\s*:\s*\[/);
        if (m) {
          // tente d'extraire le JSON englobant
          const start = t.lastIndexOf('{', t.indexOf('"constituents"'));
          if (start !== -1) {
            // On cherche un objet JSON valide à partir de là
            let depth = 0, end = -1;
            for (let i = start; i < t.length; i++) {
              if (t[i] === '{') depth++;
              else if (t[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
            }
            if (end !== -1) {
              const obj = JSON.parse(t.slice(start, end + 1));
              if (obj.name || obj.title) { rd = _normalizeJowRecipe(obj); break; }
            }
          }
        }
      } catch(_) {}
    }
  }

  // Bloque les faux positifs (pages d'erreur, pages vides…)
  const BAD_TITLES = ['ouch', 'error', 'not found', '404', 'access denied', 'forbidden'];
  if (rd && BAD_TITLES.some(b => (rd.name||'').toLowerCase().includes(b))) rd = null;
  if (rd && !(rd.recipeIngredient?.length)) rd = null;

  if (!rd) throw new Error(`Recette non trouvée sur cette page (${new URL(url).hostname}). Le site n'est peut-être pas compatible. Essayez la saisie manuelle.`);

  return _finalizeRecipe(rd, url);
}

function _finalizeRecipe(rd, url) {
  const title = rd.name || 'Recette';

  let image = '';
  if (rd.image) {
    if (typeof rd.image === 'string') image = rd.image;
    else if (Array.isArray(rd.image)) { const img = rd.image[0]; image = typeof img === 'string' ? img : (img?.url || ''); }
    else if (rd.image.url) image = rd.image.url;
  }

  let servings = 4;
  if (rd.recipeYield) {
    const ys = Array.isArray(rd.recipeYield) ? rd.recipeYield[0] : rd.recipeYield;
    const m = String(ys).match(/\d+/);
    if (m) servings = parseInt(m[0]);
  }

  const ingredients = (rd.recipeIngredient || []).map(s => parseIngredient(s));

  let instructions = '';
  if (rd.recipeInstructions) {
    if (typeof rd.recipeInstructions === 'string') {
      instructions = rd.recipeInstructions;
    } else if (Array.isArray(rd.recipeInstructions)) {
      instructions = rd.recipeInstructions
        .map(s => (typeof s === 'string' ? s : (s.text || s.name || '')))
        .filter(Boolean).join('\n');
    }
  }

  return { title, image, servings, originalServings: servings, ingredients, instructions, url };
}

// Normalise le format jow.fr vers le format JSON-LD standard attendu par scrapeRecipe
function _normalizeJowRecipe(r) {
  // ingrédients — plusieurs formats possibles selon version API jow
  const rawIngs = r.constituents || r.ingredients || r.recipeIngredients || [];
  const recipeIngredient = rawIngs.map(c => {
    if (typeof c === 'string') return c;
    // format API jow public : { quantity, unit: {name}, ingredient: {name} }
    const qty  = c.quantity != null ? String(c.quantity) : '';
    const unit = c.unit?.name || c.unitName || c.unitLabel || c.unitSymbol || '';
    const name = c.ingredient?.name || c.ingredientName || c.foodName || c.name || '';
    return [qty, unit, name].filter(Boolean).join(' ');
  });

  // instructions
  const steps = r.steps || r.recipeInstructions || r.instructions || [];
  const recipeInstructions = Array.isArray(steps)
    ? steps.map(s => typeof s === 'string' ? s : (s.description || s.label || s.text || s.name || '')).filter(Boolean)
    : (typeof steps === 'string' ? [steps] : []);

  // image — cherche dans tous les champs possibles
  let image = '';
  const imgCandidates = [
    r.image?.url, r.imageUrl, r.photo?.url, r.photo, r.coverImage?.url,
    r.mainImage?.url, r.thumbnail?.url, r.picture?.url,
    Array.isArray(r.image) ? (r.image[0]?.url || r.image[0]) : null,
    r.image
  ];
  for (const c of imgCandidates) {
    if (typeof c === 'string' && c.startsWith('http')) { image = c; break; }
  }

  const servings = r.numberOfServings || r.servings || r.yield || r.recipeYield || 4;

  return {
    name:               r.name || r.title || 'Recette',
    image,
    recipeYield:        servings,
    recipeIngredient,
    recipeInstructions
  };
}

// ═══════════════════════════════════════════════════════
// RECIPES — RENDER
// ═══════════════════════════════════════════════════════
function renderRecipes() {
  const el = document.getElementById('section-recettes');
  const alreadyRendered = !!document.getElementById('search-recipes');

  if (!alreadyRendered) {
    el.innerHTML = `
      <div class="section-header">
        <div class="section-title">
          <h2>📖 Mes Recettes</h2>
          <span class="count-badge" id="recipes-count">${state.recipes.length}</span>
        </div>
        <div class="header-actions">
          <div id="notes-btns"></div>
          <button class="btn-primary" onclick="openAddRecipeModal()">+ Ajouter une recette</button>
        </div>
      </div>
      <div class="filter-bar">
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input id="search-recipes" class="search-input" type="text" placeholder="Rechercher une recette..."
                 oninput="renderRecipesGrid()">
        </div>
        <div class="tag-filter-bar" id="tag-filter-bar"></div>
      </div>
      <div id="recipes-results"></div>
    `;
  }

  document.getElementById('recipes-count').textContent = state.recipes.length;
  _renderTagFilterBar();
  _renderNotesBtns();
  renderRecipesGrid();
}

function _renderNotesBtns() {
  const el = document.getElementById('notes-btns');
  if (!el) return;
  el.innerHTML = NOTE_CONFIG.map((cfg, i) => {
    const count = state.notes[i].messages.length;
    return `<button class="note-icon-btn${count ? ' has-content' : ''}" onclick="openNoteModal(${i})" title="${cfg.label}">
      <span class="note-icon-btn-icon">${cfg.icon}</span>
      <span class="note-icon-btn-label">${cfg.label}</span>
      ${count ? `<span class="note-icon-btn-badge">${count}</span>` : ''}
    </button>`;
  }).join('');
}

function _renderTagFilterBar() {
  const bar = document.getElementById('tag-filter-bar');
  if (!bar) return;
  const active = state.tagFilters;
  const favActive = active.includes('__fav__');
  const favBtn = `<button class="tag-filter fav-filter-btn${favActive ? ' active' : ''}" onclick="toggleTagFilter('__fav__')">❤ Favoris</button>`;
  bar.innerHTML = favBtn + PRESET_TAGS.map(t =>
    `<button class="tag-filter${active.includes(t)?' active':''}" onclick="toggleTagFilter('${t}')">${t}</button>`
  ).join('');
}

function openNoteModal(index) {
  const cfg = NOTE_CONFIG[index];
  showModal({
    title: `${cfg.icon} ${cfg.label}`,
    body: _buildNoteModalBody(index),
    footer: `<button class="btn-secondary" onclick="hideModal()">Fermer</button>`,
    size: cfg.size
  });
}

function _buildNoteModalBody(index) {
  const msgs = state.notes[index].messages;
  const profile = getCurrentProfile();
  const feed = msgs.length === 0
    ? `<p class="note-empty">Aucun message pour l'instant.</p>`
    : msgs.map(m => {
        const author = m.authorId ? getProfileById(m.authorId) : null;
        const date = new Date(m.createdAt).toLocaleDateString('fr-FR', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
        return `<div class="note-msg">
          <div class="note-msg-header">
            ${author ? `<span class="note-msg-author" style="background:${author.color}">${author.name}</span>` : ''}
            <span class="note-msg-date">${date}</span>
            <button class="note-msg-del" onclick="deleteNoteMessage(${index},'${m.id}')" title="Supprimer">✕</button>
          </div>
          <p class="note-msg-text">${m.text.replace(/\n/g,'<br>')}</p>
        </div>`;
      }).join('');

  return `
    <div class="note-feed">${feed}</div>
    <div class="note-compose">
      <div class="note-compose-who" style="background:${profile.color}">${profile.name}</div>
      <textarea id="note-new-input" class="note-compose-input" rows="2" placeholder="Écrire un message…"></textarea>
      <button class="note-compose-send btn-primary" onclick="addNoteMessage(${index})">Envoyer</button>
    </div>`;
}

function addNoteMessage(index) {
  const input = document.getElementById('note-new-input');
  const text = input?.value.trim();
  if (!text) return;
  state.notes[index].messages.push({ id: uid(), text, authorId: state.currentProfileId, createdAt: Date.now() });
  saveState();
  _refreshNoteModalBody(index);
  _renderNotesBtns();
}

function deleteNoteMessage(index, msgId) {
  state.notes[index].messages = state.notes[index].messages.filter(m => m.id !== msgId);
  saveState();
  _refreshNoteModalBody(index);
  _renderNotesBtns();
}

// ── Commentaires par recette ─────────────────────
function openRecipeComments(recipeId) {
  showModal({
    title: '💬 Commentaires',
    body: _buildCommentModalBody(recipeId),
    footer: `<button class="btn-secondary" onclick="hideModal()">Fermer</button>`,
    size: 'medium'
  });
}

function _buildCommentModalBody(recipeId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return '';
  const comments = recipe.comments || [];
  const profile = getCurrentProfile();

  const feed = comments.length === 0
    ? `<p class="note-empty">Aucun commentaire pour l'instant.</p>`
    : comments.map(c => {
        const author = c.authorId ? getProfileById(c.authorId) : null;
        const date = new Date(c.createdAt).toLocaleDateString('fr-FR', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
        return `<div class="note-msg">
          <div class="note-msg-header">
            ${author ? `<span class="note-msg-author" style="background:${author.color}">${author.name}</span>` : ''}
            <span class="note-msg-date">${date}</span>
            <button class="note-msg-del" onclick="deleteRecipeComment('${recipeId}','${c.id}')" title="Supprimer">✕</button>
          </div>
          <p class="note-msg-text">${c.text.replace(/\n/g,'<br>')}</p>
        </div>`;
      }).join('');

  return `
    <div class="note-feed">${feed}</div>
    <div class="note-compose">
      <div class="note-compose-who" style="background:${profile.color}">${profile.name}</div>
      <textarea id="comment-new-input" class="note-compose-input" rows="2" placeholder="Écrire un commentaire…"></textarea>
      <button class="note-compose-send btn-primary" onclick="addRecipeComment('${recipeId}')">Envoyer</button>
    </div>`;
}

function addRecipeComment(recipeId) {
  const input = document.getElementById('comment-new-input');
  const text = input?.value.trim();
  if (!text) return;
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  if (!recipe.comments) recipe.comments = [];
  recipe.comments.push({ id: uid(), text, authorId: state.currentProfileId, createdAt: Date.now() });
  saveState();
  _refreshCommentModal(recipeId);
  _updateCommentBtn(recipeId);
}

function deleteRecipeComment(recipeId, commentId) {
  const recipe = state.recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  recipe.comments = (recipe.comments || []).filter(c => c.id !== commentId);
  saveState();
  _refreshCommentModal(recipeId);
  _updateCommentBtn(recipeId);
}

function _refreshCommentModal(recipeId) {
  const bodyEl = document.querySelector('#modal-content .modal-body');
  if (!bodyEl) return;
  bodyEl.innerHTML = _buildCommentModalBody(recipeId);
}

function _updateCommentBtn(recipeId) {
  const btn = document.querySelector(`#rcard-${recipeId} .recipe-comment-btn`);
  if (!btn) return;
  const recipe = state.recipes.find(r => r.id === recipeId);
  const count = (recipe?.comments || []).length;
  btn.innerHTML = `💬 Commentaire${count > 1 ? 's' : ''} ${count > 0 ? `<span class="comment-count">${count}</span>` : ''}`;
}

function _refreshNoteModalBody(index) {
  const bodyEl = document.querySelector('#modal-content .modal-body');
  if (!bodyEl) return;
  bodyEl.innerHTML = _buildNoteModalBody(index);
}

function renderRecipesGrid() {
  const container = document.getElementById('recipes-results');
  if (!container) return;
  const search = (document.getElementById('search-recipes')?.value || '').toLowerCase();
  const active = state.tagFilters;

  let filtered = state.recipes;
  if (search) filtered = filtered.filter(r =>
    r.title.toLowerCase().includes(search) ||
    (r.tags||[]).some(t => t.toLowerCase().includes(search)) ||
    (r.ingredients||[]).some(i => (i.name||'').toLowerCase().includes(search))
  );
  if (active.includes('__fav__')) filtered = filtered.filter(r => state.favorites.includes(r.id));
  const tagActive = active.filter(t => t !== '__fav__');
  if (tagActive.length) filtered = filtered.filter(r =>
    tagActive.every(tag => (r.tags||[]).includes(tag))
  );

  container.innerHTML = filtered.length === 0 ? `
    <div class="empty-state">
      <div class="empty-icon">🍳</div>
      <h3>${state.recipes.length === 0 ? 'Aucune recette pour l\'instant' : 'Aucun résultat'}</h3>
      <p>${state.recipes.length === 0 ? 'Cliquez sur "+ Ajouter" pour commencer!' : 'Essayez d\'autres termes ou filtres.'}</p>
    </div>
  ` : `<div class="recipes-grid">${filtered.map(recipeCardHTML).join('')}</div>`;
}

function recipeCardHTML(r) {
  const tags = (r.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');
  const imgHTML = r.image
    ? `<img src="${r.image}" alt="${r.title}" onerror="this.parentElement.innerHTML='<div class=\\'recipe-no-img\\'>🍽️</div>'">`
    : '<div class="recipe-no-img">🍽️</div>';
  const authorProfile = r.addedBy ? getProfileById(r.addedBy) : null;
  const authorBadge = authorProfile
    ? `<span class="recipe-author-badge" style="background:${authorProfile.color}">${authorProfile.name}</span>`
    : '';
  const isFav = state.favorites.includes(r.id);
  const heartBtn = `<button class="recipe-fav-btn${isFav ? ' active' : ''}" onclick="event.stopPropagation();toggleFavorite('${r.id}')" title="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">♥</button>`;
  return `
    <div class="recipe-card" id="rcard-${r.id}">
      <div class="recipe-card-img" onclick="openRecipeDetail('${r.id}')" style="position:relative">${imgHTML}${authorBadge}${heartBtn}</div>
      <div class="recipe-card-body">
        <div class="recipe-card-title" onclick="openRecipeDetail('${r.id}')">${r.title}</div>
        ${tags ? `<div class="recipe-tags">${tags}</div>` : ''}
        <div class="servings-control">
          <span class="servings-label">Portions&nbsp;:</span>
          <div class="servings-btns">
            <button class="servings-btn" onclick="changeServings('${r.id}',-1)">−</button>
            <span class="servings-num" id="snum-${r.id}">${r.servings}</span>
            <button class="servings-btn" onclick="changeServings('${r.id}',1)">+</button>
          </div>
        </div>
        <div class="recipe-card-actions">
          <button class="btn-sm btn-sm-courses" onclick="addRecipeToShoppingList('${r.id}')">🛒 Courses</button>
          <button class="btn-sm btn-sm-menu" onclick="openMenuModal('${r.id}')">📅 Menu</button>
          <button class="btn-sm btn-sm-view" onclick="openRecipeDetail('${r.id}')">👁 Voir</button>
        </div>
        <button class="recipe-comment-btn" onclick="openRecipeComments('${r.id}')">
          💬 Commentaire${(r.comments||[]).length > 1 ? 's' : ''} ${(r.comments||[]).length > 0 ? `<span class="comment-count">${(r.comments||[]).length}</span>` : ''}
        </button>
      </div>
    </div>`;
}

function buildMenuDD(recipeId) {
  const nextWeek = addWeeks(state.currentMenuWeek, 1);
  const sections = [
    { label: getWeekLabel(state.currentMenuWeek).replace('Semaine du ',''), key: state.currentMenuWeek },
    { label: getWeekLabel(nextWeek).replace('Semaine du ',''), key: nextWeek }
  ];
  let html = '';
  for (const sec of sections) {
    const taken = new Set(state.menu.filter(e => e.weekKey === sec.key).map(e => `${e.day}-${e.meal}`));
    const avail = [];
    for (let d = 0; d < 7; d++) for (const m of MEALS) if (!taken.has(`${d}-${m}`)) avail.push([d, m]);
    if (avail.length === 0) continue;
    html += `<div class="dd-section-title">${sec.label}</div>`;
    html += avail.map(([d,m]) =>
      `<button class="dd-slot" onclick="addToMenuFromDD('${recipeId}','${sec.key}',${d},'${m}')">
        ${DAYS_FR[d]} ${MEAL_ICONS[m]} ${m}
      </button>`
    ).join('');
  }
  return html || '<div class="dd-empty">Tous les créneaux sont pris</div>';
}

function toggleMenuDD(recipeId) {
  // Close all other dropdowns first
  document.querySelectorAll('.menu-dd-list').forEach(el => {
    if (el.id !== `mdd-${recipeId}`) el.classList.add('hidden');
  });
  const dd = document.getElementById(`mdd-${recipeId}`);
  if (!dd) return;
  if (dd.classList.contains('hidden')) {
    dd.innerHTML = buildMenuDD(recipeId);
    dd.classList.remove('hidden');
  } else {
    dd.classList.add('hidden');
  }
}

// Close dropdowns when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.menu-dd-wrapper')) {
    document.querySelectorAll('.menu-dd-list').forEach(el => el.classList.add('hidden'));
  }
});

function toggleTagFilter(tag) {
  const i = state.tagFilters.indexOf(tag);
  if (i === -1) state.tagFilters.push(tag); else state.tagFilters.splice(i, 1);
  _renderTagFilterBar();
  renderRecipesGrid();
}

function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i === -1) {
    state.favorites.push(id);
  } else {
    state.favorites.splice(i, 1);
  }
  saveState();
  const btn = document.querySelector(`#rcard-${id} .recipe-fav-btn`);
  if (btn) {
    const isFav = state.favorites.includes(id);
    btn.classList.toggle('active', isFav);
    btn.title = isFav ? 'Retirer des favoris' : 'Ajouter aux favoris';
  }
  if (state.tagFilters.includes('__fav__')) renderRecipesGrid();
}

function changeServings(id, delta) {
  const r = state.recipes.find(r => r.id === id);
  if (!r) return;
  r.servings = Math.max(1, (r.servings || r.originalServings || 4) + delta);
  saveState();
  const el = document.getElementById(`snum-${id}`);
  if (el) el.textContent = r.servings;
}

function addToMenuFromDD(recipeId, weekKey, day, meal) {
  state.menu.push({ id: uid(), weekKey, day: parseInt(day), meal, recipeId, customTitle: null });
  saveState();
  showToast(`📅 Ajouté: ${DAYS_FR[day]} ${meal}`, 'success');
  hideModal();
  if (state.currentSection === 'menu') renderMenu();
}

function openMenuModal(recipeId) {
  const r = state.recipes.find(r => r.id === recipeId);
  if (!r) return;
  const thisWeek = state.currentMenuWeek;
  const nextWeek = addWeeks(thisWeek, 1);

  function availSlots(weekKey) {
    const taken = new Set(state.menu.filter(e => e.weekKey === weekKey).map(e => `${e.day}-${e.meal}`));
    const avail = [];
    for (let d = 0; d < 7; d++) for (const m of MEALS) if (!taken.has(`${d}-${m}`)) avail.push({ d, m });
    return avail;
  }

  function weekSectionHTML(weekKey, label) {
    const avail = availSlots(weekKey);
    if (!avail.length) return `
      <div class="menu-slot-week-title">${label}</div>
      <p class="text-light text-small" style="padding:2px 0 14px;">Tous les créneaux sont pris</p>`;
    return `
      <div class="menu-slot-week-title">${label}</div>
      <div class="menu-slot-grid">
        ${avail.map(({ d, m }) => `
          <label class="menu-slot-checkbox">
            <input type="checkbox" class="menu-slot-cb" value="${weekKey}|${d}|${m}">
            <span class="menu-slot-label">${MEAL_ICONS[m]} ${DAYS_FR[d]} ${m}</span>
          </label>`).join('')}
      </div>`;
  }

  const dates1 = getWeekDates(thisWeek);
  const dates2 = getWeekDates(nextWeek);
  const fmt = d => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  const thisLabel = `Cette semaine (${fmt(dates1[0])} – ${fmt(dates1[6])})`;
  const nextLabel = `Semaine suivante (${fmt(dates2[0])} – ${fmt(dates2[6])})`;

  showModal({
    title: `📅 "${r.title}"`,
    body: `
      <p class="text-small text-light" style="margin-bottom:16px;">
        Cochez les créneaux souhaités. Si vous choisissez plusieurs fois la même recette, les quantités aux courses seront multipliées.
      </p>
      ${weekSectionHTML(thisWeek, thisLabel)}
      ${weekSectionHTML(nextWeek, nextLabel)}`,
    footer: `
      <button class="btn-secondary" onclick="hideModal()">Annuler</button>
      <button class="btn-primary" onclick="validateMenuSelection('${recipeId}')">✓ Valider</button>`
  });
}

function validateMenuSelection(recipeId) {
  const cbs = [...document.querySelectorAll('.menu-slot-cb:checked')];
  if (!cbs.length) { showToast('Cochez au moins un créneau', 'error'); return; }

  const selected = cbs.map(cb => {
    const [weekKey, day, meal] = cb.value.split('|');
    return { weekKey, day: parseInt(day), meal };
  });

  // Add menu entries
  for (const slot of selected) {
    state.menu.push({ id: uid(), ...slot, recipeId, customTitle: null });
  }

  // Add ingredients × number of selected slots
  addIngredientsToListN(recipeId, selected.length);

  saveState();
  hideModal();
  if (state.currentSection === 'menu') renderMenu();
  updateCoursesBadge();
  if (state.currentSection === 'courses') renderCourses();

  const n = selected.length;
  showToast(`📅 Ajouté à ${n} créneau${n > 1 ? 'x' : ''} · ingrédients ×${n} aux courses`, 'success');
}

function addIngredientsToListN(recipeId, times) {
  const r = state.recipes.find(r => r.id === recipeId);
  if (!r || times < 1) return;
  const scale = (r.servings / (r.originalServings || r.servings || 4)) * times;
  for (const ing of (r.ingredients || [])) {
    if (!ing.name?.trim()) continue;
    const scaledQty = ing.quantity !== null ? ing.quantity * scale : null;
    const existing = state.shoppingList.find(i =>
      i.name.toLowerCase() === ing.name.toLowerCase() &&
      (i.unit || '') === (ing.unit || '') &&
      !i.checked
    );
    if (existing) {
      if (scaledQty !== null) existing.quantity = (existing.quantity || 0) + scaledQty;
      if (!existing.sources) existing.sources = existing.fromRecipe ? [{ id: '', title: existing.fromRecipe }] : [];
      if (!existing.sources.some(s => s.id === r.id)) existing.sources.push({ id: r.id, title: r.title });
    } else {
      state.shoppingList.push({
        id: uid(), name: ing.name,
        quantity: scaledQty, unit: ing.unit || '',
        rayon: ing.rayon || findRayon(ing.name),
        checked: false,
        sources: [{ id: r.id, title: r.title }]
      });
    }
  }
}

// ═══════════════════════════════════════════════════════
// RECIPES — ADD MODAL
// ═══════════════════════════════════════════════════════
let addRecipeForm = { tab: 'url', scraped: null, ingredients: [], tags: [], editingId: null, imageData: null };

function openAddRecipeModal() {
  addRecipeForm = { tab: 'url', scraped: null, ingredients: [], tags: [], editingId: null, imageData: null };
  showModal({ title: 'Ajouter une recette', body: buildAddRecipeHTML(), size: 'large' });
}

function buildAddRecipeHTML() {
  return `
    <div class="modal-tabs">
      <button class="modal-tab ${addRecipeForm.tab==='url'?'active':''}" onclick="switchAddTab('url')">Depuis une URL</button>
      <button class="modal-tab ${addRecipeForm.tab==='manual'?'active':''}" onclick="switchAddTab('manual')">Saisie manuelle</button>
    </div>
    <div id="add-recipe-tab-content">${addRecipeForm.tab==='url' ? buildUrlTabHTML() : buildManualTabHTML()}</div>
  `;
}

function switchAddTab(tab) {
  addRecipeForm.tab = tab;
  document.getElementById('modal-content').innerHTML = `
    <div class="modal-header"><h3>Ajouter une recette</h3></div>
    <div class="modal-body">${buildAddRecipeHTML()}</div>
    <div class="modal-footer" id="modal-footer-content"></div>
  `;
}

function buildUrlTabHTML() {
  if (addRecipeForm.scraped) return buildEditRecipeFormHTML(addRecipeForm.scraped, true);
  return `
    <div id="scrape-error" class="hidden"></div>
    <div class="form-group">
      <label class="form-label">URL de la recette</label>
      <input id="recipe-url-input" class="form-input" type="url" placeholder="https://www.750g.com/..." autocomplete="off">
      <div class="form-hint">Compatible avec la plupart des sites de recettes (Marmiton, 750g, AllRecipes…)</div>
    </div>
    <div id="scrape-loading" class="hidden loading-box">
      <div class="spinner"></div><p>Récupération de la recette…</p>
    </div>
    <div style="display:flex;gap:10px;margin-top:4px;">
      <button class="btn-primary" onclick="doScrape()">🔍 Récupérer</button>
      <button class="btn-secondary" onclick="switchAddTab('manual')">Saisie manuelle</button>
    </div>
  `;
}

async function doScrape() {
  const url = document.getElementById('recipe-url-input')?.value?.trim();
  if (!url) { showToast('Entrez une URL', 'error'); return; }

  const errEl = document.getElementById('scrape-error');
  const loadEl = document.getElementById('scrape-loading');
  if (errEl) errEl.classList.add('hidden');
  if (loadEl) loadEl.classList.remove('hidden');
  document.querySelectorAll('#add-recipe-tab-content .btn-primary, #add-recipe-tab-content .btn-secondary')
    .forEach(b => b.disabled = true);

  try {
    const data = await scrapeRecipe(url);
    addRecipeForm.scraped = data;
    addRecipeForm.ingredients = data.ingredients;
    addRecipeForm.tags = [];
    const tabContent = document.getElementById('add-recipe-tab-content');
    if (tabContent) tabContent.innerHTML = buildEditRecipeFormHTML(data, true);
  } catch(e) {
    if (loadEl) loadEl.classList.add('hidden');
    if (errEl) {
      errEl.className = 'scrape-err-banner';
      errEl.textContent = '❌ ' + e.message;
    }
    document.querySelectorAll('#add-recipe-tab-content .btn-primary, #add-recipe-tab-content .btn-secondary')
      .forEach(b => b.disabled = false);
  }
}

function buildManualTabHTML() {
  addRecipeForm.ingredients = addRecipeForm.ingredients || [];
  addRecipeForm.tags = addRecipeForm.tags || [];
  return buildEditRecipeFormHTML({
    title: '', image: '', servings: 4, originalServings: 4,
    ingredients: addRecipeForm.ingredients, instructions: '', tags: addRecipeForm.tags, url: ''
  }, false);
}

function buildEditRecipeFormHTML(data, fromScrape) {
  const ings = (data.ingredients || addRecipeForm.ingredients || []);
  addRecipeForm.ingredients = ings.length ? [...ings] : [];
  addRecipeForm.tags = data.tags ? [...data.tags] : (addRecipeForm.tags || []);

  const ingsHTML = addRecipeForm.ingredients.map((ing, idx) => `
    <div class="ing-row" id="ingrow-${idx}">
      <input class="form-input ing-qty" type="text" placeholder="Qté" value="${ing.quantity !== null ? formatQty(ing.quantity) : ''}"
             onchange="updateIngField(${idx},'quantity',this.value)">
      <input class="form-input ing-unit" type="text" placeholder="Unité" value="${ing.unit||''}"
             onchange="updateIngField(${idx},'unit',this.value)">
      <input class="form-input ing-name" type="text" placeholder="Ingrédient" value="${ing.name||''}"
             oninput="onIngNameInput(this,${idx})" onchange="updateIngField(${idx},'name',this.value)"
             onblur="setTimeout(hideIngAc,200)">
      <button class="ing-del" onclick="removeIngredient(${idx})">✕</button>
    </div>`).join('');

  const tagsHTML = PRESET_TAGS.map(t => {
    const selected = addRecipeForm.tags.includes(t);
    return `<button type="button" class="preset-tag-btn${selected ? ' selected' : ''}" onclick="toggleFormTag('${t}')">${t}</button>`;
  }).join('');

  return `
    ${fromScrape && data.image ? `<img src="${data.image}" class="scrape-preview-img" onerror="this.style.display='none'" style="height:110px">
    <div class="scrape-ok-banner">✅ Recette récupérée avec succès</div>` : ''}
    <div class="form-group">
      <label class="form-label">Titre *</label>
      <input id="ef-title" class="form-input" type="text" value="${(data.title||'').replace(/"/g,'&quot;')}" placeholder="Nom de la recette">
    </div>
    <div class="form-group" style="max-width:120px">
      <label class="form-label">Portions</label>
      <input id="ef-servings" class="form-input" type="number" min="1" value="${data.servings||4}">
    </div>
    <div class="form-group">
      <label class="form-label">Photo du plat</label>
      <div class="img-upload-zone">
        <img id="img-upload-preview" class="img-upload-preview" src="${addRecipeForm.imageData || data.image || ''}" ${(addRecipeForm.imageData || data.image) ? '' : 'style="display:none"'} onerror="this.style.display='none'">
        <div class="img-upload-btns">
          <label class="btn-secondary img-upload-label" title="Parcourir les fichiers">
            📁 Parcourir
            <input type="file" accept="image/*" style="display:none" onchange="handleImageFile(this.files[0])">
          </label>
          <label class="btn-secondary img-upload-label img-upload-camera" title="Prendre une photo">
            📷 Caméra
            <input type="file" accept="image/*" capture="environment" style="display:none" onchange="handleImageFile(this.files[0])">
          </label>
        </div>
        <input id="ef-image" class="form-input" type="url" value="${addRecipeForm.imageData ? '' : (data.image||'').replace(/"/g,'&quot;')}" placeholder="ou coller une URL d'image…" oninput="clearUploadedImage()">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Source (URL originale)</label>
      <input id="ef-url" class="form-input" type="url" value="${(data.url||'').replace(/"/g,'&quot;')}" placeholder="https://...">
    </div>
    <div class="form-group">
      <label class="form-label">Tags</label>
      <div class="preset-tags-grid" id="form-tags-list">${tagsHTML}</div>
    </div>
    <div class="form-group">
      <label class="form-label">Ingrédients</label>
      <div class="ingredient-editor-list" id="ing-editor-list">${ingsHTML}</div>
      <button class="btn-secondary mt-8" onclick="addIngredientRow()" style="font-size:13px;padding:7px 14px">+ Ajouter un ingrédient</button>
    </div>
    <div class="form-group">
      <label class="form-label">Instructions</label>
      <textarea id="ef-instructions" class="form-input" rows="3" placeholder="Étapes de préparation…">${data.instructions||''}</textarea>
    </div>
    <div class="form-save-bar">
      <button class="btn-primary" onclick="saveNewRecipe()">${addRecipeForm.editingId ? '💾 Enregistrer les modifications' : '💾 Sauvegarder la recette'}</button>
      <button class="btn-secondary" onclick="hideModal()">Annuler</button>
    </div>`;
}

function handleImageFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Redimensionner max 1000px
      const MAX = 1000;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);

      // Aperçu immédiat pendant l'upload
      const preview = document.getElementById('img-upload-preview');
      if (preview) { preview.src = canvas.toDataURL('image/jpeg', 0.78); preview.style.display = 'block'; }

      // Convertir en blob JPEG et uploader vers Firebase Storage
      canvas.toBlob(async function(blob) {
        _setImageUploadLoading(true);
        try {
          const filename = `recipes/${uid()}.jpg`;
          const res = await fetch(`${FB_STORAGE}?name=${encodeURIComponent(filename)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'image/jpeg' },
            body: blob
          });
          if (!res.ok) throw new Error('Upload échoué : ' + res.status);
          const json = await res.json();
          const token = json.downloadTokens;
          const url = `${FB_STORAGE}/${encodeURIComponent(filename)}?alt=media&token=${token}`;
          addRecipeForm.imageData = url;
          if (preview) preview.src = url;
          const urlInput = document.getElementById('ef-image');
          if (urlInput) urlInput.value = '';
        } catch(err) {
          showToast('Erreur upload photo : ' + err.message, 'error');
          addRecipeForm.imageData = null;
          if (preview) { preview.src = ''; preview.style.display = 'none'; }
        } finally {
          _setImageUploadLoading(false);
        }
      }, 'image/jpeg', 0.78);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function _setImageUploadLoading(on) {
  const btns = document.querySelectorAll('.img-upload-label');
  btns.forEach(b => b.style.opacity = on ? '0.5' : '1');
  let indicator = document.getElementById('img-upload-spinner');
  if (on && !indicator) {
    indicator = document.createElement('span');
    indicator.id = 'img-upload-spinner';
    indicator.textContent = '⏳ Upload en cours…';
    indicator.style.cssText = 'font-size:12px;color:var(--text-light);margin-top:4px;display:block';
    document.querySelector('.img-upload-btns')?.after(indicator);
  } else if (!on && indicator) {
    indicator.remove();
  }
}

function clearUploadedImage() {
  addRecipeForm.imageData = null;
  const preview = document.getElementById('img-upload-preview');
  if (preview) { preview.src = ''; preview.style.display = 'none'; }
}

function toggleFormTag(tag) {
  const i = addRecipeForm.tags.indexOf(tag);
  if (i === -1) addRecipeForm.tags.push(tag); else addRecipeForm.tags.splice(i, 1);
  refreshFormTags();
}

function refreshFormTags() {
  const el = document.getElementById('form-tags-list');
  if (!el) return;
  el.innerHTML = PRESET_TAGS.map(t => {
    const selected = addRecipeForm.tags.includes(t);
    return `<button type="button" class="preset-tag-btn${selected ? ' selected' : ''}" onclick="toggleFormTag('${t}')">${t}</button>`;
  }).join('');
}

function updateIngField(idx, field, value) {
  if (!addRecipeForm.ingredients[idx]) return;
  if (field === 'quantity') {
    const v = parseFloat(value.replace(',','.'));
    addRecipeForm.ingredients[idx].quantity = isNaN(v) ? null : v;
  } else {
    addRecipeForm.ingredients[idx][field] = value;
    if (field === 'name') addRecipeForm.ingredients[idx].rayon = findRayon(value);
  }
}

function addIngredientRow() {
  const newIng = { id: uid(), raw: '', quantity: null, unit: '', name: '', rayon: 'Autres' };
  addRecipeForm.ingredients.push(newIng);
  const idx = addRecipeForm.ingredients.length - 1;
  const list = document.getElementById('ing-editor-list');
  if (!list) return;
  const row = document.createElement('div');
  row.className = 'ing-row';
  row.id = `ingrow-${idx}`;
  row.innerHTML = `
    <input class="form-input ing-qty" type="text" placeholder="Qté" value=""
           onchange="updateIngField(${idx},'quantity',this.value)">
    <input class="form-input ing-unit" type="text" placeholder="Unité" value=""
           onchange="updateIngField(${idx},'unit',this.value)">
    <input class="form-input ing-name" type="text" placeholder="Ingrédient" value=""
           oninput="onIngNameInput(this,${idx})" onchange="updateIngField(${idx},'name',this.value)"
           onblur="setTimeout(hideIngAc,200)">
    <button class="ing-del" onclick="removeIngredient(${idx})">✕</button>`;
  list.appendChild(row);
  row.querySelector('.ing-name').focus();
}

function removeIngredient(idx) {
  addRecipeForm.ingredients.splice(idx, 1);
  // Re-render ingredient list
  const list = document.getElementById('ing-editor-list');
  if (!list) return;
  list.innerHTML = addRecipeForm.ingredients.map((ing, i) => `
    <div class="ing-row" id="ingrow-${i}">
      <input class="form-input ing-qty" type="text" placeholder="Qté" value="${ing.quantity !== null ? formatQty(ing.quantity) : ''}"
             onchange="updateIngField(${i},'quantity',this.value)">
      <input class="form-input ing-unit" type="text" placeholder="Unité" value="${ing.unit||''}"
             onchange="updateIngField(${i},'unit',this.value)">
      <input class="form-input ing-name" type="text" placeholder="Ingrédient" value="${ing.name||''}"
             oninput="onIngNameInput(this,${i})" onchange="updateIngField(${i},'name',this.value)"
             onblur="setTimeout(hideIngAc,200)">
      <button class="ing-del" onclick="removeIngredient(${i})">✕</button>
    </div>`).join('');
}

function saveNewRecipe() {
  const title = document.getElementById('ef-title')?.value?.trim();
  if (!title) { showToast('Le titre est requis', 'error'); return; }
  const servings = parseInt(document.getElementById('ef-servings')?.value) || 4;
  const image = addRecipeForm.imageData || document.getElementById('ef-image')?.value?.trim() || '';
  const url = document.getElementById('ef-url')?.value?.trim() || '';
  const instructions = document.getElementById('ef-instructions')?.value?.trim() || '';
  const ings = addRecipeForm.ingredients.filter(i => (i.name||'').trim());
  ings.forEach(i => { if (!i.id) i.id = uid(); });

  if (addRecipeForm.editingId) {
    // UPDATE existing recipe
    const idx = state.recipes.findIndex(r => r.id === addRecipeForm.editingId);
    if (idx !== -1) {
      const existing = state.recipes[idx];
      state.recipes[idx] = {
        ...existing,
        title, image, url, instructions,
        servings,
        originalServings: existing.originalServings || servings,
        ingredients: ings,
        tags: [...addRecipeForm.tags],
        updatedAt: Date.now()
      };
    }
    saveState();
    hideModal();
    renderRecipes();
    showToast('✅ Recette modifiée !', 'success');
  } else {
    // CREATE new recipe
    const recipe = {
      id: uid(),
      title, image, url, instructions,
      servings, originalServings: servings,
      ingredients: ings,
      tags: [...addRecipeForm.tags],
      addedBy: state.currentProfileId,
      createdAt: Date.now()
    };
    state.recipes.unshift(recipe);
    saveState();
    hideModal();
    renderRecipes();
    showToast('✅ Recette ajoutée !', 'success');
  }
}

// ═══════════════════════════════════════════════════════
// INGREDIENT AUTOCOMPLETE (in recipe form)
// ═══════════════════════════════════════════════════════
function onIngNameInput(inputEl, idx) {
  const val = inputEl.value.trim();
  updateIngField(idx, 'name', inputEl.value);
  if (!val) { hideIngAc(); return; }
  const lval = val.toLowerCase();
  const matches = state.ingredientsDb
    .filter(i => i.name.toLowerCase().includes(lval))
    .sort((a, b) => a.name.toLowerCase().indexOf(lval) - b.name.toLowerCase().indexOf(lval))
    .slice(0, 10);
  showIngAc(inputEl, matches, val, idx);
}

function showIngAc(inputEl, matches, val, idx) {
  let ac = document.getElementById('ing-ac-dropdown');
  if (!ac) {
    ac = document.createElement('div');
    ac.id = 'ing-ac-dropdown';
    ac.className = 'autocomplete-list';
    ac.style.position = 'fixed';
    ac.style.zIndex = '700';
    document.body.appendChild(ac);
  }
  const rect = inputEl.getBoundingClientRect();
  ac.style.top  = (rect.bottom + 2) + 'px';
  ac.style.left = rect.left + 'px';
  ac.style.width = rect.width + 'px';
  const exact = matches.some(i => i.name.toLowerCase() === val.toLowerCase());
  ac.innerHTML = matches.map(item => `
    <div class="autocomplete-item" onmousedown="selectIngAc(${idx},'${item.name.replace(/'/g,"\\'")}','${item.rayon.replace(/'/g,"\\'")}')">
      <span class="autocomplete-item-name">${item.name}</span>
      <span class="autocomplete-item-rayon">${RAYON_ICONS[item.rayon]||''} ${item.rayon}</span>
    </div>`).join('') + (!exact && val ? `
    <div class="autocomplete-item add-new" onmousedown="selectIngAcNew(${idx},'${val.replace(/'/g,"\\'")}')">
      + Utiliser "${val}" (et ajouter à la base)
    </div>` : '');
  ac.classList.remove('hidden');
}

function hideIngAc() {
  const ac = document.getElementById('ing-ac-dropdown');
  if (ac) ac.classList.add('hidden');
}

function selectIngAc(idx, name, rayon) {
  const el = document.querySelector(`#ingrow-${idx} .ing-name`);
  if (el) el.value = name;
  if (addRecipeForm.ingredients[idx]) {
    addRecipeForm.ingredients[idx].name = name;
    addRecipeForm.ingredients[idx].rayon = rayon;
  }
  hideIngAc();
}

function selectIngAcNew(idx, name) {
  const el = document.querySelector(`#ingrow-${idx} .ing-name`);
  if (el) el.value = name;
  if (addRecipeForm.ingredients[idx]) {
    addRecipeForm.ingredients[idx].name = name;
    addRecipeForm.ingredients[idx].rayon = findRayon(name);
  }
  // Add to DB if not present
  if (!state.ingredientsDb.some(i => i.name.toLowerCase() === name.toLowerCase())) {
    state.ingredientsDb.push({ name, rayon: 'Autres' });
    saveState();
  }
  hideIngAc();
}

// ═══════════════════════════════════════════════════════
// RECIPES — EDIT MODAL
// ═══════════════════════════════════════════════════════
function openEditRecipeModal(id) {
  const r = state.recipes.find(r => r.id === id);
  if (!r) return;
  addRecipeForm = {
    tab: 'edit',
    scraped: null,
    editingId: id,
    ingredients: (r.ingredients || []).map(i => ({ ...i })),
    tags: [...(r.tags || [])]
  };
  const body = buildEditRecipeFormHTML({
    title: r.title,
    image: r.image || '',
    url: r.url || '',
    servings: r.servings || r.originalServings || 4,
    originalServings: r.originalServings || 4,
    ingredients: addRecipeForm.ingredients,
    instructions: r.instructions || '',
    tags: addRecipeForm.tags
  }, false);
  showModal({ title: '✏️ Modifier la recette', body, size: 'large' });
}

// ═══════════════════════════════════════════════════════
// RECIPES — DETAIL MODAL
// ═══════════════════════════════════════════════════════
function openRecipeDetail(id) {
  const r = state.recipes.find(r => r.id === id);
  if (!r) return;

  const scale = r.servings / (r.originalServings || r.servings || 4);
  const tags = (r.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');
  const ings = (r.ingredients||[]).map(ing => {
    const qty = ing.quantity !== null ? formatQty(ing.quantity * scale) : '';
    return `<li class="ingredient-item">
      <span class="ingredient-qty">${qty}</span>
      <span class="ingredient-unit">${ing.unit||''}</span>
      <span class="ingredient-name">${ing.name||ing.raw}</span>
    </li>`;
  }).join('');

  const steps = (r.instructions||'').split('\n').map(s=>s.trim()).filter(Boolean);
  const stepsHTML = steps.map((s,i) =>
    `<div class="instruction-step"><span class="step-num">${i+1}</span><span>${s}</span></div>`
  ).join('');

  const body = `
    ${r.image ? `<img src="${r.image}" class="detail-hero" alt="${r.title}" onerror="this.className='detail-hero-placeholder';this.innerHTML='🍽️'">` : '<div class="detail-hero-placeholder">🍽️</div>'}
    <h2 class="detail-title">${r.title}</h2>
    <div class="detail-meta">
      ${tags ? `<div class="recipe-tags">${tags}</div>` : ''}
      ${r.url ? `<a href="${r.url}" target="_blank" class="detail-source">🔗 Voir la recette originale</a>` : ''}
    </div>
    <div class="detail-servings-control">
      <span class="detail-servings-label">Portions :</span>
      <div class="servings-btns">
        <button class="servings-btn" onclick="changeServingsDetail('${r.id}',-1)">−</button>
        <span class="servings-num" id="detail-snum">${r.servings}</span>
        <button class="servings-btn" onclick="changeServingsDetail('${r.id}',1)">+</button>
      </div>
    </div>
    ${ings ? `<p class="section-sub-title">Ingrédients</p><ul class="ingredients-list" id="detail-ings-list">${ings}</ul>` : ''}
    ${stepsHTML ? `<div class="instructions-section"><h4>Instructions</h4>${stepsHTML}</div>` : ''}
  `;

  showModal({
    title: '',
    body,
    footer: `
      <button class="btn-danger" onclick="deleteRecipe('${r.id}')">🗑 Supprimer</button>
      <button class="btn-secondary" onclick="hideModal();openEditRecipeModal('${r.id}')">✏️ Modifier</button>
      <button class="btn-secondary" onclick="hideModal()">Fermer</button>
      <button class="btn-green" onclick="addRecipeToShoppingList('${r.id}');hideModal()">🛒 Courses</button>
    `
  });
}

function changeServingsDetail(id, delta) {
  const r = state.recipes.find(r => r.id === id);
  if (!r) return;
  r.servings = Math.max(1, r.servings + delta);
  saveState();
  document.getElementById('detail-snum').textContent = r.servings;
  // Re-render ingredients list
  const scale = r.servings / (r.originalServings || r.servings);
  const el = document.getElementById('detail-ings-list');
  if (el) {
    el.innerHTML = (r.ingredients||[]).map(ing => {
      const qty = ing.quantity !== null ? formatQty(ing.quantity * scale) : '';
      return `<li class="ingredient-item">
        <span class="ingredient-qty">${qty}</span>
        <span class="ingredient-unit">${ing.unit||''}</span>
        <span class="ingredient-name">${ing.name||ing.raw}</span>
      </li>`;
    }).join('');
  }
  // Update card servings number too
  const cardEl = document.getElementById(`snum-${id}`);
  if (cardEl) cardEl.textContent = r.servings;
}

function deleteRecipe(id) {
  if (!confirm('Supprimer cette recette ?')) return;
  state.recipes = state.recipes.filter(r => r.id !== id);
  state.menu = state.menu.filter(e => e.recipeId !== id);
  saveState();
  hideModal();
  renderRecipes();
  showToast('Recette supprimée', 'info');
}

// ═══════════════════════════════════════════════════════
// SHOPPING LIST — ADD FROM RECIPE
// ═══════════════════════════════════════════════════════
function addRecipeToShoppingList(id) {
  const r = state.recipes.find(r => r.id === id);
  if (!r) return;
  const scale = r.servings / (r.originalServings || r.servings || 4);
  let added = 0, merged = 0;
  for (const ing of (r.ingredients||[])) {
    if (!ing.name?.trim()) continue;
    const scaledQty = ing.quantity !== null ? ing.quantity * scale : null;
    // Merge: same name (case-insensitive) + same unit, unchecked only
    const existing = state.shoppingList.find(i =>
      i.name.toLowerCase() === ing.name.toLowerCase() &&
      (i.unit||'') === (ing.unit||'') &&
      !i.checked
    );
    if (existing) {
      // Accumulate quantity if possible
      if (scaledQty !== null) {
        existing.quantity = (existing.quantity || 0) + scaledQty;
      }
      // Add recipe source if not already listed
      if (!existing.sources) existing.sources = existing.fromRecipe ? [{ id: '', title: existing.fromRecipe }] : [];
      if (!existing.sources.some(s => s.id === r.id)) {
        existing.sources.push({ id: r.id, title: r.title });
      }
      merged++;
    } else {
      state.shoppingList.push({
        id: uid(),
        name: ing.name,
        quantity: scaledQty,
        unit: ing.unit || '',
        rayon: ing.rayon || findRayon(ing.name),
        checked: false,
        sources: [{ id: r.id, title: r.title }]
      });
    }
    added++;
  }
  saveState();
  updateCoursesBadge();
  const msg = merged > 0
    ? `🛒 ${added - merged} ajouté${added-merged>1?'s':''}, ${merged} fusionné${merged>1?'s':''}`
    : `🛒 ${added} ingrédient${added>1?'s':''} ajouté${added>1?'s':''}`;
  showToast(msg, 'success');
  if (state.currentSection === 'courses') renderCourses();
}

// ═══════════════════════════════════════════════════════
// COURSES — RENDER
// ═══════════════════════════════════════════════════════
let addItemState = { name: '', rayon: 'Autres', pendingAdd: false };

function renderCourses() {
  const el = document.getElementById('section-courses');
  const grouped = {};
  for (const rayon of ALL_RAYONS) grouped[rayon] = [];
  for (const item of state.shoppingList) {
    const r = item.rayon || 'Autres';
    if (!grouped[r]) grouped[r] = [];
    grouped[r].push(item);
  }
  const total = state.shoppingList.length;
  const checked = state.shoppingList.filter(i => i.checked).length;

  el.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <h2>🛒 Liste de Courses</h2>
        <span class="count-badge">${total - checked} / ${total}</span>
      </div>
      <div style="display:flex;gap:8px;">
        ${checked > 0 ? `<button class="btn-secondary" onclick="clearChecked()">🗑 Effacer cochés (${checked})</button>` : ''}
        <button class="btn-secondary" onclick="clearAll()">Tout effacer</button>
      </div>
    </div>

    <div class="add-item-bar">
      <div class="add-item-row">
        <div class="add-item-input-wrap">
          <input id="add-item-input" class="add-item-input" type="text" placeholder="🔍 Ajouter un article…"
                 autocomplete="off" oninput="onAddItemInput(this.value)" onkeydown="onAddItemKeydown(event)">
          <div id="autocomplete-list" class="autocomplete-list hidden"></div>
        </div>
      </div>
      <div id="add-qty-row" class="qty-unit-row hidden">
        <input id="add-qty" class="qty-input form-input" type="text" placeholder="Qté">
        <input id="add-unit" class="unit-input form-input" type="text" placeholder="Unité (g, ml…)">
        <button class="btn-green" onclick="confirmAddItem()">Ajouter</button>
        <button class="btn-ghost" onclick="cancelAddItem()">✕</button>
      </div>
    </div>

    ${total === 0 ? `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Liste de courses vide</h3>
        <p>Ajoutez des articles ou cochez des recettes pour remplir votre liste.</p>
      </div>
    ` : ALL_RAYONS
      .filter(r => grouped[r] && grouped[r].length > 0)
      .map(rayon => renderRayonSection(rayon, grouped[rayon]))
      .join('')}
  `;
}

function renderRayonSection(rayon, items) {
  const icon = RAYON_ICONS[rayon] || '🛒';
  const checkedCount = items.filter(i => i.checked).length;
  return `
    <div class="rayon-section">
      <div class="rayon-header" onclick="toggleRayon(this)">
        <span class="rayon-icon">${icon}</span>
        <span class="rayon-name">${rayon}</span>
        <span class="rayon-count">${checkedCount}/${items.length}</span>
        <span class="rayon-chevron">▾</span>
      </div>
      <div class="rayon-items">
        ${items.map(item => {
          const sources = item.sources || (item.fromRecipe ? [{ id: '', title: item.fromRecipe }] : []);
          const sourcesHTML = sources.length > 0
            ? `<span class="item-sources">${sources.map(s => `<span class="item-source-chip">${s.title}</span>`).join('')}</span>`
            : '';
          const qtyStr = item.quantity !== null && item.quantity !== undefined
            ? `${formatQty(item.quantity)}${item.unit ? ' ' + item.unit : ''}`
            : (item.unit || '');
          return `
          <div class="shopping-item${item.checked?' checked':''}" id="si-${item.id}">
            <div class="item-checkbox${item.checked?' checked':''}" onclick="toggleItem('${item.id}')">
              ${item.checked ? '✓' : ''}
            </div>
            <span class="item-name">${item.name}</span>
            ${sourcesHTML}
            <span class="item-qty">${qtyStr}</span>
            <button class="item-delete" onclick="deleteItem('${item.id}')">✕</button>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function toggleRayon(header) {
  header.classList.toggle('collapsed');
  const items = header.nextElementSibling;
  if (items) items.style.display = header.classList.contains('collapsed') ? 'none' : '';
}

function toggleItem(id) {
  const item = state.shoppingList.find(i => i.id === id);
  if (!item) return;
  item.checked = !item.checked;
  saveState();
  updateCoursesBadge();
  renderCourses();
}

function deleteItem(id) {
  state.shoppingList = state.shoppingList.filter(i => i.id !== id);
  saveState();
  updateCoursesBadge();
  renderCourses();
}

function clearChecked() {
  state.shoppingList = state.shoppingList.filter(i => !i.checked);
  saveState();
  updateCoursesBadge();
  renderCourses();
}

function clearAll() {
  if (!confirm('Vider toute la liste de courses ?')) return;
  state.shoppingList = [];
  saveState();
  updateCoursesBadge();
  renderCourses();
}

// Autocomplete
let acSelected = null;
let acItems = [];

function onAddItemInput(val) {
  const list = document.getElementById('autocomplete-list');
  const qtyRow = document.getElementById('add-qty-row');
  if (!list) return;

  if (!val.trim()) {
    list.classList.add('hidden');
    if (qtyRow) qtyRow.classList.add('hidden');
    addItemState.pendingAdd = false;
    return;
  }

  const lval = val.toLowerCase();
  const matches = state.ingredientsDb
    .filter(i => i.name.toLowerCase().includes(lval))
    .sort((a,b) => {
      const ai = a.name.toLowerCase().indexOf(lval);
      const bi = b.name.toLowerCase().indexOf(lval);
      return ai - bi;
    })
    .slice(0, 12);

  acItems = matches;
  const exactMatch = matches.some(i => i.name.toLowerCase() === lval);

  list.innerHTML = matches.map((item, idx) => `
    <div class="autocomplete-item" onclick="selectAcItem(${idx})" data-idx="${idx}">
      <span class="autocomplete-item-name">${item.name}</span>
      <span class="autocomplete-item-rayon">${RAYON_ICONS[item.rayon]||''} ${item.rayon}</span>
    </div>
  `).join('') + (!exactMatch ? `
    <div class="autocomplete-item add-new" onclick="openNewIngredientModal('${val.replace(/'/g,"\\'")}')">
      + Ajouter "${val}" à la base de données
    </div>` : '');

  list.classList.remove('hidden');
}

function onAddItemKeydown(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('add-item-input');
    if (input?.value.trim()) selectAcItemByName(input.value.trim());
  }
  if (e.key === 'Escape') {
    document.getElementById('autocomplete-list')?.classList.add('hidden');
    cancelAddItem();
  }
}

function selectAcItem(idx) {
  const item = acItems[idx];
  if (!item) return;
  const input = document.getElementById('add-item-input');
  if (input) input.value = item.name;
  addItemState.name = item.name;
  addItemState.rayon = item.rayon;
  document.getElementById('autocomplete-list')?.classList.add('hidden');
  showQtyRow();
}

function selectAcItemByName(name) {
  const found = state.ingredientsDb.find(i => i.name.toLowerCase() === name.toLowerCase());
  addItemState.name = name;
  addItemState.rayon = found ? found.rayon : findRayon(name);
  document.getElementById('autocomplete-list')?.classList.add('hidden');
  showQtyRow();
}

function showQtyRow() {
  addItemState.pendingAdd = true;
  const row = document.getElementById('add-qty-row');
  if (row) {
    row.classList.remove('hidden');
    document.getElementById('add-qty')?.focus();
  }
}

function cancelAddItem() {
  addItemState.pendingAdd = false;
  const input = document.getElementById('add-item-input');
  if (input) input.value = '';
  document.getElementById('add-qty-row')?.classList.add('hidden');
  document.getElementById('autocomplete-list')?.classList.add('hidden');
}

function confirmAddItem() {
  const name = addItemState.name || document.getElementById('add-item-input')?.value?.trim();
  if (!name) return;
  const qtyStr = document.getElementById('add-qty')?.value?.trim();
  const unit = document.getElementById('add-unit')?.value?.trim() || '';
  const qty = qtyStr ? parseFloat(qtyStr.replace(',','.')) : null;
  const rayon = addItemState.rayon || findRayon(name);

  state.shoppingList.push({ id: uid(), name, quantity: isNaN(qty)?null:qty, unit, rayon, checked: false, sources: [] });
  saveState();
  updateCoursesBadge();
  cancelAddItem();
  renderCourses();
  showToast(`✅ "${name}" ajouté`, 'success');
}

function openNewIngredientModal(name) {
  document.getElementById('autocomplete-list')?.classList.add('hidden');
  let selectedRayon = 'Fruits & Légumes';
  showModal({
    title: 'Nouvel ingrédient',
    body: `
      <div class="form-group">
        <label class="form-label">Nom</label>
        <input id="ni-name" class="form-input" type="text" value="${name.replace(/"/g,'&quot;')}">
      </div>
      <div class="form-group">
        <label class="form-label">Rayon</label>
        <div class="rayon-picker" id="rayon-picker">
          ${ALL_RAYONS.map(r => `
            <div class="rayon-option${r===selectedRayon?' selected':''}"
                 data-rayon="${r.replace(/"/g,'&quot;')}"
                 onclick="selectRayonOption(this,'${r.replace(/'/g,"\\'")}')">
              ${RAYON_ICONS[r]} ${r}
            </div>`).join('')}
        </div>
      </div>`,
    footer: `
      <button class="btn-secondary" onclick="hideModal()">Annuler</button>
      <button class="btn-primary" onclick="saveNewIngredient()">Ajouter</button>`
  });
}

function selectRayonOption(el, rayon) {
  document.querySelectorAll('.rayon-option').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  el.dataset.rayon = rayon;
}

function saveNewIngredient() {
  const name = document.getElementById('ni-name')?.value?.trim();
  if (!name) { showToast('Nom requis', 'error'); return; }
  // Extract rayon from data attribute
  const finalRayon = document.querySelector('.rayon-option.selected')?.dataset?.rayon || 'Autres';

  if (!state.ingredientsDb.some(i => i.name.toLowerCase() === name.toLowerCase())) {
    state.ingredientsDb.push({ name, rayon: finalRayon });
    saveState();
  }
  addItemState.name = name;
  addItemState.rayon = finalRayon;
  hideModal();
  document.getElementById('add-item-input').value = name;
  showQtyRow();
  showToast(`"${name}" ajouté à la base`, 'success');
}

// ═══════════════════════════════════════════════════════
// MENU — RENDER
// ═══════════════════════════════════════════════════════
function renderMenu() {
  const el = document.getElementById('section-menu');
  const weekKey = state.currentMenuWeek;
  const dates = getWeekDates(weekKey);
  const weekEntries = state.menu.filter(e => e.weekKey === weekKey);
  const isMobile = window.innerWidth <= 600;

  const header = `
    <div class="section-header">
      <div class="week-nav">
        <button class="btn-icon" onclick="navWeek(-1)">◀</button>
        <span class="week-label">${getWeekLabel(weekKey)}</span>
        <button class="btn-icon" onclick="navWeek(1)">▶</button>
      </div>
      <button class="btn-secondary" onclick="goToCurrentWeek()">Aujourd'hui</button>
    </div>`;

  if (isMobile) {
    // Vue mobile : liste verticale jour par jour
    const days = dates.map((d, i) => {
      const isT = isToday(d);
      const dayLabel = `<div class="menu-mobile-day${isT?' today':''}">
        <span class="menu-mobile-day-name">${DAYS_FR[i]}</span>
        <span class="menu-mobile-day-date">${d.toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</span>
      </div>`;

      const meals = MEALS.map(meal => {
        const entry = weekEntries.find(e => e.day === i && e.meal === meal);
        if (entry) {
          const recipe = entry.recipeId ? state.recipes.find(r => r.id === entry.recipeId) : null;
          const label = recipe ? recipe.title : (entry.customTitle || '?');
          const img = recipe?.image
            ? `<img class="menu-mobile-img" src="${recipe.image}" alt="" onerror="this.style.display='none'">`
            : '';
          return `<div class="menu-mobile-meal has-entry" onclick="openMenuEntryOptions('${entry.id}')">
            ${img}
            <div class="menu-mobile-meal-info">
              <span class="menu-mobile-meal-time">${MEAL_ICONS[meal]} ${meal}</span>
              <span class="menu-mobile-meal-title">${label}</span>
            </div>
            <button class="menu-mobile-del" onclick="event.stopPropagation();removeMenuEntry('${entry.id}')">✕</button>
          </div>`;
        } else {
          return `<button class="menu-mobile-meal empty" onclick="openMenuSlotPicker('${weekKey}',${i},'${meal}')">
            <span>${MEAL_ICONS[meal]} ${meal}</span>
            <span class="menu-mobile-add">+ Ajouter</span>
          </button>`;
        }
      }).join('');

      return `<div class="menu-mobile-day-block">${dayLabel}${meals}</div>`;
    }).join('');

    el.innerHTML = header + `<div class="menu-mobile-list">${days}</div>`;
  } else {
    // Vue desktop : grille 7 colonnes
    const dayHeaders = dates.map((d, i) =>
      `<div class="menu-day-header${isToday(d)?' today':''}">
        <div class="menu-day-name">${DAYS_FR[i]}</div>
        <div class="menu-day-date">${d.toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</div>
      </div>`
    ).join('');

    let gridRows = '';
    for (const meal of MEALS) {
      gridRows += `<div class="menu-meal-label">${MEAL_ICONS[meal]}<br>${meal}</div>`;
      for (let day = 0; day < 7; day++) {
        const entry = weekEntries.find(e => e.day === day && e.meal === meal);
        if (entry) {
          const recipe = entry.recipeId ? state.recipes.find(r => r.id === entry.recipeId) : null;
          const label = recipe ? recipe.title : (entry.customTitle || '?');
          const img = recipe?.image
            ? `<img class="menu-entry-img" src="${recipe.image}" alt="" onerror="this.style.display='none'">`
            : '';
          gridRows += `
            <div class="menu-cell has-entry">
              <div class="menu-entry" onclick="openMenuEntryOptions('${entry.id}')">
                ${img}
                <div class="menu-entry-title">${label}</div>
                <div class="menu-entry-delete">✕ Supprimer</div>
              </div>
            </div>`;
        } else {
          gridRows += `
            <div class="menu-cell">
              <div class="menu-cell-empty">
                <button class="btn-add-slot" title="Ajouter un repas" onclick="openMenuSlotPicker('${weekKey}',${day},'${meal}')">+</button>
              </div>
            </div>`;
        }
      }
    }

    el.innerHTML = header + `
      <div class="menu-grid-container">
        <div class="menu-grid">
          <div class="menu-grid-corner"></div>
          ${dayHeaders}
          ${gridRows}
        </div>
      </div>`;
  }
}

function navWeek(n) {
  state.currentMenuWeek = addWeeks(state.currentMenuWeek, n);
  renderMenu();
}

function goToCurrentWeek() {
  state.currentMenuWeek = getMondayDate(new Date());
  renderMenu();
}

function openMenuEntryOptions(entryId) {
  const entry = state.menu.find(e => e.id === entryId);
  if (!entry) return;
  const recipe = entry.recipeId ? state.recipes.find(r => r.id === entry.recipeId) : null;
  const label = recipe ? recipe.title : (entry.customTitle || 'Repas');
  showModal({
    title: `${DAYS_FR[entry.day]} ${MEAL_ICONS[entry.meal]} ${entry.meal}`,
    body: `
      <p style="font-size:15px;font-weight:600;margin-bottom:16px;">${label}</p>
      ${recipe ? `<button class="btn-secondary" style="width:100%;margin-bottom:8px;" onclick="openRecipeDetail('${recipe.id}');hideModal()">👁 Voir la recette</button>` : ''}
      <button class="btn-danger" style="width:100%;" onclick="removeMenuEntry('${entryId}')">🗑 Supprimer ce créneau</button>`,
    footer: `<button class="btn-secondary" onclick="hideModal()">Fermer</button>`
  });
}

function removeMenuEntry(id) {
  state.menu = state.menu.filter(e => e.id !== id);
  saveState();
  hideModal();
  renderMenu();
  showToast('Créneau supprimé', 'info');
}

function openMenuSlotPicker(weekKey, day, meal) {
  const pickerSearch = document.createElement('input');
  let searchTerm = '';

  const buildPickerHTML = (term) => {
    const filtered = state.recipes
      .filter(r => !term || r.title.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 20);
    return filtered.map(r => `
      <div class="recipe-picker-item" onclick="addMenuEntryFromPicker('${r.id}','${weekKey}',${day},'${meal}')">
        ${r.image
          ? `<img class="recipe-picker-img" src="${r.image}" onerror="this.outerHTML='<div class=\\'recipe-picker-no-img\\'>🍽️</div>'">`
          : '<div class="recipe-picker-no-img">🍽️</div>'}
        <span class="recipe-picker-name">${r.title}</span>
      </div>`).join('') || `<p class="text-light text-small" style="padding:12px;">Aucune recette trouvée</p>`;
  };

  showModal({
    title: `${DAYS_FR[day]} — ${MEAL_ICONS[meal]} ${meal}`,
    body: `
      <div class="search-wrapper" style="margin-bottom:14px;">
        <span class="search-icon">🔍</span>
        <input id="picker-search" class="search-input" type="text" placeholder="Rechercher une recette…"
               oninput="refreshRecipePicker(this.value,'${weekKey}',${day},'${meal}')">
      </div>
      <div class="recipe-picker-list" id="recipe-picker-list">${buildPickerHTML('')}</div>
      <div class="recipe-picker-custom">
        <input id="custom-meal-input" class="form-input" style="flex:1;" type="text" placeholder="Ou saisir un repas libre…">
        <button class="btn-green" onclick="addCustomMenuEntry('${weekKey}',${day},'${meal}')">Ajouter</button>
      </div>`,
    footer: `<button class="btn-secondary" onclick="hideModal()">Annuler</button>`
  });
}

function refreshRecipePicker(term, weekKey, day, meal) {
  const el = document.getElementById('recipe-picker-list');
  if (!el) return;
  const filtered = state.recipes
    .filter(r => !term || r.title.toLowerCase().includes(term.toLowerCase()))
    .slice(0, 20);
  el.innerHTML = filtered.map(r => `
    <div class="recipe-picker-item" onclick="addMenuEntryFromPicker('${r.id}','${weekKey}',${day},'${meal}')">
      ${r.image
        ? `<img class="recipe-picker-img" src="${r.image}" onerror="this.outerHTML='<div class=\\'recipe-picker-no-img\\'>🍽️</div>'">`
        : '<div class="recipe-picker-no-img">🍽️</div>'}
      <span class="recipe-picker-name">${r.title}</span>
    </div>`).join('') || `<p class="text-light text-small" style="padding:12px;">Aucune recette trouvée</p>`;
}

function addMenuEntryFromPicker(recipeId, weekKey, day, meal) {
  state.menu.push({ id: uid(), weekKey, day: parseInt(day), meal, recipeId, customTitle: null });
  saveState();
  hideModal();
  renderMenu();
  const r = state.recipes.find(r => r.id === recipeId);
  showToast(`📅 ${r?.title || 'Recette'} ajoutée au menu`, 'success');
}

function addCustomMenuEntry(weekKey, day, meal) {
  const input = document.getElementById('custom-meal-input');
  const title = input?.value?.trim();
  if (!title) { showToast('Entrez un nom', 'error'); return; }
  state.menu.push({ id: uid(), weekKey, day: parseInt(day), meal, recipeId: null, customTitle: title });
  saveState();
  hideModal();
  renderMenu();
  showToast(`📅 "${title}" ajouté au menu`, 'success');
}

// ═══════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════
function showModal({ title, body, footer, size }) {
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  const content = document.getElementById('modal-content');
  if (!overlay || !box || !content) return;

  box.style.maxWidth = '';
  box.classList.toggle('modal-large', size === 'large');

  content.innerHTML = `
    ${title ? `<div class="modal-header"><h3>${title}</h3></div>` : ''}
    <div class="modal-body">${body}</div>
    ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
  `;
  overlay.classList.remove('hidden');
}

function hideModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.add('hidden');
  addRecipeForm = { tab: 'url', scraped: null, ingredients: [], tags: [] };
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) hideModal();
}

// Escape key closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideModal();
});

// ═══════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════
function showToast(msg, type = 'success') {
  const container = document.getElementById('toasts');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
async function init() {
  document.getElementById('loading-screen')?.classList.remove('hidden');

  await loadState();

  document.getElementById('loading-screen')?.classList.add('hidden');

  renderUserIndicator();
  renderMainGreeting();
  _updateMobileProfile();
  updateMobileNav();

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  renderRecipes();
  updateCoursesBadge();

  // Sauvegarde avant fermeture
  window.addEventListener('beforeunload', () => { clearTimeout(_saveTimer); _doSave(); });
}

document.addEventListener('DOMContentLoaded', init);
