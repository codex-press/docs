import article from '/app/article.js';
import Plugin from '/app/plugin.js';
import dom from '/app/dom.js';

let j = array => array.join(' ');
let s = string => string.split(' ');

let names = s('warm cold violet blue pinklimo delta bravo gore sunny bubblegum flood toxic-dew tomato fifties old-film color-rings rainbow rainbow-flag');

let rotations = ['', ...s('rotate-45 rotate-90 rotate-135 rotate-180 rotate-225 rotate-270 rotate-315')];

let blends = ['', 'translucent', ...s('multiply screen overlay darken lighten dodge burn hard soft difference exclusion hue saturation color luminosity').map(b => `blend-${b}`)];

let animations = s(' revolve revolve-reverse pan pan-vertical pan-continuous');

let durations = s('fast slow slower');

article.ready.then(() => {
  let orNone = n => n ? `.${n}` : 'none';

  dom.first('.name-picker').innerHTML = j(names.map((n,i) =>
    `<div data-value="${n}" class="gradient ${n}">
      <code>.${n}</code>
    </div>`
  ));

  dom.first('.rotation-picker').innerHTML = j(rotations.map((n,i) =>
    `<div data-value="${n}" class="warm gradient ${n}">
      <code>${orNone(n)}</code>
    </div>`
  ));

  dom.first('.blend-picker').innerHTML = j(blends.map((n,i) =>
    `<div data-value="${n}" class=image>
      <div class="warm gradient ${n}"></div>
      <code>${orNone(n)}</code>
    </div>`
  ));

  let animationHTML = `
    <div class=overflow-checkbox>
      <input type=checkbox checked> Hide overflow
    </div>
  `;

  animationHTML += j(animations.map((n,i) =>
    `<button data-value="${n}">
      <code>${orNone(n)}</code>
    </button>`
  ));

  dom.first('.animation-picker').innerHTML = animationHTML;

  dom.first('.duration-picker').innerHTML = j(durations.map((n,i) =>
    `<button data-value="${n}">
      <code>${orNone(n)}</code>
    </button>`
  ));

  let gradient = dom.first('div.target .gradient');

  let name = 'warm';
  let blend = 'translucent';
  let rotation = '';
  let animation = '';
  let duration = '';

  let update = () => {
    let classes = `fill ${name} gradient ${rotation} ${blend} ${duration} ${animation}`;
    gradient.className = classes;
    dom.first('.target .result').innerHTML = classes.replace(/\s+/g, '<br>');
  };

  update();

  dom(window).bind({

    'click .name-picker .gradient': e => {
      name = dom(e.target).closestW('.gradient').data('value');
      update();
      // also set it in rotation and blend pickers
      dom('.rotation-picker .gradient').removeClass(...names).addClass(name);
      dom('.blend-picker .gradient').removeClass(...names).addClass(name);
    },


    'click .rotation-picker .gradient': e => {
      rotation = dom(e.target).closestW('.gradient').data('value');
      update();
    },


    'click .blend-picker .image': e => {
      blend = dom(e.target).closestW('.image').data('value');
      update();
    },


    'click .animation-picker button': e => {
      animation = dom(e.target).closestW('[data-value]').data('value');
      update();
    },


    'click .duration-picker button': e => {
      duration = dom(e.target).closestW('button').data('value');
      update();
    },


    'click .overflow-checkbox': e => {
      e.preventDefault();
      let input = dom.first('.overflow-checkbox input')
      if (input.checked) {
        input.checked = false;
        dom('.target').css({overflow: 'visible'});
      }
      else {
        input.checked = true;
        dom('.target').css({overflow: ''});
      }
    },

  });

});


article.register('.fixer', class Scroller extends Plugin {

  constructor(args) {
    super(args);
    this.bind({scroll: 'scroll'});
    this.fixed = false;
  }

  scroll(rect) {
    if (!this.fixed && rect.top < 10) {
      this.fixed = true;
      this.select('.target').addClass('fixed');
    }
    else if (this.fixed && rect.top > 10) {
      this.fixed = false;
      this.select('.target').removeClass('fixed');
    }
  }

});


