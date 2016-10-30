import article from 'article';
import dom from 'dom';

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
