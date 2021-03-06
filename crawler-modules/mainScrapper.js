const { puppeteer, path, fs } = require("./imports");

let URL = null;

const getExtraction = async (el, type) => {
  const rawText = await el.getProperty(type);
  return await rawText.jsonValue();
};

const writeDataInFileFor = async (filename, data) => {
  await fs.appendFile(filename, `${data.toString()}\n\n`, {}, (err) => {
    if (err) {
      console.error("!!! adding sequence of dataStream() error:🐱‍🏍 " + err);
    }
    console.log(
      `\n\n### web-worker writes data into the: ${filename} clusting...🐱‍🏍`
    );
  });
};

const attachedProblemLink = async (filename) => {
  await fs.appendFile(
    filename,
    `\n### Problem Statement Link: ${URL}\n`,
    {},
    (err) => {
      if (err) {
        console.error(`\n\n!!! Attaching Link URL failed...`);
      }
      console.log(
        `\n\n### web-working writes URL into the ${filename} using caching...`
      );
    }
  );
};

const fastTemplateCreator = async (folderName) => {
  await fs.copyFile(
    path.join(`${__dirname}/template.txt`),
    `${folderName}/sol.cpp`,
    (err) => {
      if (err) {
        console.error(`\n\n!!! Error while creating sol.cpp`);
      } else {
        console.log(`\n\n#### sol.cpp for C++ file was created!!❤😍`);
      }
    }
  );
};

const fromDataToFolder = async (data) => {
  var folderName = path.join(__dirname, `../${data.title}`);
  let fileName = `${folderName}/readme.md`;

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }

  await fs.writeFile(fileName, `# ${data.title} | ${data.qType} `, (err) => {
    if (err) {
      console.log(`Error on Writing File ${folderName}/readme.md `, err);
    }
    console.log(`${data.title}/readme.md file was saved`);
  });

  // clusiting partial DB sharding
  await attachedProblemLink(fileName);
  await writeDataInFileFor(fileName, data.problemStatement);
  await writeDataInFileFor(fileName, data.details);

  // fast template creator C++ IO
  await fastTemplateCreator(folderName);
};

async function fetchfromUrl(url) {
  try {
    URL = url;
    console.log(`\n\n# Leetcode Crawler is on...`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log(`\n\n### Crawler reached the URI destination...`);

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
    console.log(
      `\n*** Error Occured: Something Went Wrong 404 Error\n\n ## Please Try Again....`
    );
  }
}

module.exports.fetchfromUrl = fetchfromUrl;
module.exports.fromDataToFolder = fromDataToFolder;
