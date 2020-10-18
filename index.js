const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require("fs");

async function fetchfromUrl(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="app"]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div/div[2]/div/div[1]/div[1]');
    console.log(el.toString())

    browser.close();
  } catch (error) {
    console.log(`Error Occured: ` + error);
  }
}

const runner = async (url) => {
  const doc = await fetchfromUrl(url);
};

function entryPoint() {
  runner(`https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/`);
  console.log(`# LeetCode Crawler already started hunting`);
}

entryPoint();
