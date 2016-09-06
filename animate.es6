import article from 'article';
import app from 'app';
import animate from 'animate';
import dom from 'dom';
import {goldenRatio} from 'utility';
  
dom.ready.then(() => {

  // create structure
  let sections = Object.keys(animate).map(n => {
    let el = dom.create(`
      <section>
        <h3>${n}</h3>
        <canvas class=chart></canvas>
        <div class=circle></div>
        <div class=bar></div>
        <code><pre>let startX = 0;
let endX = 100;
let easeX = animate.${n}(startX, endX);
let el = dom('.your-element');
let duration = 500;
let tick = (time) => el.transform({x: easeX(time)});
animate({duration, tick});</pre></code>
      </section>
    `);
    dom(document.body).append(el);
    return [el, animate[n]];
  });

  // set dimensions, hook to `resize` event
  let width;
  let height;
  function resize() {
    width = Math.round(window.innerWidth * .6);
    height = width / 1.61803398875;
    sections.map(([el, fn]) => {
      let canvas = dom.find(el, 'canvas.chart');
      canvas.width = width;
      canvas.height = height;
      drawChart(fn, canvas);
    });
  };
 
  resize();
  app.on('resize', resize);

  // buttons
  let duration = 2000;
  let durationOptions = [500,1000,2000];

  dom('nav .time').bind('click', () => {
    let i = durationOptions.indexOf(duration) || 0;
    duration = durationOptions[(i+1) % durationOptions.length]
    let s = Math.round(duration/100) / 10;
    dom('nav .time').text(`${s}s`);
  });

  let loop = true;
  let play = true;

  dom('nav svg.loop').bind('click', () => {
    loop = !loop;
  });

  dom('nav svg.eject').bind('click', () => {
    play = !play;
  });


  // every frame, draw the ones that are onscreen
  app.on('tick', timestamp => {
    if (!play)
      return;

    let time = timestamp % duration / duration;
    sections.filter(onscreen).map(([el, fn]) => {
      dom(el).find('.bar').transform({
        y: fn(height, 0, time),
      });
      dom(el).find('.circle').transform({
        x: time * width,
        y: fn(height, 0, time),
      });
    });
  });


  function onscreen([el]) {
    return (
      dom(el).rect().bottom > 0 &&
      dom(el).rect().top < window.innerHeight
    );
  };


  // draws the chart once
  function drawChart(fn, canvas) {
    var ctx = canvas.getContext('2d');
    var pixel = ctx.createImageData(1, 1);
    pixel.data[0] = 0;
    pixel.data[1] = 0;
    pixel.data[2] = 0;
    pixel.data[3] = 255;

    let xMax = canvas.width;
    for (let x = 0; x < canvas.width; x++) {
      let y = fn(canvas.height, 0, x/xMax);
      if (!isNaN(y))
        ctx.putImageData(pixel, x, y); 
    }
  };

});
