
export enum shapes {
    "circle",
    "square",
}


interface Shape {
    shapeToPrint(): string;
    edges: number;
    corners: number;
}


class Square implements Shape {
    public shapeToPrint(): string {
        return `
        _______
        |       |
        |       |
        |       | 
        |_______| 
        `;
    }
    edges = 4;
    corners = 4;
}

class Circle implements Shape {
    public shapeToPrint(): string {
        return `
           /  /   
        /        /
       /          /
       /          /
        /        /    
           /  /    
        `;
        
    }
    edges = 0;
    corners = 0;
}



export class ShapeFactory {
    
    public createShape(shape: shapes): Shape{
        if (shape === shapes.circle){
            return new Circle();
        } else {
            return new Square();
        };
    }

}
