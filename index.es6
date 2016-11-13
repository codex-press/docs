import {typekit} from 'utility';
import dom from 'dom';
import article from 'article';
import Plugin from 'plugin';

import './nav';

typekit({kitId: 'nnh8ewu'});

//article.ready.then(() => {

function setActive() {
  dom(`nav.docs a[href="${article.attrs.url}"]`).addClass('active');

  if (article.attrs.url.indexOf('/docs/themes') == 0)
    dom('nav.docs a[href="/docs/themes"]').addClass('active');
  else if (article.attrs.url.indexOf('/docs/fx') == 0)
    dom('nav.docs a[href="/docs/fx"]').addClass('active');
  else
    dom('nav.docs a[href="/docs"]').addClass('active');

};

article.ready.then(setActive);
setTimeout(setActive, 2000);


// this ads .active class to the link that the reader has scrolled onto
article.on('scroll', () => {
  let id = dom('[id]').reverse().find(el => dom(el).rect().top < window.innerHeight/2).id
  dom(`a[href^="${article.attrs.url}#"]`).removeClass('active');
  dom(`a[href="${article.attrs.url}#${id}"]`).addClass('active');
});


// copy button for /docs/quick-start
article.ready.then(() => {

  dom('button.copy').on('click', e => {
    dom.first('textarea').select();
    document.execCommand('copy');
    dom('.textarea-controls .message').css({opacity: '1', transform: 'none'});
    setTimeout(() => {
      dom('.textarea-controls .message').css({opacity: '', transform: ''});
    }, 2000);
  });

});

