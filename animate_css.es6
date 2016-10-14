import article from 'article';
import dom from 'dom';

// utility functions
let randomIndex = array => Math.trunc(Math.random() * array.length);
let random = array => array[randomIndex(array)];
let s = string => string.split(/ /);
let j = array => array.join('');

// text
let lorem = [
  'Come sleep with me: We won\'t make Love, Love will make us.',
  'Memory is a mirror that scandalously lies.',
];

// animation-name
let names = s('fade-in fade-out slide-up slide-down')
let nameHTML = j(names.map((n,i) =>
  `<div class=choice data-index=${i}>${n}</div>`)
);


// animatoin-duration
let speeds = [
  ['slow', '2s'],
  ['fast', '0.5s'],
];
let speedHTML = j(speeds.map(([k,v],i) => 
  `<div class=choice data-index=${i}>${k} (${v})</div>`
))


// animatoin-delay
let delays = [
  ['no-delay', '0s'],
  ['long-delay', '2s'],
  ['short-delay', '0.5s'],
];

let delayHTML = j(delays.map(([k,v],i) => 
  `<div class=choice data-index=${i}>${k} (${v})</div>`
));


let template = `

  <div class=options>

    <div class=name>${ nameHTML }</div>

    <div class=speed>${ speedHTML }</div>
    
    <div class=delay>${ delayHTML }</div>

  </div>

  <div class=content contenteditable=true>${ random(lorem) }</div>

  <div class=note>(you can type in the box)</div>

  Use these classes: <span class=result></span>

`;


let state = {};

let render = () => {

  dom('.choice').removeClass('selected');

  dom.first('.content').className = 'content';

  let classes = [
    names[state.name],
    speeds[state.speed][0],
    delays[state.delay][0],
  ];

  console.log(state);
  dom('.name .choice')[state.name].className = 'choice selected';
  dom('.speed .choice')[state.speed].className = 'choice selected';
  dom('.delay .choice')[state.delay].className = 'choice selected';

  dom('.content').addClass(classes.join(' '));
  dom('.result').text('.' + classes.join('.'));
};


article.ready.then(() => {

  dom('article').append(template);

  state.name = randomIndex(names)
  state.speed = randomIndex(speeds)
  state.delay = randomIndex(delays)
  render();

  dom('article').bind({

    'click .name' : e => {
      console.log('name', e.target);
      state.name = dom(e.target).data('index') * 1;
      render();
    },

    'click .speed' : e => {
      console.log('speed', dom(e.target).data('index'));
      state.speed = dom(e.target).data('index') * 1;
      render();
    },

    'click .delay' : e => {
      console.log('delay', dom(e.target).data('index'));
      state.delay = dom(e.target).data('index') * 1;
      render();
    },

  });

});


