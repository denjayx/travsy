const fs = require('fs');
const path = require('path');

try {
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== path.basename(__filename) &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1,
    )
    .forEach((file) => {
      try {
        const controller = require(path.join(__dirname, file));

        module.exports[controller.name] = controller;
      } catch (error) {
        console.error(`Error importing module from ${file}:`, error);
      }
    });
} catch (error) {
  console.error('Error reading directory:', error);
}
