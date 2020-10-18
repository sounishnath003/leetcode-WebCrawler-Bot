const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const getExtraction = async (el, type) => {
  const rawText = await el.getProperty(type);
  return await rawText.jsonValue();
};

const fromDataToFolder = async (data) => {
  var folderName = path.join(__dirname, data.title);
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }
  
  await fs.writeFile(`${folderName}/readme.md`, data, err => {
    if(err) {
      console.log(`Error on Writing File ${folderName}/readme.md `, err);
    }
    console.log(`${folderName}/readme.md file was saved`);
  })
};

async function fetchfromUrl(url) {
  try {
    console.log(`## Leetcode Crawler is on...`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [titleEl] = await page.$x(
      '//*[@id="app"]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div/div[2]/div/div[1]/div[1]'
    );
    const title = await getExtraction(titleEl, "textContent");

    const [qTypeEl] = await page.$x(
      '//*[@id="app"]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div/div[2]/div/div[1]/div[2]/div'
    );
    const qType = await getExtraction(qTypeEl, "textContent");

    const problemStatement = await page.$eval(
      "#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-9z7f7i-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-xailxq-TabContent.e5i1odf5 > div > div.content__u3I1.question-content__JfgR div",
      (el) => el.innerHTML
    );

    const [detailsConEL] = await page.$x(
      '//*[@id="app"]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div/div[2]/div/div[3]/div[1]'
    );
    const details = await getExtraction(detailsConEL, "textContent");

    const data = { title, qType, problemStatement, details };

    await browser.close();
    return data;
  } catch (error) {
    console.log(`\n*** Error Occured: ` + error);
  }
}

const runner = async (url) => {
  const scrappedData = await fetchfromUrl(url);
  await fromDataToFolder(scrappedData);
};

function entryPoint() {
  runner(`https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/`);
  console.log(`# LeetCode Crawler already started hunting`);
}

entryPoint();
