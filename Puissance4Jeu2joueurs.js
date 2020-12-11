var numJoueur = 2;
var nbColonne = 5;
var nbLigne = 5;
var jeu = true;
var text = "";
var plateau = [];

for (var i = 0; i < nbLigne; i++) {
	plateau[i] = [];
}

// demarrage jeu
newGame();

function newGame(){
	for (var i = 0; i < nbLigne; i++) {
		for (var j = 0; j < nbColonne; j++) {
			plateau[i][j] = 0;
			
		}
	}
	var joueur = 2;
	afficheTextAnnonce("Le jeu commence ! C'est au tour du joueur " +nomJoueur(joueur));
	jeu = true;
	creerTableau();
}
// affichage texte enoncer du jeu pour savoir qui commence
function afficheTextAnnonce(texte){
	document.getElementById('textAnnonce').innerHTML = texte;
}

function nomJoueur(numJoueur){
	if (numJoueur == 1) {
		return "rouge";
	}else{
		return "jaune";
	}
}
// creation du tableau puissance4
function creerTableau(){
	text = "<table>";
	for (var i = 0; i < nbLigne; i++) {
		text += "<tr>";
		for (var j = 0; j < nbColonne; j++) {
			text += "<td onclick='detectClik("+j+")' id='"+i+"-"+j+"'>";
			if (plateau[i][j] == 1) {
				text += "<div class ='joueur1'></div>";
			}
			else if (plateau[i][j] == 2){
				text += "<div class ='joueur2'></div>";
			}
			text += "</td>";
		}
		text += "</tr>";
	}
	text += "</table>";
	document.getElementById("puissance4").innerHTML = text;
}

// Savoir ou en est le joueur dans le jeu et sil a gagné ou non 
function detectClik(j){
	if (verifPosition(j) && jeu) {
		var ligneEnCours = poseJeton(j); //numero de la ligne en cours
		var verifEnd = puissance4(ligneEnCours, j, 0, 0);
		if (verifEnd) {
			jeu = false;
			afficheTextAnnonce("Le joueur "+nomJoueur(numJoueur)+" a gagné la partie !");
		}else{
			if (numJoueur == 1) {
				numJoueur = 2;
			}else{
				numJoueur = 1;
			}
		afficheTextAnnonce("C'est au tour du joueur "+nomJoueur(numJoueur));	
		}
	}
}

function verifPosition(j){ //si case en haut de la colonne est vide on retourne vrai sinon faux
	if (plateau[0][j] == 0) {
		return true;
	}else{
		return false;
	} 
}

function poseJeton(j){
	for (var i = nbLigne-1; i >= 0; i--) {
		if (plateau[i][j] == 0) {
			plateau[i][j] = numJoueur;
			refreshTableau(i, j, numJoueur);
			return i;
		}
	}
}
// remettre a 0 le jeu
function refreshTableau(x, y, i){
	document.getElementById(x+'-'+y).innerHTML = "<div class='joueur"+i+"'></div>"
}
// partie gagante en fonction du positionnement des jetons dans le tableau 
function puissance4(ligne, colonne, l, c){
    console.log('valeur : '+ligne+' '+colonne+' / incremente '+l+' '+c);
    if (c == 0 && l == 0) {
        //horizontal
        var ho = 1 + puissance4(ligne, colonne-1, 0, -1) + puissance4(ligne, colonne+1, 0, 1);
        //vertical
        var ve = 1 + puissance4(ligne-1, colonne, -1, 0) + puissance4(ligne+1, colonne, 1, 0);
        //diag gauche
        var dg = 1 + puissance4(ligne-1, colonne-1, -1, -1) + puissance4(ligne+1, colonne+1, 1, 1);
        //diag droite
        var dd = 1 + puissance4(ligne-1, colonne+1, -1, +1) + puissance4(ligne+1, colonne-1, 1, -1);

        console.log(ho,ve,dg,dd);
        if (ho == 4 || ve == 4 || dg == 4 || dd == 4) {
            return true;
        } else {
            return false;
        }
    }

    if (ligne < nbLigne && ligne >= 0 && colonne < nbColonne && colonne >= 0) {
        console.log('valeur : '+ligne+' '+colonne+' / incremente '+l+' '+c);
        if (plateau[ligne][colonne] == numJoueur) {
            return 1 + puissance4(ligne + l, colonne + c, l, c);
        } else {
            return 0;
        }
    }
    return 0;
}