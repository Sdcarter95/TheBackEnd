"use strict";
// Step 1: Create the Product Class
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieCharacterBuilder = void 0;
class MovieCharacter {
    // ... any other game character attributes
    describe() {
        console.log(`Character: ${this.name}, Genra: ${this.genra}, Quote: ${this.quote}, Clothing: ${this.clothing}`);
    }
}
class MovieCharacterBuilder {
    constructor() {
        this.character = new MovieCharacter();
    }
    setName(name) {
        this.character.name = name;
    }
    setGenra(genra) {
        this.character.genra = genra;
    }
    setQuote(quote) {
        this.character.quote = quote;
    }
    setClothing(clothing) {
        this.character.clothing = clothing;
    }
    build() {
        return this.character;
    }
}
exports.MovieCharacterBuilder = MovieCharacterBuilder;
