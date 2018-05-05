const ejs = require('ejs');
const fs = require('fs-extra');
const marked = require('marked');

(async () => {
  const files = {
    template: await fs.readFile(`${__dirname}/src/index.ejs`, 'utf-8'),
    text: await fs.readFile(`${__dirname}/src/text.md`, 'utf-8')
  };

  const content = marked(files.text, {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    langPrefix: 'lang-'
  });

  const builtText = ejs.render(files.template, { text: content });
  await fs.writeFile(`${__dirname}/index.html`, builtText);

  console.log("Finished.");
})();
