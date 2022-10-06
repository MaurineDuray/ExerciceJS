/* 
     GESTION DES ÉTAPES DE JEU ET DES ACTIONS DE L'UTILISATEUR
*/

var T = new Taquin();

/*
 * ------------------------------------------------------------------------------    ON LOAD
 */
window.onload = function () {
     'use strict';
     var  l = 3,
          c = 4,
          p = 0,
          survol;
/*
 * ------------------------------------------------------------------------------    CODE PRINCIPAL
 */
     T.init(p, c, l);                                                                // Initialisation (id image, colonnes, lignes)
     T.stage.addEventListener("mousemove", move);                                    // Evénements utilisateur
     T.stage.addEventListener("click", clic_choix);
     
/*
 * ------------------------------------------------------------------------------    FONCTION DE RAPPEL DES CLICS EN PHASE DE CHOIX
 */
     function clic_choix(event) {                                                    
          if        (survol.c == -1) {                                               // Afficher l'image suivante
                    p = (p + 8)%9;
                    T.init(p, c, l);
          } else if (survol.c == T.colonnes) {                                       // Afficher l'image précédante
                    p = (p + 1)%9;
                    T.init(p, c, l);
          } else if (survol.l == -1) {                                               // Découper moins de tuiles
                    if(l < 3) return;
                    l -= 0.75, c -= 1;
                    T.init(p, c, l),move(event);
          } else if (survol.l == T.lignes) {                                         // Découper plus de tuiles
                    if(c>7) return;
                    l += 0.75, c += 1;
                    T.init(p, c, l),move(event);
          } else {                                                                   // Sélection de l'image actuelle
                    T.melanger();                                                    // Mélange et début du jeu
                    T.stage.removeEventListener("click", clic_choix);                // Modification de la gestion des événements utilisateurs
                    T.stage.addEventListener("click", clic_jeu);
                    T.stage.removeEventListener("mousemove", move);
                    T.stage.addEventListener("mousemove", survoler);
                    T.stage.addEventListener("résolu", resolu);
          }
     }
/*
 * ------------------------------------------------------------------------------    FONCTION DE RAPPEL DES CLICS EN PHASE DE JEU
 */
     function clic_jeu(event) {                                                      // Clic en phase de jeu
               T.jouer(survol);
     }
/*
 * ------------------------------------------------------------------------------    TAQUIN RESOLU, REVENIR AU MODE CHOIX
 */
     function resolu(event) {
          T.stage.removeEventListener("click", clic_jeu);                            // Echange des fonctions de rappel du clic
          T.stage.removeEventListener("mousemove", survoler);
          T.stage.removeEventListener("résolu", resolu);
          T.stage.addEventListener("mousemove", move);
          T.stage.addEventListener("click", clic_choix);
     }
/*
 * ------------------------------------------------------------------------------    CALCUL DE LA TUILE SURVOLÉE
 */
     function move(event) {                                                          // En mode choix
          survol    = {  c: Math.floor((event.mouse.x / 800) * (T.colonnes + 2)) - 1,
                         l: Math.floor((event.mouse.y / 600) * (T.lignes + 2)) - 1 }
     }
     function survoler(event) {                                                      // En mode jeu
          move(event);
          T.survoler(survol);
     }
}