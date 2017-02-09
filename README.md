Infographic Generating Logic Utility
====================================

Experiment to see whether it's possible to build an infographic type webpage using pre-built React components, thus saving development time. The idea was that a new infographic could be built quickly using only a specifically configured JSON file and a bit of additional CSS. Long story short: it's possible, but far too creatively limiting to be of use.

This tool contains the following components:

* Simple text block, including a title and a chunk of HTML.
* Simple image block, including an image and a caption.
* Google map block (initialises Gmaps only if it is present in the JSON), including markers with captions, and lines and line styles. Allows multiple map block instances.
* Flow or timeline block.
* Quote block, including title, quote and citation.
* Statistic block, including number and caption.
* Table block, including title and table contents.

All blocks have additional fields in the JSON for additional classes to add to the HTML, as well as an option for how many grid columns they should occupy. There's also unfinished functionality to allow blocks to change depending on their scroll position.

Because I like ridiculous acronyms.


Use of Gulp
------------

There is a `gulpfile.js` within this repository to make development much quicker. All you need to do is:

* Install Node (http://nodejs.org) & Gulp (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* Run `npm run setup`

This will install all the dependencies found in `package.json` (The `node_modules` folder that is generated when you run this command should be created on a case-by-case basis and not pushed to a repository), install the Bower dependencies found in `package.json` and run the local server through the `gulp` command.

This will open up a tab in your browser, running a server at `localhost:3000` (unless you have set up a proxy server address - details on how to change this are in the `gulpfile.js` file).

