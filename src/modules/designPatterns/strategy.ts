// Strategy interface
interface PaymentStrategy {
    pay(amount: number): void;
}

// Concrete strategy 1
export class CreditCardPayment implements PaymentStrategy {
    pay(amount: number) {
        console.log(`Paid ${amount} dollars with a credit card.`);
    }
}

// Concrete strategy 2
export class PayPalPayment implements PaymentStrategy {
    pay(amount: number) {
        console.log(`Paid ${amount} dollars using PayPal.`);
    }
}

// Context
export class ShoppingCart {
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    checkout(amount: number) {
        this.paymentStrategy.pay(amount);
    }
}

