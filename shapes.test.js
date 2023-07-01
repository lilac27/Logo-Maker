const { Circle, Square, Triangle } = require('./shapes');

test('Triangle shape renders correctly', () => {
    const shape = new Triangle();
    shape.setColor("blue");
    expect(shape.render()).toEqual('<path d="M100 50 L50 150 L150 150 Z" fill="blue" />');
  });
  
test('Circle shape renders correctly', () => {
    const shape = new Circle(50); // Create a circle with radius 50
    shape.setColor("red"); // Set the color of the circle
    expect(shape.render()).toEqual('<circle cx="100" cy="100" r="50" fill="red" />');
  });
  
  test('Square shape renders correctly', () => {
    const shape = new Square(80); // Create a square with side length 80
    shape.setColor("green"); // Set the color of the square
    expect(shape.render()).toEqual('<rect x="50" y="50" width="80" height="80" fill="green" />');
  });