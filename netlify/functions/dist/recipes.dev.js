"use strict";

var retetele = [{
  Nume: 'Pui copt cu cartofi la cuptor și legume',
  Ingrediente: ['pui', 'cartofi', 'morcovi', 'broccoli', 'ulei', 'usturoi'],
  Proteina: 'carne de pasare'
}, {
  Nume: 'Somon la cuptor cu legume',
  Ingrediente: ['somon', 'morcovi', 'broccoli', 'cartofi dulci', 'ulei de masline'],
  Proteina: 'pește'
}, {
  Nume: 'Paste Carbonara (1 dată/lună - mezeluri)',
  Ingrediente: ['paste', 'ouă', 'bacon', 'brânză dură', 'piperă'],
  Proteina: 'ouă (și mezeluri)'
}, {
  Nume: 'Cotlet de pui la cuptor cu orez',
  Ingrediente: ['pui', 'orez', 'broccoli', 'morcovi', 'ulei'],
  Proteina: 'carne de pasare'
}, {
  Nume: 'Peștele alb (cod/merlan) la cuptor cu lămâie',
  Ingrediente: ['cod/merlan', 'lămâie', 'ulei', 'usturoi', 'dafin'],
  Proteina: 'pește'
}, {
  Nume: 'Ciorba de legume cu orez',
  Ingrediente: ['linte', 'morcovi', 'cartof', 'ceapă', 'roșii', 'orez'],
  Proteina: 'legume uscate'
}, {
  Nume: 'Pui cu smântână și ciuperci',
  Ingrediente: ['pui', 'ciuperci', 'smântână light', 'ceapă', 'usturoi'],
  Proteina: 'carne de pasare'
}, {
  Nume: 'Chilly con carne cu orez',
  Ingrediente: ['carne de vită', 'fasole boabe', 'ceapă', 'roșii', 'usturoi', 'ardei', 'orez'],
  Proteina: 'carne roșie'
}, {
  Nume: 'Creamy meatballs (chiftele în sos)',
  Ingrediente: ['carne tocată vită', 'grâu', 'mazare', 'ceapă', 'usturoi'],
  Proteina: 'carne roșie'
}, {
  Nume: 'Couscous cu piept de pui și legume',
  Ingrediente: ['piept de pui', 'dovlecel', 'ardei gras', 'couscous'],
  Proteina: 'carne de pasare'
}, {
  Nume: 'Supă cremă dovleac',
  Ingrediente: ['dovleac', 'smântână', 'brânză', 'usturoi', 'ceapă'],
  Proteina: 'legume uscate'
}];

exports.handler = function _callee(event, context) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(retetele)
          });

        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          console.error('Error:', _context.t0);
          return _context.abrupt("return", {
            statusCode: 500,
            body: JSON.stringify({
              error: 'Error fetching recipes',
              details: _context.t0.message
            })
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 4]]);
};