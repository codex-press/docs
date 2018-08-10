import { article } from '/app/index.js'
import '../lib/react.js'
import '../lib/react-dom.js'

class CarouselWidget extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      button: 'caret',
      indicator: 'circle',
      loop: false,
      buttonColor: '#FFFFFF',
      indicatorColor: '#FFFFFF'
    }
    this.changeLoop = this.changeLoop.bind(this)
    this.carousel = document.querySelector('fx-carousel')
    this.watchButtonColor = this.watchButtonColor.bind(this)
    this.watchIndicatorColor = this.watchIndicatorColor.bind(this)
  }


  componentDidUpdate(prevState) {
    if(this.state.button !== prevState.button) {
      this.carousel.button = this.state.button
    }
    if(this.state.indicator !== prevState.indicator) {
      this.carousel.indicator = this.state.indicator
    }
    if(this.state.loop !== prevState.loop) {
      this.carousel.loop = this.state.loop
    }
    if(this.state.buttonColor !== prevState.buttonColor) {
      this.carousel.buttonColor = this.state.buttonColor
    }
    if(this.state.indicatorColor !== prevState.indicatorColor) {
      this.carousel.indicatorColor = this.state.indicatorColor
    }
  }


  watchButtonColor(event) {
    this.setState(prevState => ({
      buttonColor: event.target.value
    }))
  }


  watchIndicatorColor(event) {
    this.setState(prevState => ({
      indicatorColor: event.target.value
    }))
  }


  changeButton(type) {
    this.setState(prevState => ({
      button: type
    }))
  }


  changeIndicator(type) {
    this.setState(prevState => ({
      indicator: type
    }))
  }


  changeLoop() {
    this.setState(prevState => ({
      loop: !prevState.loop
    }))
  }


  render() {
    const isLoop = this.state.loop
    const buttonColor = this.state.buttonColor
    const indicatorColor = this.state.indicatorColor
    
    let loop

    if(isLoop) {
      loop = (
        <div className="loop-active" onClick={this.changeLoop}>
          ON
        </div>
      )
    } else {
      loop = (
        <div className="loop-inactive" onClick={this.changeLoop}>
          OFF
        </div>
      )
    }

    return (
      <div className="change-holder">
        <h3>Change Button Style</h3>
        <ul className="button-styles">
          <li
            className="arrow"
            onClick={() => this.changeButton('arrow')}
          >
            Arrow
          </li>
          <li
            className="circle-arrow"
            onClick={() => this.changeButton('circle-arrow')}
          >
            Arrow in Circle
          </li>
          <li
            className="caret"
            onClick={() => this.changeButton('caret')}
          >
            Caret
          </li>
          <li
            className="circle"
            onClick={() => this.changeButton('circle')}
          >
            Caret in Circle
          </li>
        </ul>
        <h3>Change Indicator Style</h3>
        <ul className="indicator-styles">
          <li
            className="circle"
            onClick={() => this.changeIndicator('circle')}
          >
            Circles
          </li>
          <li
            className="dashes"
            onClick={() => this.changeIndicator('dashes')}
          >
            Dashes
          </li>
          <li
            className="rings"
            onClick={() => this.changeIndicator('rings')}
          >
            Rings
          </li>
          <li
            className="pluses"
            onClick={() => this.changeIndicator('plus')}
          >
            Pluses
          </li>
        </ul>
        <div className="loop-colors">
          <h3>Loop</h3>
          {loop}
        
          <input
            type="color"
            id="button-color"
            name="color"
            value={buttonColor}
            onChange={this.watchButtonColor}
          />
          <label htmlFor="button-color">Button Color</label>
          <input
            type="color"
            id="indicator-color"
            name="color"
            value={indicatorColor}
            onChange={this.watchIndicatorColor}
          />
          <label htmlFor="indicator-color">Indicator Color</label>
        </div>
      </div>
    )
  }

}


article.ready.then(() => {
  ReactDOM.render(<CarouselWidget />, document.querySelector('#carousel-widget'))
})

