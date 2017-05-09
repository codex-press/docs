import dom from '/app/dom.js';

let stroke = 'crimson';
let fill = 'crimson';
let opacity = 0.5;

let styles = {

  Tadpoles: {
    '.vertical'    : {fill},
    '.horizontal'  : {fill},
  },

  Southwest: {
    '.squiggle'    : {stroke},
    '.center'      : {stroke},
    'ellipse'      : {stroke: 'blue', fill},
  },
 
  'Circle Squares': {
    '.center'      : {fill, opacity},
    '.ring'        : {fill, opacity},
  },
 
  'Crop Circle': {
    '.big'         : {stroke},
    '.small'       : {fill},
  },

  'Crystal': {
    '.triangle'    : {fill},
  },

  Loopy: {
    '.inner'       : {fill},
    '.outer'       : {fill},
  },

  Escher: {
    '.inner'       : {stroke},
    '.outer'       : {stroke},
  },

  Chrysler: {
    '.center'      : {stroke},
    '.side'        : {stroke},
  },

  'Penny Farthing' : {
    '.front-wheel' : {stroke},
    '.back-wheel'  : {stroke},
    '.bike'        : {fill},
  },

}

dom(window).bind({
  'mouseover .variation': e => {
    let fleuron = dom(e.target).closestW('div').first('h4').textContent.trim();
    let selector = dom(e.target).text().trim();
    dom(selector).css(styles[fleuron][selector])
  },
  'mouseout .variation': e => {
    let selector = dom(e.target).text();
    dom(selector).resetCSS();
  },
})
