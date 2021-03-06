import { dom, article } from '/app/index.js';

let s = string => string.split(' ');


let swatches = {
  pigeon: s('dark lemon taxi'),
  raven: s('blue green red'),
  toucan: s('brown'),
  heron: s('lemon salmon teal'),
  owl: s('brown green yellow'),
};

let swatchTemplater = (theme, swatches) => swatches.map(s => {
  return `
    <div class="scoped swatch ${theme} ${s}" data-value="${s}">
      <span class=name>${s ? s : 'default' }</span>
    </div>`
}).join('');

article.ready.then(() => {
  let theme = article.attrs.url.slice('/docs/themes/'.length);

  dom('div.scoped:not(.swatch)').addClass(theme);
  if (dom(document.documentElement).is('.dev-server'))
    setTimeout(() => dom('div.scoped:not(.swatch)').addClass(theme),1000);

  dom.first('.chooser').innerHTML = swatchTemplater(theme, ['', ...swatches[theme]]);

  dom('.swatch').on('click', e => {
    let newSwatch = dom(e.target).closestW('.swatch').data('value');
    dom('div.scoped:not(.swatch)').removeClass(...swatches[theme])
    if (newSwatch)
      dom('div.scoped:not(.swatch)').addClass(newSwatch);
  });

});


