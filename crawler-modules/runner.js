import { fromDataToFolder, fetchfromUrl } from "./mainScrapper";

const runner = async (url) => {
  const scrappedData = await fetchfromUrl(url);
  await fromDataToFolder(scrappedData);
};

module.exports = runner;