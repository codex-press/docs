import dom from '/app/dom.js';
import article from '/app/article.js';
import * as env from '/app/env.js';

let toggleHTML = `
<span class=show-code>Show source code 
  <svg class=arrow width=12 viewBox="0 0 100 40">
    <polygon points="0,0 100,0 50,40"/>
  </svg>
</span>`

article.ready.then(() => update(document));
article.on('render', el => update(el));

function update(el) {
  dom.select(el, 'div.code').forEach(el => dom(el).insertBefore(toggleHTML));

  let nav_items = dom('h2, h3').reduce((menu, el) => {
    menu += `
      <a class=level${el.tagName[1]} href="${article.attrs.url}#${el.id}">
        ${el.childNodes[0].textContent}
      </a>
    `;
    return menu;
  },'');

  let nav = `<nav class=outline>${nav_items}</nav>`;

  dom('nav.outline').remove();
  dom.body().prepend(nav);
}


dom(window).delegate('click', '.show-code', e => {

  let el = e.target;
  let code = el.nextElementSibling;

  if (dom(el).is('.expanded')) {
    dom(el).removeClass('expanded');
    dom(code).css({height: ''});
  }
  else {
    dom(code).css({height: 'auto'})
    let height = dom(code).css('height');
    dom(code).css({height: ''})
    code.clientHeight
    dom(code).css({height})
    dom(el).addClass('expanded');
  }
});

