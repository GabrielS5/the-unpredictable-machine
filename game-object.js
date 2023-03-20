class GameObject {
  constructor(context, matterShape, alwaysStatic = false) {
    this.context = context;
    this.matterShape = matterShape;
    this.alwaysStatic = alwaysStatic;
  }

  draw() {
    this.context.beginPath();
    // starting drawing from the end, to complete the shape
    this.context.moveTo(this.matterShape.vertices.slice(-1).x, this.matterShape.vertices.slice(-1).y);
    this.matterShape.vertices.forEach(vertex => {
      this.context.lineTo(vertex.x, vertex.y);
    });
    this.context.fill();
  }

  getMatterShape() {
    return this.matterShape;
  }

  isAlwaysStatic() {
    return this.alwaysStatic;
  }
}