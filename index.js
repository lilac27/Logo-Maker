const { DOMParser, XMLSerializer } = require('xmldom');
const path = require('path');
const folderPath = path.join(__dirname, 'examples');
const {Circle, Square, Triangle} = require('./shapes'); 


// Function to check if a string is a valid color name
function isValidColorName(colorName) {
  const colorNames = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
    'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
    'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan',
    'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
    'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
    'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray',
    'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
    'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo',
    'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue',
    'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink',
    'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue',
    'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine',
    'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
    'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream',
    'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange',
    'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred',
    'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple',
    'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen',
    'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen',
    'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white',
    'whitesmoke', 'yellow', 'yellowgreen'
  ];
  return colorNames.includes(colorName.toLowerCase());
}

// Function to generate the SVG
function generateLogo(text, shape, textColor, backgroundColor, answers) {
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const dom = parser.parseFromString('<svg xmlns="http://www.w3.org/2000/svg"></svg>', 'application/xml');
  const svgElement = dom.documentElement;



    // Handle text color input
    if (textColor.startsWith('#')) {
      textColor = textColor.substring(1); // Remove the '#' character
    } else if (!isValidColorName(textColor)) {
      console.log('Invalid text color specified.');
      return;
    }
    
// Handle background color input
if (answers.backgroundColorChoice === 'Hex Format') {
  if (!answers.backgroundColor.match(/^#[0-9A-Fa-f]{6}$/)) {
    console.log('Invalid background color specified.');
    return;
  }
} else if (answers.backgroundColorChoice === 'Color Name') {
  if (!isValidColorName(answers.backgroundColor)) {
    console.log('Invalid background color specified.');
    return;
  }
}



    // Define shape properties
    let shapeElement;
    let shapeClass;

      // Instantiate the shape class based on the selected shape
  switch (shape) {
    case 'Circle':
      shapeElement = new Circle(50);
      shapeClass = 'circle';
      break;
    case 'Square':
      shapeElement = new Square(100);
      shapeClass = 'square';
      break;
    case 'Triangle':
      shapeElement = new Triangle();
      shapeClass = 'triangle';
      break;
    default:
      console.log('Invalid shape selected.');
      return;
  }

  // Set shape element attributes
  const shapeMarkup = shapeElement.render(); // Render the shape
  shapeElement = parser.parseFromString(shapeMarkup, 'application/xml').documentElement;
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


shapeElement.setAttribute('fill', answers.backgroundColor);


  // Append shape element to SVG after the text
svgElement.appendChild(shapeElement);


  // Append text element to SVG first
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
    answers.backgroundColor,
    answers
);

        // Save the logo as an SVG file
        fs.writeFileSync(path.join(folderPath, 'logo.svg'), logo);
        console.log('Logo generated and saved successfully!');
       }

       runLogoMaker().catch(error => {
        console.error('Error:', error);
       });