const { Builder, Path } = require('svg-builder');
const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate the SVG
function generateLogo(text, shape, textColor, backgroundColor) {
    const builder = new Builder();

      // Handle text color input
  if (textColor.startsWith('#')) {
    textColor = textColor.substring(1); // Remove the '#' character
  }

  // Handle background color input
  if (backgroundColor.startsWith('#')) {
    backgroundColor = backgroundColor.substring(1); // Remove the '#' character
  }
    

    // Define shape properties
    let shapePath;
    let shapeClass;
    switch (shape) {
        case 'Circle':
            shapePath = builder.circle().cx(100).cy(100).r(50);
            shapeclass = 'circle';
            break;
        case 'Square':
            shapepath = builder.rect().x(50).y(50).width(100).height(100);
            shapeclass = 'square';
            break;
        case 'Triangle':
            shapePath = builder.path()
            .moveTo(100, 50)
            .lineTo(50, 150)
            .lineTo(150, 150)
            .close();
          shapeClass = 'triangle';
          break;
        default:
            console.log('Invalid shape selected.');
            return;
    }

    // Building the svg
    const svg = builder
    .svg()
    .width(200)
    .height(200)
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('viewBox', '0 0 200 200')
    .style(`.${shapeClass}`, `fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;`)
    .style(`.${shapeClass === 'square' || shapeClass === 'triangle' ? shapeClass : ''}`, `stroke-dasharray: 10;`)
    .style('text', `fill: ${textColor}; font-size: 48px; text-anchor: middle; dominant-baseline: middle;`)
    .attr('class', shapeClass)
    .add(shapePath)
    .text()
    .x(100)
    .y(100)
    .tspan()
    .text(text);

  return svg.build();
}

// Prompts for user input
inquirer
    .createPromptModule([
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
            when: answers => answers.textColorChoice === 'HexFormat'
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
    ])
    .then(answers => {
       // Generate logo
        const logo = generateLogo(
            answers.text,
            answers.shape,
            answers.textColor,
            answers.backgroundColor
        );

        // Save the logo as an SVG file
        fs.writeFileSync('logo.svg', logo);
        console.log('Logo generated and saved successfully!');

    });