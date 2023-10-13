"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeFactory = exports.shapes = void 0;
var shapes;
(function (shapes) {
    shapes[shapes["circle"] = 0] = "circle";
    shapes[shapes["square"] = 1] = "square";
})(shapes = exports.shapes || (exports.shapes = {}));
class Square {
    constructor() {
        this.edges = 4;
        this.corners = 4;
    }
    shapeToPrint() {
        return `
        _______
        |       |
        |       |
        |       | 
        |_______| 
        `;
    }
}
class Circle {
    constructor() {
        this.edges = 0;
        this.corners = 0;
    }
    shapeToPrint() {
        return `
           /  /   
        /        /
       /          /
       /          /
        /        /    
           /  /    
        `;
    }
}
class ShapeFactory {
    createShape(shape) {
        if (shape === shapes.circle) {
            return new Circle();
        }
        else {
            return new Square();
        }
        ;
    }
}
exports.ShapeFactory = ShapeFactory;
