import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'


class App extends React.Component {
  render() {
    return (
      <div>
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default App