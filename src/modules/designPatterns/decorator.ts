export interface Coffee {
    cost(): number;
    description(): string;
}

export class BasicCoffee implements Coffee {
    cost() {
        return 5;
    }

    description() {
        return "Basic Coffee";
    }
}


export abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}

    cost() {
        return this.coffee.cost();
    }

    description() {
        return this.coffee.description();
    }
}

export class AddMilk extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 2;
    }

    description() {
        return `${this.coffee.description()}, Milk`;
    }
}

export class AddSugar extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 1;
    }

    description() {
        return `${this.coffee.description()}, Sugar`;
    }
}
