import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

const all = () => {
  let acc = 0
  const object = store.getState()
  for(var stat in object){
    acc += object[stat]
  }
  return acc
}

const average = () =>  all() / 3

const positive = () => (all() / store.getState().good).toFixed(2)

const Statistiikka = () => {
  const palautteita = all()
  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive()} %</td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
}


class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  
  renderApp()
  store.subscribe(renderApp)