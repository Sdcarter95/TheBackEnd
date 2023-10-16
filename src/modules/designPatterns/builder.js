"use strict";
// Step 1: Create the Product Class
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieCharacterBuilder = void 0;
class MovieCharacter {
    // ... any other game character attributes
    description() {
        const discription = (`${this.name} is a famouse ${this.genra} character. They're known for wearing their signature ${this.clothing}.\n "${this.quote}" -\x1b[3m${this.name}\x1b[0m`);
        return discription;
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
