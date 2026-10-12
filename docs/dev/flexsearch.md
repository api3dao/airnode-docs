---
title: FlexSearch
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/flexsearch.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

[FlexSearch](https://www.npmjs.com/package/flexsearch) is used to support searching in the docs. The script [/libs/flexBuildIndexes.js](https://github.com/api3dao/airnode-docs/blob/main/libs/flexBuildIndexes.js) will index all HTML files in the `/dist` folder for the following directories:

- `/dist/explore/`
- `/dist/guides/`
- `/dist/reference/`

Any files that are not part of the docs but are desired to be retained should go into the `/archive` folder before running `pnpm docs:build` which will create the `/dist` folder. This prevents such files from being indexed.

## `<FlexStartTag/>` and `<FlexEndTag/>`

For the `/lib/flexBuildIndexes.js` script to extract the content from a markdown file, the file must contain the markers `<FlexStartTag/>` and `<FlexEndTag/>`. The script will only extract DOM text content between the markers. This will result in the exclusion of headers and footers.

```js{10,14}
---
title: FlexSearch
...
---

<PageHeader />

<SearchHighlight />

<FlexStartTag />

# {{$frontmatter.title}}
...
<FlexEndTag />
```

## Vue components and Flex indexes

Vue components that do not immediately return HTML content will not index since their content is generated at runtime in the browser. For example: a component uses Axios to pull data from an API operation.

To overcome this short fall, the script [/axiosBuildScripts.js](https://github.com/api3dao/airnode-docs/blob/main/libs/axiosBuildScripts.js) gathers on-line data into local data files for markdown pages to use. This allows for proper rendering of HTML at build time. A example of a markdown file that uses a locally generated data file is [chains-list.md](https://raw.githubusercontent.com/api3dao/airnode-docs/main/docs/reference/dapis/chains/chains-list.md).

## Creating/updating the index files

The following three sections represent the workflow to create the FlexSearch indexes.

### 1. Build the local data files

Build the local data files via the Axios script.

```sh
pnpm axios:build
```

### 2. Build the `/dist` folder

Build the `/dist` folder with the latest HTML files. All markdown files in `/docs` are converted to HTML files and are added to `/dist`. All files must contain the extraction markers `<Flex...Tag/>`.

```sh
pnpm docs:build
```

### 3. Script `flexBuildIndexes.js`

Builds the index files.

```sh
pnpm flex:build
```

Note the output from the command `pnpm flex:build` which displays file sizes. Check the size of the three `map.json` files which should be in the range of 25-31 MB. If not refer to the [Long strings warning](/dev/flexsearch.html#long-strings-warning) section below.

```sh
----- Building FlexSearch Indexes -----
...
 > docs/public/indexes/all-dev/map.json 29.714834213256836 MB
 > docs/public/indexes/all/map.json 28.49449634552002 MB
 > docs/public/indexes/latest/map.json 26.81308937072754 MB
...
```

### 4. Script `flexTestSearch.js`

Test the index files.

```sh
pnpm flex:test
```

### 5. Firebase emulator (optional step)

Using the [firebase emulator](/dev/firebase.md#firebase-emulator) run the docs project locally and verify newly added functionality.

## Long strings warning

When flex builds its indexes and encounters a long string such as those in an `encodedValue` field, the index gets large very fast.

Example 1: The following will increase an index very little, around .02 MB (42 characters).

```
0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd
```

Example 2: The following will increase an index by some .8 MB (130 characters).

```
0x00000000000000000000000000000000000000000000000000000000001309ed00000000000000000000000000000000000000000000000000000000065b158a
```

Example 3: Lastly the following will increase an index some 185 MB (1090 characters).

```
0x315353535300000000000000000000000000000000000000000000000000000076735f63757272656e63696573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120696473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001605f7061746800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a05f7479706500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000000375736400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007626974636f696e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b626974636f696e2e7573640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006696e743235360000000000000000000000000000000000000000000000000000
```

The problem is an exponential one. As the string gets longer the index grows more and more rapidly.

Sometimes the need to display a long string is desired so that readers can copy paste the string. However this must be avoided for very long strings. A possible solution has been implemented in the [Calling an Airnode](/guides/airnode/calling-an-airnode/) guide, example: (`0x3...000`→<CopyIcon
text="0x315353535300000000000000000000000000000000000000000000000000000076735f63757272656e63696573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120696473000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001605f7061746800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a05f7479706500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000000375736400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007626974636f696e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b626974636f696e2e7573640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006696e743235360000000000000000000000000000000000000000000000000000"/>). This works because the string is a parameter of an HTML element. The flex search index is only built from element `displayText`.
