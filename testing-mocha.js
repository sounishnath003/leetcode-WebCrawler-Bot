// rapid flows to the real DOM = flooding DataStram({}) obj

function main() {
  let title = $(".css-v3d350").__reactEventHandlers$ou4q4w0vnij.children[2];
  let qType = $(".css-10o4wqw").children[0].innerText;
  let questionCode = $(
    "#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-9z7f7i-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-xailxq-TabContent.e5i1odf5 > div > div.content__u3I1.question-content__JfgR div"
  ).innerHTML;
  let details = $(".css-q9155n")
    .__reactEventHandlers$ou4q4w0vnij.children.map((r) => r.props)
    .map((rf) => rf.children)
    .map((r) => r.map((rr) => rr.props.children));
  let [acceptedCount, submissionCount] = details.map((r) => r.join(" "));

  console.log({
    title,
    qType,
    questionCode,
    acceptedCount,
    submissionCount,
  });
}

main();


/*

git filter-branch -f --tree-filter 'rm 
-rf node_modules/puppeteer/.local-chromium/win64-800071/chrome-win/interactive_ui_tests.exe' HEAD 

*/