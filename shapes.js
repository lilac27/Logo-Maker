
// Define the classes for shapes
    class Circle {
    constructor(radius) {
      this.radius = radius;
    }
  
    render() {
      return `<circle cx="100" cy="100" r="${this.radius}" />`;
    }
  }
  
    class Square {
    constructor(sideLength) {
      this.sideLength = sideLength;
    }
  
    render() {
      return `<rect x="50" y="50" width="${this.sideLength}" height="${this.sideLength}" />`;
    }
  }
  
    class Triangle {
    render() {
      return '<path d="M100 50 L50 150 L150 150 Z" />';
    }
  }

  module.exports = {
    Circle,
    Square,
    Triangle,
  };