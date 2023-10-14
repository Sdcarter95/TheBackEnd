
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
    /**
     * creates a shape object of the shape given.
     * @param shape the shape enum representation of the shape you want to create
     * @returns the shape object of the given shape.
     */
    public createShape(shape: shapes): Shape{
        if (shape === shapes.circle){
            return new Circle();
        } else {
            return new Square();
        };
    }

}
