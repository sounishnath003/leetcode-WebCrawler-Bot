const cheerio = require('cheerio');
const axios = require("axios").default;
const fs = require("fs");

function fetchfromUrl(url) {
  try {
    const rawData = axios.get(url).then((res) => res.data);
    return rawData;
  } catch (error) {
    console.log(`Error Occured: ` + error);
  }
}

const customScrapper = async (docHTML) => {
  console.log(`## Hold on... started Crawling...`);
  const $ = cheerio.load(docHTML);

  // let title = $(".css-v3d350").__reactEventHandlers$ou4q4w0vnij.children[2];
  // console.log(title);
};

const runner = async (url) => {
  const doc = await fetchfromUrl(url);
  await customScrapper(doc);
};

function entryPoint() {
  runner(`https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/`);
  console.log(`# LeetCode Crawler already started hunting`);
}

entryPoint();
