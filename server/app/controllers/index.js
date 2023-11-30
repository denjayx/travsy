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
        const controllers = require(path.join(__dirname, file));

        Object.keys(controllers).forEach((key) => {
          module.exports[key] = controllers[key];
        });
      } catch (error) {
        console.error(`Error importing module from ${file}:`, error);
      }
    });
} catch (error) {
  console.error('Error reading directory:', error);
}
