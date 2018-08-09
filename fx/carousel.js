import { article } from '/app/index.js'
import '../lib/react.js'
import '../lib/react-dom.js'

class CarouselWidget extends React.Component {

  constructor(props) {
    super(props)
    this.state = { button: 'caret' }
    this.carousel = document.querySelector('fx-carousel')
  }


  componentDidUpdate(prevState) {
    if(this.state.button !== prevState.button) {
      this.carousel.button = this.state.button
    }
  }


  changeButton(type) {
    this.setState(prevState => ({
      button: type
    }))
  }


  render() {
    return (
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
    )
  }

}


article.ready.then(() => {
  ReactDOM.render(<CarouselWidget />, document.querySelector('#carousel-widget'))
})

