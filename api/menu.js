const retetele = [
    { Nume: 'Pui copt cu cartofi la cuptor și legume', Ingrediente: ['🍗 pui', '🥔 cartofi', '🥕 morcovi', '🥦 broccoli', '🧄 usturoi'], Proteina: 'carne de pasare' },
    { Nume: 'Somon la cuptor cu legume', Ingrediente: ['🐟 somon', '🥕 morcovi', '🥦 broccoli', '🍠 cartofi dulci'], Proteina: 'pește' },
    { Nume: 'Paste Carbonara', Ingrediente: ['🍝 paste', '🥚 ouă', '🥓 bacon', '🧀 brânză dură', '🌶️ piper'], Proteina: 'ouă (și mezeluri)' },
    { Nume: 'Cotlet de pui la cuptor cu orez', Ingrediente: ['🍗 pui', '🍚 orez', '🥦 broccoli', '🥕 morcovi'], Proteina: 'carne de pasare' },
    { Nume: 'Peste alb la cuptor cu lămâie', Ingrediente: ['🐟 cod/merlan', '🍋 lămâie', '🧄 usturoi', '🍃 dafin'], Proteina: 'pește' },
    { Nume: 'Ciorba de legume cu orez', Ingrediente: ['🟤 linte', '🥕 morcovi', '🥔 cartof', '🧅 ceapă', '🍅 roșii', '🍚 orez'], Proteina: 'legume uscate' },
    { Nume: 'Pui cu smântână și ciuperci', Ingrediente: ['🍗 pui', '🍄 ciuperci', '🥛 smântână light', '🧅 ceapă', '🧄 usturoi'], Proteina: 'carne de pasare' },
    { Nume: 'Chilly con carne cu orez', Ingrediente: ['🥩 carne de vită', '🫘 fasole boabe', '🧅 ceapă', '🍅 roșii', '🧄 usturoi', '🌶️ ardei', '🍚 orez'], Proteina: 'carne roșie' },
    { Nume: 'Creamy meatballs (chiftele în sos)', Ingrediente: ['🥩 carne tocată vită', '🌾 grâu', '🟢 mazare', '🧅 ceapă', '🧄 usturoi'], Proteina: 'carne roșie' },
    { Nume: 'Couscous cu piept de pui și legume', Ingrediente: ['🍗 piept de pui', '🥒 dovlecel', '🫑 ardei gras', '🌾 couscous'], Proteina: 'carne de pasare' },
    { Nume: 'Supă cremă dovleac', Ingrediente: ['🎃 dovleac', '🥛 smântână', '🧀 brânză', '🧄 usturoi', '🧅 ceapă'], Proteina: 'legume uscate' },
    { Nume: 'Paste cu sos de pesto și ton', Ingrediente: ['🍝 paste', '🐟 ton din conservă', '🌿 pesto', '🧀 brânză dură'], Proteina: 'pește' },
    { Nume: 'Bors cu perișoare', Ingrediente: ['🍲 borsul', '🥚 ou', '🌿 mință', '🥩 carne tocată', '🥔 cartofi', '🍄 ciuperci', '🍠 sfeclă'], Proteina: 'carne roșie' },
    { Nume: 'Bors roșu (din sfeclă)', Ingrediente: ['🍠 sfeclă roșie', '🥩 carne de porc', '🍲 ciorba', '🥔 cartofi', '🧅 ceapă', '🧄 usturoi'], Proteina: 'carne roșie' },
    { Nume: 'Gulaș cu carne de viță', Ingrediente: ['🥩 carne de viță cuburi', '🧅 ceapă', '🧄 usturoi', '🌶️ paprika', '🥔 cartofi', '🌶️ boia dulce'], Proteina: 'carne roșie' },
    { Nume: 'Vinete umplute cu carne tocată', Ingrediente: ['🍆 vinete', '🥩 carne tocată', '🍅 roșii', '🧅 ceapă', '🧄 usturoi', '🌿 mărar'], Proteina: 'carne roșie' },
    { Nume: 'Somon cu cartofi la cuptor', Ingrediente: ['🐟 somon', '🥔 cartofi', '🍋 lămâie', '🧄 usturoi', '🌿 mărar', '🧈 unt'], Proteina: 'pește' },
    { Nume: 'Ardei umpluti cu carne și orez', Ingrediente: ['🫑 ardei gras', '🥩 carne tocată', '🍚 orez', '🍅 roșii', '🧅 ceapă', '🧄 usturoi', '🌿 pătrunjel'], Proteina: 'carne roșie' }
];

function generateWeeklyMenu(retete) {
    const freqLimits = {
        'carne roșie': 1,
        'carne de pasare': 2,
        'pește': 2,
        'ouă': 5,
        'ouă (și mezeluri)': 5,
        'mezeluri': 0.5,
        'legume uscate': 2,
    };

    const counters = {};
    const menu = {};
    const usedRecipes = new Set();

    for (let day = 1; day <= 7; day++) {
        const available = retete.filter(r => 
            !usedRecipes.has(r.Nume) && canUseRecipe(r, counters, freqLimits)
        );

        if (available.length === 0) {
            menu[day] = 'Nicio rețetă disponibilă';
            continue;
        }

        const recipe = available[Math.floor(Math.random() * available.length)];

        menu[day] = recipe.Nume;
        usedRecipes.add(recipe.Nume);

        const prot = recipe.Proteina.toLowerCase();
        if (prot in counters) {
            counters[prot] += 1;
        } else {
            counters[prot] = 1;
        }
    }

    return menu;
}

function canUseRecipe(recipe, counters, freqLimits) {
    const prot = recipe.Proteina.toLowerCase();
    if (prot in freqLimits) {
        const count = counters[prot] || 0;
        if (count >= freqLimits[prot]) {
            return false;
        }
    }
    return true;
}

export default function handler(req, res) {
    if (req.method === 'GET') {
        const menu = generateWeeklyMenu(retetele);
        res.status(200).json(menu);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
