import article from 'article';
import animate from './animate_lib';
import dom from 'dom';

window.dom = dom;

let html = `
  <nav></nav>
  <main></main>
`;

let row = `

`;

setTimeout(() => {
  article.ready().then(() => {

    dom.find('.play').addEventListener('click', doAnimation);

    let width = window.innerWidth * .8;
    let height = window.innerHeight * .8;

    dom.find('canvas').width = width;
    dom.find('canvas').height = height;

    var ctx = dom.find('canvas').getContext('2d');

    doAnimation();

    function doAnimation() {

      let fn = animate[dom.find('#chooser').value]

      let ease = fn(0, window.innerWidth * .8);

      animate({
        duration: 1000,
        tick: time => {

          ctx.fillStyle = '#ddd'
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = 'green';
          ctx.beginPath()
          ctx.arc(ease(time), 35, 10, 0, 2 * Math.PI);
          ctx.closePath()
          ctx.fill();

        }
      });
    };

  });
}, 1000);
