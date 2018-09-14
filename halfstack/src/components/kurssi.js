import React from 'react'

const Otsikko = ({nimi}) => (
    <h1> {nimi} </h1>
  )
  
  const Osa = ({osa}) => {
    return (
      <div>
        <p> {osa.nimi} {osa.tehtavia} </p>
      </div>
    )
  }
  
  const Osat = ({osat}) => osat.map((note) => <div key={note.id}>{<Osa osa={note}/>}</div>) 

  const Sisalto = ({osat}) => {
    return (
      <div>

        {Osat({osat})}  
 
      </div>
    )
  }
  
  const Summaaja = ({osat}) => osat
    .map(osa => osa.tehtavia)
    .reduce((prev, tehtavia) => (prev || 0) + tehtavia)
  
  const Yhteensa = ({osat}) => {
    return (
      <div>
        <p>Yhteensä {Summaaja({osat})} tehtavää.</p>
      </div>
    )
  }

  const Kurssi = ({kurssi}) => {
    return(
      <div>
      <Otsikko nimi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
      </div>
    )
  }

  export default Kurssi