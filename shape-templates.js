class ShapeTemplates {
    static rectangle = [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 50 }, { x: 0, y: 50 }];
    static triangle = [{ x: 0, y: 50 }, { x: 25, y: 0 }, { x: 50, y: 50 }];
    static pentagon = [{ x: 0, y: 20 }, { x: 25, y: 0 }, { x: 50, y: 20 }, { x: 40, y: 50 }, { x: 10, y: 50 }];
    static hexagon = [{ x: 0, y: 25 }, { x: 12.5, y: 0 }, { x: 37.5, y: 0 }, { x: 50, y: 25 }, { x: 37.5, y: 50 }, { x: 12.5, y: 50 }];

    static getShapeTemplate(shape) {
        switch (shape) {
            case Shapes.Rectangle:
                return ShapeTemplates.rectangle;
            case Shapes.Triangle:
                return ShapeTemplates.triangle;
            case Shapes.Pentagon:
                return ShapeTemplates.pentagon;
            case Shapes.Hexagon:
                return ShapeTemplates.hexagon;
        }

        return ShapeTemplates.rectangle;
    }
}