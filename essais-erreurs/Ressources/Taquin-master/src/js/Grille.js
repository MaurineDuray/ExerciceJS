class Grille {

    constructor() {
        this.grille = this.createGrid();
        this.moves = 0;
    }


    createGrid(){
        let g = [
            [new Case(0,0, 1), new Case(0,1, 2), new Case(0,2, 3), new Case(0,3, 4)],
            [new Case(1,0, 5), new Case(1,1, 6), new Case(1,2, 7), new Case(1,3, 8)],
            [new Case(2,0, 9), new Case(2,1, 10), new Case(2,2, 11), new Case(2,3, 12)],
            [new Case(3,0, 13), new Case(3,1, 14), new Case(3,2, 15), new Case(3,3, 16)]
        ];
        return g;
    }

    printGrid() {
        for (let i = 0; i < 4; i++){
                console.log(this.grille[i][0] + " " + this.grille[i][1] + " " + this.grille[i][2] + " " + this.grille[i][3]);
        }
    }


    //Donne l'emplacement de la case vide
    emptySpace(){
        let x = 0;
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4 ; j++){
                if (this.grille[i][j].toString() == 16){
                    return this.grille[i][j];
                }
            }
        }
    }

    //Renvoie la liste des mouvements autorisés
    getLegalMove(){
        let caseVide = this.emptySpace();
        let i = caseVide.getLigne();
        let j = caseVide.getColonne();

        let casesToReturn = [];

        if (i < 3){
            casesToReturn.push(this.grille[i + 1][j]);
        }

        if (i > 0){
            casesToReturn.push(this.grille[i - 1][j]);
        }

        if (j > 0){
            casesToReturn.push(this.grille[i][j - 1]);
        }

        if (j < 3){
            casesToReturn.push(this.grille[i][j + 1]);
        }

        return casesToReturn;
    }

    //Echange deux cases
    swapCases(caseToSwap){
        let emptyCase = this.emptySpace();
        let swappableCase = this.getLegalMove();
        let swapPossible = false;

        //On vérifie si on peut échanger ces deux cases
        for (let i = 0; i < swappableCase.length; i++){
            //console.log(swappableCase[i] + "  " + caseToSwap);
            if (swappableCase[i].toString() === caseToSwap.toString()){
                swapPossible = true;
            }
        }

        if (swapPossible){
            let backup = caseToSwap.toString();
            caseToSwap.setValue(emptyCase.toString());
            emptyCase.setValue(backup.toString());
            this.moves++;
        }
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    randomiseGrid(loops){
        for (let i = 0; i < loops; i++){
            //On cherche les déplacements possibles
            let legalMoves = this.getLegalMove();
            //On les compte
            let nbrLegalMoves = legalMoves.length;
            //On choisi une case aléatoirement parmi celles-ci
            let pickedCase = legalMoves[this.getRandomInt(nbrLegalMoves)];
            //On l'échange de place avec la case "vide"
            this.swapCases(pickedCase);
            //On remet à 0 le compteur de mouvements
            this.setMoves(0);
        }
    }

    getGrid() {
        return this.grille;
    }
    getMoves() {
        return this.moves;
    }
    setMoves(n) {
        this.moves = n;
    }

    //Retourne le nombre de case(s) bien placé(s)
    getCorrectMoves(){
        let g = new Grille();
        g.grille = this.createGrid();
        let count = 0;
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 4; j++){
                //Y'a un soucis de cast entre string et int, du coup j'ai laissé que == au lieu de 3 puisque ca "bug" des fois
                if (g.getGrid()[i][j].getValue() == this.getGrid()[i][j].getValue()){
                    count++;
                }
            }
        }
        return count;
    }

}