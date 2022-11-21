Loto----
Url     : http://codes-sources.commentcamarche.net/source/38170-lotoAuteur  : ndubienDate    : 14/08/2013
Licence :
=========

Ce document intitulé « Loto » issu de CommentCaMarche
(codes-sources.commentcamarche.net) est mis à disposition sous les termes de
la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
source, dans les conditions fixées par la licence, tant que cette note
apparaît clairement.

Description :
=============

C'est le loto de la fran&ccedil;aise des jeux, chez vous.
<br /><a name='source
-exemple'></a><h2> Source / Exemple : </h2>
<br /><pre class='code' data-mode=
'basic'>
&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.01 Transitional//EN&
quot;&gt;

&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Loto&lt;/title&gt;
&lt;li
nk rel=&quot;stylesheet&quot; href=&quot;javascript.css&quot; type=&quot;text/cs
s&quot; /&gt;
		&lt;link rel=&quot;stylesheet&quot; href=&quot;javascript.css&q
uot; type=&quot;text/css&quot; /&gt;
&lt;script language=&quot;JavaScript&quot;
&gt;
//&lt;!--
var i=0;
var record=0;
var recnbcomp=0;
var nbparties=0;


function quitter(){
window.close();
}
function bonjour(){
alert(&quot;Bienve
nue au jeu : \n   'Loto'\n\n\n© NDUBIEN - 2006&quot;);
}
function aplus(){
va
r phrase=&quot;Votre meilleur score : \n\n - &quot;+record;
if(record==0||recor
d==1) phrase+=&quot; bon numéro&quot;;
else phrase+=&quot; bons numéros&quot;;

if(recnbcomp==1) phrase+=&quot;\n - et le numéro complémentaire&quot;;
phrase+
=&quot;\n--------------------\nNombre de parties jouées : &quot;+nbparties;
phr
ase+=&quot;\n\n\nA bientôt\n\n\n© NDUBIEN - 2006&quot;;
alert(phrase);
}
func
tion afficherecord(){
var phrase=&quot;Votre meilleur score : \n\n - &quot;+rec
ord;
if(record==0||record==1) phrase+=&quot; bon numéro&quot;;
else phrase+=&q
uot; bons numéros&quot;;
if(recnbcomp==1) phrase+=&quot;\n - et le numéro compl
émentaire&quot;;
phrase+=&quot;\n--------------------\nNombre de parties jouées
 : &quot;+nbparties;
alert(phrase);
}
function question(){
var multiplicateu
r=48;
var erreur=1;
var nb1=Math.round(Math.random()*multiplicateur)+1;
while
(erreur==1) {
var nb2=Math.round(Math.random()*multiplicateur)+1;
if(nb1==nb2)
 erreur=1;
else erreur=0;
}
erreur=1;
while(erreur==1) {
var nb3=Math.round
(Math.random()*multiplicateur)+1;
if(nb3==nb1||nb3==nb2) erreur=1;
else erreur
=0;
}
erreur=1;
while(erreur==1) {
var nb4=Math.round(Math.random()*multipli
cateur)+1;
if(nb4==nb1||nb4==nb2||nb4==nb3) erreur=1;
else erreur=0;
}
erreu
r=1;
while(erreur==1) {
var nb5=Math.round(Math.random()*multiplicateur)+1;
i
f(nb5==nb1||nb5==nb2||nb5==nb3||nb5==nb4) erreur=1;
else erreur=0;
}
erreur=1
;
while(erreur==1) {
var nb6=Math.round(Math.random()*multiplicateur)+1;
if(n
b6==nb1||nb6==nb2||nb6==nb3||nb6==nb4||nb6==nb5) erreur=1;
else erreur=0;
}
e
rreur=1;
while(erreur==1) {
var nbc=Math.round(Math.random()*multiplicateur)+1
;
if(nbc==nb1||nbc==nb2||nbc==nb3||nbc==nb4||nbc==nb5||nbc==nb6) erreur=1;
els
e erreur=0;
}
var reponse=window.prompt(&quot;Loto : Tapez 6 chiffres entre 1 
et 49 séparés par 'espace' (0 0 0 0 0 0)&quot;,&quot;&quot;);
choix=reponse.spl
it(&quot; &quot;);
var probleme=0;
for(i=0;i!=6;i++) {
if(parseInt(choix[i])&
lt;1||parseInt(choix[i])&gt;49) probleme=2;
for(j=0;j!=6;j++) {
if(i!=j) if(pa
rseInt(choix[i])==parseInt(choix[j])) probleme=1;
}
}
if(probleme==0){
var b
onsnb=0;
var nbcomp=0;
for(i=0;i!=6;i++) {
if(parseInt(choix[i])==nb1) bonsnb
++;
if(parseInt(choix[i])==nb2) bonsnb++;
if(parseInt(choix[i])==nb3) bonsnb++
;
if(parseInt(choix[i])==nb4) bonsnb++;
if(parseInt(choix[i])==nb5) bonsnb++;

if(parseInt(choix[i])==nb6) bonsnb++;
if(parseInt(choix[i])==nbc) nbcomp++;
}

alert(&quot;Tirage : \n\n - le numéro &quot;+nb1+&quot;\n - le numéro &quot;+n
b2+&quot;\n - le numéro &quot;+nb3+&quot;\n - le numéro &quot;+nb4+&quot;\n - le
 numéro &quot;+nb5+&quot;\n - le numéro &quot;+nb6+&quot;\n - et le numéro compl
émentaire : &quot;+nbc);
var phrase=&quot;Vous avez joué &quot;+bonsnb;
if(bon
snb==0||bonsnb==1) phrase+=&quot; bon numéro&quot;;
else phrase+=&quot; bons nu
méros&quot;;
if(nbcomp==1) phrase+=&quot; et le numéro complémentaire.&quot;;

else phrase+=&quot;.&quot;;
alert(phrase);
if(bonsnb&gt;record) {
record=bons
nb;
recnbcomp=nbcomp;}
if(bonsnb==record&amp;&amp;nbcomp&gt;recnbcomp) recnbco
mp=nbcomp;
++nbparties;
}
else{
if(probleme==1) alert(&quot;Vous avez utilis
é deux fois le même nombre !&quot;);
else alert(&quot;Certains des nombres que 
vous avez joués sont incorrects !&quot;);
}
}

var maintenant = new Date();

var chronometre=maintenant.getTime();
function plusieurs(nombre) {
if (nombre
&gt;1){return &quot;s&quot;} else {return &quot;&quot;}
}
function laFormule(d
uree) {
var formule=&quot;Vous êtes sur la page depuis &quot;;
var minutes=Mat
h.floor(duree/60);
var secondes= duree%60;
if (minutes&gt;0) {formule+=minutes
+&quot; minute&quot;+plusieurs(minutes)+&quot; &quot;}
if (secondes&gt;0) {form
ule+=secondes +&quot; seconde&quot;+ plusieurs(secondes)}
return formule;
}
f
unction temps() {
var ladate=new Date();
duree = Math.round((ladate.getTime() 
- chronometre) / 1000);
window.status=laFormule(duree);
setTimeout(&quot;temps
()&quot;,1000);
}

temps();
//--&gt;
&lt;/script&gt;

&lt;/head&gt;
&lt;
body onLoad=&quot;bonjour()&quot;&gt;
&lt;body onUnload=&quot;aplus()&quot;&quo
t;&gt;

&lt;p&gt;&lt;i&gt;&lt;a href=&quot;#&quot; onmouseover=&quot;this.styl
e.color='red'&quot; onmouseout=&quot;this.style.color='blue'&quot; onClick=&quot
;afficherecord()&quot; style=&quot;cursor:help;&quot;&gt;Afficher mon meilleur s
core&lt;/a&gt;&lt;/i&gt;&lt;/p&gt;
&lt;b&gt;&lt;big&gt;&lt;p&gt;&lt;a href=&quo
t;#&quot; onmouseover=&quot;this.style.color='red'&quot; onmouseout=&quot;this.s
tyle.color='black'&quot; onClick=&quot;question()&quot;&gt;Jouer&lt;/a&gt;&lt;/p
&gt;&lt;/big&gt;&lt;/b&gt;
&lt;p&gt;&lt;i&gt;&lt;a href=&quot;#&quot; onmouseov
er=&quot;this.style.color='red'&quot; onmouseout=&quot;this.style.color='blue'&q
uot; onClick=&quot;quitter()&quot; style=&quot;cursor:crosshair;&quot;&gt;Quitte
r&lt;/a&gt;&lt;/i&gt;&lt;/p&gt;
&lt;/html&gt;
</pre>
