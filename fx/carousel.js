import { article } from '/app/index.js'
import '../lib/react.js'
import '../lib/react-dom.js'

class CarouselWidget extends React.Component {

  render() {
    return (
      <h1> test!!! </h1>
    )
  }

}


article.ready.then(() => {
  ReactDOM.render(<CarouselWidget />, document.querySelector('#carousel-widget'))
})

