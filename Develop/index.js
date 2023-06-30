const { DOMParser, XMLSerializer } = require('xmldom');

// Function to generate the SVG
function generateLogo(text, shape, textColor, backgroundColor) {
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const dom = parser.parseFromString('<svg xmlns="http://www.w3.org/2000/svg"></svg>', 'application/xml');
  const svgElement = dom.documentElement;
      // Handle text color input
  if (textColor.startsWith('#')) {
    textColor = textColor.substring(1); // Remove the '#' character
  }

  // Handle background color input
  if (backgroundColor.startsWith('#')) {
    backgroundColor = backgroundColor.substring(1); // Remove the '#' character
  }
    
// Create background style element
const styleElement = dom.createElement('style');
styleElement.textContent = `svg { background-color: #${backgroundColor}; width: 200px; height: 200px; }`;

// Append style element to SVG
svgElement.appendChild(styleElement);


    // Define shape properties
    let shapeElement;
    let shapeClass;
    switch (shape) {
      case 'Circle':
        shapeElement = dom.createElement('circle');
        shapeElement.setAttribute('cx', '100');
        shapeElement.setAttribute('cy', '100');
        shapeElement.setAttribute('r', '50');
        shapeClass = 'circle';
        break;
      case 'Square':
        shapeElement = dom.createElement('rect');
        shapeElement.setAttribute('x', '50');
        shapeElement.setAttribute('y', '50');
        shapeElement.setAttribute('width', '100');
        shapeElement.setAttribute('height', '100');
        shapeClass = 'square';
        break;
      case 'Triangle':
        shapeElement = dom.createElement('path');
        shapeElement.setAttribute('d', 'M100 50 L50 150 L150 150 Z');
        shapeClass = 'triangle';
          break;
        default:
            console.log('Invalid shape selected.');
            return;
    }

  // Set shape element attributes
  shapeElement.setAttribute('class', shapeClass);
  shapeElement.setAttribute('fill', 'none');
  shapeElement.setAttribute('stroke-width', '3');
  shapeElement.setAttribute('stroke-linecap', 'round');
  shapeElement.setAttribute('stroke-linejoin', 'round');

  // Set additional style for square and triangle shapes
  if (shapeClass === 'square' || shapeClass === 'triangle') {
    shapeElement.setAttribute('stroke-dasharray', '10');
  }

  // Create text element
  const textElement = dom.createElement('text');
  textElement.setAttribute('x', '100');
  textElement.setAttribute('y', '100');
  textElement.setAttribute('fill', textColor);
  textElement.setAttribute('font-size', '48px');
  textElement.setAttribute('text-anchor', 'middle');
  textElement.setAttribute('dominant-baseline', 'middle');
  const tspanElement = dom.createElement('tspan');
  tspanElement.textContent = text;
  textElement.appendChild(tspanElement);

  // Append elements to SVG
  svgElement.appendChild(shapeElement);
  svgElement.appendChild(textElement);

  const svgMarkup = serializer.serializeToString(dom);

  return svgMarkup;
}

// Prompts for user input
async function runLogoMaker(){
  const {default: inquirer} = await import('inquirer');
  const fs = require('fs');
  const answers = await inquirer.prompt([
    {
            type: 'input',
            name: 'text',
            message: 'Enter the text for the logo:'
        },
        {
            type: 'list',
            name: 'textColorChoice',
            message: 'Choose the text color:',
            choices: ['Hex Format', 'Color Name']
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the text color:',
            when: answers => answers.textColorChoice === 'Hex Format'
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the text color:',
            when: answers => answers.textColorChoice === 'Color Name'
        },
        {
            type: 'list',
            name: 'backgroundColorChoice',
            message: 'Choose the background color:',
            choices: ['Hex Format', 'Color Name']
          },
          {
            type: 'input',
            name: 'backgroundColor',
            message: 'Enter the background color:',
            when: answers => answers.backgroundColorChoice === 'Hex Format'
          },
          {
            type: 'input',
            name: 'backgroundColor',
            message: 'Enter the background color:',
            when: answers => answers.backgroundColorChoice === 'Color Name'
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['Circle', 'Square', 'Triangle']
          }

        ]);
      const logo = generateLogo(
        answers.text,
        answers.shape,
        answers.textColor,
        answers.backgroundColor
    );

        // Save the logo as an SVG file
        fs.writeFileSync('logo.svg', logo);
        console.log('Logo generated and saved successfully!');
       }

       runLogoMaker().catch(error => {
        console.error('Error:', error);
       });