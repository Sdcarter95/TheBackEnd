// Step 1: Create the Product Class

class MovieCharacter {
    name?: string;
    genra?: string;
    quote?: string;
    clothing?: string;
    // ... any other game character attributes
  
    description(): string {
      const discription: string = (`${this.name} is a famouse ${this.genra} character. They're known for wearing their signature ${this.clothing}.\n "${this.quote}" -\x1b[3m${this.name}\x1b[0m`);
      return discription;
    }


  }
  
  // Step 2: Create the Builder Interface and Class
  
  interface CharacterBuilder {
    setName(name: string): void;
    setGenra(genra: string): void;
    setQuote(quote: string): void;
    setClothing(clothing: string): void;
    
    build(): MovieCharacter;
  }
  
  export class MovieCharacterBuilder implements CharacterBuilder {
    private character: MovieCharacter;
  
    constructor() {
      this.character = new MovieCharacter();
    }
  
    setName(name: string): void {
      this.character.name = name;
    }
  
    setGenra(genra: string): void {
      this.character.genra = genra;
    }
  
    setQuote(quote: string): void {
      this.character.quote = quote;
    }
  
    setClothing(clothing: string): void {
      this.character.clothing = clothing;
    }
  
    build(): MovieCharacter {
      return this.character;
    }
  }
  