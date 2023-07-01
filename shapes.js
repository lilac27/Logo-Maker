class Circle {
  constructor(radius) {
    this.radius = radius;
    this.color = 'black'; // Default color
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<circle cx="100" cy="100" r="${this.radius}" fill="${this.color}" />`;
  }
}

class Square {
  constructor(sideLength) {
    this.sideLength = sideLength;
    this.color = 'black'; // Default color
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<rect x="50" y="50" width="${this.sideLength}" height="${this.sideLength}" fill="${this.color}" />`;
  }
}

class Triangle {
  constructor() {
    this.color = 'black'; // Default color
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<path d="M100 50 L50 150 L150 150 Z" fill="${this.color}" />`;
  }
}

module.exports = {
  Circle,
  Square,
  Triangle,
};
