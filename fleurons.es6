import dom from 'dom';

let stroke = 'crimson';
let fill = 'crimson';

let styles = {
  '.front-wheel' : {stroke},
  '.back-wheel'  : {stroke},
  '.bike'        : {fill},
}


dom(window).bind({
  'mouseover .variation': e => {
    let selector = dom(e.target).text().trim();
    console.log(selector, styles[selector]);
    dom(selector).css(styles[selector])
  },
  'mouseout .variation': e => {
    let selector = dom(e.target).text();
    dom(selector).resetCSS();
  },
})
