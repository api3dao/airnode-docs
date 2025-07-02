/**
 * USAGE: see the usage instructions at
 * https://docs.api3.org/dev/link-validation.html
 */

const { readFileSync } = require('fs');
var file = require('file');
var colors = require('colors');
const oust = require('oust');
const axios = require('axios');
const walkSync = require('walk-sync');

/**
 * node ./libs/link-validator.js  http://127.0.0.1:8082  ./docs/.vitepress/dist/airnode/
 * Gather args
 * [2] (baseURL) the target URL (http://localhost:8080) for link verification.
 * [3] (distDir) is the sub-directory (usually dist) with the html docs. If /dist is
 *     used then all folders are validated. Suggest narrowing the scope.
 */
const baseURL = process.argv[2];
const distDir = process.argv[3];

console.log;
console.log('\n\n');
console.log('|++++++++++++++++++++++++');
console.log('| Link Validator');
console.log('| baseURL:', baseURL);
console.log('| distDir:', distDir);
console.log('|++++++++++++++++++++++++');

// All unique links found
let linksObj = {};

// Array of dir objects and their files {dir,files}
let arr = [];

// The total count of links that failed or passed, displayed when script ends.
let totalFailedCnt = 0;
let totalPassedCnt = 0;

// Array of all links that fail, displayed when script ends.
let failuresArr = [];

/**
 * Callback for file.walkSync, add each
 * @param {*} dirPath
 * @param {*} dirs
 * @param {*} files
 */
function tempCB(dirPath, dirs, files) {
  arr.push({ dir: dirPath, files: files });
}

// Load and display ignore list
var fs = require('fs');
const { link } = require('fs-extra');
var ignore = JSON.parse(
  fs.readFileSync('./libs/link-validator-ignore.json', 'utf8')
);
console.log(colors.bold('| > Ignore list'));
ignore.forEach((element) => {
  console.log('|', colors.bold.yellow(element));
});
console.log('|++++++++++++++++++++++++');
// Legends
console.log(colors.bold('| > Legends'));
console.log('| . link validated');
console.log('| ~ link ignored, see /libs/link-validator-ignore.json');
console.log('| ' + colors.bold.red('X link validation failed'));
console.log('|++++++++++++++++++++++++\n');

// Test if url should be ignored.
function ignoreUrl(url) {
  for (var i = 0; i < ignore.length; i++) {
    if (url.indexOf(ignore[i]) > -1) {
      return true;
    }
  }
  return false;
}

/**
 * TEST LINK
 * @param {string} url: the URL to be tested
 * @param {string} filePath the file
 * @param {boolean} ignoreTimeout: if false a timeout cases a retry
 * @returns
 */
async function testLink(url, filePath, ignoreTimeout) {
  try {
    // IGNORE: from ignore list AND
    // some a tags may have javascript:void(0) in href
    if (ignoreUrl(url) || url.indexOf('javascript:void(0)') > -1) {
      process.stdout.write('~');
      return;
    }

    //console.log(url);
    axios.defaults.timeout = 10000; // 10000ms
    let config = {
      headers: {
        Accept: '*/*',
      },
    };
    const response = await axios.get(url, config);

    // Checking the anchors
    // Going forward from here the URL is valid, but there may be an anchor

    let urlAnchor = null;
    let arr = url.split('#');
    // Rule #1
    // Sometimes the anchor indicator (#) is in the
    // path: https://api3.eth/#/history/secondary-6
    // This is not an anchor, ignore it.
    if (url && url.indexOf('/#/') > -1) {
    }
    // If there is an anchor process it here.
    // Only internal anchors within the docs
    else if (url.indexOf(baseURL) !== -1 && arr.length === 2) {
      urlAnchor = '#' + arr[1];
      //console.log('\n> Looking for urlAnchor:', urlAnchor);
      //console.log('> SRC file:', filePath);
      //console.log('> Target URL:', url);

      // Look for urlAnchor in response.data.
      if (
        urlAnchor &&
        response.data.indexOf('href="' + urlAnchor + '"') === -1
      ) {
        //console.log(colors.red('> Anchor was NOT found in the response data.'));
        throw new Error(
          'Did not find anchor in the response data: ' + urlAnchor
        );
      }
      // else {
      //console.log('> Anchor was found in the response data.');
      //}
    }
    // There is an anchor with an .html file attached.
    /*else if (url.indexOf('#') !== -1 && url.indexOf('.html#') === -1) {
      throw new Error('Found anchor without a preceding .html file: ' + url);
    }*/

    // Which one is it? Only one of the arrays will have 2 rows.
    /*if (arr.length === 2) {
      urlAnchor = '#' + arr[1];
      console.log('\n> urlAnchor', urlAnchor);
    } else if (arr2.length === 2) {
      console.log('\n>> urlAnchor', urlAnchor);
      urlAnchor = '#' + arr2[1];
    }*/

    process.stdout.write('.');
    return 0;
  } catch (error) {
    // If a timeout try one more time
    if (
      !ignoreTimeout &&
      error.code == 'ECONNABORTED' &&
      error.toString().indexOf('Error: timeout') > -1
    ) {
      testLink(url, filePath, true);
    } else {
      process.stdout.write(colors.bold.red('X'));
      failuresArr.push({ file: filePath, url: url, error: error.toString() });
      return 1;
    }
  }
}

async function run(task) {
  let passed = 0;
  let failed = 0;
  console.log(`Checking (${task}) ${Object.keys(linksObj).length} links.`);
  for (var key in linksObj) {
    if (linksObj.hasOwnProperty(key)) {
      let fail = await testLink(key, linksObj[key], false);
      if (fail === 1) {
        totalFailedCnt++;
      } else {
        totalPassedCnt++;
      }
    }
  }
  console.log('\n');
}

/**
 * LOAD LINKS
 */
async function loadLinks() {
  const paths = walkSync(distDir);
  const root = distDir.split('./docs/.vitepress/dist')[1];
  for (let i = 0; i < paths.length; i++) {
    // Only html files
    const path = paths[i];
    if (path.indexOf('.html') > 0) {
      const htmlString = readFileSync(distDir + '/' + path, 'utf8');
      const links = oust(htmlString, 'links');
      // Go thru the links and add to master list (linksObj)
      for (var x = 0; x < links.length; x++) {
        let url = links[x];

        if ((url && url.indexOf('#') === 0) || url === '/') {
          // If the URL starts with an anchor (#) tag
          // or is to the root (/)
          // do nothing
        } else if (
          url &&
          url.indexOf('http://') === -1 &&
          url.indexOf('https://') === -1
        ) {
          // These are internal links within the docs
          url = baseURL + url;

          linksObj[url] = 'LINK src: ' + root + '/' + path;
        } else if (url) {
          // URL could be undefined
          // These are external links
          linksObj[url] = 'LINK src: ' + root + '/' + path;
        }
      } // Finished getting all links
    } // End if
  }
}

async function printFailures() {
  if (failuresArr.length > 0) {
    console.log(colors.bold.underline.blue('Total passed: ' + totalPassedCnt));
    console.log(colors.bold.underline.red('Total failed: ' + totalFailedCnt));
    console.log();
    for (var i = 0; i < failuresArr.length; i++) {
      console.log(i + 1, '-------------------');
      console.log('|', colors.bold.red(failuresArr[i].file));
      console.log('|', colors.bold.red('target > ' + failuresArr[i].url));
      console.log('|', colors.bold.red(failuresArr[i].error));
      console.log();
    }
  } else {
    console.log(colors.bold.green('All links OK.'));
    console.log(colors.bold.underline.blue('Total passed: ' + totalPassedCnt));
  }
}

async function start() {
  linksObj = {};
  await loadLinks();
  await run('links');

  // Print failures
  await printFailures();

  console.log('\n|++++++++++++++++++++++++');
  console.log('| END: Link Validator');
  console.log('|++++++++++++++++++++++++\n');
}

start();
