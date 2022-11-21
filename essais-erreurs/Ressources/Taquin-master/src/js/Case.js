class Case {

    constructor(l, c, v) {
     this.ligne = l;
     this.colonne = c;
     this.value = v;
    }

    toString(){
        return this.value;
    }

    getValue(){
        return this.value;
    }

    getLigne(){
        return this.ligne;
    }

    getColonne(){
        return this.colonne;
    }


    setValue(value){
        this.value = value;
    }

}