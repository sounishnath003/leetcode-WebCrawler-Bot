const runner = require('./crawler-modules/runner');

function entryPoint(url) {
  runner.runner(url);
  console.log(`# LeetCode Crawler already started hunting`);
}


module.exports.entryPoint = entryPoint;