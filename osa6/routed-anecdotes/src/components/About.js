import img1 from './../images/img1.png'
import { Grid, Image } from 'semantic-ui-react'
import React from 'react'

const About = () => (
    <Grid columns='equal' >
  
        <Grid.Column >
          <div>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdoctes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>
  
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </div>
        </Grid.Column>
        <Grid.Column width={img1.width}>
        <Image src={img1} size='medium' alt='South Park style picture of Chinese statistician and data scientist Yihui Xie'/>
        </Grid.Column>
    </Grid>
  )

  export default About