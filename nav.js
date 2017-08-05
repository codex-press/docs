import { dom } from '/app/index.js';

dom(window).delegate('click', 'nav.docs .reveal', e => {

  if (dom('nav.docs').is('.expanded')) {
    dom('nav.docs').removeClass('expanded');
    dom('nav.docs .container').css({height: ''});
  }
  else {
    dom('nav.docs .container').css({height: 'auto'})
    let height = dom('nav.docs .container').css('height');
    dom('nav.docs .container').css({height: ''})
    dom.first('nav.docs .container').clientHeight
    dom('nav.docs .container').css({height})
    dom('nav.docs').addClass('expanded');
  }
});

