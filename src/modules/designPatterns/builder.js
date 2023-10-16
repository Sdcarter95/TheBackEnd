"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieCharacterBuilder = void 0;
/**
 * This class holds character information for use in the character builder.
 */
class MovieCharacter {
    // ... any other game character attributes
    description() {
        const discription = (`${this.name} is a famouse ${this.genra} character. They're known for wearing their signature ${this.clothing}.\n "${this.quote}" -\x1b[3m${this.name}\x1b[0m`);
        return discription;
    }
}
/**
 * Builder class for constructing an object of type MovieCharacter.
 */
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
