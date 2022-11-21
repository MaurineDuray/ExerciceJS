/* 
     REPRODUCTION SIMPLIFIÉE DU PRINCIPE DE LISTE D'AFFICHAGE
     Sprite    : conteneur graphique de base
     Stage     : le conteneur graphique de plus haut niveau
     Bitmap    : dessine un BitmapData
     Cadre     : dessine un cadre à partir d'un jpeg/png
*/
var STAGE;                                                                           // Singleton

/*
 * ------------------------------------------------------------------------------    SPRITE
 */

var Sprite = function () {                                                           // Le Sprite est la brique de base de la liste d'affichage
     'use strict';                                                                   // Il gère l'abonnement et le désabonnement ainsi que le dessin des enfants
     this.x                        = 0;
     this.y                        = 0;
     this.displayList              = [];
     this.at                       = undefined;
     this.context                  = undefined;
     this.parent                   = undefined;
     this.visible                  = true;

     this.draw = function (_x, _y) {
          if(!this.context || !this.visible) return;
          _x  = _x ?               _x + this.x : this.x;
          _y  = _y ?               _y + this.y : this.y;
          for (var i = 0; i < this.displayList.length; i += 1)   this.displayList[i].draw(_x,_y);
     }
     this.addChild = function (_c) {
          _c.addedTo(this.context,this,this.displayList.length);
          this.displayList.push(_c);
          return this;
     }
     this.removeChild = function (_c) {
          if (_c.parent == this) {
               this.displayList.splice(_c.at,1);
               _c. parent = _c.context = undefined;
               _c.at = undefined;
          }
          return this;
     }
     this.addedTo = function(_c, _p, _at) {
          this.context             = _c;
          this.parent              = _p;
          this.at                  = _at;
          for (var i = 0; i < this.displayList.length; i += 1)   this.displayList[i].addedTo(_c,this,i);
     }
}
/*
 * ------------------------------------------------------------------------------    STAGE
 */
function getStage(_c, _l, _h) {                                                      // Le Stage est un Sprite enrichi (singleton)
     'use strict';                                                                   // Il gère l'écoute des événements souris
     if (STAGE) {                                                                    // Modification du singleton
          STAGE.setSize(_l,_h);
          STAGE.displayList = [];
          return STAGE;
     } else {                                                                        // Création du singleton
          STAGE = new Sprite();
               STAGE.parent                 = document.getElementById(_c)
               STAGE.context                = STAGE.parent.getContext('2d');
               STAGE.mouse                  = { x: 0, y: 0, move: undefined, click: undefined };
               STAGE.fr                     = {};
               STAGE.clear = function () {
                    STAGE.context.clearRect(0,0,STAGE.parent.width, STAGE.parent.height);
               }
               STAGE.redraw = function () {
                    STAGE.clear();
                    STAGE.draw();
               }
               STAGE.setSize                = function (_wi,_hi) {
                    STAGE.parent.width      = _wi;
                    STAGE.parent.height     = _hi;
                    STAGE.redraw();
               }
               STAGE.setSize(_l,_h);

               STAGE.addEventListener = function(_e,_fr) {
                    STAGE.fr[_e]            = _fr;
                    STAGE.parent.addEventListener(_e, STAGE.rappel, false);
               }
               STAGE.removeEventListener = function(_e,_fr) {
                    STAGE.fr[_e]             == null;
                    STAGE.parent.removeEventListener(_e, STAGE.rappel, false);
               }
               STAGE.rappel = function(event) {
                    var rect = STAGE.parent.getBoundingClientRect();
                    event.mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top};
                    STAGE.fr[event.type](event);
               }
          return STAGE;
     }
}
/*
 * ------------------------------------------------------------------------------    BITMAP
 */
function getBitmap(_s, _l, _h, _dx, _dy, _ol, _oh) {                                 // Le Bitmap est un Sprite dessinant une zone d'image
     'use strict';
     var  c                        = new Sprite();
          c.i                      = _s;
          c.l                      = _l || _s.width;
          c.h                      = _h || _s.height;
          c.dx                     = _dx || 0;
          c.dy                     = _dy || 0;
          c.ol                     = _ol || _s.width;
          c.oh                     = _oh || _s.height;
          c.draw                   = function (_ox,_oy) {
               if(!this.context || !this.visible) return;
               _ox                      += c.x,
               _oy                      += c.y,
               c.context.drawImage      (c.i, c.dx, c.dy, c.ol, c.oh, _ox, _oy, c.l, c.h);
          }
     return c;
}
/*
 * ------------------------------------------------------------------------------    CADRE
 */
function getCadre(_s, _l, _h) {                                                      // Le Cadre est un Sprite dessinant un cadre autour d'une zone
     'use strict';                                                                   // à partir d'une image
     var  c                        = new Sprite();
          c.i                      = _s;
          c.l                      = _l;
          c.h                      = _h;
          c.U                      = _s.width;
          c.u                      = c.U/2;
          c.draw                   = function (_ox,_oy) {
               if(!this.context || !this.visible) return;
               _ox                      += c.x,
               _oy                      += c.y,
               c.context.drawImage      (c.i, 0, 0, c.u, c.u, _ox, _oy, c.u, c.u);                                      // coin superieur gauche
               c.context.drawImage      (c.i, c.u - 1, 0, 2, c.u, _ox + c.u, _oy, c.l - c.U, c.u);                      // bord haut
               c.context.drawImage      (c.i, c.u, 0, c.u, c.u, _ox + c.l - c.u, _oy, c.u, c.u);                        // coin superieur droit
               c.context.drawImage      (c.i, 0, c.u - 1, c.u, 2, _ox, _oy + c.u, c.u, c.h - c.U);                      // bord gauche
               c.context.drawImage      (c.i, c.u-1, c.u - 1, 2, 2, _ox + c.u, _oy + c.u, c.l - c.U, c.h - c.U);        // centre
               c.context.drawImage      (c.i, c.u, c.u - 1, c.u, 2, _ox + c.l - c.u, _oy + c.u, c.u, c.h - c.U);        // bord droit
               c.context.drawImage      (c.i, 0, c.u, c.u, c.u, _ox, _oy + c.h - c.u, c.u, c.u);                        // coin inferieur gauche
               c.context.drawImage      (c.i, c.u-1, c.u, 2, c.u, _ox + c.u, _oy + c.h - c.u, c.l - c.U, c.u);          // bord bas
               c.context.drawImage      (c.i, c.u, c.u, c.u, c.u, _ox + c.l - c.u, _oy + c.h - c.u, c.u, c.u);          // coin inferieur droit
          }
     return c;
}