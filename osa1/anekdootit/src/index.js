import React from 'react';
import ReactDOM from 'react-dom';

const Random = (max) => {
Math.round(Math.random() * (max - 1))
}

const NotSameRandom = (current, props) => {
  let random = 0
  do{
    random = Random(props)
  } while (random === current)
  return random
}

const DisplayAnecdote = ({anecdote, votes}) => 
<div>
{anecdote}
<div>has {votes} votes</div>
</div>

const Button = ({clickMetod, buttonText}) => 
<button onClick={clickMetod}>{buttonText}</button>

const DisplayMostVoted = ({mostVoted}) => 
<div>
   <h2> anecdote with most votes: </h2>
  {mostVoted} 
</div>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      voteCount: 0
    }
  }

  array = this.props.anecdotes.map((element) => ({key: element.toString(), text: element, votes: 0}))
  
  nextAnecdote = (number) => () => {this.setState({
    selected: number,
    voteCount: this.array[number].votes
    })                    
  }
  
  vote = () => () => {this.setState({
    voteCount: this.array[this.state.selected].votes += 1
    })
  }

  indexOfMostVoted = () => this.array
  .map(element => element.votes)
  .reduce((iMax, x, i, avote) => x > avote[iMax] ? i : iMax, 0)

  render() {  
    const selected = this.state.selected
    const array = this.array
    return (
      <div>
        <DisplayAnecdote 
        anecdote={array[selected].text} 
        votes={this.state.voteCount}
        />
        <Button 
        clickMetod={this.vote()} 
        buttonText={'vote'}
        />
        <Button 
        clickMetod={this.nextAnecdote(NotSameRandom(selected, array.length))} 
        buttonText={'next anecdote'}
        />
        <DisplayMostVoted 
          mostVoted={array[this.indexOfMostVoted()].text}
        />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)

