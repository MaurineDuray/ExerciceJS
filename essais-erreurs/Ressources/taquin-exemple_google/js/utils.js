/*
 * ------------------------------------------------------------------------------    SIMPLIFICATIONS D'ECRITURE
 */
function getImage(_url)  { 'use strict'; var  img = new Image(); img.src = _url; return img; }
function alea(i)         { 'use strict'; return Math.floor(Math.random() * i); }