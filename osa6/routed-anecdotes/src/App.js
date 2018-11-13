import React from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MenuComponent from './components/MenuComponent'
import AnecdoteList from './components/AnecdoteList'
import InspectAnecdote from './components/InspectAnecdote'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'



class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notify = (message) => {
    this.setState({
      notification: message
    })
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000);
  }

  render() {
    const anecdoteById = (id) => this.state.anecdotes.find(a => Number(a.id) === Number(id))

    const hideWhenEmpty = !(this.state.notification === '') && <div className="ui black message">{this.state.notification}</div>
    return (
      <Container>

         {<style>{
          `html, body{
            background-color: #3F3F3F !important;
          }
          div{
            background-color: #454545; 
            color: #fff; 
          }
          `
        }</style>}
        <Router>
          <div>
          <h1>Software anecdotes</h1>
          <MenuComponent />
          {hideWhenEmpty}
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes}></AnecdoteList>}></Route>
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>}></Route>
            <Route exact path="/anecdotes/:id" render={({match}) => <InspectAnecdote anecdote={anecdoteById(match.params.id)}/>}></Route>
            <Route exact path="/about" render={() => <About />}></Route>
            <Route exact path="/create" render={({history}) => <CreateNew history={history} notify={this.notify} addNew={this.addNew}/>}></Route>
            <Footer />
          </div>
        </Router>

      </Container>
    );
  }
}

export default App;
