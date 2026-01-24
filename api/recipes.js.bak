const retetele = [
    { Nume: 'Pui copt cu cartofi la cuptor și legume', Ingrediente: ['🍗 pui', '🥔 cartofi', '🥕 morcovi', '🥦 broccoli', '🫒 ulei', '🧄 usturoi'], Proteina: 'carne de pasare' },
    { Nume: 'Somon la cuptor cu legume', Ingrediente: ['🐟 somon', '🥕 morcovi', '🥦 broccoli', '🍠 cartofi dulci', '🫒 ulei de masline'], Proteina: 'pește' },
    { Nume: 'Paste Carbonara', Ingrediente: ['🍝 paste', '🥚 ouă', '🥓 bacon', '🧀 brânză dură', '🌶️ piper'], Proteina: 'ouă (și mezeluri)' },
    { Nume: 'Cotlet de pui la cuptor cu orez', Ingrediente: ['🍗 pui', '🍚 orez', '🥦 broccoli', '🥕 morcovi', '🫒 ulei'], Proteina: 'carne de pasare' },
    { Nume: 'Peste alb la cuptor cu lămâie', Ingrediente: ['🐟 cod/merlan', '🍋 lămâie', '🫒 ulei', '🧄 usturoi', '🍃 dafin'], Proteina: 'pește' },
    { Nume: 'Ciorba de legume cu orez', Ingrediente: ['🟤 linte', '🥕 morcovi', '🥔 cartof', '🧅 ceapă', '🍅 roșii', '🍚 orez'], Proteina: 'legume uscate' },
    { Nume: 'Pui cu smântână și ciuperci', Ingrediente: ['🍗 pui', '🍄 ciuperci', '🥛 smântână light', '🧅 ceapă', '🧄 usturoi'], Proteina: 'carne de pasare' },
    { Nume: 'Chilly con carne cu orez', Ingrediente: ['🥩 carne de vită', '🫘 fasole boabe', '🧅 ceapă', '🍅 roșii', '🧄 usturoi', '🌶️ ardei', '🍚 orez'], Proteina: 'carne roșie' },
    { Nume: 'Creamy meatballs (chiftele în sos)', Ingrediente: ['🥩 carne tocată vită', '🌾 grâu', '🟢 mazare', '🧅 ceapă', '🧄 usturoi'], Proteina: 'carne roșie' },
    { Nume: 'Couscous cu piept de pui și legume', Ingrediente: ['🍗 piept de pui', '🥒 dovlecel', '🫑 ardei gras', '🌾 couscous'], Proteina: 'carne de pasare' },
    { Nume: 'Supă cremă dovleac', Ingrediente: ['🎃 dovleac', '🥛 smântână', '🧀 brânză', '🧄 usturoi', '🧅 ceapă'], Proteina: 'legume uscate' }
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(retetele);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
