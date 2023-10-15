// Step 1: Create the Product Class

class MovieCharacter {
    name?: string;
    genra?: string;
    quote?: string;
    clothing?: string;
    // ... any other game character attributes
  
    describe() {
      console.log(`Character: ${this.name}, Genra: ${this.genra}, Quote: ${this.quote}, Clothing: ${this.clothing}`);
    }
  }
  
  // Step 2: Create the Builder Interface and Class
  
  interface CharacterBuilder {
    setName(name: string): void;
    setGenra(genra: string): void;
    setQuote(quote: string): void;
    setClothing(clothing: string): void;
    // ... other setter methods
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
  