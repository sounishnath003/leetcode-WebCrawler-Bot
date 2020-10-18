const $ = require("jquery")(window);
const axios = require("axios").default;
const fs = require("fs");

function fetchfromUrl(url) {
  try {
    const rawData = axios.get(url).then((res) => res.data);
    const doc = cheerio.load(rawData);
    return doc;
  } catch (error) {
    console.log(`Error Occured: ` + error);
  }
}

const customScrapper = async (docHTML) => {
  const $ = cheerio.load(docHTML);
  console.log(`## Hold on... started Crawling...`);

  let title = $(".css-v3d350").__reactEventHandlers$ou4q4w0vnij.children[2];
  console.log({ title });
};

const runner = async (url) => {
  const doc = await fetchfromUrl(url);
  customScrapper(doc);
};

function entryPoint() {
  runner(`https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/`);
  console.log(`# LeetCode Crawler already started hunting`);
}

entryPoint();
