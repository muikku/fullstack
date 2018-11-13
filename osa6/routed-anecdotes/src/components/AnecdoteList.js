import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
        <Table striped celled inverted>
          <Table.Body>
            {anecdotes.map(anecdote =>
               <Table.Row key={anecdote.id}>
               <Table.Cell>
               <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
               </Table.Cell>
               </Table.Row>)
            }
          </Table.Body>
        </Table> 
    </div>
  )

  export default AnecdoteList