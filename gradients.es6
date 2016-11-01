import dom from 'dom';
import article from 'article';

article.ready.then(() => {

  dom.first('.animation-controls').innerHTML = (`
    <div class=overflow-checkbox>
      <input type=checkbox checked> Hide overflow
    </div>
    <div>
      <button data-duration=1>.fast (1s)</button>
      <button data-duration=2>default (2s)</button>
      <button data-duration=3>.slow (3s)</button>
      <button data-duration=4>.slower (4s)</button>
    </div>
  `);

  let overflow = true;
  dom('.overflow-checkbox').on('click', e => {
    e.preventDefault();
    if (overflow) {
      overflow = false;
      dom.first('.overflow-checkbox input').checked = false;
      dom('.animate-demo .gradient-parent').css({overflow: 'visible'});
    }
    else {
      overflow = true;
      dom.first('.overflow-checkbox input').checked = true;
      dom('.animate-demo .gradient-parent').css({overflow: ''});
    }
  });

  dom('.animation-controls button').on('click', e => {
    dom('.animate-demo .gradient').css({
      animationDuration:  dom(e.target).data('duration') + 's'
    });
  });

});

