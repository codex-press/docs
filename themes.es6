import article from 'article';
import dom from 'dom';

let s = string => string.split(' ');

let swatches = {
  pigeon: s('inverted taxi'),
  raven: s('celtic coldshoulder ebony goldrush inverted'),
  toucan: [],
  heron: s('greenland cherry cyan'),
};

let swatchTemplater = (theme, swatches) => swatches.map(s => {
  return `
    <div class="swatch ${theme} ${s}" data-value="${s}">
      <span class=name>${s ? s : 'default' }</span>
    </div>`
}).join('');

article.ready.then(() => {
  let theme = article.attrs.url.slice('/docs/themes/'.length);

  console.log(theme, dom('div.scoped'));
  setTimeout(() => dom('div.scoped').addClass(theme),2000);

  dom.first('.swatches').innerHTML = swatchTemplater(theme, ['', ...swatches[theme]]);

  dom('.swatch').on('click', e => {
    let newSwatch = dom(e.target).closestW('.swatch').data('value');
    dom('div.scoped').removeClass(...swatches[theme]).addClass(newSwatch);
  });

});


