const Shapes = {
    None: 0,
    Rectangle: 1,
    Triangle: 2,
    Pentagon: 3,
    Hexagon: 4
}

class UserInteractionState {
    constructor() {
        this.selectedShape = Shapes.None;
    }

    selectShape(shape) {
        this.selectedShape = shape;
    }

    hasSelectedShape() {
        return this.selectedShape != Shapes.None;
    }

    popSelectedShape() {
        let shape = this.selectedShape;
        this.selectedShape = Shapes.None;

        return shape;
    }
}

