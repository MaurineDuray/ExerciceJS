/*
 * CLASSE TAQUIN
 */
var Taquin = function (_c, _l, _u) {
     'use strict';                                                                                                 
     var _                              = this;                                                                         // Simplification pour lisibilité du code
/*
 * -------------------------------------------------------------------------------------------------------------------	LES VARIABLES
 */
     _.assets                           = {};                                                                           // CHARGEMENT DES ASSETS
     _.assets.coins                     = getImage('assets/_taquin.png');                                               // coins du taquin
     _.assets.angle                     = getImage('assets/_angle.png');                                                // coin de l'image
     _.assets.sign                      = getImage('assets/_signature.png');                                            // signature (grenouille)
     _.assets.creux                     = getImage('assets/_creux.png');                                                // trou du taquin
     _.assets.relief                    = getImage('assets/_relief.png');                                               // relief des tuiles
     _.assets.vide                      = getImage('assets/_vide.png');                                                 // ombres du vide
     _.assets.ui                        = getImage('assets/_ui.png');                                                   // ombres du vide
     _.assets.toc                       = document.getElementById('toc');                                               // le bruit du deplacement
     _.survol                           = [];                                                                           // pièces survolées
     _.decalage                         = {};                                                                           // décalage
     _.verouillage                      = false;                                                                        // décalage
     _.images                           = [];                                                                           // CHARGEMENT DES IMAGES
     for (var i = 0; i < 9; i += 1) {                                                                                   // il y a 9 images jouables
          _.images[i]                   = getImage('images/' + i + '.jpg');                                             // 
     }
/*
 * -------------------------------------------------------------------------------------------------------------------	 LE CONSTRUCTEUR
 */
     _.init                             = function (_i, _c, _l, _u) {                                                   // INITIALISATIONS DIVERSES
          _.id                          = _i;                                                                           // id de l'image
          _.colonnes                    = Math.floor(_c) || 5;                                                          // nombre de colonnes
          _.lignes                      = Math.floor(_l) || 3;                                                          // nombre de lignes
          _.unite                       = _u || 120;                                                                    // dimension des cases (et de la marge)
          _.stage                       = getStage('canvas', _.unite * (_.colonnes + 2),  _.unite * (_.lignes + 2));    // Redimentionnement du stage
          _.liste                       = [];                                                                           // Liste des tuiles
          _.mouvements                  = [];                                                                           // Liste des mouvements du mélange
          _.assets.ia                   = _.images[_i];                                                                 // Selection de l'image du taquin
          _.scaleX                      = (_.colonnes + 0.5) * _.unite / _.assets.ia.width;                             // Mise au format de l'image du taquin en x
          _.scaleY                      = (_.lignes + 0.5) * _.unite / _.assets.ia.height;                              // '' en y
                                                                                                                        // CONSTRUCTION GRAPHIQUE
          _.pieces                      = new Sprite();                                                                 // conteneur des tuiles
          _.forme                       = getCadre     (_.assets.coins,    _.unite * (_.colonnes + 2), _.unite * (_.lignes + 2));
          _.signature                   = getBitmap    (_.assets.sign,     _.unite * 2 - 36, _.unite - 18, 0, 0, _.assets.sign.width, _.assets.sign.height);
          _.angle                       = getBitmap    (_.assets.angle,    _.unite * 1.5, _.unite * 1.5, 0, 0, _.assets.angle.width, _.assets.angle.height);
          _.creux                       = getCadre     (_.assets.creux,    _.unite * _.colonnes + 6, _.unite * _.lignes + 6);
          _.interface                   = getInterface (_.assets.ui,       _.unite * (_.colonnes + 2), _.unite * (_.lignes + 2));
          _.image                       = getBitmap    (_.assets.ia,       _.unite * (_.colonnes + 0.5), _.unite * (_.lignes + 0.5),
                                                                           0, 0, _.assets.ia.widh, _.assets.ia.height);
          _.image.x  = _.image.y        = _.unite * 0.75;                                                               // Position de l'image du taquin
          _.angle.x                     = _.unite * (_.colonnes - 0.25) + 1;                                            // Posititon du coin blanc en x
          _.angle.y                     = _.unite * (_.lignes - 0.25) + 1;                                              // '' en y
          _.signature.x                 = _.unite * _.colonnes;                                                         // Position de la grenouille en x
          _.signature.y                 = _.unite * (_.lignes + 1);                                                     // '' en y
          _.creux.x  = _.creux.y        = _.unite - 3;                                                                  // Position du creux en x et y
          _.pieces.x = _.pieces.y       = _.unite;                                                                      // Position des piÃ¨ces en x et y
          _.stage                                                                                                       // AFFICHAGE
               .addChild                (_.image)                                                                       // '' de l'image
               .addChild                (_.angle)                                                                       // '' de l'angle blanc
               .addChild                (_.signature)                                                                   // '' de la signature (grenouille)
               .addChild                (_.forme)                                                                       // '' du cadre du taquin
               .addChild                (_.creux)                                                                       // '' du creux du taquin
               .addChild                (_.pieces)                                                                      // '' des tuiles
               .addChild                (_.interface);                                                                  // '' des tuiles
          _.vide                        = getVide(_.assets.vide, _.unite);                                              // La tuile vide
          _.vide.position               (_.colonnes * _.lignes - 1);
          _.pieces.addChild             (_.vide);

          for (var j = 0; j < _.lignes; j += 1) for (var i = 0; i < _.colonnes; i += 1) {                               // Les tuiles pleines
               if (i != _.colonnes - 1 || j != _.lignes - 1) {
                    var pt              =   getPiece     
                                        (    _.assets.ia, _.assets.relief, _.unite, _.unite,
                                             _.unite * (i + 0.25) / _.scaleX, _.unite * (j + 0.25) / _.scaleY,
                                             _.unite / _.scaleX, _.unite / _.scaleY);
                    pt.position         (_.liste.length);
                    _.liste.push        (pt);                                                                                   
                    _.pieces.addChild   (pt);                                                                                
               }
          }
          _.liste.push                  (_.vide);
          
          _.stage.redraw                ();                                                                             // Rendu graphique
    }
/*
 * -------------------------------------------------------------------------------------------------------------------	 PRÉPARER LE MELANGE LES PIECES
 */
     _.melanger                         = function () {                                                                 
          _.interface.visible           = false;                                                                        // On masque les boutons de l'interface
          _.pieces.visible              = true;                                                                         // On masque les boutons de l'interface
          _.creux.visible               = true;                                                                         // On masque les boutons de l'interface
          _.verouillage                 = true;                                                                         // On vérouille en attendant le mélange
          _.mouvements                  = [];                                                                           // On enchaine 4 séries aléatoires + les 4 coins
          for (var i = 0; i < _.liste.length * _.colonnes; i += 1 )   _.mouvements.push ({ c: alea(_.colonnes), l: alea(_.lignes) }); 
          _.mouvements.push             ({ c: 0, l: 0});
          for (var i = 0; i < _.liste.length * _.colonnes; i += 1 )   _.mouvements.push ({ c: alea(_.colonnes), l: alea(_.lignes) });
          _.mouvements.push             ({ c: T.colonnes - 1, l: 0});
          for (var i = 0; i < _.liste.length * _.colonnes; i += 1 )   _.mouvements.push ({ c: alea(_.colonnes), l: alea(_.lignes) }); 
          _.mouvements.push             ({ c: 0, l: T.lignes - 1});
          for (var i = 0; i < _.liste.length * _.colonnes; i += 1 )   _.mouvements.push ({ c: alea(_.colonnes), l: alea(_.lignes) }); 
          _.mouvements.push             ({ c: T.colonnes - 1, l: T.lignes - 1});
          
          _.timer_memorisation          = setInterval(_.brasser, 2000 / _.mouvements.length);                           // Timer de lanimation du mélange                                     
     }
/*
 * -------------------------------------------------------------------------------------------------------------------	 ENCHAINER LES MOUVEMENTS DU MELANGE
 */
     _.brasser                          = function (event) {
          var temp                      = _.mouvements.shift();
          alea(2) == 0                  ? _.jouer({ c: _.vide.c, l:temp.l })
                                        : _.jouer({ c: temp.c, l:_.vide.l });
          _.jouer                       (temp, true);
          if (_.mouvements.length == 0) {                                                                               // Fin fu mélange
               clearInterval(_.timer_memorisation);                                                                     // Arrêt du Timer de mélange
               _.verouillage            = false;                                                                        // Dévérouillage
          }
     }
/*
 * -------------------------------------------------------------------------------------------------------------------	 FONCTION DE RAPPEL DU CLIC EN PHASE JEU
 */
     _.jouer                            = function(mouvement, clef) {
          var i, pas, pos_1, pos_2;
          if(_.verouillage && (clef!=true)) return;                                                                     // Si vérouillage, on ne joue pas
          if (      mouvement.c         < 0                                                                                // On écarte les clics non jouables
              ||    mouvement.l         < 0
              ||    mouvement.c         >= _.colonnes
              ||    mouvement.l         >= _.lignes
              ||    ((mouvement.c == _.vide.c) == (mouvement.l == _.vide.l))
              )     return;
          pos_1                         = _.vide.l * _.colonnes + _.vide.c;                                             // Position de la tuile vide
          pos_2                         = mouvement.l * _.colonnes + mouvement.c;                                       // Position de la tuile cliquée
          pas                           = mouvement.c == _.vide.c ? _.colonnes : 1;                                     // Déplacement vertical ou horizontal ?
          pas                           *= pos_1 > pos_2 ? -1 : 1;                                                      // Vers le haut ou vers le bas ?

          for (i = pos_1; i != pos_2; i += pas) {                                                                       // Déplacement des tuiles concernées
               _.liste[i]               = _.liste[i + pas];
               _.liste[i].position      (i);
          }
          _.liste[i]                    = _.vide;                                                                       // Mise à jour de la tuile vide
          _.vide.position               (i);
          _.assets.toc.play             ();                                                                             // Bruitage
          _.survol                      = [];
          _.decalage                    = {};                                                                           // Plus de tuiles décalées
          
          if (!_.verouillage) {                                                                                         // Test de la résolution du taquin
               var test                 = true;
               for (i = 1; (i < _.liste.length) && test; i += 1)  test = (i == _.liste[i-1].at);
               if(test) {                                                                                               // Le taquin est résolu
                    _.creux.visible     = false;                                                                        // masquage du creux du taquin
                    _.pieces.visible    = false;                                                                        // masquage des tuiles
                    _.interface.visible = true;                                                                         // affichage des boutons de l'interface
                    _.stage.parent.dispatchEvent(new Event("résolu"));
               }
          }
          _.stage.redraw                ();
     }
/*
 * -------------------------------------------------------------------------------------------------------------------	 FONCTION DE RAPPEL DU MOUSEMOVE EN PHASE JEU
 */
     _.survoler                         = function(mouvement) {
          if(_.verouillage)             return;                                                                         // Si verouillage, on ne fait rien
          var i, pas, pos_1, pos_2;
          for (i = 0; i < _.survol.length; i += 1) {                                                                    // On annule les décalages au survol précédants
               _.survol[i].x            -= _.decalage.x;
               _.survol[i].y            -= _.decalage.y;
          }
          _.survol                      = [];                                                                           // On nettoie la liste du survol et du décalage
          _.decalage                    = {x:0, y:0};

          if (      (mouvement.c >= 0 && mouvement.c < _.colonnes)                                                      // Si la tuile survolée est jouable :
              &&    (mouvement.l >= 0 && mouvement.l < _.lignes)
              &&    ((mouvement.c == _.vide.c) != (mouvement.l == _.vide.l))
              )     
          {
               pos_1                    = _.vide.l * _.colonnes + _.vide.c;                                             // Position de la tuile vide
               pos_2                    = mouvement.l * _.colonnes + mouvement.c;                                       // Position de la tuile survolée
               if (mouvement.c == _.vide.c) {                                                                           // Précalcul du pas et du décalage nécessaire
                    _.decalage.y        = - T.unite / 9;                                                                // Vertical ?
                    pas                 = _.colonnes;
               } else {
                    _.decalage.x        = - T.unite / 9;                                                                // Horizontal ?
                    pas                 = 1;
               }
               if (pos_1 > pos_2) {                                                                                     // Avant ou après ?
                    pas                 *= -1;
                    _.decalage.x        *= -1;
                    _.decalage.y        *= -1;
               }
               for (i = pos_1 + pas; i != pos_2 + pas; i += pas) {                                                      // Stockage des tuiles survolées
                    _.survol.push       (_.liste[i]);
                    _.liste[i].x        += _.decalage.x;
                    _.liste[i].y        += _.decalage.y;
               }
          }
          _.stage.redraw();                                                                                             // Lancement du rendu graphique
     }
/*
 * -------------------------------------------------------------------------------------------------------------------	 CONSTRUCTEUR DES BOUTONS DE L'INTERFACE
 */
     var getInterface                   = function(_c, _l, _h) {                                                        // Retourne une occurence de Sprite
          var  c                        = new Sprite();
               c.i = _c;      c.l = _l;      c.h = _h;
               c.u                      = _c.width / 2;
               c.draw                   = function (_x,_y) {                                                            // Dessin de la case vide au repos
                    if (c.visible) {
                         _x                       += c.x;
                         _y                       += c.y;
                         c.context.drawImage      (c.i, c.u, 0, c.u, c.u,       (c.l - c.u) / 2, c.u / 3, c.u, c.u);                           // 
                         c.context.drawImage      (c.i, 0, 0, c.u, c.u,         (c.l - c.u) / 2, c.h - c.u - c.u / 3, c.u, c.u);               // 
                         c.context.drawImage      (c.i, 0, c.u, c.u, c.u,       c.u / 3, (c.h - c.u) / 2, c.u, c.u);                           // 
                         c.context.drawImage      (c.i, c.u, c.u, c.u, c.u,       c.l - c.u - c.u / 3, (c.h - c.u) / 2, c.u, c.u);             // 

                    }
               }
          return c;
     }
/*
 * -------------------------------------------------------------------------------------------------------------------	 CONSTRUCTEUR DES TUILES PLEINES
 */
     var getPiece                       = function(_s, _c, _l, _h, _dx, _dy, _ol, _oh) {                                // Retourne une occurence de Sprite
          var  c                        = new Sprite();
               c.l = _l;      c.h = _h;      c.dx = _dx;    c.dy = _dy;
               c.image                  = getBitmap(_s, _l, _h, _dx, _dy, _ol, _oh);                                    // Affiche l'image sur la tuile
               c.relief                 = getCadre(_c, _l, _h);                                                         // Affiche le relief de la tuile
               c.id                     = _c + _l * T.colonnes;
               c                        .addChild (c.image)                                                                      
                                        .addChild (c.relief);                                                                     
               c.position               = function (_id) {
                    var i               = Math.floor(_id % T.colonnes),
                        j               = Math.floor(_id / T.colonnes);
                    c.x                 = i * T.unite;
                    c.y                 = j * T.unite;
               }
          return c;
     }
/*
 * -------------------------------------------------------------------------------------------------------------------	 CONSTRUCTEUR DE LA TUILE VIDE
 */
     var getVide                        = function (_c,_u) {                                                            // Retourne une occurence de Sprite
          var c                         = new Sprite();
               c.i                      = _c;
               c.s                      = _u;
               c.u                      = _c.width / 2;
               c.l, c.c;
          c.position                    = function (_id) {                                                              // Position colonne/ligne selon l'id dans le tableau
                    c.c                 = Math.floor(_id % T.colonnes);
                    c.l                 = Math.floor(_id / T.colonnes);
                    c.x                 = c.c * T.unite;
                    c.y                 = c.l * T.unite;
               }
          c.draw                        = function (_x,_y) {                                                            // Fonction de dessin
                    _x                  += c.x;
                    _y                  += c.y;
               
               if (T.survol.length == 0) {                                                                              // Dessin de la case vide au repos
                    c.ones              (_x, _y, _x, _y, _x, _y);
               } else {
                    var der = T.survol[T.survol.length - 1],                                                            // Dessin de la case vide au survol
                        _o, _e, _n, _s, lo, le, ln, ls;
                    _e                  = _.decalage.x < 0 ?     _x + _.decalage.x       : _x;
                    _o                  = _.decalage.x > 0 ?     _x + _.decalage.x       : _x;
                    _s                  = _.decalage.y < 0 ?     _y + _.decalage.y       : _y;
                    _n                  = _.decalage.y > 0 ?     _y + _.decalage.y       : _y;
                    c.ones              (_x, _y, _o, _n, _e, _s);
                                                                                                                        // Dessin du petit trou au survol
                    _x                  =                        der.x + der.l - _.decalage.x;
                    _y                  =                        der.y + der.l - _.decalage.y;
                    _o                  = _.decalage.x < 0 ?     der.x + der.l + der.l    : _x;
                    _e                  = _.decalage.x > 0 ?     der.x                    : _x;
                    _n                  = _.decalage.y < 0 ?     der.y + der.l + der.l    : _y;
                    _s                  = _.decalage.y > 0 ?     der.y                    : _y;
                    c.ones              (_x, _y, _o, _n, _e, _s);
               }
          }
          c.ones                        = function (_x, _y, _o, _n, _e, _s) {                                           // Fonction de dessin des espaces vides
               c.context.drawImage      (c.i, c.u, 0, c.u, c.u,       _e, _y, c.s, c.s);                                // Est
               c.context.drawImage      (c.i, 0, 0, c.u, c.u,         _x, _n, c.s, c.s);                                // Nord
               c.context.drawImage      (c.i, 0, c.u, c.u, c.u,       _o, _y, c.s, c.s);                                // Ouest
               c.context.drawImage      (c.i, c.u, c.u, c.u, c.u,     _x, _s, c.s, c.s);                                // Sud
          }
          return c;
     }
}