"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = exports.PayPalPayment = exports.CreditCardPayment = void 0;
// Concrete strategy 1
class CreditCardPayment {
    pay(amount) {
        console.log(`Paid ${amount} dollars with a credit card.`);
    }
}
exports.CreditCardPayment = CreditCardPayment;
// Concrete strategy 2
class PayPalPayment {
    pay(amount) {
        console.log(`Paid ${amount} dollars using PayPal.`);
    }
}
exports.PayPalPayment = PayPalPayment;
// Context
class ShoppingCart {
    constructor(paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }
    checkout(amount) {
        this.paymentStrategy.pay(amount);
    }
}
exports.ShoppingCart = ShoppingCart;
