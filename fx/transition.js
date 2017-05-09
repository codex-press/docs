import prism from 'prismjs';
import article from '/app/article.js';
import dom from '/app/dom.js';

let text = [
  'Come sleep with me: We won\'t make Love, Love will make us.',
  'Memory is a mirror that scandalously lies.',
];

// Utility functions
let randomIndex = array => Math.trunc(Math.random() * array.length);
let random = array => array[randomIndex(array)];
let s = string => string.split(/ /);
let j = array => array.join('');

// The class names that define transition-property
let names = s('fade zoom slide-up slide-down slide-left slide-right')
let nameHTML = j(names.map((n,i) =>
  `<button><code>.${n}</code></button>`)
);

// `transition-timing-function`
let timings = s('ease ease-in ease-out ease-in-out linear');

let timingHTML = (
  `<button>(ease)</button>` +
  j(timings.slice(1).map(t => `<button><code>.${t}</code></button>`))
);

// `transition-duration`
let durations = [
  s('faster 0.3s'),
  s('fast 0.5s'),
  s(' 1s'),
  s('slow 2s'),
  s('slower 3s'),
];

let durationHTML = j(durations.map(([k,v]) => 
  `<button><code>${k}</code> (${v})</button>`
))


// `transition-delay`
let delays = [
  s(' 0s'),
  s('short-delay 0.25s'),
  s('delay 0.5s'),
  s('long-delay 1s'),
  s('longer-delay 1.5s'),
];

let delayHTML = (
  `<button>(0s)</button>` +
  j(delays.slice(1).map(([k,v]) => 
    `<button><code>.${k}</code> (${v})</button>`
  ))
);


let classPickerHTML = `
  <div class=content contenteditable=true>${ random(text) }</div>

  <div class=options>
    <div data-prop=name class="buttons">${ nameHTML }</div>
    <div data-prop=timing class="buttons">${ timingHTML }</div>
    <div data-prop=duration class="buttons">${ durationHTML }</div>
    <div data-prop=delay class="buttons">${ delayHTML }</div>
  </div>

`;

// Build the initial state. This object is just a series of four numbers 
// that are indexes in the arrays of values listed above.
let state = {
  // .zoom
  name: 1,
  // `ease` is default in CSS
  timing: 0,
  // 1s duration
  duration: 2,
  // 0s delay
  delay: 0,
};



article.ready.then(() => {

  // Add class picker to the page.
  dom.first('.class-picker').innerHTML = classPickerHTML;

  // First render with initial state.
  renderClassPicker();

  // Hook button press event.
  dom('.class-picker').delegate('click','button', e => {
    let prop = dom(e.target).closestW('.buttons').data('prop');
    state[prop] = dom(e.target).closestW('button').index()
    renderClassPicker();
  });

  // Provide an editable element for putting in the selector.
  dom('.selector-input').attr('contenteditable', true);
  dom('.selector-input').attr('spellcheck', false);


  // Events for the place where they put in the class name.
  dom('.selector-input').bind({

    // Render on input
    input: e => renderCSS(),

    // Prevent enter key to prevent new lines
    keypress: e => e.which == 13 ? e.preventDefault() : '',

    // Paste gets newlines removed
    paste: e => {
      e.preventDefault();
      let string = e.clipboardData.getData('text/plain').replace('\n','');
      document.execCommand('insertText', false, string);
    },

  });

  // Move selection into the .content box that has the transition so 
  // that people will know they can type there
  dom.first('.content').focus();
  window.getSelection().collapse(dom.first('.content'), 1);

});


// Sets state of buttons and plays the animations. Called on every
// button press.
function renderClassPicker() {

  // Remove existing selections
  dom('button').removeClass('selected');

  // Remove existing class names
  dom.first('.content').className = 'content';

  // Use state to find class names that were picked
  let classes = [
    names[state.name],
    timings[state.timing],
    durations[state.duration][0],
    delays[state.delay][0],
  ].filter(c => !!c && c !== 'ease');

  // Apply state to `<button>`s
  dom([
    dom('[data-prop=name] button')[state.name],
    dom('[data-prop=timing] button')[state.timing],
    dom('[data-prop=duration] button')[state.duration],
    dom('[data-prop=delay] button')[state.delay]
  ]).addClass('selected');

  // Add class names to the `.content`
  dom('.content').addClass(classes.join(' '))
  
  // Trigger reflow so the animation is triggered.
  dom.first('.content').offsetWidth;

  // Start animation
  dom('.content').addClass('onscreen')

  // Add selected class names to the `.result` location.
  dom('.result-classes').text(`.onscreen.${ classes.join('.') }`);

  // Show the generated CSS
  renderCSS();
};


// CSS generated for the "Do It Yourself" section.
function renderCSS() {
  let selector = dom('.selector-input').text();

  let timing = timings[state.timing];
  let duration = durations[state.duration][1];
  let delay = delays[state.delay][1];

  let shorthandValues = ` ${ duration } ${ timing } ${ delay }`;

  let name = names[state.name];
  let props, propsOffscreen, propsOnscreen, shorthandTransition;

  // Fade is just opacity
  if (name === 'fade') {
      props = 'opacity';
      propsOffscreen = 'opacity: 0;';
      propsOnscreen = 'opacity: 1;';
      shorthandTransition = 'opacity' + shorthandValues;
  }
  // Others do transform as well
  else {
    props = 'transform, opacity';
    propsOffscreen = 'opacity: 0;\n  transform: none;';
    shorthandTransition = `opacity ${ shorthandValues }, transform ${ shorthandValues }`;

    propsOnscreen = 'opacity: 1;\n  ';
    if (name === 'zoom')
      propsOnscreen += 'transform: scale(.8);';
    else if (name === 'slide-up')
      propsOnscreen += 'transform: translateY(-70px);';
    else if (name === 'slide-down')
      propsOnscreen += 'transform: translateY(70px);';
    else if (name === 'slide-right')
      propsOnscreen += 'transform: translateX(70px);';
    else if (name === 'slide-left')
      propsOnscreen += 'transform: translateX(-70px);';

  }

  let code = (`
${selector} {
  ${ propsOffscreen }
}
${selector}.onscreen {
  ${ propsOnscreen }
  transition-property: ${ props };
  transition-timing-function: ${ timing };
  transition-duration: ${ duration };
  transition-delay: ${ delay };
}`);

  code = prism.highlight(code, prism.languages.css);
  code = `<pre class=language-css><code>${ code }</code></pre>`;
  dom.first('.result-css').innerHTML = code;

  let shorthand = (`
${selector} {
  ${ propsOffscreen }
}
${selector}.onscreen {
  ${ propsOnscreen }
  transition: ${ shorthandTransition };
}`);

  shorthand = prism.highlight(shorthand, prism.languages.css);
  shorthand = (
    `<pre class=language-css><code>${ shorthand }</code></pre>`
  );
  dom.first('.result-shorthand').innerHTML = shorthand;

}


