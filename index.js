const scrapper = require("./entryPoint");
const bufferIO = require("./standardIO");

bufferIO.readline.question(
  "Enter the Leetcode Problem Statement Url: ",
  (URL) => {
    scrapper.entryPoint(URL);
    bufferIO.readline.close();
  }
);

// scrapper.entryPoint(`https://leetcode.com/problems/two-sum/`);
