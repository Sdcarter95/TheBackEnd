"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSugar = exports.AddMilk = exports.CoffeeDecorator = exports.BasicCoffee = void 0;
class BasicCoffee {
    cost() {
        return 5;
    }
    description() {
        return "Basic Coffee";
    }
}
exports.BasicCoffee = BasicCoffee;
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    cost() {
        return this.coffee.cost();
    }
    description() {
        return this.coffee.description();
    }
}
exports.CoffeeDecorator = CoffeeDecorator;
class AddMilk extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 2;
    }
    description() {
        return `${this.coffee.description()}, Milk`;
    }
}
exports.AddMilk = AddMilk;
class AddSugar extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 1;
    }
    description() {
        return `${this.coffee.description()}, Sugar`;
    }
}
exports.AddSugar = AddSugar;
