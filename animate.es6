import article from 'article';
import animate from 'animate';
import dom from 'dom';

article.on('ready', () => {

  let width = window.innerWidth * .8;
  let height = window.innerHeight * .8;

  dom.find('canvas').width = width;
  dom.find('canvas').height = height;

  var ctx = dom.find('canvas').getContext('2d');

  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'green';
  ctx.arc(10, 35, 10, 0, 2 * Math.PI);
  ctx.fill();

});

