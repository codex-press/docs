import {typekit} from 'utility';
import dom from 'dom';

typekit({kitId: 'nnh8ewu'});

dom(window).delegate('click', 'nav.docs-nav .reveal', e => {
  if (dom('nav.docs-nav').is('.expanded')) {
    dom('nav.docs-nav').removeClass('expanded');
    dom('nav.docs-nav .links').css({height: ''});
  }
  else {
    dom('nav.docs-nav .links').css({height: 'auto'})
    let height = dom('nav.docs-nav .links').css('height');
    dom('nav.docs-nav .links').css({height: ''})
    dom.first('nav.docs-nav .links').clientHeight
    dom('nav.docs-nav .links').css({height})
    dom('nav.docs-nav').addClass('expanded');
  }
});

